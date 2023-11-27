import axios from 'axios';
import {AxiosError, Axios} from 'axios'
import {beforEach, beforEachErr} from '@/request/beforEach.ts'
import {responseEach, responseEachErr} from "@/request/reseponseEach";
const request: Axios = axios.create({
  timeout: 180000
})
// 请求拦截
request.interceptors.request.use(beforEach, beforEachErr)
// 响应拦截
request.interceptors.response.use(responseEach, responseEachErr)
export default request
