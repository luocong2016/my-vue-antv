import axios from 'axios'

import emitter from './event-emitter'

const request = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'lutz' },
})

request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          emitter.emit('API:UN_AUTH')
          break
        case 400:
          emitter.emit('API:INVALID')
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)

export default request
