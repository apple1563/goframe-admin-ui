import { defineStore } from 'pinia';

import { getList } from '@/api/dict';
import type { DictItem, DictParam } from '@/api/model/dictModel';
import type { Pagination } from '@/types/interface';

export const useDictStore = defineStore('dict', {
  state: () => ({
    dictList: [],
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
    searchFormData: <DictParam>{
      id: '',
      configKey: '',
      configName: '',
      configType: '',
      createBy: '',
    },
    dataLoading: false,
  }),
  getters: {},
  actions: {
    async getDictList() {
      this.dataLoading = true;
      const res = await getList({
        id: this.searchFormData.id,
        configKey: this.searchFormData.configKey,
        configName: this.searchFormData.configName,
        configType: this.searchFormData.configType,
        createBy: this.searchFormData.createBy,
        page: this.pagination.current,
        size: this.pagination.pageSize,
      }).finally(() => {
        this.dataLoading = false;
      });
      this.dictList = res.list;
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
    setCurrentRow(v: DictItem) {
      this.currentRow = v;
    },
    setPagination(v: Pagination) {
      this.pagination = v;
    },
  },
  persist: true,
});
