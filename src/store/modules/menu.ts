import { defineStore } from 'pinia';

import { getMenuTree } from '@/api/menu';

function loopIt(arr) {
  if (arr && arr.length > 0) {
    arr = arr.filter((v) => v.type === 1);
    for (const child of arr) {
      loopIt(child.children);
    }
  }
  return arr;
}

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuTreeList: [],
    addVisible: false,
  }),
  getters: {
    menuTreeListOnlyFolder: (state) => {
      const result = [];
      for (const item of state.menuTreeList) {
        if (item.type === 1) {
          result.push(item);
          if (item.children && item.children.length > 0) {
            item.children = loopIt(item.children);
          }
        }
      }
      return result;
    },
  },
  actions: {
    async getMenuTreeList() {
      const res = await getMenuTree();
      this.menuTreeList = res.list;
    },
    setAddVisible(bool) {
      this.addVisible = bool;
    },
  },
  persist: true,
});
