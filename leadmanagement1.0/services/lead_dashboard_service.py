from sqlalchemy import select
from data import db_session
from data.lead import Lead
from typing import Optional
from data import db_session
from sqlalchemy import func
from datetime import datetime,timedelta
from datetime import datetime, timedelta



async def get_total_leads(user_id: int) -> int:
    async with db_session.create_async_session() as session:
        query = select(func.count(Lead.lead_id)).filter(Lead.user_id == user_id)
        result = await session.execute(query)
        lead_count = result.scalar()
        return lead_count


async def get_fresh_leads(user_id: int) -> int:
    one_week_ago = datetime.now() - timedelta(days=20)
    async with db_session.create_async_session() as session:
        query = select(func.count(Lead.lead_id)).filter(Lead.user_id == user_id,Lead.created_date >= one_week_ago)
        result = await session.execute(query)
        lead_count = result.scalar()
        return lead_count

async def get_open_leads(user_id:int) -> int:
    async with db_session.create_async_session() as session:
        query = select(func.count(Lead.lead_id)).filter(Lead.user_id == user_id,Lead.status == 'Open')
        result = await session.execute(query)
        lead_count = result.scalar()
        return lead_count




### DATA FROM DB FOR CHARTS ####
async def get_lead_by_source(user_id:int):
    async with db_session.create_async_session() as session:
        query = select(Lead.source,func.count(Lead.lead_id)).filter(Lead.user_id == user_id).group_by(Lead.source)
        result = await session.execute(query)
        rows = result.fetchall()
        
          # Extract sources and counts into separate lists
        sources = [row[0] for row in rows]
        counts = [row[1] for row in rows]

        return sources, counts

