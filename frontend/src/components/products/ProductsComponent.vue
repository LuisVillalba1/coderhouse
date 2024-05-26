<template>
    <div class="title_products_container">
        <h3>Todos nuestros productos</h3>
    </div>
    <div class="products_main_container">
        <div class="products_container" ref="productsContainer">
            <template v-for="(item,index) in productStore.products" :key="index">
            <div class="product_container" :id="item._id">
                <div class="img_container">
                    <img :src="item.thumbnails[0]" :alt="item.title">
                </div>
                <div class="product_data_container">
                    <h4>{{ item.title}}</h4>
                    <p>{{ item.description }}</p>
                </div>
                <transition name="price_container">
                    <div class="price_container" v-if="!isHover[index]">
                        <p>${{ item.price }}</p>
                    </div>
                </transition>
                <div class="add_cart" :class="{'add_cart_hover' : isHover[index] }" @mouseenter="currentHover(index,true)" @mouseleave="currentHover(index,false)">
                    <div class="add_cart_content">
                        <p>Añadir al carrito</p>
                    </div>
                    <transition name="price_cart_container">
                        <div class="price_cart_container" v-if="isHover[index]">
                            <p>${{ item.price }}</p>
                        </div>
                    </transition>
                </div>
            </div>
            </template>
        </div>
    </div>
    <div class="reference">
        <LoaderComponent v-if="noMoreProducts"></LoaderComponent>
    </div>
</template>

<script setup>
    import LoaderComponent from "../loaders/LoaderComponent.vue";
    import {ref,defineExpose, reactive,watch} from "vue";
    import { useProductStore } from "@/stores/Products";
    import { intersectionProducts } from "../../composables/IntersectionProducts";

    let isHover = ref([])
    let loaderContainer = ref(null)
    let noMoreProducts = ref(false)

    let productStore = useProductStore();

    const currentHover = (index,value)=>{
        isHover.value[index] = value
    }

    //obtenemos mas productos
    const getMoreProducts = ()=>{
        intersectionProducts(".reference",productStore.getMoreProducts.bind(null,noMoreProducts));
    }

    defineExpose({getMoreProducts})


</script>

<style scoped>
    *{
        color: var(--negro);
    }
    .title_products_container h3{
        text-align: center;
        padding: 5px 10px;
    }
    .products_container{
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        grid-auto-rows: auto;
        grid-gap: 18px;
        padding: 0 15px;
    }

    .vld-container{
        position: relative;
        background: yellow;
    }

    .reference{
        width: 100%;
    }

    .vl-overlay{
        bottom: 0;
    }

    .products_main_container{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .product_container{
        width: 171px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: end;
    }
    .product_data_container{
        margin: 5px 0 10px 0;
        min-height: 80px;
    }

    .product_data_container h4{
        font-weight: 600;
        font-size: 15px;
    }
    .price_container p{
        color: var(--verde);
        padding: 7px 0;
        text-align: center;
    }

    .price_container-enter-from{
        opacity: 0;
    }


    .price_container-enter-active{
        transition: 0.31s ease-in;
    }

    .add_cart{
        background: var(--negro);
        border-radius: 2px;
        padding: 5px 8px;
    }

    .add_cart p{
        color : var(--verde);
        text-align: center;
    }

    @media screen and (min-width:600px){
        .products_container{
            grid-template-columns: repeat(3,minmax(0,1fr));
            width: 100%;
        }
        .product_container{
            width: 100%;
            height: 400px;
        }

        .add_cart{
            transition: 0.2s ease-in;
        }

        .add_cart:hover{
            scale: 1.04;
            cursor: pointer;
        }
    }

    @media screen and (min-width:1070px){
        .products_container{
            grid-template-columns: repeat(4,minmax(0,1fr));
            width: 100%;
        }
        .img_container{
            width: 100%;
            display: flex;
            justify-content: center;
        }
        .product_data_container{
            display: flex;
            width: 100%;
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }
        .price_container{
            display: none;
        }
        .add_cart{
            display: flex;
            width: 100%;
            justify-content: center;
        }

        .add_cart_hover{
            background: var(--verde);
            transition: 0.5s ease-in;
        }

        .add_cart_content p{
            color: var(--blanco);
        }

        .price_cart_container-enter-from{
            opacity: 0;
        }

        .price_cart_container-enter-active{
            transition: 0.5s ease-in;
        }

        .price_cart_container{
            margin-left: 2px;
            padding-left: 2px;
            border-left: 1px solid var(--black);
        }

        .price_cart_container p{
            color: var(--blanco);
        }
    }
</style>