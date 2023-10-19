import type { DictItem, DictParam, DictResult } from '@/api/model/dictModel';
import { request } from '@/utils/request';

const Api = {
  DictList: '/dict/list',
  Dict: '/dict',
  DictListType: '/dict/list/type',
};

export function addDict(data: DictItem) {
  return request.post<null>({
    url: Api.Dict,
    data,
  });
}

export function updateDict(data: DictItem) {
  return request.put<null>({
    url: Api.Dict,
    data,
  });
}

export function delDict(id: number) {
  return request.delete<null>({
    url: Api.Dict,
    data: {
      id,
    },
  });
}

export function getList(params: DictParam) {
  return request.get<DictResult>({
    url: Api.DictList,
    params,
  });
}

export function getListType(params: DictParam) {
  return request.get<DictResult>({
    url: Api.DictListType,
    params,
  });
}
