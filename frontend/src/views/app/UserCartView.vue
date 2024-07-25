<template>
    <div class="main_container">
        <NavComponent></NavComponent>
        <div class="main_content">
            <UsercartComponent></UsercartComponent>
        </div>
    </div>
</template>

<script setup>
import NavComponent from '@/components/navs/NavComponent.vue';
import UsercartComponent from "@/components/user/cart/UserCartComponent.vue";
import { useLoading } from 'vue-loading-overlay';
import { globalLoadingProps } from '@/loaderConfig';
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/stores/cartStore';

let cartStore = useCartStore();

onMounted(async () => {
    let $loading = useLoading(globalLoadingProps());
    let loader = $loading.show();
    try{
        let response = await cartStore.getCartsProducts();
        loader.hide();
    }
    catch(e){
        loader.hide();
        console.log(e);
        alert("ha ocurrido un error al obtener los productos del carrito")
    }
});

</script>

<style scoped>
* {
    color: var(--negro);
}

.main_container {
    height: 100%;
    min-height: 120vh;
    width: 100%;
    background: var(--blanco);
}

@media screen and (min-width:600px) {
    .main_container {
        display: flex;
    }

    .main_content {
        margin-left: 50px;
        width: 100%;
    }
}
</style>