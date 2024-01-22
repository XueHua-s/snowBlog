import request from '@/request'
import lodash from 'lodash'
import type { ArticleItem } from '@/api/article'
import type { PageInterface } from '@/@types/PageInterface'
import type { ReviewType } from '@/@types/ReviewTypes'
interface getReviewsQuery extends PageInterface {
  articleId: number,
  sort: string
}
// 获取评论
export const getReviews = (data: getReviewsQuery): Promise<ReviewType> => request({
  url: '/review/checkTheCommentsUnderTheArticle',
  method: 'POST',
  data
})
