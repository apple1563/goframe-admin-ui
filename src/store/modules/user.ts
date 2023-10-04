import { defineStore } from 'pinia';

import { login } from '@/api/login';
import type { userItem } from '@/api/model/userModel';
import { getUserInfo } from '@/api/user';
import { usePermissionStore } from '@/store';

const InitUserInfo: UserInfo<userItem> = {};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '', // 默认token不走权限
    userInfo: { ...InitUserInfo },
  }),
  getters: {
    /* roles: (state) => {
      return state.userInfo?.roles;
    }, */
  },
  actions: {
    async login(loginInfo: Record<string, string>) {
      const res = await login({
        username: loginInfo.account,
        password: loginInfo.password,
      });
      this.token = res.token;
    },
    async getUserInfo() {
      const res = await getUserInfo();
      this.userInfo = res;
    },
    async logout() {
      this.token = '';
      this.userInfo = { ...InitUserInfo };
    },
  },
  persist: {
    afterRestore: () => {
      const permissionStore = usePermissionStore();
      permissionStore.initRoutes();
    },
    key: 'user',
    paths: ['token'],
  },
});
