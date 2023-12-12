<template>
  <div class="article-detail">
    <ImageBgComponent>
    </ImageBgComponent>
    <div class="content">
      <TitleBlock>文章详情</TitleBlock>
      <div class="classify flex flex-md">
        <img class="wp30" :src="article?.classify?.icon" alt="">
        <p class="ml5">{{article?.classify?.name}}</p>
      </div>
      <div class="article-title">
        <h2>{{article?.title}}</h2>
      </div>
      <div class="author flex flex-md">
        <div class="author-info flex-md mr10">
          <img class="wp50 hp50" :src="article?.user?.profile?.avatar" />
          <span class="ml10">{{article?.user.profile.nickName}}</span>
        </div>
        <div class="created">
          发布于
          {{dayjs(article?.createdTime).format('YYYY-MM-DD HH:mm:ss')}}
        </div>
      </div>
      <div class="rich-text" v-html="article.content">
      </div>
    </div>
  </div>
</template>
<script setup>
import ImageBgComponent from "@/components/ImageBgComponent.vue";
import {useRoute} from "vue-router";
import {getDetail} from "@/api/article";

import {ref} from "vue";
import TitleBlock from "@/components/TitleBlock.vue";
import dayjs from "dayjs";
const route = useRoute()
const article = ref(null)
const getArticleDetail = async () => {
  const data = await getDetail(route.query.id)
  if (data.code === 1) {
    article.value = data.data
  }
}
getArticleDetail()
</script>
<style lang="scss" scoped>
.content {
  max-width: 1366px;
  margin: auto;
  padding: 15px;
  >.classify {
    color: #26cda4;
    background-color: #f6f6f6;
    display: inline-flex;
    padding: 4px;
    border-radius: 4px;
    margin-top: 18px;
    cursor: pointer;
  }
  >.article-title {
    >h2 {
      font-size: 19px;
      color: #333333;
      text-align: center;
      //border-bottom: 1px solid #ccc;
      padding-bottom: 18px;
      position: relative;
      &::after {
        content: '';
        width: 100%;
        height: 2px;
        background: linear-gradient(270deg, #fff 0%, #e1e1e1 50%, #fff 100%);
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
  >.author {
    margin-top: 10px;
    img {
      border-radius: 50%;
    }
    >.author-info {
      cursor: pointer;
      transition-duration: 400ms;
      &:hover {
        color: #e77474;
        >img {
          transform: rotate(360deg);
        }
      }
      >img {
        transition-duration: 800ms;
      }
    }
  }
  >.rich-text {
    margin-top: 20px;
  }
}
</style>
