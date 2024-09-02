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