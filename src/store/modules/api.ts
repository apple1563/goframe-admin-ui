import { defineStore } from 'pinia';

import { getList } from '@/api/api';
import type { ApiItem } from '@/api/model/apiModel';
import type { Pagination } from '@/types/interface';

export const useApiStore = defineStore('api', {
  state: () => ({
    apiList: [],
    addVisible: false,
    editVisible: false,
    currentRow: { url: '', method: '', remark: '' },
    pagination: {
      defaultPageSize: 20,
      total: 100,
      defaultCurrent: 1,
      current: 1,
      pageSize: 20,
    },
    searchFormData: {
      url: '',
      method: '',
      group: '',
    },
    dataLoading: false,
  }),
  getters: {},
  actions: {
    async getApiList() {
      this.dataLoading = true;
      const res = await getList({
        method: this.searchFormData.method,
        url: this.searchFormData.url,
        group: this.searchFormData.group,
        page: this.pagination.current,
        size: this.pagination.pageSize,
      }).finally(() => {
        this.dataLoading = false;
      });
      this.apiList = res.list;
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
    setCurrentRow(v: ApiItem) {
      this.currentRow = v;
    },
    setPagination(v: Pagination) {
      this.pagination = Object.assign(this.pagination, v);
    },
  },
  persist: true,
});
