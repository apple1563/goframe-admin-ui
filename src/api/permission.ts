import type { ButtonWhiteListResult, MenuListResult } from '@/api/model/permissionModel';
import { request } from '@/utils/request';

const Api = {
  MenuList: '/menu/vue',
  ButtonList: '/button/whitelist',
};

export function getMenuList() {
  return request.get<MenuListResult>({
    url: Api.MenuList,
  });
}

export function getButtonWhitelist() {
  return request.get<ButtonWhiteListResult>({
    url: Api.ButtonList,
  });
}
