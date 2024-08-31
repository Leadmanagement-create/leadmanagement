
from fastapi import Request
from viewmodels.shared.viewmodel import ViewModelBase


class IndexViewModel(ViewModelBase):
    def __init__(self, request: Request):
        super().__init__(request)
        # this was to check data on front-end coming from back-end (dynamic pages rather than static)
        #self.releases = [{'id':'login page','summary':'all new revamped login page'}, {'id':'register page','summary':'register a new user'}, {'id':'pricing options','summary':'pricing options updated'}]
        self.releases = [
            {'id': 'Aynsc database access', 'summary': 'Database session was updated to have asyncronous sessions, user-services were updated for async access'},
            {'id': 'Adding form for lead generation', 'summary': 'A new form was added to facilitate lead generation, allowing users to submit their information for follow-up.'},
            {'id': 'Adding lead generation data model and lead-services', 'summary': 'Introduced a new data model for lead generation and updated lead-services to handle lead data efficiently.'}
            ]