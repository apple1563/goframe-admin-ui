import { defineStore } from 'pinia';

import { getMenuTree } from '@/api/menu';
import type { MenuItem } from '@/api/model/menuModel';
import { INITIAL_TREE } from '@/pages/menu/menu/constants';

function loopIt(arr: Array<MenuItem>) {
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
      const menuTreeList = JSON.parse(JSON.stringify(state.menuTreeList));
      for (const item of menuTreeList) {
        if (item.type === 1) {
          result.push(item);
          if (item.children && item.children.length > 0) {
            item.children = loopIt(item.children);
          }
        }
      }
      return result.concat(INITIAL_TREE);
    },
  },
  actions: {
    async getMenuTreeList() {
      const res = await getMenuTree();
      this.menuTreeList = res.list;
      // this.menuTreeList = res.list.concat(INITIAL_TREE as MenuItem[]);
    },
    setAddVisible(bool: boolean) {
      this.addVisible = bool;
    },
  },
  persist: true,
});
