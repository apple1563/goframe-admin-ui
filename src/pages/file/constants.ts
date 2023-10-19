import { PrimaryTableCol } from 'tdesign-vue-next';

export const RULES = {
  drive: [{ required: true }],
  file: [{ required: true }],
};

export const INITIAL_DATA = {};

export const COLUMNS: PrimaryTableCol[] = [
  /* {
    title: 'id',
    fixed: 'left',
    ellipsis: true,
    align: 'left',
    colKey: 'id',
  }, */
  {
    title: '文件原始名',
    ellipsis: true,
    colKey: 'originName',
  },
  {
    title: '文件路径',
    ellipsis: true,
    colKey: 'fileUrl',
  },
  {
    title: '上传驱动',
    ellipsis: true,
    colKey: 'drive',
  },
  {
    title: 'size(byte)',
    ellipsis: true,
    colKey: 'size',
  },
  {
    title: '文件后缀',
    ellipsis: true,
    colKey: 'ext',
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
