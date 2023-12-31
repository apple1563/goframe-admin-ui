import type { ApiItem, ApiParam, ApiResult } from '@/api/model/apiModel';
import { request } from '@/utils/request';

const Api = {
  ApiList: '/api/list',
  Api: '/api',
  roleApi: '/api/role',
};

export function addApi(data: ApiItem) {
  return request.post<null>({
    url: Api.Api,
    data,
  });
}

export function updateApi(data: ApiItem) {
  return request.put<null>({
    url: Api.Api,
    data,
  });
}

export function delApi(id: number) {
  return request.delete<null>({
    url: Api.Api,
    data: {
      id,
    },
  });
}

export function getList(params: ApiParam) {
  return request.get<ApiResult>({
    url: Api.ApiList,
    params,
  });
}

export function setRoleApi(roleId: number, apis: Array<ApiItem>) {
  return request.post<null>({
    url: Api.roleApi,
    data: {
      roleId,
      apis,
    },
  });
}

export function getRoleApi(roleId: number) {
  return request.get<ApiResult>({
    url: Api.roleApi,
    params: {
      roleId,
    },
  });
}
