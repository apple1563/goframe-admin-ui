import { PrimaryTableCol } from 'tdesign-vue-next';

export const RULES = {
  configKey: [{ required: true }],
  configValue: [{ required: true }],
};

export const INITIAL_DATA = {};

export const COLUMNS: PrimaryTableCol[] = [
  {
    title: '参数名称',
    fixed: 'left',
    ellipsis: true,
    align: 'left',
    colKey: 'configName',
  },
  {
    title: '参数键名',
    ellipsis: true,
    colKey: 'configKey',
  },
  {
    title: '参数键值',
    ellipsis: true,
    colKey: 'configValue',
  },
  {
    title: '字典类型',
    ellipsis: true,
    colKey: 'configType',
  },
  {
    title: '创建者',
    ellipsis: true,
    colKey: 'createBy',
  },
  {
    title: '更新者',
    ellipsis: true,
    colKey: 'updateBy',
  },
  {
    title: '备注',
    ellipsis: true,
    colKey: 'remark',
  },
  {
    align: 'left',
    fixed: 'right',
    colKey: 'op',
    title: '操作',
  },
];
