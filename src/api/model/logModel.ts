export interface LogParam {
  id?: number;
  username?: string;
  ip?: string;
  timeBetween?: Array<string>;
  page?: number;
  size?: number;
}
export interface LoginLogResult {
  list: Array<LoginLogItem>;
  total: number;
  page: number;
  size: number;
}
export interface LoginLogItem {
  id: number;
  uid: number;
  username: string;
  ip: string;
  createdAt: string;
  updatedAt: string;
  clientAge: string;
  roleId: number;
  pRoleId: number;
  roleName: string;
  pid: number;
  pUsername: string;
}
