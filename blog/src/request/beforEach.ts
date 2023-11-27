import type {AxiosError, AxiosRequestConfig} from "axios";
import {LoadingCount} from "@/request/LoadingCount";
const loadingCount = new LoadingCount()
export const beforEach = (config: AxiosRequestConfig) => {
  config.baseURL = import.meta.env.VITE_APP_REQUEST_BASE
  loadingCount.addCount()
  return config
}
export const beforEachErr = (err: AxiosError) => {
  loadingCount.decreaseCount()
  return err
}
