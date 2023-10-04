import type { userItem } from '@/api/model/userModel';
import { request } from '@/utils/request';

const Api = {
  UserList: '/user/list',
  User: '/user',
  UserInfo: '/user/info',
};

/*
export function addRole(data: RoleItem) {
  return request.post<null>({
    url: Api.Role,
    data,
  });
}

export function updateRole(data: RoleItem) {
  return request.put<null>({
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
*/

export function getUserInfo() {
  return request.get<userItem>({
    url: Api.UserInfo,
  });
}
