<template>
  <div class="article-list">
    文章列表页
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import type {RouteType} from '@/@types/RouteType'
import { reactive, ref } from 'vue'
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
const loadArticles = () => {
}
</script>
<style lang="scss" scoped>
</style>
