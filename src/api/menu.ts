import type { MenuParam, MenuTreeResult } from '@/api/model/menuModel';
import { request } from '@/utils/request';

const Api = {
  Menu: '/menu',
  MenuTree: '/menu/tree',
};

export function addMenu(data: MenuParam) {
  return request.post<null>({
    url: Api.Menu,
    data,
  });
}

export function getMenuTree() {
  return request.get<MenuTreeResult>({
    url: Api.MenuTree,
  });
}
