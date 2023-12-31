// import { UploadFile } from 'tdesign-vue-next';

export const RULES = {
  type: [{ required: true }],
  title: [
    { required: true },
    { validator: (val: string) => val.length < 20, message: '不能超过 20 个字，中文长度等于英文长度' },
  ],
  path: [{ required: true }],
  name: [{ required: true }],
  component: [{ required: true }],
};

export const INITIAL_DATA = {
  title: '',
  type: 2,
  pid: 0,
  icon: '',
  path: '',
  name: '',
  component: '',
  redirect: '',
  activeMenu: '',
  sort: 0,
  frameSrc: '',
  isRoot: 2,
  affix: 2,
  alwaysShow: 1,
  keepAlive: 2,
  hidden: 2,
  isFrame: 2,
  status: 1,
};

// 0表示无上级
export const INITIAL_TREE = [{ id: 0, title: '' }];
