import type { PassWordFormType, UserItem, UserList, UserParam, UserTreeList } from '@/api/model/userModel';
import { request } from '@/utils/request';

const Api = {
  UserList: '/user/list',
  UserTree: '/user/tree',
  User: '/user',
  UserInfo: '/user/info',
  UserPassword: '/user/password',
};
export function addUser(data: UserItem) {
  return request.post<null>({
    url: Api.User,
    data,
  });
}

export function updateUser(data: UserItem) {
  return request.put<null>({
    url: Api.User,
    data,
  });
}

export function updateUserPassword(data: PassWordFormType) {
  return request.put<null>({
    url: Api.UserPassword,
    data,
  });
}

export function delUser(id: number) {
  return request.delete<null>({
    url: Api.User,
    data: {
      id,
    },
  });
}

export function getList(params: UserParam) {
  return request.get<UserList>({
    url: Api.UserList,
    params,
  });
}

export function getUserInfo() {
  return request.get<UserItem>({
    url: Api.UserInfo,
  });
}

export function getTreeList() {
  return request.get<UserTreeList>({
    url: Api.UserTree,
  });
}
/* Nickname    string      `json:"nickname"    description:""`
    Email       string      `json:"email"       description:""`
    Phone       string      `json:"phone"       description:""`
    Status      int         `json:"status"      description:"1正常2禁用"`
    ClientAgent string      `json:"clientAgent" description:"注册clientAgen头"`
    Ip          string      `json:"ip"          description:"IP"`
    RoleId      int         `json:"roleId"      description:"1用户2代理3管理"`
    CreatedAt   *gtime.Time `json:"createdAt"   description:""`
    UpdatedAt   *gtime.Time `json:"updatedAt"   description:""`
    PRoleId     int         `json:"pRoleId"     description:""`
    Pid         int         `json:"pid"         description:""`
    PUsername   string      `json:"pUsername"   description:""`
    RoleName    string      `json:"roleName"    description:""` */
