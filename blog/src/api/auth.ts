import request from "@/request/index";
import type {ResponseOver} from "@/@types/ResponseOver";

interface UserInfo {
  username: string,
  password: string
}
export interface LoginRes extends UserInfo {
  id: number,
  createdTime: Date,
  token: string
}
type LoginResData = ResponseOver<LoginRes>
export const authLogin = (data: UserInfo): Promise<LoginResData> => request({
  url: '/auth/login',
  method: 'POST',
  data
})
