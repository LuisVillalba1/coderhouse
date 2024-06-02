<template>
    <div class="change_password_container">
        <changePasswordComponentVue></changePasswordComponentVue>
    </div>
</template>

<script setup>
    import changePasswordComponentVue from "../components/changePasswordComponent.vue";
</script>

<style scoped>
    .change_password_container{
        background: var(--grisOscuro);
        min-height: 100vh;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
</style>