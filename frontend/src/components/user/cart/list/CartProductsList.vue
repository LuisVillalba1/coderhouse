<template>
    <div class="list_products_content">
        <div class="product_container" v-for="(item,index) in cartStore.cartProducts" :key="index">
            <div class="delete_product_container">
                <div class="delete_icon" @click="deleteProduct(item.productID._id)">
                    <v-icon name="bi-trash-fill" fill="black"></v-icon>
                </div>
            </div>
            <div class="product_img_container">
                <img :src="item.productID.thumbnails[0]" :alt="item.title">
            </div>
            <div class="title_container">
                <h3>{{item.productID.title}}</h3>
            </div>
            <div class="add_or_delete_items">
                <div class="rest_item" v-if="item.quantity > 1" @click="changeProducQuantity(item.productID._id,item.quantity - 1)">
                    <v-icon name="ri-subtract-fill" fill="black"></v-icon>
                </div>
                <div class="quantity_current">
                    <h6>{{ item.quantity }}</h6>
                </div>
                <div class="sum_item" @click="changeProducQuantity(item.productID._id,item.quantity + 1)">
                    <v-icon name="md-add-outlined" fill="black"></v-icon>
                </div>
            </div>
            <div class="total_price">
                <h4>${{ item.productID.totalPrice }}</h4>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useCartStore } from '@/stores/cartStore';
    import { toast } from 'vue3-toastify';
    import { useLoading } from 'vue-loading-overlay';
    import { globalLoadingProps } from '@/loaderConfig';
    let cartStore = useCartStore();

    let $loading = useLoading(globalLoadingProps());

    async function changeProducQuantity(pid,quantity){
        let loader = $loading.show();
        try{
            let response = await cartStore.modifiQuantity(pid,quantity);
            loader.hide();
        }
        catch(e){
            loader.hide()
            errorNotification("Error al modificar la cantidad del carrito al carrito");
        }
    }

    function errorNotification(message){
        toast.error(message,{
            autoClose:2000,
            theme : "dark"
        })
    }

    async function deleteProduct(productID){
        let loader = $loading.show();
        let response = await cartStore.deleteProduct(productID);
        try{
            loader.hide();
        }
        catch(e){
            loader.hide();
            errorNotification("Ha ocurrido un error al eliminar el producto del carrito")
        }
    }


</script>

<style scoped>
*{
    color: var(--negro);
}
    .list_products_content{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 0;
    }

    .product_container{
        width: 100%;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 8px;
        padding: 10px;
        border: 1px solid var(--grisOscuro);
        position: relative;
    }


    .product_container > div{
        width: 100%;
    }

    .delete_product_container{
        display: flex;
        justify-content: end;
    }

    .delete_icon{
        cursor: pointer;
    }

    .product_img_container{
        display: flex;
        justify-content: center;
    }

    .product_img_container img{
        width: 100%;
    }

    .title_container{
        padding: 10px 0;
    }

    .title_container h3{
        text-align: center;
    }

    .add_or_delete_items{
        display: flex;
        justify-content: center;
    }

    .add_or_delete_items div{
        outline: 1px solid var(--verde);
        display: flex;
        justify-content: center;
        padding: 5px;
        border-radius: 3px;
        margin: 0 3px;
    }

    .quantity_current h6{
        margin: 0 5px;
        font-weight: 600;
        font-size: 13px;
    }

    .total_price{
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 15px 0;
    }

    .sum_item,
    .rest_item{
        cursor: pointer;
    }

    .total_price h4{
        color: var(--verde);
        font-weight: 700;
    }

</style>