export interface DictParam {
  id?: number;
  configType?: string;
  configName?: string;
  createBy?: string;
  updateBy?: string;
  configKey?: string;
  configValue?: string;
  remark?: string;
  page?: number;
  size?: number;
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
  disabled?: boolean;
}
