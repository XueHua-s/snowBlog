<template>
  <header class="flex flex-mc"
  :class="{
    fixed: scrollTopY as number >= 120
  }"
  >
    <aside
    >
      <div class="logo">
        <h2 class="f20 color-white wp200 ml20">雪花的博客</h2>
      </div>
      <!--菜单-->
      <ul
      :class="{
        show: mobileShowMenu
      }"
      >
        <li v-for="item of topMenus"
        @click="router.push({
          name: item.routeName
        })"
        :key="item.routeName"
        :class="{
          alive: route.name === item.routeName
        }"
        >
          <lay-icon :type="item.icon"></lay-icon>
          {{item.label}}
        </li>
        <!--  登录按钮-->
        <div v-if="(route.name !== 'login' && route.name !== 'register') && !store.userInfo?.token" class="login-view">
          <div @click="router.push({
          name: 'login'
        })" class="login-btn">
            <p>
              登录
            </p>
          </div>
          <div class="register-btn">
            <p>
              注册
            </p>
          </div>
          <img src="../assets/images/up-new-iocn.png" alt="">
        </div>
      </ul>
      <!--  移动菜单-->
      <div
      @click="mobileShowMenu = !mobileShowMenu"
      class="mobile-menu"
      :style="{
        marginLeft: (route.name !== 'login' && route.name !== 'register' && !store.userInfo?.token) ? '0px' : 'auto' as string
      }"
      >
        <lay-icon
        :type="mobileShowMenu ? 'layui-icon-spread-left' : 'layui-icon-shrink-right'"></lay-icon>
      </div>
    </aside>
  </header>
  <main>
    <!--返回顶部-->
    <lay-backtop right="50" bottom="50" showHeight="120">
      <img class="wp100" src="../assets/images/lolisister2.gif" />
    </lay-backtop>
    <lay-transition type="fade">
      <router-view />
    </lay-transition>
  </main>
  <footer>
    <div class="icp">
      <a href="" target="_blank">萌ICP备20230462号</a >
    </div>
  </footer>
</template>
<script setup lang="ts">
import usePageSliderY from '@/@use/usePageSliderY';
import type {Ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {useStore} from "@/stores/counter";
const scrollTopY: Ref<Number> = usePageSliderY()
const route = useRoute()
const router = useRouter()
const store = useStore()
// 移动端是否显示菜单
const mobileShowMenu = ref(false)
const topMenus = [
  {
    label: '首页',
    routeName: 'home',
    icon: 'layui-icon-home'
  },
  {
    label: '公告',
    routeName: 'announcement',
    icon: 'layui-icon-tips-fill'
  },
  {
    label: '文章列表',
    routeName: 'articleList',
    icon: 'layui-icon-edit'
  },
  {
    label: '友情链接',
    routeName: 'blogroll',
    icon: 'layui-icon-link'
  }
]
</script>
<style lang="scss" scoped>
header {
  //width: 100%;
  width: 100vw;
  position: absolute;
  transition-duration: 500ms;
  padding: 4px 0;
  &.fixed {
    position: fixed;
    z-index: 9000;
    background-color: rgb(255, 255, 255, 0.9);
    //border-bottom: 1px solid #e5e5e5;
    box-shadow: #333333 0px 0px 4px;
    >aside {
      li {
        color: #333;
      }
    }
  }
  >aside {
    display: flex;
    align-items: center;
    min-width: 80vw;
    transition-duration: 600ms;
    justify-content: flex-start;
    background-color: rgb(255, 255, 255, 0.0);
    position: relative;
    >.mobile-menu {
      display: none;
    }
    >ul {
      //width: 760px;
      //position: relative;
      display: flex;
      padding-right: 180px;
      >li {
        padding: 16px 12px;
        transition-duration: 400ms;
        cursor: pointer;
        color: #fff;
        margin: 0 4px;
        border-radius: 4px;
        &:hover {
          background-color: var(--menu-alive-bg-color);
        }
        &.alive {
          background-color: var(--menu-alive-bg-color);
        }
      }
      >.login-view {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
        background-color: #facef4;
        border-radius: 4px;
        color: #333333;
        width: 150px;
        justify-content: center;
        height: 40px;
        display: flex;
        align-items: center;
        //margin-right: 20px;
        //margin-left: auto;
        >.login-btn {
          margin-right: 20px;
          position: relative;
          cursor: pointer;
          transition-duration: 400ms;
          &:hover {
            color: #1f8dd2;
          }
          &::before {
            content: '';
            position: absolute;
            height: 100%;
            top: 0;
            right: -10px;
            background-color: #ffffff;
            width: 1px;
          }
        }
        >.register-btn {
          cursor: pointer;
          transition-duration: 400ms;
          &:hover {
            color: #1f8dd2;
          }
        }
      }
    }
  }
}
footer {
  background-color: #fff;
  padding: 20px;
  >.icp {
    text-align: center;
  }
}
// 移动端菜单样式
@media screen and (max-width: 768px){
  header {
    z-index: 2;
    :has(&.fixed) {
      .mobile-menu {
        //margin-left: auto;
        color: #333;
        display: block;
        cursor: pointer;
        //margin-right: 20px;
      }
    }
    >aside {
      padding: 18px;
      min-width: auto;
      width: 100%;
      justify-content: space-between;
      >ul {
        display: flex;
        position: absolute;
        flex-direction: column;
        padding-right: 0;
        top: 0;
        left: 200%;
        transform: translateX(-50%);
        background-color: #fff;
        margin: 20px;
        width: 0;
        opacity: 0;
        border-radius: 12px;
        z-index: 9000;
        transition-duration: 700ms;
        &:has(.login-view) {
          padding-bottom: 80px;
        }
        &.show {
          left: 50%;
          width: 60%;
          opacity: 1;
        }
        >li {
          color: #000;
        }
        >.login-view {
          bottom: 0;
          left: 12px;
          top: auto;
          right: auto;
        }
      }
      >.mobile-menu {
        margin-left: auto;
        color: #fff;
        display: block;
        cursor: pointer;
        //margin-right: 20px;
      }
    }
  }
}
</style>
