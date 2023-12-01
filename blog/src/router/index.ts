import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 博客页layout
    {
      path: '/',
      name: 'layout',
      redirect: 'home',
      component: () => import('@/layout/DefaultLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: '/login',
          name: 'login',
          meta: {
            title: '登录'
          },
          component: () => import('@/views/LoginView.vue')
        },
        {
          path: '/articleList',
          name: 'articleList',
          meta: {
            title: '文章列表'
          },
          component: () => import('@/views/ArticleList.vue')
        }
      ]
    }
  ]
})

export default router
