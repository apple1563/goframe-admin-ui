import { defineStore } from 'pinia';

import { getListType } from '@/api/dict';
import { getList } from '@/api/file';
import type { FileItem, FileParam } from '@/api/model/fileModel';
import type { Pagination } from '@/types/interface';

export const useFileStore = defineStore('file', {
  state: () => ({
    fileList: [],
    fileTypeList: [],
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
    searchFormData: <FileParam>{
      drive: '',
      ext: '',
      originName: '',
    },
    dataLoading: false,
  }),
  getters: {},
  actions: {
    async getFileList() {
      this.dataLoading = true;
      console.log(this.pagination);
      const res = await getList({
        drive: this.searchFormData.drive,
        ext: this.searchFormData.ext,
        originName: this.searchFormData.originName,
        page: this.pagination.current,
        size: this.pagination.pageSize,
      }).finally(() => {
        this.dataLoading = false;
      });
      this.fileList = res.list;
      this.pagination.total = res.total;
      this.pagination.current = res.page;
      this.pagination.pageSize = res.size;
    },
    async getFileTypeList() {
      const res = await getListType({ configType: 'upload_driver' });
      this.fileTypeList = res.list;
    },
    setAddVisible(bool: boolean) {
      this.addVisible = bool;
    },
    setEditVisible(bool: boolean) {
      this.editVisible = bool;
    },
    setCurrentRow(v: FileItem) {
      this.currentRow = v;
    },
    setPagination(v: Pagination) {
      this.pagination = v;
    },
  },
  persist: true,
});
