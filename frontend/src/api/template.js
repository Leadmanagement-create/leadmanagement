export default {
  GET_ALL_Template: () => `/template/getAllTemplate`,
  GET_Template_BY_ID: (id) => `/template/getTemplateById/${id}`,
  DELETE_Template: (id) => `/template/deleteTemplateById/${id}`,
  UPDATE_Template: (id) => `/template/updateTemplateById/${id}`,
  UPDATE_Template_Status: (id) => `/template/templates/status/${id}`,
  CREATE_Template: () => '/template/create',
}
