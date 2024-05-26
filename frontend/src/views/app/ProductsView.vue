<template>
    <div class="main_container">
        <NavComponent></NavComponent>
        <div class="main_content" ref="loadingContainerRef">
            <ProductsComponent ref="moreProducts"></ProductsComponent>
        </div>
    </div>
</template>

<script setup>
    import NavComponent from '@/components/navs/NavComponent.vue';
    import ProductsComponent from '@/components/products/ProductsComponent.vue';
    import { useLoading } from 'vue-loading-overlay';
    import { globalLoadingProps } from '@/loaderConfig';
    import { ref,onMounted} from 'vue';
    import {useProductStore} from "../../stores/Products.js"

    const loadingContainerRef = ref(null);
    let $loading = useLoading();
    let loader;

    const moreProducts = ref(null)

    let productStore = useProductStore();

    const getProducts = async(loader)=>{
        try{
            let response = await productStore.getProducts();
            loader.hide()
        }
        catch(e){
            console.log(e);
        }
    }


    //mostramos el loader
    onMounted(async ()=>{
        $loading = useLoading(globalLoadingProps(loadingContainerRef));
        loader = $loading.show()
        
        await getProducts(loader)

        await moreProducts.value.getMoreProducts()

    })


</script>

<style scoped>
    *{
        color: var(--negro);
    }
    .main_container{
        height: 100%;
        min-height: 120vh;
        width: 100%;
        background: var(--blanco);
    }

    @media screen and (min-width:600px){
        .main_container{
            display: flex;
        }
        .main_content{
            margin-left: 50px;
            width: 100%;
        }
    }

</style>