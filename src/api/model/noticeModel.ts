export interface NoticeParam {
  id?: string;
  title?: string;
  content?: string;
  tag?: string;
  creater?: string;
  receivers?: Array<number>;
  page?: number;
  size?: number;
}

export interface NoticeResult {
  list: Array<NoticeItem>;
  total: number;
  page: number;
  size: number;
}
export interface NoticeItem {
  id?: number;
  title: string;
  content: string;
  remark: string;
  creater?: string;
  receivers: string | Array<number>;
  tag: string;
  sort: number;
  createdAt?: string;
  updatedAt?: string;
}
