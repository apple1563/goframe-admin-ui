import { defineStore } from 'pinia';

import type { NoticeItem, UpdateNoticeReceiveParam } from '@/api/model/noticeModel';
import { getNoticeReceiveList, getNoticeReceiveUnread, updateNoticeReceive } from '@/api/notice';

export const useNoticeReceiverStore = defineStore('notice-receiver', {
  state: (): { msgData: Array<NoticeItem>; unreadMsgCount: number } => ({
    msgData: [],
    unreadMsgCount: 0,
  }),
  getters: {},
  actions: {
    setMsgData(data: Array<NoticeItem>) {
      this.msgData = data;
    },
    setUnreadMsgCount(v: number) {
      this.unreadMsgCount = v;
    },
    getList() {
      getNoticeReceiveList({ page: 1, size: 8, status: 1 }).then((res) => {
        this.setMsgData(res.list);
      });
    },
    getUnreadMsgCount() {
      getNoticeReceiveUnread().then((res) => {
        this.setUnreadMsgCount(res.count);
      });
    },
    updateMsgStatus(data: UpdateNoticeReceiveParam) {
      updateNoticeReceive(data).then(() => {
        this.getList();
        this.getUnreadMsgCount();
      });
    },
    batchUpdateMsgStatus(arr: Array<number>) {
      const promises: Array<Promise<null>> = [];
      for (const id of arr) {
        promises.push(updateNoticeReceive({ id, status: 2 }));
      }
      Promise.all(promises).then(() => {
        this.getList();
        this.getUnreadMsgCount();
      });
    },
  },
  persist: true,
});
