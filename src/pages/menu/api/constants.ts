import { PrimaryTableCol } from 'tdesign-vue-next';

export const ROLE_STATUS = {
  ENABLE: 1,
  DISABLE: 2,
};

export const RULES = {
  url: [{ required: true }],
  method: [{ required: true }],
};

export const INITIAL_DATA = {
  url: '',
  method: '',
  group: '',
  remark: '',
};

export const COLUMNS: PrimaryTableCol[] = [
  {
    title: 'id',
    fixed: 'left',
    ellipsis: true,
    align: 'left',
    colKey: 'id',
  },
  {
    title: 'url',
    ellipsis: true,
    colKey: 'url',
  },
  {
    title: 'method',
    ellipsis: true,
    colKey: 'method',
  },
  {
    title: 'group',
    ellipsis: true,
    colKey: 'group',
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
