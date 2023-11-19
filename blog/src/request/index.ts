import axios, {AxiosResponse, InternalAxiosRequestConfig, AxiosError} from 'axios';
const request = axios.create({
  timeout: 180000
})
// 请求拦截
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config
}, (err: AxiosError) => {
  return err
})
// 响应拦截
request.interceptors.response.use((res: AxiosResponse) => {
  return res
}, (err: AxiosError) => {
  return err
})
