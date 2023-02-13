import { createApp } from 'vue'

import App from './App.vue'
import router from "./router/router";
import global from './components/global/global';

import './assets/main.css'
import './assets/normalize.css'

const app = createApp(App);
app.use(router);
app.config.globalProperties.$global = global;
app.mount('#app');
