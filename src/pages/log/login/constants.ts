import { PrimaryTableCol } from 'tdesign-vue-next';

export const COLUMNS: PrimaryTableCol[] = [
  {
    title: '账号',
    fixed: 'left',
    ellipsis: true,
    align: 'left',
    colKey: 'username',
  },
  {
    title: '角色',
    ellipsis: true,
    colKey: 'roleName',
  },
  {
    title: '上级',
    ellipsis: true,
    colKey: 'pUsername',
  },
  {
    title: '浏览器',
    ellipsis: true,
    colKey: 'clientAgent',
  },
  {
    title: 'ip',
    ellipsis: true,
    colKey: 'ip',
  },
  {
    title: '时间',
    ellipsis: true,
    colKey: 'updatedAt',
  },
  /* {
    align: 'left',
    fixed: 'right',
    colKey: 'op',
    title: '操作',
  }, */
];
