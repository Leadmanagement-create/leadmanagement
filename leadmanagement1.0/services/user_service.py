from sqlalchemy import select
from data import db_session
from data.user import User
from typing import Optional
from passlib.handlers.sha2_crypt import sha512_crypt as crypto

async def create_account(first_name:str, last_name:str,email:str,password:str)->User:

    user = User()
    user.email = email
    user.first_name = first_name
    user.last_name = last_name
    user.hashed_password = crypto.hash(password,rounds=10000)

    async with db_session.create_async_session() as session:
        session.add(user)
        await session.commit()

    return user


    # session = db_session.create_session()

    # try:
    #     user = User()
    #     user.email = email
    #     user.first_name = first_name
    #     user.last_name = last_name
        
    #     user.hashed_password = crypto.hash(password,rounds=10000)
        
    #     session.add(user)
    #     session.commit()

    #     return user

    # finally:
    #     session.close()

async def login_user(email: str, password: str) -> Optional[User]:

    async with db_session.create_async_session() as session:
        query = select(User).filter(User.email == email)
        result = await session.execute(query)
        user = result.scalar_one_or_none()

        if not user:
            return user
        
        if not crypto.verify(password,user.hashed_password):
            return None
        
        return user
        


    # session = db_session.create_session()

    # try:
    #     user = session.query(User).filter(User.email == email).first()

    #     if not user:
    #         return user
       
    #     if not crypto.verify(password,user.hashed_password):
    #         return None
        
    #     return user
    
    # finally:
    #     session.close()

async def get_user_by_id(user_id: int) -> Optional[User]:

    async with db_session.create_async_session() as session:
        query = select(User).filter(User.user_id == user_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()

    # session = db_session.create_session()

    # try:
    #     return session.query(User).filter(User.user_id == user_id).first()
    # finally:
    #     session.close()
    
   
async def get_user_by_email(email):

    async with db_session.create_async_session() as session:
        query = select(User).filter(User.email == email)
        result = await session.execute(query)
        return result.scalar_one_or_none()
        



    # session = db_session.create_session()

    # try:
    #     return session.query(User).filter(User.email == email).first()
    # finally:
    #     session.close()