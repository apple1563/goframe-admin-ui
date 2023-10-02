import type { LoginParam, LoginResult } from '@/api/model/loginModel';
import { request } from '@/utils/request';

const Api = {
  Login: '/login',
};

export function login(data: LoginParam) {
  return request.post<LoginResult>({
    url: Api.Login,
    data,
  });
}
