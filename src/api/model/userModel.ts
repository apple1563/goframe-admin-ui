export interface UserParam {
  username?: string;
  id?: number;
  pid?: number;
  roleId?: number;
  pUsername?: string;
  page: number;
  size: number;
}

export interface UserList {
  list: Array<UserItem>;
  total: number;
  page: number;
  size: number;
}

export interface UserInfo<T> {
  [key: string]: T;
}

export interface UserItem {
  id?: number;
  username: string;
  password: string;
  nickname?: string;
  email?: string;
  phone?: string;
  status: number;
  clientAgent?: string;
  ip?: string;
  roleId?: number;
  createdAt?: string;
  updatedAt?: string;
  pRoleId?: number;
  pid?: number;
  pUsername?: string;
  roleName?: string;
  pRoleName?: string;
}
export interface UserTree extends UserItem {
  Children: UserTree[];
}

export interface UserTreeList {
  list: UserTree[];
}
