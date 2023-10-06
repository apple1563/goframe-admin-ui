import { PrimaryTableCol } from 'tdesign-vue-next';

export const ROLE_STATUS = {
  ENABLE: 1,
  DISABLE: 2,
};

export const RULES = {
  name: [{ required: true }],
  title: [{ required: true }],
};

export const INITIAL_DATA = {
  title: '',
  name: '',
  menuId: 0,
};

export const COLUMNS: PrimaryTableCol[] = [
  {
    title: '按钮名',
    fixed: 'left',
    ellipsis: true,
    align: 'left',
    colKey: 'title',
  },
  {
    title: '按钮标识',
    ellipsis: true,
    colKey: 'name',
  },
  {
    title: '所在菜单',
    ellipsis: true,
    colKey: 'menuTitle',
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
