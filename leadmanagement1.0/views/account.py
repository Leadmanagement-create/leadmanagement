import asyncio
import fastapi
from starlette.requests import Request
from starlette import status
from infrastructure import cookie_auth
from viewmodels.account.account_viewmodel import AccountViewModel
from viewmodels.account.account_charts_viewmodel import AccountChartsViewModel
from viewmodels.account.login_viewmodel import LoginViewModel
from services import user_service
from fastapi_chameleon import template

import plotly.graph_objs as go # I will move this to a service later
import plotly.io as pio
from plotly.graph_objs import Figure
from plotly.subplots import make_subplots

router = fastapi.APIRouter()

@router.get("/account")
@template()
async def index(request:Request):
    vm = AccountViewModel(request)
    await vm.load()
    return vm.to_dict()

########### CHARTS ON ACCOUNT PAGE ########## 
@router.get("/account/multi_plot_chart")
async def multi_plot_chart(request:Request):

    vm = AccountChartsViewModel(request)
    await vm.load()

    fig = make_subplots(rows=2, 
                        cols=2, 
                        subplot_titles=("Leads By Source",
                                         "Leads By Status",
                                         "Sales By Lead Source",
                                         "PipeLine By Stage"),
                        specs=[[{"type": "xy"}, {"type": "domain"}],   # Pie chart in 1,2
                               [{"type": "xy"}, {"type": "xy"}]])       # Cartesian plots in row 2
    
    fig.add_trace(go.Bar(x=vm.lead_by_source_labels,
                         y=vm.lead_by_source_values,
                         name='Leads By Source',
                         marker=dict(color='blue')),row=1, col=1)
    
    
    fig.add_trace(go.Pie(labels=vm.lead_by_status_labels, 
                         values=vm.leads_by_status_values, 
                         name='Leads By Status',
                         marker=dict(colors=['red', 'green', 'blue', 'orange'])),row=1, col=2)
    

    fig.add_trace(go.Funnel(y=vm.lead_pipeline_labels,
                            x=vm.lead_pipeline_values,
                            name='Pipeline By Stage',
                            marker=dict(color='cyan')), row=2, col=2)

    # Customize the layout
    fig.update_layout(title_text="Lead Dashboard",
                      showlegend=False,
                      margin=dict(t=50, b=50, l=50, r=50))
    
    
    graphJSON = pio.to_json(fig)
    return graphJSON

   
 
    
    

################ LOGIN ##################

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

    user = await user_service.login_user(vm.email, vm.password)

    if not user:
        await asyncio.sleep(5)
        vm.errors = 'The account does not exist or the password is wrong.'
        return vm.to_dict()

    response = fastapi.responses.RedirectResponse('/account', status_code=status.HTTP_302_FOUND)
    cookie_auth.set_auth(response, user.user_id)

    return response

############ LOGOUT ######################

@router.get("/account/logout")
def logout():
    response = fastapi.responses.RedirectResponse(url="/",status_code=status.HTTP_302_FOUND)
    cookie_auth.logout(response)
    return response
    