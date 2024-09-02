import axios from 'axios'
import constant from '../constant'
import api from '../api'

export default {
  GET_ALL_ASSIGNERS: (role) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(constant.BASE_URL + api.assigners.GET_ALL_ASSIGNERS(role), {
          headers: {
            Authorization: `bearer ${localStorage?.getItem('token')}`,
          },
        })
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  GET_ASSIGNERS_BY_ID: (ID) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(constant.BASE_URL + api.assigners.GET_ASSIGNERS_BY_ID(ID))
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  DELETE_ASSIGNERS: (ID) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(constant.BASE_URL + api.assigners.DELETE_ASSIGNERS(ID))
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  UPDATE_ASSIGNERS: (ID, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(
          constant.BASE_URL + api.assigners.UPDATE_ASSIGNERS(ID),
          data,
        )
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  CREATE_ASSIGNERS: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          constant.BASE_URL + api.assigners.CREATE_ASSIGNERS(),
          data,
        )
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
}
