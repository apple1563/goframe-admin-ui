import { DashboardIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/base',
    name: 'dashboard',
    meta: {
      title: '仪表盘',
      icon: shallowRef(DashboardIcon),
      orderNo: 0,
    },
    children: [
      {
        path: 'base',
        name: 'DashboardBase',
        component: () => import('@/pages/dashboard/base/index.vue'),
        meta: {
          title: '概览仪表盘',
        },
      },
      {
        path: 'detail',
        name: 'DashboardDetail',
        component: () => import('@/pages/dashboard/detail/index.vue'),
        meta: {
          title: '统计报表',
        },
      },
    ],
  },
  /* {
    path: '/menu', // 开发时候用的，后面改成从后端获取
    name: 'menu',
    component: Layout,
    redirect: '/menu/index',
    meta: { title: '菜单管理', icon: 'menu-fold' },
    children: [
      {
        path: 'index',
        name: 'MenuIndex',
        component: () => import('@/pages/menu/index.vue'),
        meta: { title: '菜单管理' },
      },
    ],
  }, */
  {
    path: '/role', // 开发时候用的，后面改成从后端获取
    name: 'role',
    component: Layout,
    redirect: '/role/index',
    meta: { title: '角色管理', icon: 'usergroup' },
    children: [
      {
        path: 'index',
        name: 'RoleIndex',
        component: () => import('@/pages/role/index.vue'),
        meta: { title: '角色管理' },
      },
    ],
  },
];
