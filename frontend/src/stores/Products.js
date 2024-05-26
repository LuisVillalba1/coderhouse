import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useLoading } from 'vue-loading-overlay';
import { globalLoadingProps } from '@/loaderConfig';

export const useProductStore = defineStore("products",{
    state : ()=>{
        return {
            products : ref([]),
            nextPage : ref(0)
        }
    },
    actions : {
        async getProducts(){
            const response = await axios.get("/products/details")
            this.products.push(...response.data.docs);
            this.nextPage = response.data.nextPage;
            return response;
        },
        async getMoreProducts(noMoreProducts){
            noMoreProducts.value = true
            const response = await axios.get('/products/details?page=' + this.nextPage);
            noMoreProducts.value = false
            let docs = response.data.docs;
            let nextPageResponse = response.data.nextPage;
            this.products.push(...docs); 
            if(nextPageResponse){
                this.nextPage = nextPageResponse;
                return false
            }else{
                return true
            }
        }
    }
})