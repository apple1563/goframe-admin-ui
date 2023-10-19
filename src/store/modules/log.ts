import { defineStore } from 'pinia';

import { getLoginLogList } from '@/api/log';
import type { LoginLogResult, LogParam } from '@/api/model/logModel';
import type { Pagination } from '@/types/interface';

export const useLogStore = defineStore('log', {
  state: () => ({
    loginLogList: [],
    pagination: {
      defaultPageSize: 20,
      total: 100,
      defaultCurrent: 1,
      current: 1,
      pageSize: 20,
    },
    searchFormData: <LogParam>{
      username: '',
      ip: '',
      timeBetween: [],
    },
    dataLoading: false,
  }),
  getters: {},
  actions: {
    async getLoginLogList() {
      this.dataLoading = true;
      const res: LoginLogResult = await getLoginLogList<LoginLogResult>({
        id: this.searchFormData.id,
        username: this.searchFormData.username,
        ip: this.searchFormData.ip,
        timeBetween: this.searchFormData.timeBetween,
        page: this.pagination.current,
        size: this.pagination.pageSize,
      }).finally(() => {
        this.dataLoading = false;
      });
      this.loginLogList = res.list;
      this.pagination.total = res.total;
      this.pagination.current = res.page;
      this.pagination.pageSize = res.size;
    },
    setPagination(v: Pagination) {
      this.pagination = v;
    },
  },
  persist: true,
});
