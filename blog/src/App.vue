<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {ref} from "vue";
import {eventBus} from "@/untils/eventBus";
const loadingVal = ref(false)
const setLoadingStatus = (status: unknown): void => {
  if (typeof status === 'boolean') {
    loadingVal.value = status
  }
}
eventBus.on('setLoadingStatus', setLoadingStatus)
</script>
<template>
  <!--全局加载-->
  <lay-loading :loading="loadingVal">
    <div id="loadingcontent">
      <RouterView />
    </div>
  </lay-loading>
</template>

<style scoped>
#loadingcontent {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
