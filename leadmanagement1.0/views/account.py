import fastapi
from starlette.requests import Request
from starlette import status
from infrastructure import cookie_auth
from viewmodels.account.account_viewmodel import AccountViewModel
from viewmodels.account.register_viewmodel import RegisterViewModel
from viewmodels.account.login_viewmodel import LoginViewModel
from services import user_service
from fastapi_chameleon import template

router = fastapi.APIRouter()

@router.get("/account")
@template()
def index(request:Request):
    vm = AccountViewModel(request)
    return vm.to_dict()

@router.get("/account/getting_started")
@template()
def getting_started(request:Request):

    print("GET REGISTER")
    vm = RegisterViewModel(request)
    return vm.to_dict()

@router.post("/account/getting_started")
@template()
async def getting_started(request:Request):
   print('Registration FORM POSTED from getting started page')
   vm = RegisterViewModel(request)
   await vm.load()
   
   if vm.errors:
       return vm.to_dict()
   
   # Create the account -
   account = user_service.create_account(vm.first_name,vm.last_name,vm.email,vm.password)

   # login the user
   response = fastapi.responses.RedirectResponse(url="/account",status_code=status.HTTP_302_FOUND)
   
   cookie_auth.set_auth(response,account.user_id)

   return response

##################### LOGIN ############################

@router.get("/account/login")
@template()
def login(request:Request):
    print('login form')
    vm = LoginViewModel(request)
    return vm.to_dict()

@router.post("/account/login")
@template()
async def login(request:Request):
    print("login form from login page")
    vm = LoginViewModel(request)
    await vm.load()

    if vm.errors:
        return vm.to_dict()

    user = user_service.login_user(vm.email, vm.password)

    if not user:
        vm.errors = 'The account does not exist or the password is wrong.'
        return vm.to_dict()

    response = fastapi.responses.RedirectResponse('/account', status_code=status.HTTP_302_FOUND)
    cookie_auth.set_auth(response, user.user_id)

    return response



@router.get("/account/logout")
def logout():
    response = fastapi.responses.RedirectResponse(url="/",status_code=status.HTTP_302_FOUND)
    cookie_auth.logout(response)
    return response
    