<template>
  <div class="article-view">
    <!--大图组件-->
    <ImageBgComponent>
      <h1 class="f24 color-white mt15">文章列表</h1>
    </ImageBgComponent>
    <div class="article-list">
      <title-block class="mb20">做一个大家都满意的博客</title-block>
      <div class="search-query p10 flex">
        <div class="flex-mc">
          <span class="wp100">关键词:</span>
          <lay-input v-model="queryConfig.keyword" type="text"></lay-input>
        </div>
        <div class="flex-mc ml15">
          <lay-button @click="pageConfig.current = 1;loadArticles()" type="primary" class="mr5">搜索</lay-button>
          <lay-button @click="resetSearch">重置</lay-button>
        </div>
      </div>
      <div class="article-item"
      v-for="item of articleRecords"
      :key="item.id"
      >
        <div class="left">
          <NImage object-fit="cover" preview-disabled width="100%" lazy :src="item?.cover" />
        </div>
        <div class="right">
          <div class="top">
            <span class="f14">
              <img class="wp30" :src="item?.classify?.icon" alt="">
              {{item?.classify?.name}}
            </span>
            <h3 class="font18">
              {{item.title}}
            </h3>
            <p>
              {{item.description}}
            </p>
          </div>
          <div class="bottom">
            <div class="author">
              <NAvatar :src="item?.user?.profile?.avatar" size="large" />
              <p>
                {{item?.user?.profile?.nickName}}
              </p>
            </div>
            <span>
              {{dayjs(item?.createdTime).format('YYYY-MM-DD')}}
            </span>
          </div>
        </div>
      </div>
      <div class="page flex-ct">
        <lay-page
          @change="({ limit }) => {
            if (limit !== pageConfig.size) {
              pageConfig.current = 1
            }
            pageConfig.size = limit
            loadArticles()
          }"
          v-model="pageConfig.current"
          :limit="pageConfig.size" :total="pageConfig.total" />
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
import dayjs from "dayjs";
interface routeQueryType {
  classifyId: string
}
const queryConfig = reactive({
  keyword: ''
})
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
      ...pageConfig,
      classifyId: route.query?.classifyId,
      ...queryConfig,
      total: undefined
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
const resetSearch = () => {
  queryConfig.keyword = ''
  pageConfig.current = 1
  loadArticles()
}
</script>
<style lang="scss" scoped>
.article-list {
  margin: auto;
  padding: 40px;
  max-width: 1366px;
  >.article-item {
    display: flex;
    margin-bottom: 20px;
    //cursor: pointer;
    box-shadow: 1px 4px 15px rgb(125 147 178 / 32%);
    border-radius: 12px;
    padding: 12px;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      .left :deep(img) {
        transform: scale(1.2);
      }
    }
    >.left {
      width: 380px;
      height: 220px;
      overflow: hidden;
      border-radius: 12px;
      :deep(img) {
        width: 100%;
        height: auto;
        transition-duration: 400ms;
      }
    }
    >.right {
      flex: 1;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      >.top {
        span {
          display: flex;
          align-items: center;
          >img {
            margin-right: 5px;
          }
          margin-bottom: 10px;
        }
        h3 {
          transition-duration: 500ms;
          cursor: pointer;
          &:hover {
            color: #e77474;
          }
        }
        p {
          color: #c0c0c0;
          margin-top: 5px;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      >.bottom {
        display: flex;
        align-items: center;
        width: 100%;
        margin-top: 20px;
        justify-content: space-between;
        >.author {
          display: flex;
          align-items: center;
          cursor: pointer;
          &:hover {
            >p {
              color: #e77474;
            }
          }
          >p {
            margin-left: 5px;
            color: #333;
            transition-duration: 400ms;
          }
        }
        >span {
          color: #c0c0c0;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .article-item {
    flex-direction: column;
    >.left {
      margin-bottom: 20px;
      width: 100% !important;
    }
  }
}
</style>
