import { defineStore } from 'pinia';

import type { RoleItem } from '@/api/model/roleModel';
import { getList } from '@/api/role';
import type { Pagination } from '@/types/interface';

export const useRoleStore = defineStore('role', {
  state: () => ({
    roleList: [],
    addVisible: false,
    editVisible: false,
    menuPermissionVisible: false,
    currentRow: {},
    pagination: {
      defaultPageSize: 20,
      total: 100,
      defaultCurrent: 1,
      current: 1,
      pageSize: 20,
    },
    searchFormData: {
      name: '',
    },
    dataLoading: false,
  }),
  getters: {},
  actions: {
    async getRoleList() {
      this.dataLoading = true;
      const res = await getList({
        name: this.searchFormData.name,
        page: this.pagination.current,
        size: this.pagination.pageSize,
      }).finally(() => {
        this.dataLoading = false;
      });
      this.roleList = res.list;
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
    setMenuPermissionVisible(bool: boolean) {
      this.menuPermissionVisible = bool;
    },
    setCurrentRow(v: RoleItem) {
      this.currentRow = v;
    },
    setPagination(v: Pagination) {
      this.pagination = v;
    },
  },
  persist: true,
});
