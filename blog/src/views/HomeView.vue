<template>
  <div class="home">
    <!--大图组件-->
    <ImageBgComponent>
      <lay-avatar style="width: 100px;height: 100px;" :src="avatarImg" radius></lay-avatar>
      <h1 class="f24 color-white mt15">小雪花呀</h1>
    </ImageBgComponent>
    <div class="block-content">
      <TitleBlock>
        <span>版块</span>
      </TitleBlock>
      <div class="block-list mt20">
        <div class="block-item"
             v-for="item of blockList"
             :key="item.id"
        >
          <div class="stair flex flex-md">
            <NImage
                :preview-disabled="true"
                lazy
                :width="40"
                :src="item.icon"
            />
            <span class="f16 ml5">{{item.name}}</span>
          </div>
          <div class="secondLevel mt10">
            <lay-row space="10">
              <lay-col
                :md="6"
                :sm="8"
                :xs="12"
                v-for="(item2, index2) of item.children as Array<GetThreeClassifyListResItem>"
                :key="item2.id"
              >
                  <!--<lay-card>-->
                    <div class="secondLevel-item">
                      <NImage
                          :preview-disabled="true"
                          lazy
                          :width="50"
                          :src="item2.icon"
                      />
                      <span>{{item2.name}}</span>
                    </div>
                  <!--</lay-card>-->
              </lay-col>
            </lay-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ImageBgComponent from "@/components/ImageBgComponent.vue";
import {ref} from "vue";
import { NImage } from 'naive-ui'
import {getThreeClassifyList} from "@/api/classify";
import type { GetThreeClassifyListResItem } from '@/api/classify'
import TitleBlock from "@/components/TitleBlock.vue";
import avatarImg from "@/assets/images/97370135.jpg";
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
  //height: 2000vh;
  .block-content {
    max-width: 1366px;
    //min-width: 768px;
    padding: 20px;
    margin: auto;
    .block-list {
      display: flex;
      flex-direction: column;
      >.block-item {
        display: flex;
        justify-content: center;
        flex-direction: column;
        >.stair {
          width: 100%;
          padding: 8px;
          background-color: var(--block-glock-bg-color);
          border-radius: 12px;
          height: 60px;
        }
        .secondLevel-item {
          display: flex;
          align-items: center;
          border-radius: 12px;
          padding-left: 12px;
          height: 80px;
          cursor: pointer;
          transition-duration: 200ms;
          border: 1px solid #e5e5e5;
          &:active {
            background-color: var(--block-glock-bg-color);
          }
          &:hover {
            transform: scale(1.05);
            box-shadow: #9a9999 5px 5px 10px;
          }
          >span {
            margin-left: 15px;
          }
        }
      }
    }
  }
}
</style>
