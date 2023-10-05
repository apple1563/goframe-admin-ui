import { defineStore } from 'pinia';

import { getList } from '@/api/button';

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
    formData: {
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
        name: this.formData.name,
        title: this.formData.title,
        menuTitle: this.formData.menuTitle,
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
    setCurrentRow(v) {
      this.currentRow = v;
    },
    setPagination(v) {
      this.pagination = v;
    },
  },
  persist: true,
});
