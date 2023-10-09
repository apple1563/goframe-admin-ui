import { PrimaryTableCol } from 'tdesign-vue-next';

export const USER_STATUS = {
  ENABLE: 1,
  DISABLE: 2,
  DEAD: 3,
};

export const USER_STATUS_OPTIONS = [
  { value: 1, label: '正常' },
  { value: 2, label: '禁用' },
  { value: 3, label: '注销' },
];

export const COLUMNS: PrimaryTableCol[] = [
  {
    title: '用户名',
    fixed: 'left',
    ellipsis: true,
    align: 'left',
    colKey: 'username',
  },
  { title: '状态', colKey: 'status' },
  {
    title: '角色',
    ellipsis: true,
    colKey: 'roleName',
  },
  {
    title: '直属上级名',
    ellipsis: true,
    colKey: 'pUsername',
  },
  {
    title: '直属上级角色',
    ellipsis: true,
    colKey: 'pRoleName',
  },
  {
    align: 'left',
    fixed: 'right',
    colKey: 'op',
    title: '操作',
  },
];

export const RULES = {
  username: [{ required: true }],
  password: [{ required: true }],
};
