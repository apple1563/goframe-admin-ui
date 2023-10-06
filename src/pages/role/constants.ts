import { PrimaryTableCol } from 'tdesign-vue-next';

export const ROLE_STATUS = {
  ENABLE: 1,
  DISABLE: 2,
};

export const RULES = {
  name: [{ required: true }],
};

export const INITIAL_DATA = {
  status: 1,
};

export const COLUMNS: PrimaryTableCol[] = [
  {
    title: '角色名',
    fixed: 'left',
    ellipsis: true,
    align: 'left',
    colKey: 'name',
  },
  { title: '角色状态', colKey: 'status', width: 160 },
  {
    title: '排序',
    ellipsis: true,
    colKey: 'listOrder',
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
