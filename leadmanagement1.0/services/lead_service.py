from sqlalchemy import select
from data import db_session
from data.lead import Lead
from typing import Optional
from data import db_session
from passlib.handlers.sha2_crypt import sha512_crypt as crypto
from datetime import datetime
async def get_lead_by_id(lead_id: int) -> Optional[Lead]:
    
    async with db_session.create_async_session() as session:
        query = select(Lead).filter(Lead.lead_id == lead_id)
        result = await session.execute(query)
        return result.scalar_one_or_none()


async def create_lead(first_name:str,
                last_name:str,
                email:str,
                phone:str,
                source:str,
                status:str,
                company_id:int,
                user_id:int,
                last_contact_date:datetime) -> Lead:
    
    lead = Lead()
    lead.first_name = first_name
    lead.last_name = last_name
    lead.email = email
    lead.phone = phone
    lead.source = source
    lead.status = status
    lead.company_id = int(company_id)
    
    #TODO Lead should be asssigned automatically to the user who created it
    lead.user_id = int(user_id)

    #TODO fix the last contact date: it is taking string, not datetime which is required by database
    # lead.last_contact_date = last_contact_date
    lead.last_contact_date = datetime.now().date()
    lead.created_date = datetime.now().date()

    async with db_session.create_async_session() as session:
        session.add(lead)
        await session.commit()

    
    return lead