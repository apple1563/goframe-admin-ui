import type { ButtonItem, ButtonParam, ButtonResult } from '@/api/model/buttonModel';
import { request } from '@/utils/request';

const Api = {
  ButtonList: '/button/list',
  Button: '/button',
};

export function addButton(data: ButtonItem) {
  return request.post<null>({
    url: Api.Button,
    data,
  });
}

export function updateButton(data: ButtonItem) {
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
