
from fastapi import Request
from viewmodels.shared.viewmodel import ViewModelBase


class IndexViewModel(ViewModelBase):
    def __init__(self, request: Request):
        super().__init__(request)
        self.releases = [{'id':'login page','summary':'all new revamped login page'}, {'id':'register page','summary':'register a new user'}, {'id':'pricing options','summary':'pricing options updated'}]