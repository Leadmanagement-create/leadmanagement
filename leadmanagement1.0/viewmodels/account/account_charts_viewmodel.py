from typing import Optional
from fastapi import Request
from viewmodels.shared.viewmodel import ViewModelBase
from services import lead_dashboard_service

class AccountChartsViewModel(ViewModelBase):
    def __init__(self, request: Request):
        super().__init__(request)

        self.lead_by_source_labels = []
        self.lead_by_source_values = []
        self.lead_by_status_labels = []
        self.leads_by_status_values = []
        
    

    async def load(self): 
        sources,counts = await lead_dashboard_service.get_lead_by_source(self.user_id)
        self.lead_by_source_labels = sources
        self.lead_by_source_values = counts

        status,counts = await lead_dashboard_service.get_lead_by_status(self.user_id)
        self.lead_by_status_labels = status
        self.leads_by_status_values = counts
