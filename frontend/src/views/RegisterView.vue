<template>
    <div class="main_container">
        <RegisterComponent></RegisterComponent>
    </div>
</template>

<script setup>
    import RegisterComponent from '@/components/RegisterComponent.vue';
</script>

<style scoped>
    .main_container{
    width: 100%;
    min-height: 100vh;
    background-image: url("/mongo-fondo.png");
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    }


</style>