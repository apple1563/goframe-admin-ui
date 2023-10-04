import { defineStore } from 'pinia';

import { getMenuTree } from '@/api/menu';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuTreeListWithBths: [],
  }),
  getters: {
    menuTreeList: (state) => {
      return state.menuTreeListWithBths.filter((item) => item.type !== 3);
    },
  },
  actions: {
    async getMenuTreeList() {
      const res = await getMenuTree();
      this.menuTreeListWithBths = res.list;
    },
  },
  persist: true,
});
