import { defineStore } from "pinia";
import { useAuth } from "./Auth.js";
import axios from "axios";

export const useCartStore = defineStore("cart", {
    state: () => ({
        cartProducts : [],
        totalPrice : 0,
    }),
    actions: {
        async addProduct(productID){
            let auhtData = useAuth();
            if(!auhtData.cartID){
                await auhtData.current();
                let response = await axios.post(`/carts/${auhtData.cartID}/${productID}`);
                return response;
            }
            let response = await axios.post(`/carts/${auhtData.cartID}/${productID}`);
            return response;
        },
        async getCartsProducts(){
            let auhtData = useAuth();
            if(!auhtData.cartID){
                await auhtData.current();
                let response = await axios.get(`/carts/${auhtData.cartID}`);
                this.cartProducts = response.data;
                this.setTotalPrice(this.cartProducts);
                return 
            }
            let response = await axios.get(`/carts/${auhtData.cartID}`);
            console.log(response);
            this.cartProducts = response.data;
            this.setTotalPrice(this.cartProducts);
            return
        },
        setTotalPrice(data){
            if(data.length == 0) return
            this.totalPrice = data.reduce((sum,item)=>sum + item.productID.totalPrice,0);
        },
        async modifiQuantity(productID,quantity){
            let auhtData = useAuth();
            if(!auhtData.cartID){
                await auhtData.current();
                let response = await axios.put(`/carts/${auhtData.cartID}/product/${productID}`,{
                    quantity : quantity
                })
                window.location.reload();
            }
            let response = await axios.put(`/carts/${auhtData.cartID}/product/${productID}`,{
                quantity : quantity
            })
            window.location.reload();
        },
        async deleteProduct(productID){
            let auhtData = useAuth();
            if(!auhtData.cartID){
                await auhtData.current();
                let response = await axios.delete(`/carts/${auhtData.cartID}/product/${productID}`);
                window.location.reload();
                return
            }
            let response = await axios.delete(`/carts/${auhtData.cartID}/product/${productID}`);
            window.location.reload();
            return response;
        },
        async purcharseProducts(){
            let auhtData = useAuth();

            let response = await axios.post(`/carts/${auhtData.cartID}/purchase`);
            return response
        }
    },
});