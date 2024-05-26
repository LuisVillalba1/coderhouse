<template>
    <NavResponsiveComponent :optionsNav="optionsNavContainer" @closeSession="deleteSession"></NavResponsiveComponent>
    <div class="nav_tablet_container" :class="{'show_nav' : showData }">
        <div class="header_nav">
            <div class="vue_icon_container">
                <v-icon name="vi-file-type-vue" scale="1.7"></v-icon>
            </div>
            <div :class="{'icon_account' : !showData , 'icon_account_ocult' : showData}">
                    <v-icon name="bi-skip-forward" scale="1.7" @click="showData = !showData"></v-icon>
            </div>
            <div :class="{'header_content' : !showData, 'header_content_show' : showData}">
                <div class="user_data_container" v-if="showData">
                    <div class="user_icon_container">
                        <v-icon name="fa-user-circle" scale="1.8"></v-icon>
                    </div>
                    <div class="user_data">
                        <p class="name">{{ authStore.name }}</p>
                        <p class="email">{{ authStore.email }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="menu_title" v-if="showData">
            <h5>Menu</h5>
        </div>
        <div class="options_nav">
            <template v-for="(value,index) in optionsNavContainer" :key="value.name + index">
                <div class="option_container" :class="{'option_container_show' : showData, 'option_container_ocult' : !showData}">
                    <div :class="{'icon_container' : !showData, 'icon_container_show' : showData}" v-if="value.name == 'Cerrar sesion'" @click="deleteSession">
                        <v-icon :name="value.icon" scale="1.5" fill="white"></v-icon>
                    </div>
                    <div :class="{'icon_container' : !showData, 'icon_container_show' : showData}" v-else>
                        <v-icon :name="value.icon" scale="1.5" fill="white"></v-icon>
                    </div>
                    <transition name="show_names">
                        <div class="data_option_container" v-if="showData">
                            <div class="data_option" v-if="value.name == 'Cerrar sesion'" @click="deleteSession">
                                <h4>{{ value.name }}</h4>
                            </div>
                            <div class="data_option" v-else>
                                <h4>{{ value.name }}</h4>
                            </div>
                        </div>
                    </transition>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
    import NavResponsiveComponent from "./NavResponsiveComponent.vue";
    import {ref,onBeforeMount,reactive} from "vue";
    import { useAuth } from "@/stores/Auth";

    
    let showData  = ref(false)

    const optionsNavContainer = [
        {
            name : "Productos",
            icon : "bi-shop"
        },
        {
            name : "Mi carrito",
            icon : "hi-solid-shopping-cart"
        },
        {
            name : "Configuracion",
            icon : "vi-file-type-config"
        },
        {
            name : "Cerrar sesion",
            icon : "ri-logout-box-line"
        }
    ]
    
    let userData = reactive({
        name : '',
        email : ''
    })

    let authStore = useAuth();

    onBeforeMount(async()=>{
        userData.name = authStore.name;
        userData.email =  authStore.email;
    })

    const deleteSession = async()=>{
        try{
            let data = await authStore.deleteSession();
            console.log(data)
        }
        catch(e){
            console.log(e);
        }
    }

</script>

<style scoped>
      .nav_tablet_container{
        height: 100%;
        min-height: 100vh;
        position: fixed;
        width: 50px;
        background: linear-gradient(var(--negroClaro),var(--verde));
        display: none;
        z-index: 2;
    }

    .header_nav{
        margin-bottom: 5px;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        position: relative;
    }

    .show_nav{
        width: 300px;
        transition: 0.2s ease-out;
    }

    .show_nav .header_nav{
        justify-content: space-around;
    }

    .vue_icon_container{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

    .icon_account{
        display: flex;
        justify-content: center;
        transition: 0.3s ease-in-out;
        cursor: pointer;
    }

    .icon_account_ocult{
        position: absolute;
        right: 5px;
        top: 0;
        rotate: 180deg;
        transition: 0.3s ease-in-out;
        cursor: pointer;
    }

    .header_content{
        display: flex;
        justify-content: center;
    }

    .header_content_show{
        display: flex;
        width: 100%;
        padding: 0 10px;
    }

    .user_data_container{
        margin-left: 3px;
        transition: 0.4s ease-out;
        display: flex;
        align-items: center;
    }

    .user_data{
        margin-left: 3px;
    }

    .menu_title{
        width: 100%;
        padding: 0 13px;
    }

    .menu_title h5{
        font-size: 0.8em;
        font-weight: 600;
    }


    .options_nav{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }

    .option_container{
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .option_container:hover{
        background: var(--negroClaro);
        border-right: 3px solid var(--blanco);
    }

    .option_container_ocult{
        justify-content: center;
        padding: 10px 0;
    }

    .option_container_show{
        width: 100%;
        display: flex;
        padding: 13px 10px;
        align-items: center;
        cursor: pointer;
    }

    .option_container_show .data_option{
        margin-left: 5px;
    }

    .show_names-enter-from{
        opacity: 0;
    }

    .show_names-enter-active{
        transition: opacity 0.8s ease;
    }


   @media screen and (min-width:600px){
        .nav_tablet_container{
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 10px 0;
            transition: 0.2s ease-in-out;
        }
   }
</style>