
import datetime
from typing import Optional
import sqlalchemy as sa
import sqlalchemy.orm as orm

from data.modelbase import SqlAlchemyBase

class Company(SqlAlchemyBase):

    __tablename__ = 'companies'

    company_id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    company_name = sa.Column(sa.String, index=True, unique=True)
    industry = sa.Column(sa.String)
    address = sa.Column(sa.String)
    website = sa.Column(sa.String)

    # Relationship to the Lead Model
    leads = orm.relationship('Lead',back_populates='company', lazy='dynamic')