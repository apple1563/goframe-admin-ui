import type { FileChunkParam, FileParam, FileResult } from '@/api/model/fileModel';
import { request } from '@/utils/request';

const Api = {
  FileList: '/file/list',
  File: '/file',
  Chunk: '/file/chunk',
};

export function addFile(data: FileParam) {
  return request.post<FileResult>({
    url: Api.File,
    data,
    headers: {
      'Content-Type': 'multipart/form-data', // 使用 multipart/form-data 表单类型
    },
  });
}
export function addChunkFile(data: FileChunkParam) {
  return request.post<null>({
    url: Api.Chunk,
    data,
    headers: {
      'Content-Type': 'multipart/form-data', // 使用 multipart/form-data 表单类型
    },
  });
}
export function updateFile(data: FileParam) {
  return request.put<null>({
    url: Api.File,
    data,
  });
}

export function delFile(id: number) {
  return request.delete<null>({
    url: Api.File,
    data: {
      id,
    },
  });
}

export function getList(params: FileParam) {
  return request.get<FileResult>({
    url: Api.FileList,
    params,
  });
}
