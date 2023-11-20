<template>
  <div class="home">
    <!--大图组件-->
    <ImageBgComponent />
    <div class="block-list">
      <div class="block-item"
      v-for="item of blockList"
       :key="item.id"
      >
        <i>{{item.icon}}</i>
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ImageBgComponent from "@/components/ImageBgComponent.vue";
import {ref} from "vue";
import {getThreeClassifyList} from "@/api/classify";
import type { GetThreeClassifyListResItem } from '@/api/classify'
// 分类列表
const blockList = ref<Array<GetThreeClassifyListResItem>>([])
const getBlockList = async () => {
  try {
    const data = await getThreeClassifyList({
      current: 1,
      size: 9999
    })
    if (data.code === 1) {
      blockList.value = data.data.records
    }
  } catch (err) {
    console.log(err)
    throw new Error('获取分类错误')
  }
}
getBlockList()
</script>
<style lang="scss" scoped>
.home {
  height: 200vh;
}
</style>
