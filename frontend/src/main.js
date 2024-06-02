import './assets/main.css'
import "./axios.js"
import "./config/iconsConfig.js"
import 'vue-loading-overlay/dist/css/index.css';

import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon} from "oh-vue-icons";
import piniaPluginPersistdstate from "pinia-plugin-persistedstate";
import {LoadingPlugin} from 'vue-loading-overlay'
    
const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistdstate)
app.use(pinia)
app.use(LoadingPlugin)

app.component("v-icon",OhVueIcon);
app.use(router)

app.mount('#app')
