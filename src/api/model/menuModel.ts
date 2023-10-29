export interface MenuParam {
  title: string;
  type: number;
  pid: number;
  icon: string;
  path: string;
  name: string;
  component: string;
  redirect: string;
  activeMenu: string;
  sort: number;
  frameSrc: string;
  isRoot: number;
  affix: number;
  alwaysShow: number;
  keepAlive: number;
  hidden: number;
  isFrame: number;
  status: number;
}

export interface MenuTreeResult {
  list: Array<MenuItem>;
}

export interface MenuItem {
  id: number;
  pid: number;
  title: string;
  name: string;
  path: string;
  icon: string;
  type: number;
  redirect: string;
  permissions: string;
  permissionName: string;
  component: string;
  alwaysShow: number;
  activeMenu: string;
  isRoot: number;
  isFrame: number;
  frameSrc: string;
  keepAlive: number;
  hidden: number;
  affix: number;
  level: number;
  tree: string;
  sort: number;
  remark: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  children?: Array<MenuItem>;
}

export interface MenuRoleResult {
  list: Array<number>;
}
