
from typing import Optional
from fastapi import Request
from viewmodels.shared.viewmodel import ViewModelBase
from services import user_service
from services import lead_dashboard_service
from data.user import User

class AccountViewModel(ViewModelBase):
    def __init__(self, request: Request):
        super().__init__(request)
        self.user:Optional[User] = None
        self.user_total_leads:Optional[int] = None
        self.user_fresh_leads:Optional[int] = None



    async def load(self):   
        self.user = await user_service.get_user_by_id(self.user_id)
        self.user_total_leads = await lead_dashboard_service.get_total_leads(self.user_id)
        self.user_fresh_leads = await lead_dashboard_service.get_fresh_leads(self.user_id)