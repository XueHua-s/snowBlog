// 获取页面滚动距离的方法
import {onMounted, ref} from "vue";
import debounce from 'lodash';
export default () => {
  const pageScroll = ref(0)
  let scrollDom: HTMLElement | null = null
  // 防抖
  const updateScroll = debounce.debounce(() => {
    pageScroll.value = scrollDom?.scrollTop || scrollDom?.scrollTop as number;
  }, 200)
  onMounted(() => {
    scrollDom = document.getElementById('loadingcontent')
    scrollDom?.addEventListener('scroll', (e) => {
      updateScroll()
    })
  })
  return pageScroll
}
