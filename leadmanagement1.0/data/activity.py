from datetime import datetime
from typing import Optional
import sqlalchemy as sa
import sqlalchemy.orm as orm

from data.modelbase import SqlAlchemyBase

class Activity(SqlAlchemyBase):
    
    __tablename__ = 'activities'

    activity_id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    activity_type = sa.Column(sa.String)
    activity_date = sa.Column(sa.DateTime, default=datetime.now, index=True)
    notes = sa.Column(sa.String)

    # Foreign keys
    lead_id = sa.Column(sa.Integer, sa.ForeignKey('leads.lead_id'))
    user_id = sa.Column(sa.Integer, sa.ForeignKey('users.user_id'))

    # Relationships
    lead = orm.relationship('Lead',back_populates='activities', lazy='select')
    user = orm.relationship('User',back_populates='activities', lazy='select')