import { LogoutIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/self',
    name: 'self',
    component: Layout,
    redirect: '/self/index',
    meta: { title: '个人页', icon: 'user-circle', orderNo: 10 },
    children: [
      {
        path: 'index',
        name: 'UserIndex',
        component: () => import('@/pages/self/index.vue'),
        meta: { title: '个人中心' },
      },
    ],
  },
  {
    path: '/loginRedirect',
    name: 'loginRedirect',
    redirect: '/login',
    meta: { title: '登录页', icon: shallowRef(LogoutIcon), orderNo: 11 },
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'index',
        redirect: '/login',
        component: () => import('@/layouts/blank.vue'),
        meta: { title: '登录中心' },
      },
    ],
  },
];
