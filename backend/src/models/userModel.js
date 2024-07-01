import { model, Schema } from "mongoose";
import { cartsModel } from "./cartsModel.js";

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String
    },
    rol : {
        type : String,
        enum : ["User","Adm","Premium"],
        default : "User"
    },
    cart: {
        type : Schema.Types.ObjectId,
        ref : "carts",
    },
    last_connection : {
        type : Date
    },
    documents : {
        type : [{
            name : String,
            reference : String
        }],
        default : [],
    }
})

//previo a cada creacion de usuario vamos a asignarle a este un carrito en especifico
userSchema.pre("save",async function(next){
    try{
        const newCart = await cartsModel.create({});
        this.cart = newCart._id;
    }
    catch(e){
        next(e);
    }
})

export const userModel = model("users",userSchema);