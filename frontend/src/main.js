import './assets/main.css'
import "./axios.js"
import 'vue-loading-overlay/dist/css/index.css';

import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import piniaPluginPersistdstate from "pinia-plugin-persistedstate";
import {LoadingPlugin,useLoading} from 'vue-loading-overlay'
import { 
    CoMediaStepBackward,BiGithub,BiShop,HiSolidShoppingCart,ViFileTypeConfig,
    FaGreaterThan,FaUserCircle,IoOptionsOutline,IoClose,RiLogoutBoxLine 
    ,BiSkipForward ,ViFileTypeVue 
} from "oh-vue-icons/icons";

addIcons(CoMediaStepBackward,BiGithub,BiShop,HiSolidShoppingCart,ViFileTypeConfig,FaGreaterThan,RiLogoutBoxLine,
    FaUserCircle,IoOptionsOutline,IoClose,BiSkipForward,ViFileTypeVue);
    
const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistdstate)
app.use(pinia)
app.use(LoadingPlugin)

app.component("v-icon",OhVueIcon);
app.use(router)

app.mount('#app')
