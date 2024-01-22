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
      <!--{{article}}-->
      <div class="rich-text" v-html="article?.content">
      </div>
    </div>
    <div class="write-review mt20 mb20 p15">
      <div>
        <p class="f16 mb10">评论内容</p>
        <NInput type="textarea" placeholder="请输入你想到的一些点子" />
        <div style="text-align: right;" class="mt15">
          <NButton>
            <template #icon>
              <n-icon>
                <svg t="1705932795067" class="icon wp20 hp20" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5999" width="200" height="200"><path d="M1023.611673 83.255119c-2.930981 94.469386-23.446848 185.284795-57.713625 273.291222-41.011733 105.269315-100.974343 197.931713-185.064796 274.475215-6.825956 6.22296-8.953942 12.867916-8.049948 21.619859 2.889981 28.304816 5.219966 56.709631 8.169947 85.015447 6.824956 66.04357-16.439893 120.084219-70.039545 158.44597-57.472626 41.151732-117.273237 79.112485-176.612851 117.635235-37.378757 24.289842-83.329458 2.267985-87.504431-41.794728-4.776969-50.587671-8.530945-101.294341-12.084921-151.982012-1.765989-25.373835-1.083993-25.594834-25.794833-28.826812-65.642573-8.631944-117.033239-39.546743-152.324009-95.754378-18.146882-28.906812-27.139823-60.905604-30.311803-94.489385-0.943994-10.077934-5.018967-12.646918-14.593905-13.189914-53.096655-2.909981-106.213309-6.021961-159.268964-10.016935-44.103713-3.311978-66.466568-49.522678-42.839721-88.125427 16.621892-27.099824 34.307777-53.578652 51.450665-80.357477 18.46888-28.846812 36.83676-57.773624 55.34464-86.580437 33.905779-52.735657 82.766462-81.220472 145.319055-81.722469 35.811767-0.280998 71.704534 5.981961 107.497301 9.835936 6.784956 0.702995 11.582925-0.199999 16.259894-5.419964 83.107459-92.2814 185.96879-154.571995 302.419033-196.245724a861.267398 861.267398 0 0 1 203.05168-46.069701c35.029772-3.593977 70.299543-4.899968 105.309315 1.54499 19.069876 3.512977 20.03387 4.275972 22.96485 22.783852 2.930981 18.48888 5.279966 37.077759 4.416972 55.927637zM857.656752 316.297603c1.003993-80.699475-66.284569-150.136024-146.241049-151.441015-83.08746-1.364991-154.992992 58.616619-156.980979 152.304009-1.645989 78.149492 69.597547 148.911031 149.09203 149.473028 84.673449 0.601996 153.087004-66.12457 154.129998-150.357022zM148.232366 657.399384c15.718898 0.219999 24.430841 7.105954 30.071804 23.08585 22.081856 62.510593 62.289595 109.966285 120.586216 142.125076 12.867916 7.086954 26.417828 12.847916 40.429737 17.585885 25.192836 8.530945 30.934799 32.901786 12.24492 51.650665-27.66182 27.762819-55.625638 55.204641-83.308458 82.96746-9.132941 9.17394-19.189875 13.509912-32.077791 8.751943-13.048915-4.817969-19.371874-14.452906-20.03487-27.902819-0.400997-8.511945-0.199999-17.063889-0.400997-25.594833-0.361998-15.697898-0.521997-15.838897-15.055902-11.040928-31.094798 10.237933-62.129596 20.555866-93.225394 30.793799-9.15394 3.01098-18.347881 4.255972-27.319822-0.782994-13.149914-7.386952-18.107882-20.615866-12.807917-36.876761 10.317933-31.716794 21.157862-63.293588 31.716794-94.951382 4.57697-13.729911 4.295972-14.031909-10.639931-14.251907-9.012941-0.139999-18.025883 0-27.019824-0.421998-13.087915-0.621996-22.422854-6.925955-27.279823-19.250874-4.737969-12.004922-1.706989-22.463854 7.145954-31.315797 28.866812-28.846812 57.853624-57.573626 86.841435-86.319438 5.780962-5.721963 12.626918-8.953942 20.133869-8.229947z" p-id="6000" fill="#36ad6a"></path></svg>
              </n-icon>
            </template>
            <span style="color: #1AAD19">发射</span>
          </NButton>
        </div>
      </div>
    </div>
    <div class="reviews">
      <TitleBlock class="mb20">文章评论</TitleBlock>
      <div v-for="review of reviewList" :key="review.id" class="review">
        <div class="left">
          <NAvatar :size="60" :src="review.user.profile.avatar" />
        </div>
        <div class="right">
          <p class="nick-name">
            {{review.user.profile.nickName}}
          </p>
          <span>{{dayjs(review.createdTime).format('YYYY-MM-DD HH:mm')}}</span>
          <div class="text mt10">
            {{review.commentContent}}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>
import ImageBgComponent from "@/components/ImageBgComponent.vue";
import {useRoute} from "vue-router";
import {getDetail} from "@/api/article";
import { NAvatar, NInput, NButton } from 'naive-ui'
import { ref, shallowReactive } from 'vue'
import TitleBlock from "@/components/TitleBlock.vue";
import dayjs from "dayjs";
import { getReviews } from '@/api/review'
import lodash from 'lodash'
const route = useRoute()
const article = ref(null)
const reviewPageConfig = shallowReactive({
  current: 1,
  size: 10,
  total: 9999
})
const reviewList = ref([])
const loadReviewList = async () => {
  const submitPageQuery = lodash.cloneDeep(reviewPageConfig)
  delete submitPageQuery.total
  const data = await getReviews({
    ...submitPageQuery,
    articleId: Number(route.query.id)
  })
  console.log(data)
  if (data.code === 1) {
    reviewList.value = data.data.records
    reviewPageConfig.total = data.data.total
  }
  // console.log(data, 'pinglun')
}
const getArticleDetail = async () => {
  const data = await getDetail(route.query.id)
  if (data.code === 1) {
    article.value = data.data
  }
}
getArticleDetail()
loadReviewList()
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
.reviews {
  display: flex;
  max-width: 1366px;
  margin: auto;
  padding: 20px;
  align-items: start;
  flex-direction: column;
  >.review {
    display: flex;
    margin-top: 8px;
    align-items: center;
    font-size: 16px;
    >.left {
      margin-right: 8px;
    }
    >.right {
      >p {
        color: #2e2d3c;
      }
      >span {
        color: #ccc;
      }
      >div.text {
        font-size: 12px;
      }
    }
  }
}
</style>
