import asyncio
import fastapi
from starlette.requests import Request
from starlette import status
from infrastructure import cookie_auth
from viewmodels.leads.lead_generation_viewmodel import LeadsGenerationViewModel
from viewmodels.leads.lead_tracking_viewmodel import LeadsTrackingViewModel
from services import lead_service
from fastapi_chameleon import template


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
   
   # Create the account -

   lead = await lead_service.create_lead(vm.first_name,
                                            vm.last_name,
                                            vm.email,
                                            vm.phone,
                                            vm.source,
                                            vm.status,
                                            vm.company_id,
                                            vm.user_id,
                                            vm.last_contact_date)

   # login the user
   response = fastapi.responses.RedirectResponse(url="/account",status_code=status.HTTP_302_FOUND)
   
   cookie_auth.set_auth(response,lead.lead_id)

   return response
