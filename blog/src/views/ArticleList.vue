<template>
  <div class="article-view">
    <!--大图组件-->
    <ImageBgComponent>
      <h1 class="f24 color-white mt15">文章列表</h1>
    </ImageBgComponent>
    <div class="article-list">
      <title-block>做一个大家都满意的博客</title-block>
      <div class="article-item"
      v-for="item of articleRecords"
      :key="item.id"
      >
        <div class="left">
          <NImage width="100%" lazy :src="item?.cover" />
        </div>
        <div class="right">
          <div class="top">
            <span class="f14">{{item?.classify?.name}}</span>
            <h3 class="font18">{{item.title}}</h3>
            <p>
              {{item.description}}
            </p>
          </div>
          <div class="bottom">
            <NAvatar :src="item?.user?.profile?.avatar" size="large" />
            <p>
              {{item?.user?.profile?.nickName}}
            </p>
            <span>
              {{item?.createdTime}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import type {RouteType} from '@/@types/RouteType'
import { reactive, ref } from 'vue'
import { NAvatar, NImage } from 'naive-ui'
import {getArticles} from "@/api/article";
import avatarImg from "@/assets/images/97370135.jpg";
import ImageBgComponent from "@/components/ImageBgComponent.vue";
import TitleBlock from "@/components/TitleBlock.vue";
interface routeQueryType {
  classifyId: string
}
const route: RouteType<routeQueryType> = useRoute()
const pageConfig = reactive({
  current: 1,
  size: 10,
  total: 9999
})
const articleRecords = ref([])
const loadArticles = async () => {
  try {
    const data = await getArticles({
      ...pageConfig
    })
    if (data.code === 1) {
      articleRecords.value = data.data.records
      pageConfig.total = data.data.total
    }
  } catch (err) {
    console.log(err)
    throw new Error('获取文章列表错误')
  }
}
loadArticles()
</script>
<style lang="scss" scoped>
.article-list {
  margin: auto;
  padding: 40px;
  width: 1366px;
}
</style>
