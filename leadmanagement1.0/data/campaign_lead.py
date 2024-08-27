
from data.modelbase import SqlAlchemyBase
import sqlalchemy as sa
from datetime import datetime
import sqlalchemy.orm as orm

class CampaignLead(SqlAlchemyBase):
    __tablename__ = 'campaign_leads'

    campaign_lead_id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    campaign_id = sa.Column(sa.Integer, sa.ForeignKey('campaigns.campaign_id'))
    lead_id = sa.Column(sa.Integer, sa.ForeignKey('leads.lead_id'))

    # Relationships
    campaign = orm.relationship('Campaign', back_populates='campaign_lead', lazy='joined')
    lead = orm.relationship('Lead', back_populates='campaign_lead', lazy='joined')

    def __repr__(self):
        return f'<CampaignLead> {self.campaign_id} {self.lead_id}'