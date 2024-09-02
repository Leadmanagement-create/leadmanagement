import axios from 'axios'
import constant from '../constant'
import api from '../api'

export default {
  GET_ALL_CAMPAIGN: (page, limit) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(constant.BASE_URL + api.campaign.GET_ALL_CAMPAIGN(), {
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
  GET_CAMPAIGN_BY_ID: (ID) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(constant.BASE_URL + api.campaign.GET_CAMPAIGN_BY_ID(ID))
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  DELETE_CAMPAIGN: (ID) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(constant.BASE_URL + api.campaign.DELETE_CAMPAIGN(ID))
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  UPDATE_CAMPAIGN: (ID, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(constant.BASE_URL + api.campaign.UPDATE_CAMPAIGN(ID), data)
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  CREATE_CAMPAIGN: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(constant.BASE_URL + api.campaign.CREATE_CAMPAIGN(), data)
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
  UPDATE_CAMPAIGN_Status: (ID, Status) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(
          constant.BASE_URL + api.campaign.UPDATE_CAMPAIGN_Status(ID),
          Status,
        )
        resolve(response.data)
      } catch (err) {
        reject(err)
      }
    })
  },
}
