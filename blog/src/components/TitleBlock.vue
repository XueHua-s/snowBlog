<template>
  <div class="title-block">
    <div :style="{
      backgroundColor: props.lineColor
    }" class="line"></div>
    <div class="text">
      <slot name="default"/>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  lineColor: {
    default: '#333'
  }
})
</script>
<style lang="scss" scoped>
.title-block {
  display: flex;
  align-items: center;
  >.line {
    width: 80px;
    height: 1px;
    background-color: #333333;
  }
  >.text {
    //font-size: 24px;
    font-weight: 900;
    //color: #333;
    margin-left: 12px;
  }
}
</style>
