import type { NoticeItem, NoticeParam, NoticeResult } from '@/api/model/noticeModel';
import { request } from '@/utils/request';

const Api = {
  NoticeList: '/notice/list',
  Notice: '/notice',
  NoticeListType: '/notice/list/type',
};

export function addNotice(data: NoticeItem) {
  return request.post<null>({
    url: Api.Notice,
    data,
  });
}

export function updateNotice(data: NoticeItem) {
  return request.put<null>({
    url: Api.Notice,
    data,
  });
}

export function delNotice(id: number) {
  return request.delete<null>({
    url: Api.Notice,
    data: {
      id,
    },
  });
}

export function getList(params: NoticeParam) {
  return request.get<NoticeResult>({
    url: Api.NoticeList,
    params,
  });
}
