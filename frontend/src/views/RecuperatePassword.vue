<template>
    <div class="recuperate_account_container">
        <RecuperateAccountComponentVue></RecuperateAccountComponentVue>
    </div>
</template>

<script setup>
    import RecuperateAccountComponentVue from "../components/RecuperateAccountComponent.vue";
</script>

<style scoped>
    .recuperate_account_container{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-image: url("/mongo-fondo.png");
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>