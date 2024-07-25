<template>
    <div class="cart_main_container" v-if="cartStore.cartProducts">
        <div class="head_main_content">
            <h2>Carrito de compras</h2>
        </div>
        <div class="products_list_container">
            <CartProductsList></CartProductsList>
        </div>
        <div class="purcharse_container" v-if="cartStore.cartProducts.length > 0">
            <div class="total_container">
                <h3>Total: ${{ cartStore.totalPrice }}</h3>
            </div>
            <div class="purcharse_container" @click="purcharse">
                <div class="purcharse_content">
                    <h4>Comprar</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore';
import CartProductsList from '@/components/user/cart/list/CartProductsList.vue';
import { toast } from 'vue3-toastify';

let cartStore = useCartStore();


async function purcharse(){
    try{
        let response = await cartStore.purcharseProducts();
        cartStore.cartProducts = [];
        cartStore.totalPrice = 0;
        alert(response.data.message)
    }
    catch(e){
        console.log(e);
        errorPurcharse(e.response.data.message)
    }
}

function errorPurcharse(message){
        toast.error(message,{
            autoClose:2000,
            theme : "dark",
        });
    }

</script>

<style scoped>
* {
    color: var(--negro);
}

.cart_main_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 5px;
}

.head_main_content {
    padding-bottom: 20px;
}

.head_main_content h2 {
    font-weight: 700;
}

.products_list_container {
    width: 100%;
}

.purcharse_container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.total_container{
    padding: 10px 0;
}

.total_container h3{
    font-weight: 700;
    color: var(--verde);
}

.purcharse_container{
    display: flex;
    width: 100%;
    justify-content: center;
}

.purcharse_content{
    padding: 10px 30px;
    background: var(--verde);
    border-radius: 15px;
    cursor: pointer;
}

.purcharse_content h4{
    font-weight: 600;
    color: var(--blanco);
}

</style>