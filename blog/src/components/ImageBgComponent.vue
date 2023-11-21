<template>
  <div class="bg-view">
    <div class="view">
      <slot name="default" />
    </div>
  </div>
</template>
<script setup lang="ts">
import avatarImg from '@/assets/images/97370135.jpg'
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
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1;
      :deep(.layui-avatar) {
        width: max-content;
        transition-duration: 500ms;
        //z-index: 0;
        &:hover {
          transform: rotate(365deg);
        }
      }
      &:hover {
        :deep(.layui-avatar) {
          transform: rotate(365deg);
        }
      }
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
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1;
      :deep(.layui-avatar) {
        width: max-content;
        //z-index: 0;
        transition-duration: 500ms;
        &:hover {
          transform: rotate(365deg);
        }
      }
      //width: 100%;
    }
  }
}
</style>
