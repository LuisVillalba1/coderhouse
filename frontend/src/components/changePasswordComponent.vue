<template>
    <form class="change_password_form" @submit.prevent>
        <div class="title_form_container">
            <h2>Cambiar contraseña</h2>
        </div>
        <div class="inputs_container">
            <div class="input_container">
                <label for="password">Nueva contraseña</label>
                <div class="input_content_container">
                    <input :type="showPassword ? 'text' : 'password'" name="password" id="password" autocomplete="new-password" v-model="formData.password">
                    <div class="icon_container" @click="showPassword = !showPassword">
                        <v-icon name="bi-eye-slash-fill" scale="1.3" fill="rgb(21, 21, 21)" v-if="showPassword"></v-icon>
                        <v-icon name="bi-eye-fill" scale="1.3" fill="rgb(21, 21, 21)" v-else></v-icon>
                    </div>
                </div>
            </div>
            <div class="input_container">
                <label for="password_repeat">Confirmar contraseña</label>
                <div class="input_content_container">
                    <input :type="showPassword ? 'text' : 'password'" name="repeatPassword" id="password_repeat" autocomplete="new-password" v-model="formData.repeatPassword">
                    <div class="icon_container">
                        <v-icon name="bi-eye-slash-fill" scale="1.3" fill="rgb(21, 21, 21)" v-if="showPassword"></v-icon>
                        <v-icon name="bi-eye-fill" scale="1.3" fill="rgb(21, 21, 21)" v-else></v-icon>
                    </div>
                </div>
            </div>
        </div>
        <div class="error_form" v-if="errorMessage">
            <p>{{ errorMessage }}</p>
        </div>
        <div class="successful_form" v-if="successfulForm">
            <p>{{ successfulForm }}</p>
        </div>
        <div class="send_form_container">
            <div class="send_form_button" @click="sendForm">
                <h4>Enviar</h4>
            </div>
        </div>
    </form>
</template>

<script setup>
    import { ref,reactive} from 'vue';
    import { useAuth } from '@/stores/Auth';
    import { useLoading } from 'vue-loading-overlay';
    import { globalLoadingProps } from '@/loaderConfig';

    const store = useAuth();

    let showPassword = ref(false);

    let errorMessage = ref("");
    let successfulForm = ref("");

    let formData = reactive({
        password : "",
        repeatPassword : ""
    });

    //enviamos el formulario
    const sendForm = async()=>{
        let loading = useLoading(globalLoadingProps());
        let loader = loading.show();
        errorMessage.value = "";
        successfulForm.value = ""
        try{
            let response = await store.changePassword(formData);
            loader.hide();
            successfulForm.value = response.data.message;
        }
        catch(e){
            loader.hide();
            errorMessage.value = e.response.data.error;
        }
    }


</script>

<style scoped>
    *{
        color: var(--negro);
    }
    .change_password_form{
        background: var(--blanco);
        border-radius: 2px;
        width: 100%;
        max-width: 500px;
        padding: 30px;
    }

    .title_form_container{
        padding: 10px 0;
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .title_form_container h2{
        font-weight: 500;
    }

    .inputs_container{
        padding: 8px 0;
    }

    .input_container{
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 20px 0;
    }

    .input_container label{
        padding-bottom: 3px;
    }

    .input_content_container{
        position: relative;
        border-bottom: 1px solid var(--grisOscuro);
    }

    .input_content_container input{
        border: none;
        outline: none;
        padding: 10px 25px 5px 0;
        background: transparent;
        width: 100%;
    }

    .icon_container{
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .error_form{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .error_form p{
        padding: 5px 0 20px 0;
        color: var(--rojo);
        font-weight: 500;
    }

    .successful_form{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .successful_form p{
        padding: 5px 0 20px 0;
        color: var(--verde);
        font-weight: 500;
    }

    .send_form_container{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .send_form_button{
        width: 100%;
        background: var(--azul);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 10px;
        border-radius: 20px;
        cursor: pointer;
    }

    .send_form_button h4{
        color: var(--blanco);
        font-weight: 500;
    }

</style>