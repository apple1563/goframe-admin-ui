/* eslint-disable simple-import-sort/imports */
import TDesign from 'tdesign-vue-next';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { store } from './store';

import 'tdesign-vue-next/es/style/index.css';
import '@/style/index.less';
import './permission';
import AuthButton from '@/directive/AuthButton';

const app = createApp(App);

app.use(TDesign);
app.use(store);
app.use(router);
app.directive('auth-button', AuthButton);
app.mount('#app');
