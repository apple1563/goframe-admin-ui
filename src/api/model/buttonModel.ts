export interface ButtonParam {
  name?: string;
  title?: string;
  menuId?: number;
  menuTitle?: string;
  remark?: string;
  page?: number;
  size?: number;
}

export interface ButtonResult {
  list: Array<ButtonItem>;
  total: number;
  page: number;
  size: number;
}

export interface ButtonItem {
  id?: number | null;
  title: string;
  name: string;
  menuId: number;
  menuTitle?: string;
  remark: string;
}

export interface ButtonRoleResult {
  list: Array<string | number>;
}
