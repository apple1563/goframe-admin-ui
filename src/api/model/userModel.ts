/*
export interface RoleParam {
  name?: string;
  page: number;
  size: number;
}
*/

export interface UserResult {
  list: Array<userItem>;
  total: number;
}

export interface userItem {
  id: number;
  username: string;
  password: string;
  nickname: string;
  email: string;
  phone: string;
  status: number;
  clientAgent: string;
  ip: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  pRoleId: number;
  pid: number;
  pUsername: string;
  roleName: string;
  pRoleName: string;
}
