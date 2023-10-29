import type { MenuParam, MenuRoleResult, MenuTreeResult } from '@/api/model/menuModel';
import { request } from '@/utils/request';

const Api = {
  Menu: '/menu',
  MenuTree: '/menu/tree',
  roleMenu: '/menu/role',
};

export function addMenu(data: MenuParam) {
  return request.post<null>({
    url: Api.Menu,
    data,
  });
}

export function editMenu(data: MenuParam) {
  return request.put<null>({
    url: Api.Menu,
    data,
  });
}

export function delMenu(id: number) {
  return request.delete<null>({
    url: Api.Menu,
    data: { id },
  });
}

export function getMenuTree() {
  return request.get<MenuTreeResult>({
    url: Api.MenuTree,
  });
}

export function setRoleMenu(roleId: number, menuIds: Array<number>) {
  return request.post<null>({
    url: Api.roleMenu,
    data: {
      roleId,
      menuIds,
    },
  });
}

export function getRoleMenu(roleId: number) {
  return request.get<MenuRoleResult>({
    url: Api.roleMenu,
    params: {
      roleId,
    },
  });
}
