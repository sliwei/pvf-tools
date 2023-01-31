import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import axios from 'axios'
import qs from 'qs'
import history from '@/router/history'
import toast from 'react-hot-toast'
// import { ElMessage } from 'element-plus'

// create an axios instance
const service: AxiosInstance = axios.create({
  baseURL: '',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 12000, // request timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// request interceptor
service.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    const { headers } = config
    if (config) {
      if (headers['Content-Type'].includes('application/json')) {
        return config
      }
      typeof config.data !== 'string' && config.data && !config.data.payload
      config.data = qs.stringify(config.data)
    }
    return config
  },
  (error: any) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (res: { headers: { [x: string]: string }; data: any }): any => {
    if (res.data.status === 403) {
      toast.error('登录超时，请重新登录！')
      // localStorage.clear()
      // history.replace('/login')
    }
    if (res.headers['content-type'] === 'application/octet-stream') {
      return Promise.resolve(res)
    }
    return Promise.resolve(res.data)
  },
  (error: { response: { status: number }; message: any }) => {
    console.log(error)
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      toast.error('登录超时，请重新登录！')
      // store.commit('deviceInfo/deviceDialogShow', false, { root: true })
      localStorage.clear()
      history.replace('/login')
      return Promise.reject(error.message)
    }
    console.error(error.message)
    if (error.message === 'Network Error') {
      toast.error('网络异常，请检查您的网络')
      // ElMessage({
      //   customClass: 'message-tip-box',
      //   iconClass: 'error-icon',
      //   message: '网络异常，请检查您的网络',
      //   duration: 2000
      // })
      return Promise.reject('')
    }
    return Promise.reject(error.message)
  }
)

export default service
