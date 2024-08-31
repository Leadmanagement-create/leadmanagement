
from typing import Optional
from viewmodels.shared.viewmodel import ViewModelBase
from services import lead_service
from datetime import datetime

class LeadsGenerationViewModel(ViewModelBase):
    def __init__(self, request):
        super().__init__(request)

        self.first_name:Optional[str] = None
        self.last_name :Optional[str] = None
        self.email:Optional[str] = None
        self.phone:Optional[str] = None
        self.source:Optional[str] = None
        self.status:Optional[str] = None
        self.company_id:Optional[int] = None
        self.user_id:Optional[int] = None
        self.last_contact_date:Optional[datetime.date] = None
    
    async def load(self):
        form = await self.request.form()
        self.first_name = form.get('first_name')
        self.last_name = form.get('last_name')
        self.email = form.get('email')
        self.phone = form.get('phone')
        self.source = form.get('source')
        self.status = form.get('status')
        self.company_id = form.get('company_id')
        self.user_id = form.get('user_id')
        
        #TODO - Add last contact date
        # self.last_contact_date = form.get('last_contact_date')


        #  # Convert string to datetime.date
        # if last_contact_date_str:
        #     try:
        #         self.last_contact_date = datetime.strptime(last_contact_date_str, "%Y-%m-%d").date()
        #     except ValueError:
        #         self.errors = "Invalid date format for last contact date. Please use YYYY-MM-DD."



        if not self.first_name or not self.first_name.strip():
            self.errors = 'Your first name is required.'
        if not self.last_name or not self.last_name.strip():
            self.errors = 'Your last name is required.'
        elif not self.email or not self.email.strip():
            self.errors = 'Your email is required.'
