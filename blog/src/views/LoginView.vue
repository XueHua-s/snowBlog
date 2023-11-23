<template>
  <div class="login-view">
    <main>
      <div class="left">
        <TitleBlock line-color="#fff">
          <h2 calss="f20 color-white">欢迎回来</h2>
        </TitleBlock>
        <p class="f14 color-gray mt15">请输入您的电子邮件或用户名和密码登录</p>
        <div class="submit-form mt50">
          <lay-form :model="submitForm" ref="submitRef">
            <lay-form-item required :rules="{
              type: 'string',
              min: 6,
              max: 20
            }" label="账户" prop="username">
              <lay-input v-model="submitForm.username"></lay-input>
            </lay-form-item>
            <lay-form-item required :rules="{
              type: 'string',
              min: 6,
              max: 20
            }" label="密码" prop="password">
              <lay-input v-model="submitForm.password" type="password"></lay-input>
            </lay-form-item>
            <lay-form-item label="记住账号" prop="password">
              <lay-switch v-model="isRead" />
            </lay-form-item>
          </lay-form>
          <div class="flex-ct">
            <lay-button  type="primary" @click="loginUser">登录</lay-button>
          </div>
        </div>
      </div>
      <div class="right">
        <div :style="`background-image: url(${rightImg});`" class="img"></div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import rightImg from '@/assets/images/1.jpg'
import TitleBlock from "@/components/TitleBlock.vue";
import { reactive, ref } from 'vue'
import { layer } from '@layui/layui-vue'
import {authLogin} from "@/api/auth";
import {localUserInfo, useStore} from "@/stores/counter";
import router from "@/router";
import {some} from "lodash";
const submitRef: any = ref(null)
const isRead = ref(false)
const submitForm: {
  [key: string]: string;
} = reactive({
  username: '',
  password: ''
})
const store = useStore()
const initializeAccount = () => {
  if (store.userInfo && store.userInfo.read) {
    for (const key in submitForm) {
      submitForm[key] = store.userInfo[key]
    }
  }
}
initializeAccount()
const loginUser = () => {
  submitRef?.value?.validate(async (isValidate: boolean) => {
    if (isValidate) {
      const data = await authLogin(submitForm)
      if (data.code === 1) {
        layer.msg("登录成功", { time: 1000, icon: 1 })
        store.setUserInfo({
          ...submitForm,
          read: isRead.value
        } as localUserInfo)
        router.go(-1)
      }
      console.log(data)
    }
  });
}
</script>
<style lang="scss" scoped>
.login-view {
  background-color: #333333;
  padding: 0px;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  width: 100vw;
  >main {
    max-width: 1366px;
    padding: 0 0px;
    width: 100%;
    color: #fff;
    display: flex;
    >.left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    >.right {
      flex: 1;
      overflow: hidden;
      transform: skewX(-10deg);
      margin-right: -100px;
      >.img {
        height: 600px;
        width: 100%;
        transform: skewX(10deg);
        background-size: cover;
        margin-left: -100px;
        background-position: center;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .login-view {
    >main {
      margin-top: 80px;
      padding-bottom: 80px;
      >.right {
        display: none;
      }
    }
  }
}
</style>
