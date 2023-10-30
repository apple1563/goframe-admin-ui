import { PrimaryTableCol } from 'tdesign-vue-next';

export const RULES = {
  configKey: [{ required: true }],
  configValue: [{ required: true }],
};

export const INITIAL_DATA = {};

export const COLUMNS: PrimaryTableCol[] = [
  {
    title: '标题',
    fixed: 'left',
    ellipsis: true,
    align: 'left',
    colKey: 'title',
  },
  {
    title: '内容',
    ellipsis: true,
    colKey: 'content',
  },
  {
    title: '标签',
    ellipsis: true,
    colKey: 'tag',
  },
  {
    title: '排序',
    ellipsis: true,
    colKey: 'sort',
  },
  {
    title: '创建者',
    ellipsis: true,
    colKey: 'creater',
  },
  {
    title: '创建时间',
    ellipsis: true,
    colKey: 'createdAt',
  },
  {
    title: '更新时间',
    ellipsis: true,
    colKey: 'updatedAt',
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
