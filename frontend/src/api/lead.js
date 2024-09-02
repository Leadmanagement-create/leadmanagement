export default {
  GET_ALL_LEAD: (page, limit) => `/lead/getAllLeads?page=${page}&limit=${limit}`,
  GET_LEAD_BY_ID: (id) => `/lead/getLeadById/${id}`,
  DELETE_LEAD: (id) => `/lead/deleteLead/${id}`,
  UPDATE_LEAD: (id) => `/lead/updateLeadwithassigneeId/${id}`,
  CREATE_LEAD: () => '/lead/create',
}
