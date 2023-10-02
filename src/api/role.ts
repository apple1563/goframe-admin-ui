import type { ListResult } from '@/api/model/listModel';
import { request } from '@/utils/request';

const Api = {
  RoleList: '/role/list',
};

export function getList() {
  return request.get<ListResult>({
    url: Api.RoleList,
  });
}
