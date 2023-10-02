import type { ListResult } from '@/api/model/listModel';
import { request } from '@/utils/request';

const Api = {
  RoleList: '/api/role/list',
};

export function getList() {
  return request.get<ListResult>({
    url: Api.RoleList,
  });
}
