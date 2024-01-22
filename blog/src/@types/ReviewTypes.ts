import type { User } from '@/api/user'
import ArticleDetail from '@/views/ArticleDetail.vue'
// 评论的接口类型
export interface ReviewType {
  id?: number;
  commentContent: string;
  user: User;
  article: ArticleDetail;
  createdTime: string;
}
