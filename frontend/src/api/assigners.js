export default {
  GET_ALL_ASSIGNERS: (role) => `/users?role=${role}`,
  GET_ASSIGNERS_BY_ID: (id) => `/users/${id}`,
  DELETE_ASSIGNERS: (id) => `/users/${id}`,
  UPDATE_ASSIGNERS: (id) => `/users/${id}`,
  CREATE_ASSIGNERS: () => '/users/',
}
