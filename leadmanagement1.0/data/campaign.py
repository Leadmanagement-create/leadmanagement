from data.modelbase import SqlAlchemyBase
import sqlalchemy as sa
from datetime import datetime
import sqlalchemy.orm as orm

class Campaign(SqlAlchemyBase):
    __tablename__ = 'campaigns'

    campaign_id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    campaign_name = sa.Column(sa.String, nullable=False)
    description = sa.Column(sa.String, nullable=True)
    start_date = sa.Column(sa.DateTime, default=datetime.now)
    end_date = sa.Column(sa.DateTime, default=None)
    is_active = sa.Column(sa.Boolean, default=True)

    #relationships
    
    campaign_lead = orm.relationship('CampaignLead', back_populates='campaign', lazy='dynamic')

    def __repr__(self):
        return f'<Campaign> {self.campaign_name}'