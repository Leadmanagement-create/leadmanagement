import axios from 'axios'
import constant from '../constant'
import api from '../api'

export default {
  GET_ALL_LEAD: (page, limit) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(constant.BASE_URL + api.lead.GET_ALL_LEAD(page, limit), {
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
  GET_LEAD_BY_ID: (ID) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(constant.BASE_URL + api.lead.GET_LEAD_BY_ID(ID))
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  DELETE_LEAD: (ID) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(constant.BASE_URL + api.lead.DELETE_LEAD(ID))
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  UPDATE_LEAD: (ID, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(constant.BASE_URL + api.lead.UPDATE_LEAD(ID), data)
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  CREATE_LEAD: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(constant.BASE_URL + api.lead.CREATE_LEAD(), data)
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
}
