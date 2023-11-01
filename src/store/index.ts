import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const store = createPinia();
store.use(createPersistedState());

export { store };

export * from './modules/api';
export * from './modules/button';
export * from './modules/dict';
export * from './modules/file';
export * from './modules/log';
export * from './modules/menu';
export * from './modules/notice';
export * from './modules/notice-receiver';
export * from './modules/notification';
export * from './modules/permission';
export * from './modules/role';
export * from './modules/self';
export * from './modules/setting';
export * from './modules/tabs-router';
export * from './modules/user';

export default store;
