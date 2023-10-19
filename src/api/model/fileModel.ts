export interface FileParam {
  drive: string;
  ext: string;
  file?: Array<any>;
  fileBig?: Array<any>;
  remark?: string;
  originName?: string;
  page?: number;
  size?: number;
}

export interface FileResult {
  list: Array<FileItem>;
  total: number;
  page: number;
  size: number;
}
export interface FileItem {
  id?: number;
  drive: string;
  originName: string;
  remark: string;
  fileUrl: string;
  size: number;
  ext?: string;
  uid?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface FileChunkParam {
  chunkIndex: number;
  totalChunks: number;
  temp: string;
  originName: string;
  ext: string;
  chunk: File;
}
