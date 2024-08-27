from pathlib import Path
import fastapi
import uvicorn
import fastapi_chameleon
from starlette.staticfiles import StaticFiles

from data import db_session
from views import home
from views import account

app = fastapi.FastAPI()

def configure_templates():
    return fastapi_chameleon.global_init('templates')

def configure_database(dev_mode:bool):
    './db/lead_management.sqlite'
    file = (Path(__file__).parent / 'db' / 'lead_management.sqlite').absolute()
    db_session.global_init(str(file))

def configure_routes():
    app.mount('/static',StaticFiles(directory='static'),name='static')
    app.include_router(home.router)
    app.include_router(account.router)

def main():
    configure() 
    uvicorn.run(app,host='127.0.0.1',port=8000)

def configure():

    configure_templates()

    configure_routes()

    configure_database(dev_mode=True)

if __name__ == "__main__":
    main()
else:
    configure()