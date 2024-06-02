<template>
    <div class="register_content_container">
        <transition name="register">
        <div class="succes_register_container" v-if="succesRegister">
            <h3>Su cuenta ha sido creada con exito</h3>
        </div>
    </transition>
    <div class="form_container">
        <RouterLink to="/login">
            <v-icon name="co-media-step-backward" animation="pulse" :hover="true"></v-icon>
        </RouterLink>
        <div class="img_container">
            <img src="/coderhouse.png" alt="coder-logo">
        </div>
        <div class="title_container">
            <h2>Registrarse</h2>
        </div>
        <form class="form_data_container" @submit.prevent="">
            <div class="input_container">
                <transition>
                    <label for="name" :key="labelTransform.name" :class="{'label_transform' : labelTransform.name}">Nombre</label>
                </transition>
                <input type="text" id="name" name="name" autocomplete="name" v-model="inputsValues.name" @focus="focusInput(labelTransform,'name',inputsValues.name)" @blur="blurInput(labelTransform,'name',inputsValues.name)">
            </div>
            <div class="input_container">
                <transition>
                    <label for="apellido" :key="labelTransform.lastname" :class="{'label_transform' : labelTransform.lastname}">Apellido</label>
                </transition>
                <input type="text" id="apellido" name="apellido" autocomplete="family-name" v-model="inputsValues.lastname" @focus="focusInput(labelTransform,'lastname',inputsValues.lastname)" @blur="blurInput(labelTransform,'lastname',inputsValues.lastname)">
            </div>
            <div class="input_container">
                <transition>
                    <label for="email" :key="labelTransform.email" :class="{'label_transform' : labelTransform.email}">Email</label>
                </transition>
                <input type="text" id="email" name="email" autocomplete="email" v-model="inputsValues.email" @focus="focusInput(labelTransform,'email',inputsValues.email)" @blur="blurInput(labelTransform,'email',inputsValues.email)">
            </div>
            <div class="input_container">
                <transition>
                    <label for="password" :key="labelTransform.password" :class="{'label_transform' : labelTransform.password}">Contraseña</label>
                </transition>
                <input type="password" id="password" name="password" autocomplete="current-password" v-model="inputsValues.password" @focus="focusInput(labelTransform,'password',inputsValues.password)" @blur="blurInput(labelTransform,'password',inputsValues.password)">
            </div>
        </form>
        <div class="error_form_container">
            <transition name="error">
                <p v-if="errorMessage" class="error_form">{{ errorMessage }}</p>
            </transition>
        </div>
        <div class="send_form_container" @click="register">
            <p>Registrarse</p>
        </div>
    </div>
    </div>
</template>

<script setup>
    import {reactive,ref} from "vue";
    import { useAuth } from "@/stores/Auth";
    import { RouterLink } from "vue-router";
    import { useLabelAuthComposable } from '@/composables/LabelAuthComposable';

    const labelTransform = reactive({
        name : false,
        lastname : false,
        email : false,
        password : false

    })

    const inputsValues = reactive({
        name : '',
        lastname : '',
        email : '',
        password : ''
    })


    let errorMessage = ref(false)
    let succesRegister = ref(false);


    const service = useAuth();

    const register = async ()=>{
        try{
            const response = await service.register(inputsValues.name,inputsValues.lastname,inputsValues.email,inputsValues.password);
            succesRegister.value = true
        }
        catch(e){
            console.log(e);
            errorMessage.value = e.response.data.message;
        }
    }

    const {focusInput,blurInput} = useLabelAuthComposable()

</script>

<style scoped>
    .register_content_container{
        width: 100%;
        max-width: 480px;
    }
    .succes_register_container{
        position: absolute;
        width: 100%;
        max-width: 480px;
        top: 0;
        margin-left: auto;
        margin-right: auto;
        padding: 8px 0;
        border-radius: 20px;
        background: var(--verde);
    }

    .succes_register_container h3{
        text-align: center;
        padding: 3px;
        color: var(--blanco);
    }

    .register-enter-active{
        animation: succesRegister 0.3s ease 0s normal none;
    }

    .form_container{
        padding: 70px 30px;
        background-color: var(--transparent);
        backdrop-filter: blur(10px);
        border-radius: 8px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 500px;
        animation: rotate 1s ease 0s normal none;
        position: relative;
    }

    .ov-icon{
        position: absolute;
        top: 5px;
        left: 5px;
        width: 30px;
        height: 30px;
    }

    .img_container{
        width: 100%;
        height: 80px;
    }

    .img_container img{
        width: 100%;
        height: 100%;
    }
    .title_container{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .title_container h2{
        padding: 10px 0;
        font-size: 1.5em;
        font-weight: 500;
    }

    .form_data_container{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .input_container{
        width: 100%;
        margin: 10px 0;
        position: relative;
    }

    .input_container label{
        position: absolute;
        top: 8px;
    }

    .label_transform{
        animation: showLabel 1s ease 0s normal none;
        transform: translateY(-22px);
    }

    .v-leave-active{
        animation: ocultLabel 0.6s ease 0s normal none;
    }

    .input_container input{
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--blanco);
        outline: none;
        padding: 8px 10px 4px 0;
        font-size: 1em;
    }

    .send_form_container{
        width: 100%;
        border-radius: 14px;
        padding: 8px 15px;
        display: flex;
        justify-content: center;
        background: var(--transparent);
        margin: 10px 0;
        cursor: pointer;
    }

    .error-enter-from{
        opacity: 0;
    }

    .error-enter-active{
        transition: opacity 0.5s ease;
    }

    @keyframes showLabel{
        from {
            transform: translateY(0px);
        }
        to {
            transform: translateY(-22px);
        }
    }

    @keyframes ocultLabel{
        to{
            opacity: 0;
        }
    }

    @keyframes showError{
        0%{
            opacity: 0;
            color: red;
        }
        10%{
            transform: translateX(5px);
            rotate: 3deg;
        }
        20%{
            transform: translateX(5px);
            rotate: -3deg;
        }
    }

    @keyframes succesRegister{
        0%{
            opacity: 0;
            transform: translateY(-100px);
        }
    
    }

</style>