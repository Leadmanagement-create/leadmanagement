import fastapi
from fastapi_chameleon import template
from starlette.requests import Request
from viewmodels.home.indexviewmodel import IndexViewModel
from viewmodels.account.register_viewmodel import RegisterViewModel
from infrastructure import cookie_auth
from services import user_service
from starlette.requests import Request
from starlette import status

router = fastapi.APIRouter()

@router.get("/")
@template()
def index(request:Request):
    vm = IndexViewModel(request)
    return vm.to_dict()


@router.get("/getting_started")
@template()
def getting_started(request:Request):

    print("GET REGISTER")
    vm = RegisterViewModel(request)
    return vm.to_dict()

@router.post("/getting_started")
@template()
async def getting_started(request:Request):
   print('Registration FORM POSTED from getting started page')
   vm = RegisterViewModel(request)
   await vm.load()
   
   if vm.errors:
       return vm.to_dict()
    # Create the account -
   account = await user_service.create_account(vm.first_name,vm.last_name,vm.email,vm.password)

   # login the user
   response = fastapi.responses.RedirectResponse(url="/account",status_code=status.HTTP_302_FOUND)
   
   cookie_auth.set_auth(response,account.user_id)

   return response

@router.get("/contact")
@template()
def contact(request:Request):
    return {}