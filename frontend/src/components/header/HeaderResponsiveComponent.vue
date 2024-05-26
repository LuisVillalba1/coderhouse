<template>
    <header>
        <div class="nav_responsive_open">
            <v-icon name="io-options-outline" scale="1.4" @click="showNav"></v-icon>
        </div>
        <div class="config_container">
            <v-icon name="vi-file-type-config" scale="1.4"></v-icon>
        </div>
    </header>
</template>

<script setup>
    import { defineEmits} from 'vue';

    const emits = defineEmits(["showNav"]);

    const showNav = ()=>{
        emits("showNav")
    }

</script>

<style scoped>
    header{
        width: 100%;
        display: flex;
        padding: 8px 10px;
        justify-content: space-between;
        background: var(--verde);
    }
    .nav_responsive_open{
        cursor: pointer;
    }
</style>