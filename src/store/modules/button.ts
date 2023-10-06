import { defineStore } from 'pinia';

import { getList } from '@/api/button';
import type { ButtonItem } from '@/api/model/buttonModel';
import type { Pagination } from '@/types/interface';

export const useButtonStore = defineStore('button', {
  state: () => ({
    buttonList: [],
    addVisible: false,
    editVisible: false,
    currentRow: {},
    tableData: [],
    pagination: {
      defaultPageSize: 20,
      total: 100,
      defaultCurrent: 1,
      current: 1,
      pageSize: 20,
    },
    searchFormData: {
      name: '',
      title: '',
      menuTitle: '',
    },
    dataLoading: false,
  }),
  getters: {},
  actions: {
    async getButtonList() {
      this.dataLoading = true;
      const res = await getList({
        name: this.searchFormData.name,
        title: this.searchFormData.title,
        menuTitle: this.searchFormData.menuTitle,
        page: this.pagination.current,
        size: this.pagination.pageSize,
      }).finally(() => {
        this.dataLoading = false;
      });
      this.buttonList = res.list;
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
    setCurrentRow(v: ButtonItem) {
      this.currentRow = v;
    },
    setPagination(v: Pagination) {
      this.pagination = v;
    },
  },
  persist: true,
});
