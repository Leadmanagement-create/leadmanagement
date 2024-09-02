import Axios from 'axios'

const initialiseInterceptor = () => {
  Axios.defaults.headers.common['Authorization'] = `bearer ${localStorage?.getItem('token')}`

  Axios.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  Axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response && (error.response.status == 401 || error.response.status == 403)) {
        localStorage.clear()
        window.location.reload()

       
        return Promise.reject(error)
      } else {
        return Promise.reject(error)
      }
    },
  )
}

export default initialiseInterceptor
