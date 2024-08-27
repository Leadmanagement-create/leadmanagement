from data import db_session
from data.user import User
from typing import Optional
from passlib.handlers.sha2_crypt import sha512_crypt as crypto

def create_account(first_name:str, last_name:str,email:str,password:str)->User:
    session = db_session.create_session()

    try:
        user = User()
        user.email = email
        user.first_name = first_name
        user.last_name = last_name
        
        user.hashed_password = crypto.hash(password,rounds=10000)
        
        session.add(user)
        session.commit()

        return user

    finally:
        session.close()

def login_user(email: str, password: str) -> Optional[User]:

    session = db_session.create_session()

    try:
        user = session.query(User).filter(User.email == email).first()

        if not user:
            return user
       
        if not crypto.verify(password,user.hashed_password):
            return None
        
        return user
    
    finally:
        session.close()

def get_user_by_id(user_id: int) -> Optional[User]:
    session = db_session.create_session()

    try:
        return session.query(User).filter(User.user_id == user_id).first()
    finally:
        session.close()
    
   
def get_user_by_email(email):
    session = db_session.create_session()

    try:
        return session.query(User).filter(User.email == email).first()
    finally:
        session.close()