<template>
    <div class="nav_responsive">
        <HeaderResponsiveComponent @showNav="showNav"></HeaderResponsiveComponent>
        <transition name="nav">
            <div class="options_container" v-if="navStatus">
                <div class="close_nav" @click="navStatus = false">
                    <v-icon name="io-close" scale="1.3" fill="black"></v-icon>
                </div>
                <div class="user_data_container">
                    <div class="user_data_icon_container">
                        <v-icon name="fa-user-circle" scale="1.8" fill="black"></v-icon>
                    </div>
                    <div class="data_container">
                        <p class="name">{{ authData.name}}</p>
                        <p class="email">{{ authData.email }}</p>
                    </div>
                </div>
                <div class="lane_container"></div>
                <div class="nav_options">
                    <RouterLink class="nav_option" :to="{name : 'products'}">
                        <div class="icon_container">
                            <v-icon name="bi-shop" hover animation="flash" fill="black"></v-icon>
                        </div>
                        <div class="option_content">
                            <h4>Productos</h4>
                        </div>
                    </RouterLink>
                    <RouterLink class="nav_option" :to="{name : 'userCart'}">
                        <div class="icon_container">
                            <v-icon name="hi-solid-shopping-cart" hover animation="flash" fill="black"></v-icon>
                        </div>
                        <div class="option_content">
                            <h4>Mi carrito</h4>
                        </div>
                    </RouterLink>
                    <RouterLink class="nav_option" :to="{name : 'products'}">
                        <div class="icon_container">
                            <v-icon name="vi-file-type-config" hover animation="flash" fill="black"></v-icon>
                        </div>
                        <div class="option_content">
                            <h4>Configuracion</h4>
                        </div>
                    </RouterLink>
                    <div class="nav_option" @click="closeUserSession">
                        <div class="icon_container">
                            <v-icon name="ri-logout-box-line" hover animation="flash" fill="black"></v-icon>
                        </div>
                        <div class="option_content">
                            <h4>Cerrar sesion</h4>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
    import HeaderResponsiveComponent from '../header/HeaderResponsiveComponent.vue';
    import { defineEmits,ref} from 'vue';
    import { useAuth } from '@/stores/Auth';
    import { RouterLink } from 'vue-router';

    let navStatus = ref(false)

    const emits = defineEmits(["closeSession"]);

    function closeUserSession(){
        emits("closeSession");
    }

    const showNav = ()=>{
        navStatus.value = true
    }

    const authData = useAuth();

</script>

<style scoped>
    *{
        color: var(--negro);
    }
    .nav_responsive{
        position: relative;
    }

    .user_data_container{
        padding: 0px 0 7px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin: 0 0 10px 0;
    }

    .user_data_icon_container{
        margin-right: 5px;
    }

    .user_data_container p{
        margin: 1px 0;
    }
    

    .options_container{
        background: linear-gradient(var(--verde),var(--negro));
        position: fixed;
        height: 100vh;
        box-shadow: -2px 0 10px 1px var(--negro);
        position: absolute;
        width: 80%;
        max-width: 280px;
        top: 0;
        padding: 10px 10px;
        z-index: 2;
    }

    .close_nav{
        display: flex;
        width: 100%;
        justify-content: end;
        margin: 20px 0;
    }

    .lane_container{
        height: 1px;
        width: 100%;
        background: var(--blanco);
    }

    .nav-enter-active{
        animation: showNav 0.5s ease 0s normal none;
    }
    .nav-leave-active{
        animation: ocultNav 0.5s ease 0s normal none;
    }

    .nav_options{
        padding: 10px 0 0 0;
    }

    .nav_option{
        display: flex;
        width: 100%;
        padding: 10px 0;
        align-items: center;
        text-decoration: none;
        cursor: pointer;
    }

    .icon_container{
        margin-right: 10px;
    }

    .option_content h4{
        font-weight: 600;
    }
    

    @media screen and (min-width:600px){
        .nav_responsive{
            display: none;
        }
    }

</style>