import { model,Schema } from "mongoose";
import crypto from "crypto";

const ticketSchema = new Schema({
    code : {
        type : String,
        unique : true
    },
    purchase_datetime : {
        type : Date,
        default : new Date(),
    },
    amount : {
        type : Number,
        require : true
    },
    purcharser : {
        type : String,
        require : true,
        unique : false
    },
    products : [
        {
            type : Schema.Types.ObjectId,
            ref : "products"
        }
    ]
})


export const ticketModel = model("tickets",ticketSchema);