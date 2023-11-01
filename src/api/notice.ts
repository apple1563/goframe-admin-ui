import type {
  NoticeItem,
  NoticeParam,
  NoticeReceiveUnreadResult,
  NoticeResult,
  UpdateNoticeReceiveParam,
} from '@/api/model/noticeModel';
import { request } from '@/utils/request';

const Api = {
  NoticeList: '/notice/list',
  Notice: '/notice',
  NoticeReceiveList: '/notice/receive/list',
  NoticeReceive: '/notice/receive',
  NoticeReceiveUnread: '/notice/receive/unread',
};

export function addNotice(data: NoticeParam) {
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

export function getNoticeReceiveList(params: NoticeParam) {
  return request.get<NoticeResult>({
    url: Api.NoticeReceiveList,
    params,
  });
}

export function updateNoticeReceive(data: UpdateNoticeReceiveParam) {
  return request.put<null>({
    url: Api.NoticeReceive,
    data,
  });
}

export function delNoticeReceive(id: number) {
  return request.delete<null>({
    url: Api.NoticeReceive,
    data: {
      id,
    },
  });
}

export function getNoticeReceiveUnread() {
  return request.get<NoticeReceiveUnreadResult>({
    url: Api.NoticeReceiveUnread,
  });
}
