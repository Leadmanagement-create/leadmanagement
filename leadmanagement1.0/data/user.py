from datetime import datetime
import sqlalchemy as sa
import sqlalchemy.orm as orm

from data.modelbase import SqlAlchemyBase



class User(SqlAlchemyBase):


    __tablename__ = 'users'

    user_id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    first_name = sa.Column(sa.String)
    last_name = sa.Column(sa.String)
    email = sa.Column(sa.String, index=True, unique=True)
    hashed_password = sa.Column(sa.String) 
    created_date = sa.Column(sa.DateTime, default=datetime.now,index=True) 
    last_login = sa.Column(sa.DateTime, default=datetime.now)
    role = sa.Column(sa.String, default='salesperson')

    # Relationships
    leads = orm.relationship('Lead', back_populates='user', lazy='dynamic')
    activities = orm.relationship('Activity', back_populates='user', lazy='dynamic')

    