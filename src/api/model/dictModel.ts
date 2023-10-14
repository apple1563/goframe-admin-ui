export interface DictParam {
  configType?: string;
  configName?: string;
  remark?: string;
  configKey: string;
  configValue: string;
  page: number;
  size: number;
}

export interface DictResult {
  list: Array<DictItem>;
  total: number;
  page: number;
  size: number;
}
export interface DictItem {
  id?: number;
  configType: string;
  configName: string;
  remark: string;
  configKey: string;
  configValue: string;
  createBy?: string;
  updateBy?: string;
}
