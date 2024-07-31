import './assets/main.css'
import "./axios.js"
import "./config/iconsConfig.js"
import 'vue-loading-overlay/dist/css/index.css';

import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon} from "oh-vue-icons";
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import piniaPluginPersistdstate from "pinia-plugin-persistedstate";
import {LoadingPlugin} from 'vue-loading-overlay'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
    
const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistdstate)
app.use(VueSweetalert2);
app.use(pinia)
app.use(LoadingPlugin)
app.use(Vue3Toastify)

app.component("v-icon",OhVueIcon);
app.use(router)

app.mount('#app')
