export interface ApiParam {
  url: string;
  method: string;
  group?: string;
  page: number;
  size: number;
}

export interface ApiResult {
  list: Array<ApiItem>;
  total: number;
  page: number;
  size: number;
}

export interface ApiItem {
  id?: number;
  url: string;
  method: string;
  group?: string;
  remark: string;
}
