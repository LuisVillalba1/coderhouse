<template>
    <div class="loader">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
</template>

<script setup>
 
</script>

<style scoped>
    .loader{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px 0;
    }
    .dot{
        border-radius: 100%;
        border: 5px solid var(--verde);
        margin: 0 10px;
        background: var(--verde);
        padding: 3px;
    }
    .dot:nth-child(1){
        animation: preloader 0.6s ease 0s infinite alternate;
    }
    .dot:nth-child(2){
        animation: preloader 0.6s ease-in-out 0.2s alternate infinite;
    }
    .dot:nth-child(3){
        animation: preloader 0.6s ease-in-out 0.4s alternate infinite;
    }

    @keyframes preloader{
        100%{
            transform: scale(1.6);
        }
    }
</style>