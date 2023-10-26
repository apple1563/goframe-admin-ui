import { defineStore } from 'pinia';

import { login, Logout } from '@/api/login';
import type { UserInfo, UserItem } from '@/api/model/userModel';
import { getOtpCheckByUsername, otpValidate } from '@/api/otp';
import { getUserInfo } from '@/api/user';
import { usePermissionStore } from '@/store';

const InitUserInfo: UserInfo<UserItem> = {};

export const useSelfStore = defineStore('self', {
  state: () => ({
    token: '', // 默认token不走权限
    tempToken: '',
    selfInfo: { ...InitUserInfo },
    isOpened: false,
  }),
  getters: {},
  actions: {
    init(token) {
      this.token = token;
      const permissionStore = usePermissionStore();
      permissionStore.initButtons();
    },
    async login(loginInfo: Record<string, string>) {
      const res = await login({
        username: loginInfo.account,
        password: loginInfo.password,
      });
      // 判断有无开启二步校验，开启了跳到二步校验输入框
      const { isOpened } = await getOtpCheckByUsername({ username: loginInfo.account });
      this.isOpened = isOpened;
      if (!isOpened) {
        this.init(res.token);
      } else {
        this.tempToken = res.token;
      }
    },
    async login2step(login2Info: Record<string, string>) {
      await otpValidate({ code: login2Info.code, username: login2Info.username });
      this.init(this.tempToken);
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
