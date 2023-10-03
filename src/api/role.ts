import type { RoleItem, RoleParam, RoleResult } from '@/api/model/roleModel';
import { request } from '@/utils/request';

const Api = {
  RoleList: '/role/list',
  Role: '/role',
};

export function addRole(data: RoleItem) {
  return request.post<null>({
    url: Api.Role,
    data,
  });
}

export function delRole(id: number) {
  return request.delete<null>({
    url: Api.Role,
    data: {
      id,
    },
  });
}

export function getList(params: RoleParam) {
  return request.get<RoleResult>({
    url: Api.RoleList,
    params,
  });
}
