<template>
    <div class="form_container">
        <div class="login_with_container">
            <div class="github_container" @click="githubAuth">
                <v-icon name="bi-github"></v-icon>
                <h4>Ingresar con Github</h4>
            </div>
        </div>
        <div class="title_container">
            <h2>Iniciar sesion</h2>
        </div>
        <form class="form_data_container" @submit.prevent="">
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
        <div class="forgot_password_container">
            <p>¿Olvidaste tu contraseña?</p>
            <RouterLink to="/recuperateAccount">Recuperala</RouterLink>
        </div>
        <div class="send_form_container" @click="login">
            <p>Iniciar sesion</p>
        </div>
        <div class="register_container">
            <p>¿Aun no tienes una cuenta?.<RouterLink to="/register">Registrate</RouterLink></p>
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref} from 'vue';
    import {RouterLink} from "vue-router"
    import { useAuth } from '@/stores/Auth';
    import { useLabelAuthComposable } from '@/composables/LabelAuthComposable';
    import router from '@/router';
    

    const labelTransform = reactive({
        email : false,
        password : false
    })

    const inputsValues = reactive({
        email : '',
        password : ''
    })

    let errorMessage = ref('')

    const auth = useAuth();

    const login = async()=>{
        errorMessage.value = false;
        try{
            const response = await auth.login(inputsValues.email,inputsValues.password)
            router.push("/products")
        }
        catch(e){
            console.log(e);
            errorMessage.value = e.response.data.message;
        }
    }

    const {focusInput,blurInput} = useLabelAuthComposable()

    const githubAuth = async()=>{
        try{
            await auth.githubAuth();
        }
        catch(e){
            console.log(e)
        }
    }
</script>

<style scoped>
    .form_container{
        padding: 70px 30px;
        background-color: var(--transparent);
        backdrop-filter: blur(10px);
        border-radius: 8px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        max-width: 480px;
        height: 500px;
    }

    .github_container{
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 8px 10px;
        border-radius: 14px;
        background: var(--negro);
        cursor: pointer;
    }

    .github_container{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .github_container h4{
        margin-left: 3px;
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

    .forgot_password_container{
        display: flex;
        width: 100%;
        justify-content: end;
    }


    .forgot_password_container a{
        margin-left: 5px;
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

    .register_container p a{
        margin: 0 5px;
    }

    .error_form{
        padding: 5px 0;
    }

    .error-enter-active{
        animation: showError 0.5s ease 0s normal none;
    }

    .error-leave-active{
        animation: leaveError 0.5s ease 0s normal none;
    }

    @keyframes showError{
    0%{
        opacity: 0;
    }
    10%{
        color: red;
        transform: translateX(20px);
    }
    20%{
        color: red;
        transform: translateX(8px);
    }
    50%{
        color: red;
        transform: translateX(-5px);
    }
}

@keyframes leaveError{
    from{
        opacity: 0;
    }
    to{
        transform: translateX(-20px);
    }
}
</style>