export interface RoleParam {
  name?: string;
  page: number;
  size: number;
}

export interface RoleResult {
  list: Array<RoleItem>;
  total: number;
  page: number;
  size: number;
}

export interface RoleResultForSelect {
  list: Array<RoleItem>;
}

export interface RoleItem {
  id?: number;
  status?: number;
  listOrder?: number;
  name?: string;
  remark?: string;
  dataScope?: number;
  createdAt?: string;
  updatedAt?: string;
}
