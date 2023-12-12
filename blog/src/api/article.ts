import request from '@/request'
import type {PageInterface} from "@/@types/PageInterface";
import type {ResponseOver} from "@/@types/ResponseOver";
import type {GetThreeClassifyListResItem} from "@/api/classify";
import type {User} from "@/api/user";
interface GetArticlesQuery extends PageInterface {
  title: string;
  orderBy: '1' | '2';
  classifyId: string;
  userId: string;
}
export interface ArticleItem {
  id: number;
  description: string;
  cover: string;
  pub: number;
  createdTime: string;
  updateTime: string;
}
interface ArticleDetail extends ArticleItem {
  content: string;
}
interface ArticleListItem extends ArticleItem {
  user: User;
  classify: GetThreeClassifyListResItem;
}
type ArticleListOver = ResponseOver<{
  records: Array<Array<ArticleListItem>>,
  total: number
}>
export const getArticles = (params: GetArticlesQuery): Promise<ArticleListOver> => request({
  url: '/article/getArticles',
  method: 'GET',
  params
})
export const getDetail = (id: number): Promise<ArticleItem> => request({
  url: `/article/getArticleById/${id}`,
  method: 'GET'
})
