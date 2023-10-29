import type { ButtonParam, ButtonResult, ButtonRoleResult } from '@/api/model/buttonModel';
import { request } from '@/utils/request';

const Api = {
  ButtonList: '/button/list',
  Button: '/button',
  roleButton: '/button/role',
};

export function addButton(data: ButtonParam) {
  return request.post<null>({
    url: Api.Button,
    data,
  });
}

export function updateButton(data: ButtonParam) {
  return request.put<null>({
    url: Api.Button,
    data,
  });
}

export function delButton(id: number) {
  return request.delete<null>({
    url: Api.Button,
    data: {
      id,
    },
  });
}

export function getList(params: ButtonParam) {
  return request.get<ButtonResult>({
    url: Api.ButtonList,
    params,
  });
}

export function setRoleButton(roleId: number, buttonIds: Array<number>) {
  return request.post<null>({
    url: Api.roleButton,
    data: {
      roleId,
      buttonIds,
    },
  });
}

export function getRoleButton(roleId: number) {
  return request.get<ButtonRoleResult>({
    url: Api.roleButton,
    params: {
      roleId,
    },
  });
}
