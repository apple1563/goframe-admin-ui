import { defineStore } from 'pinia';

import type { NoticeItem, NoticeParam } from '@/api/model/noticeModel';
import { getList } from '@/api/notice';
import type { Pagination } from '@/types/interface';

export const useNoticeStore = defineStore('notice', {
  state: () => ({
    noticeList: [],
    addVisible: false,
    editVisible: false,
    currentRow: {},
    pagination: {
      defaultPageSize: 20,
      total: 100,
      defaultCurrent: 1,
      current: 1,
      pageSize: 20,
    },
    searchFormData: <NoticeParam>{
      title: '',
      content: '',
      tag: '',
      creater: '',
    },
    dataLoading: false,
  }),
  getters: {},
  actions: {
    async getNoticeList() {
      this.dataLoading = true;
      const res = await getList({
        id: this.searchFormData.id,
        title: this.searchFormData.title,
        content: this.searchFormData.content,
        creater: this.searchFormData.creater,
        tag: this.searchFormData.tag,
        page: this.pagination.current,
        size: this.pagination.pageSize,
      }).finally(() => {
        this.dataLoading = false;
      });
      this.noticeList = res.list;
      this.pagination.total = res.total;
      this.pagination.current = res.page;
      this.pagination.pageSize = res.size;
    },
    setAddVisible(bool: boolean) {
      this.addVisible = bool;
    },
    setEditVisible(bool: boolean) {
      this.editVisible = bool;
    },
    setCurrentRow(v: NoticeItem) {
      this.currentRow = v;
    },
    setPagination(v: Pagination) {
      this.pagination = v;
    },
  },
  persist: true,
});
