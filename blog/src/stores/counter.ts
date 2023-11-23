import {ref, computed, readonly} from 'vue'
import { defineStore } from 'pinia'
import type {LoginRes} from "@/api/auth";
import {decryptData, encryptData} from "@/untils/AE4";
import {LocalStrongKey} from "@/@enums/LocalStrongKey";
export interface localUserInfo extends LoginRes {
  // 记住账号
  read: boolean,
  [key: string]: any,
}
export const useStore = defineStore('store', () => {
  // 用户信息相关
  const userInfo = ref<localUserInfo | null>(null)
  const localUserInfo = localStorage.getItem(LocalStrongKey.userInfo)
  if (localUserInfo) {
    userInfo.value = JSON.parse(encryptData(localUserInfo, import.meta.env.VITE_AE4_SELECRT_KEY))
  }
  const setUserInfo = (data: localUserInfo) => {
    userInfo.value = data
    localStorage.setItem(LocalStrongKey.userInfo, decryptData(JSON.stringify(data), import.meta.env.VITE_AE4_SELECRT_KEY))
  }
  return {
    userInfo: readonly(userInfo),
    setUserInfo
  }
})
