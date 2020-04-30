import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import {getToken, setToken} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.MIX_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 180000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.headers.authorization){
        setToken(response.headers.authorization)
        response.data.token = response.headers.authorization
    }
    return response.data;
  },
  error => {
      let message = error.message;
      if (error.response.data && error.response.data.errors) {
          message = error.response.data.errors;
      } else if (error.response.data && error.response.data.error) {
          message = error.response.data.error;
      }

      Message({
          message: message,
          type: 'error',
          duration: 5 * 1000,
      });
      return Promise.reject(error);
  }
)

export default service
