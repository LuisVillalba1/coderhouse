<template>
    <div class="user_list_container">
        <h2>Lista de usuarios</h2>
        <UserListComponent></UserListComponent>
    </div>
</template>

<script setup>
    import UserListComponent from '@/components/admin/UserListComponent.vue';
</script>

<style scoped>
    *{
        color: var(--negro);
    }
    .user_list_container{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .user_list_container h2{
        font-weight: 700;
        padding: 40px 0;
    }
</style>