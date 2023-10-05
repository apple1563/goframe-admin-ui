export interface ButtonParam {
  name?: string;
  title?: string;
  menuTitle?: string;
  page: number;
  size: number;
}

export interface ButtonResult {
  list: Array<ButtonItem>;
  total: number;
  page: number;
  size: number;
}

export interface ButtonItem {
  id?: number;
  title: string;
  name: string;
  menuId: number;
  menuTitle?: string;
  remark: string;
}
