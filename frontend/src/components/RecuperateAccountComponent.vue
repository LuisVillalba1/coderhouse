<template>
    <form class="recuperate_account_form" @submit.prevent>
        <div class="redirect_back_container">
            <RouterLink to="/login">
                <v-icon name="co-media-step-backward" animation="pulse" :hover="true"></v-icon>
            </RouterLink>
        </div>
        <div class="title_form">
            <h2>¿Olvidaste tu contraseña?</h2>
        </div>
        <div class="information_recuperate_container">
            <p>Introduce el correo electronico vinculado a tu cuenta y vamos a enviarte las instrucciones por email.</p>
        </div>
        <div class="input_container">
            <div class="icon_container">
                <v-icon name="md-email-outlined" scale="1.3"></v-icon>
            </div>
            <input type="email" autocomplete="email" v-model="email">
        </div>
        <div class="error_form_container">
            <p>{{ erroFormMessage }}</p>
        </div>
        <div class="exit_form_container">
            <p>{{ correctFormMessage }}</p>
        </div>
        <div class="send_form_container">
            <div class="send_form_button" @click="sendForm">
                <p>Recuperar cuenta</p>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '@/stores/Auth';
import { useLoading } from 'vue-loading-overlay';
import { globalLoadingProps } from '@/loaderConfig';

const store = useAuth();

let email = ref("");

let correctFormMessage = ref("");
let erroFormMessage = ref("");


const sendForm = async () => {
    erroFormMessage.value = "";
    correctFormMessage.value = "";
    let loading = useLoading(globalLoadingProps());
    let loader = loading.show();
    try {
        let response = await store.recuperateAccount(email.value);
        loader.hide();
        console.log(response);
        if (response.status == 200) {
            correctFormMessage.value = response.data.message;
        }

    }
    catch (e) {
        console.log(e);
        erroFormMessage.value = e.response.data.error;
        loader.hide();
    }
}
</script>

<style scoped>
.recuperate_account_form {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--transparent);
    backdrop-filter: blur(5px);
    padding: 15px 10px;
    border-radius: 8px;
    position: relative;
}

.redirect_back_container{
    position: absolute;
    top: 5px;
    left: 5px;
}

.redirect_back_container a .ov-icon{
    width: 30px;
    height: 30px;
}

.title_form {
    padding: 8px 0;
}

.title_form h2 {
    color: var(--negro);
    font-weight: 600;
}

.information_recuperate_container {
    padding: 10px 0;
}

.information_recuperate_container p {
    text-align: center;
}

.icon_container {
    margin-right: 5px;
}

.input_container {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 10px 0 8px 0;
}

.input_container input {
    width: 100%;
    border: 1px solid var(--azul);
    padding: 5px 10px 5px 15px;
    background: transparent;
    outline: none;
    font-size: 16px;
}

.error_form_container {
    padding: 5px 0;
}

.error_form_container p {
    color: var(--rojo);
    font-weight: 600;
}

.exit_form_container {
    padding: 5px;
}

.exit_form_container p {
    color: var(--verde);
    font-weight: 600;
}

.send_form_container {
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 20px 0;
    cursor: pointer;
}

.send_form_button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 8px 10px;
    background: var(--azul);
}
</style>