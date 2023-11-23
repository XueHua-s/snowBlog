import axios from 'axios';
import {AxiosError, Axios} from 'axios'
const request: Axios = axios.create({
  timeout: 180000
})
// 请求拦截
request.interceptors.request.use((config) => {
  config.baseURL = import.meta.env.VITE_APP_REQUEST_BASE
  return config
}, (err: AxiosError) => {
  return err
})
// 响应拦截
request.interceptors.response.use((res) => {
  // console.log(res)
  if (res.status >= 200 && res.status <= 290) {
    // 请求成功
    return res.data
  }
  return res
}, (err: AxiosError) => {
  return err
})
export default request
