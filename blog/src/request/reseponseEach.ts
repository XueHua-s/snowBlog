import {LoadingCount} from "@/request/LoadingCount";
import type {AxiosError, AxiosResponse} from "axios";
const loadingCount = new LoadingCount()
export const responseEach = (res: AxiosResponse) => {
  loadingCount.decreaseCount()
  // console.log(res)
  if (res.status >= 200 && res.status <= 290) {
    // 请求成功
    return res.data
  }
  return res
}
  export const responseEachErr = (err: AxiosError) => {
    loadingCount.decreaseCount()
    return err
  }
