<template>
  <div class="bg-view">
    <div class="view"></div>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
@media (max-width: 767px) {
  /* 在屏幕宽度小于等于767px时应用的样式 */
  /* 可以在这里写入需要应用的样式规则 */
  .bg-view {
    //width: 100vw;
    height: 30vh;
    background-image: url('../assets/103357150_p0.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    .view {
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1;
    }
  }
}
@media (min-width: 768px) {
  /* 在屏幕宽度小于等于767px时应用的样式 */
  /* 可以在这里写入需要应用的样式规则 */
  .bg-view {
    //width: 100vw;
    height: 100vh;
    background-image: url('../assets/103357150_p0.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    .view {
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1;
      //width: 100%;
    }
  }
}
</style>
