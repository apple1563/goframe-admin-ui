import type { LoginLogResult, LogParam } from '@/api/model/logModel';
import { request } from '@/utils/request';

const Api = {
  LoginLogList: '/loginLog/list',
};

export function getLoginLogList(params: LogParam) {
  return request.get<LoginLogResult>({
    url: Api.LoginLogList,
    params,
  });
}
