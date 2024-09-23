from sqlalchemy import select
from data import db_session
from data.lead import Lead
from typing import Optional
from data import db_session
from sqlalchemy import func
from datetime import datetime



async def get_total_leads(user_id: int) -> int:
    async with db_session.create_async_session() as session:
        query = select(func.count(Lead.lead_id)).filter(Lead.user_id == user_id)
        result = await session.execute(query)
        lead_count = result.scalar()
        return lead_count
    