import asyncio
import fastapi
from starlette.requests import Request
from starlette import status
from infrastructure import cookie_auth
from viewmodels.leads.lead_generation_viewmodel import LeadsGenerationViewModel
from viewmodels.leads.lead_tracking_viewmodel import LeadsTrackingViewModel
from services import lead_service
from fastapi_chameleon import template
from fastapi import UploadFile, File,HTTPException
import csv
import io
import requests
from fastapi.responses import RedirectResponse


#TODO Leads Routing and Leads Nurturing ViewModels and Services


router = fastapi.APIRouter()


@router.get("/leads/leads_generation")
@template()
async def leads_generation(request:Request):
    vm = LeadsGenerationViewModel(request)
    await vm.load()
    return vm.to_dict()

@router.post("/leads/leads_generation")
@template()
async def getting_started(request:Request):
   print('Leads Generation FORM POSTED from leads generation service page')
   vm = LeadsGenerationViewModel(request)
   await vm.load()
   
   if vm.errors:
       return vm.to_dict()
   
   # Create the lead -

   lead = await lead_service.create_lead(vm.first_name,
                                            vm.last_name,
                                            vm.email,
                                            vm.phone,
                                            vm.source,
                                            vm.status,
                                            vm.company_id,
                                            vm.user_id,
                                            vm.last_contact_date)

   # Redirect to the account page
   response = fastapi.responses.RedirectResponse(url="/account",status_code=status.HTTP_302_FOUND)
   
   cookie_auth.set_auth(response,lead.user_id)

   return response

@router.post("/leads/upload_leads")
async def upload_leads(file: UploadFile = File(...)):
    REQUIRED_COLUMNS = {'first_name','last_name','email','phone','source','status','company_id','user_id','last_contact_date'}
    contents = await file.read()
    leads = []
    with io.StringIO(contents.decode('utf-8')) as file:
        reader = csv.DictReader(file)
        # Validate the columns
        if not REQUIRED_COLUMNS.issubset(reader.fieldnames):
            raise HTTPException(status_code=400,detail='Invalid CSV file: Columns are not as expected')
        
        for row in reader:
            # Validate each row and create a lead 
            # #TODO maybe use pydantic here
            if not row['first_name'] or not row['last_name'] or not row['email'] or not row['phone'] or not row['source'] or not row['status'] or not row['company_id'] or not row['user_id'] or not row['last_contact_date']:
                raise HTTPException(status_code=400,detail='Invalid CSV file: Missing required data')
            
            # TODO validate that this lead is already not existing in the database.
            
            lead = await lead_service.create_lead(row['first_name'],
                                                  row['last_name'],
                                                  row['email'],
                                                  row['phone'],
                                                  row['source'],
                                                  row['status'],
                                                  row['company_id'],
                                                  row['user_id'],
                                                  row['last_contact_date'])
            leads.append(lead)
    
    # Process the leads data as needed
    return {"message": "Leads uploaded successfully", "leads": leads}

#TODO Add upload json input file

@router.post("/leads/fetch_leads_from_api")
async def fetch_leads_from_api(request:Request):
    query_params = {"_quantity": 10,
                    "_locale":"en_US",
                    "first_name":"firstName",
                    "last_name":"lastName",
                    "email":"email",
                    "phone":"phone",
                    "source":"word",
                    "status":"word",
                    "last_contact_date":"date"}
    
    headers = {'accept':'application/json',
               #authorization header can be added here Ex: 'Authorization':'Bearer <token>'
               }
    leads = []
    try:
        response = requests.get("https://fakerapi.it/api/v2/custom/",params=query_params,headers=headers,verify=False) # verify=False is used to ignore SSL certificate verification
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()

        
        data_dict_list = data.get('data')
        print(f'this is the data_dict_list: {data_dict_list}')
        # Process the data as needed
        # For example, save the data to the database or perform other operations
        for record in data_dict_list:
            # Create a lead
            print(f'this is the record: {record}')
            lead = await lead_service.create_lead(record.get('first_name'),
                                                  record.get('last_name'),
                                                  record.get('email'),
                                                  record.get('phone'),
                                                  record.get('source'),
                                                  record.get('status'),
                                                  1, # company_id
                                                  1, # user_id
                                                  record.get('last_contact_date'))
            leads.append(lead)
            

        

        # Redirect to a success page or back to the leads page
        return {"message": "Leads uploaded successfully", "leads": leads}
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))