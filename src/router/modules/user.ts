import { LogoutIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/index',
    meta: { title: '个人页', icon: 'user-circle' },
    children: [
      {
        path: 'index',
        name: 'UserIndex',
        component: () => import('@/pages/user/index.vue'),
        meta: { title: '个人中心' },
      },
    ],
  },
  {
    path: '/loginRedirect',
    name: 'loginRedirect',
    redirect: '/login',
    meta: { title: '登录页', icon: shallowRef(LogoutIcon) },
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
  {
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
  },
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
