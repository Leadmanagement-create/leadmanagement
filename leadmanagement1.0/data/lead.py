
from data.modelbase import SqlAlchemyBase
import sqlalchemy as sa
from datetime import datetime
import sqlalchemy.orm as orm


class Lead(SqlAlchemyBase):
    
    __tablename__ = 'leads'

    lead_id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    first_name = sa.Column(sa.String)
    last_name = sa.Column(sa.String)
    email = sa.Column(sa.String, index=True, unique=True)
    phone = sa.Column(sa.String, index=True, unique=True)
    source = sa.Column(sa.String)
    status = sa.Column(sa.String)
    created_date = sa.Column(sa.DateTime, default=datetime.now, index=True)
    last_contact_date = sa.Column(sa.DateTime, default=datetime.now)

   # Foreign keys
    company_id = sa.Column(sa.Integer, sa.ForeignKey('companies.company_id'))
    user_id = sa.Column(sa.Integer, sa.ForeignKey('users.user_id'))

    # Relationships
    company = orm.relationship('Company', back_populates='leads', lazy='joined') #there can be many leads to one company
    user = orm.relationship('User', back_populates='leads', lazy='joined') #there can be many leads to one user

    activities = orm.relationship('Activity', back_populates='lead', lazy='dynamic') #there can be many activities to one lead
    campaign_lead = orm.relationship('CampaignLead', back_populates='lead', lazy='dynamic') #there can be many leads to many campaigns