import { defineStore } from 'pinia';

import { login, Logout } from '@/api/login';
import type { UserInfo, UserItem } from '@/api/model/userModel';
import { getUserInfo } from '@/api/user';
import { usePermissionStore } from '@/store';

const InitUserInfo: UserInfo<UserItem> = {};

export const selfUserStore = defineStore('self', {
  state: () => ({
    token: '', // 默认token不走权限
    selfInfo: { ...InitUserInfo },
  }),
  getters: {},
  actions: {
    async login(loginInfo: Record<string, string>) {
      const res = await login({
        username: loginInfo.account,
        password: loginInfo.password,
      });
      this.token = res.token;
      const permissionStore = usePermissionStore();
      permissionStore.initButtons();
    },
    async getUserInfo() {
      const res = await getUserInfo();
      this.selfInfo = res;
    },
    async logout() {
      await Logout();
      this.token = '';
      this.selfInfo = { ...InitUserInfo };
    },
  },
  persist: {
    afterRestore: () => {
      const permissionStore = usePermissionStore();
      permissionStore.initRoutes();
      permissionStore.initButtons();
    },
    key: 'user',
    paths: ['token'],
  },
});
