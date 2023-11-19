import axios, {AxiosResponse} from 'axios';
import { AxiosRequestConfig, AxiosError } from 'axios'
const request = axios.create({
  timeout: 180000
})
// 请求拦截
request.interceptors.request((config: AxiosRequestConfig) => {
  return config
}, (err: AxiosError) => {
  return err
})
// 响应拦截
request.interceptors.response((res: AxiosResponse) => {
  return res
}, (err: AxiosError) => {
  return err
})
