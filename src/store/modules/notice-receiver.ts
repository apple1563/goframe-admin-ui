import { defineStore } from 'pinia';

import type { NoticeItem, UpdateNoticeReceiveParam } from '@/api/model/noticeModel';
import { getNoticeReceiveList, getNoticeReceiveUnread, updateNoticeReceive } from '@/api/notice';

export const useNoticeReceiverStore = defineStore('notice-receiver', {
  state: (): {
    msgData: Array<NoticeItem>;
    unreadMsgCount: number;
    current: number;
    pageSize: number;
    total: number;
  } => ({
    msgData: [],
    unreadMsgCount: 0,
    current: 1,
    pageSize: 8,
    total: 0,
  }),
  getters: {
    unreadMsgData: (state) => state.msgData.filter((item: NoticeItem) => item.status === 1),
  },
  actions: {
    setMsgData(data: Array<NoticeItem>) {
      this.msgData = data;
    },
    setUnreadMsgCount(v: number) {
      this.unreadMsgCount = v;
    },
    getList() {
      getNoticeReceiveList({ page: 1, size: 20 }).then((res) => {
        this.setMsgData(res.list);
        this.current = res.page;
        this.pageSize = res.size;
        this.total = res.total;
      });
    },
    getUnreadMsgCount() {
      getNoticeReceiveUnread().then((res) => {
        this.setUnreadMsgCount(res.count);
      });
    },
    updateMsgStatus(data: UpdateNoticeReceiveParam, fn: () => void) {
      updateNoticeReceive(data).then(() => {
        this.getList();
        this.getUnreadMsgCount();
        fn();
      });
    },
    batchUpdateMsgStatus(arr: Array<number>, fn: () => void) {
      const promises: Array<Promise<null>> = [];
      for (const id of arr) {
        promises.push(updateNoticeReceive({ id, status: 2 }));
      }
      Promise.all(promises).then(() => {
        this.getList();
        this.getUnreadMsgCount();
        fn();
      });
    },
  },
  persist: true,
});
