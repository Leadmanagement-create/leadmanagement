from typing import Optional
from viewmodels.shared.viewmodel import ViewModelBase
from services import user_service

class RegisterViewModel(ViewModelBase):
    def __init__(self, request):
        super().__init__(request)

        self.first_name:Optional[str] = None
        self.last_name :Optional[str] = None
        self.email:Optional[str] = None
        self.password:Optional[str] = None
        self.role:Optional[str] = None
    
    async def load(self):
        form = await self.request.form()
        self.first_name = form.get('first_name')
        self.last_name = form.get('last_name')
        self.email = form.get('email')
        self.password = form.get('password')

        if not self.first_name or not self.first_name.strip():
            self.errors = 'Your first name is required.'
        if not self.last_name or not self.last_name.strip():
            self.errors = 'Your last name is required.'
        elif not self.email or not self.email.strip():
            self.errors = 'Your email is required.'
        elif not self.password or len(self.password) < 5:
            self.errors = 'Your password is required and must be at 5 characters.'
        elif user_service.get_user_by_email(self.email):
            self.errors = 'That email is already taken. Log in instead?'
