import type { MenuParam } from '@/api/model/menuModel';
import { request } from '@/utils/request';

const Api = {
  Menu: '/menu',
};

export function addMenu(data: MenuParam) {
  return request.post<null>({
    url: Api.Menu,
    data,
  });
}
