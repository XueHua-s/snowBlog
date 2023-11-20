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
        :key="item.routeName"
        :class="{
          alive: route.name === item.routeName
        }"
        >
          <lay-icon :type="item.icon"></lay-icon>
          {{item.label}}
        </li>
      </ul>
      <!--  移动菜单-->
      <div
      @click="mobileShowMenu = !mobileShowMenu"
      class="mobile-menu">
        <lay-icon
        :type="mobileShowMenu ? 'layui-icon-spread-left' : 'layui-icon-shrink-right'"></lay-icon>
      </div>
    </aside>
  </header>
  <main>
    <!--返回顶部-->
    <lay-backtop></lay-backtop>
    <router-view />
  </main>
  <footer>
    尾部
  </footer>
</template>
<script setup lang="ts">
import usePageSliderY from '@/@use/usePageSliderY';
import type {Ref} from "vue";
import {useRoute} from "vue-router";
import {ref} from "vue";
const scrollTopY: Ref<Number> = usePageSliderY()
const route = useRoute()
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
  width: 100%;
  //width: 100vw;
  position: absolute;
  &.fixed {
    position: fixed;
    border-bottom: 1px solid #e5e5e5;
    >aside {
      background-color: rgb(255, 255, 255, 0.8);
      li {
        color: #333;
      }
    }
  }
  >aside {
    display: flex;
    align-items: center;
    width: 100%;
    transition-duration: 600ms;
    justify-content: center;
    background-color: rgb(255, 255, 255, 0.0);
    >.mobile-menu {
      display: none;
    }
    >ul {
      width:960px;
      display: flex;
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
    }
  }
}
// 移动端菜单样式
@media screen and (max-width: 768px){
  header {
    z-index: 2;
    >aside {
      padding: 18px;
      >ul {
        display: flex;
        position: absolute;
        flex-direction: column;
        top: 0;
        left: 200%;
        transform: translateX(-50%);
        background-color: #fff;
        margin: 20px;
        width: 60%;
        border-radius: 12px;
        transition-duration: 700ms;
        &.show {
          left: 50%;
        }
        >li {
          color: #000;
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
