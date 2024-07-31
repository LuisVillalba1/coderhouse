<template>
    <div class="user_list">
        <div class="search_container">
            <div class="input_container">
                <input type="text" placeholder="buscar usuario por su nombre" v-model="searchInput" @input="searchUserInput">
                <v-icon name="bi-search" fill="black"></v-icon>
            </div>
        </div>
        <div class="user_list_content" v-if="userStore.users">
            <div class="user" v-for="(item, index) in userStore.filterUsers" :key="index">
                <div class="user_information">
                    <div class="user_name_container">
                        <p>Nombre:</p>
                        <p class="user_name">{{ item.name }}</p>
                    </div>
                    <div class="email_data">
                        <p>Email:</p>
                        <p class="email">{{ item.email }}</p>
                    </div>
                </div>
                <div class="delete_user_container">
                    <div class="delete_user_button" @click="deleteUser(item.name,item._id)">
                        <p>Eliminar</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore';
import { onMounted,ref} from 'vue';
import { showAlertConfirm } from '@/composables/alerts/confirm/alert';
import { showAlertSuccess } from '@/composables/alerts/succes/alert';
import { showAlertError } from '@/composables/alerts/error/alert';

let userStore = useUserStore();

let searchInput = ref(null)

//pedimos reconfirmar al administrados para que elimine al usuario
function deleteUser(userName,userID){
    showAlertConfirm(`¿Estas seguro que quieres eliminar al usuario "${userName}"?.Esta accion sera permanente`,deleteUserAction.bind(null,userID));
}

//eliminamos al usuario
async function deleteUserAction(userID){
    try{
        let response = await userStore.deleteUser(userID);
        let userIndex = userStore.users.findIndex(item=>item._id === userID);
        userStore.users.splice(userIndex,1);
        userStore.filterUsers = userStore.users
        searchInput.value = null

        //mostramos una alerta de que toda a salido bien
        showAlertSuccess(response);
    }
    catch(e){
        console.log(e)
        showAlertError(e.response.data.message)
    }
}

//filtramos los usuario
function searchUserInput(e){
    if(searchInput.value === ''){
        userStore.filterUsers = userStore.users
        return 
    }
    userStore.filterUsers = userStore.users.filter(item=>item.name.includes(searchInput.value))
}

//obtenemos todos los usuario una vez cargada la pagina
onMounted(async () => {
    try {
        await userStore.getAllUsers();
    }
    catch (e) {
        console.log(e);
    }
})

</script>

<style scoped>
* {
    color: var(--negro);
}

.user_list {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
}

.search_container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.input_container {
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
}

.search_container input {
    width: 100%;
    padding: 8px 24px 10px 4px;
    border-radius: 5px;
    outline: none;
    border: 1px solid var(--grisOscuro);
    color: var(--negro);
}

.ov-icon {
    position: absolute;
    right: -20px;
    transform: translateX(-25px);
}

.user_list_content{
    padding: 10px 0;
}

.user {
    padding: 8px;
    display: flex;
    align-items: center;
}

.user:first-child {
    border-top: 1px solid var(--negro);
}

.user:nth-child(2n+1) {
    border-right: 1px solid var(--negro);
    border-left: 1px solid var(--negro);
}

.user:nth-child(2n) {
    border: 1px solid var(--negro);
}

.user:last-child{
    border-bottom: 1px solid var(--negro);
}

.user>div {
    display: flex;
}

.user_information{
    flex-direction: column;
}

.user_information > div{
    padding: 2px 0;
}

.user_name_container p:first-child {
    padding-right: 4px;
}

.user_name {
    font-weight: bold;
}

.email{
    font-weight: bold;
}

.delete_user_container{
    flex-grow: 1;
    display: flex;
    justify-content: end;
}

.delete_user_button{
    padding: 14px 20px;
    border-radius: 15px;
    background: var(--rojo);
    cursor: pointer;
}

.delete_user_button p{
    color: var(--blanco);
}

</style>