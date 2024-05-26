import { ref } from "vue";
import { defineStore } from "pinia";
import router from "@/router";
import axios from "axios";

export const useAuth = defineStore("auth",{
    state : ()=>{
        return {
            name : '',
            email : ''
        }
    },
    actions :{
        async login(email,password){
            const response = await axios.post("/login",{
                email : email,
                password : password
            })
            return response;
        },
    
        async register(name,lastname,email,password){
            const response = await axios.post("/register",{
                name : name,
                lastName : lastname,
                email : email,
                password : password
            })
            return response;
        },
    
        async current(){
            const response = await axios.get("/current");
            this.name = response.data.name;
            this.email = response.data.email;
            return response
        },
    
         async githubAuth(){
            window.location.href = import.meta.env.VITE_SERVER_URL + "/github"
        },
        async deleteSession(){
            const response = await axios.delete("/deleteSession");
            return router.push("/login");
        }
    },
    persist : true,
})