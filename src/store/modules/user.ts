import { defineStore } from 'pinia';

import type { UserItem } from '@/api/model/userModel';
import { getList, getTreeList } from '@/api/user';
import type { Pagination } from '@/types/interface';

export const useUserStore = defineStore('user', {
  state: () => ({
    userTreeList: [],
    userList: [],
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
    searchFormData: {
      username: '',
      roleId: null,
      id: null,
      pUsername: '',
    },
    dataLoading: false,
  }),
  getters: {},
  actions: {
    async getUserTreeList() {
      const res = await getTreeList();
      this.userTreeList = res.list;
    },
    async getUserList() {
      this.dataLoading = true;
      const res = await getList({
        username: this.searchFormData.username,
        roleId: this.searchFormData.roleId,
        pUsername: this.searchFormData.pUsername,
        id: this.searchFormData.id,
        page: this.pagination.current,
        size: this.pagination.pageSize,
      }).finally(() => {
        this.dataLoading = false;
      });
      this.userList = res.list;
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
    setCurrentRow(v: UserItem) {
      this.currentRow = v;
    },
    setPagination(v: Pagination) {
      this.pagination = v;
    },
  },
  persist: true,
});
