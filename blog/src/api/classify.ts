import request from '../request/index.ts';
import type {PageInterface} from "@/@types/PageInterface";
import type {ResponseOver} from "@/@types/ResponseOver";
// 获取树状菜单
interface GetThreeClassifyListData extends PageInterface {
  name?: string
}
export interface GetThreeClassifyListResItem {
  children: Array<GetThreeClassifyListResItem | undefined>,
  createdTime: string,
  icon: string,
  id: number,
  name: string,
  parentId: number,
  updateTime: string,
}
type GetThreeClassifyListRes = ResponseOver<{
  records: Array<GetThreeClassifyListResItem>,
  total: number
}>
export const getThreeClassifyList = (data: GetThreeClassifyListData): Promise<GetThreeClassifyListRes> => request({
  url: '/classify/getClassifyList',
  method: 'POST',
  data
})
