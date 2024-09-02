import axios from 'axios'
import constant from '../constant'
import api from '../api'

export default {
  LOGIN: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(constant.BASE_URL + api.auth.LOGIN(), data)
        resolve(response.data)
        localStorage?.setItem('token', response?.data?.tokens)
        localStorage?.setItem('user', JSON.stringify(response?.data?.user))
      } catch (err) {
        reject(err)
      }
    })
  },
  REGISTER: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(constant.BASE_URL + api.auth.REGISTER(), data)
        resolve(response.data)
        localStorage?.setItem('token', response?.data?.tokens)
        localStorage?.setItem('user', JSON.stringify(response?.data?.user))
      } catch (err) {
        reject(err)
      }
    })
  },
}
