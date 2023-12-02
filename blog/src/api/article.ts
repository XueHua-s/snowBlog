import request from '@/request'
import type {PageInterface} from "@/@types/PageInterface";
import type {ResponseOver} from "@/@types/ResponseOver";
interface GetArticlesQuery extends PageInterface {
  title: string;
  orderBy: '1' | '2';
  classifyId: string;
  userId: string;
}
interface ArticleItem {
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
  user: any;
  classify: any;
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
