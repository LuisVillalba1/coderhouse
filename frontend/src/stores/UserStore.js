import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user",{
    state : ()=>{
        return {
            filterUsers : [],
            users : []
        }
    },
    actions : {
        async getAllUsers(){
            const response = await axios.get("/user/allUsers");
            this.users = response.data;
            this.filterUsers = this.users;
        },
        async deleteUser(userID){
            const response = await axios.delete(`/user/deleteUser/${userID}`);
            return response.data.message;
        }
    }
})