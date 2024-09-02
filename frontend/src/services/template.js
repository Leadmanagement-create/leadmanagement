import axios from 'axios'
import constant from '../constant'
import api from '../api'

export default {
  GET_ALL_Template: (page, limit) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(constant.BASE_URL + api.template.GET_ALL_Template(), {
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
  GET_Template_BY_ID: (ID) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(constant.BASE_URL + api.template.GET_Template_BY_ID(ID))
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  DELETE_Template: (ID) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(constant.BASE_URL + api.template.DELETE_Template(ID))
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  UPDATE_Template: (ID, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(constant.BASE_URL + api.template.UPDATE_Template(ID), data)
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  CREATE_Template: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(constant.BASE_URL + api.template.CREATE_Template(), data)
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  UPDATE_Template_Status: (ID, Status) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(constant.BASE_URL + api.template.UPDATE_Template_Status(ID), Status)
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
}
