// 获取页面滚动距离的方法
import {onMounted, ref} from "vue";
import debounce from 'lodash';
export default () => {
  const pageScroll = ref(0)
  // 防抖
  const updateScroll = debounce.debounce(() => {
    pageScroll.value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  }, 200)
  onMounted(() => {
    window.addEventListener('scroll', (e) => {
      updateScroll()
    })
  })
  return pageScroll
}
