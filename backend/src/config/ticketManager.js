import { ticketModel } from "../models/ticketModel.js";
import crypto from "crypto";

export class TicketManager{
    constructor(){

    }

    async createTicket(products,totalPrice,email){
        console.log(products,totalPrice,email)
        let newTicket = await ticketModel.create({purchase_datetime : new Date(),code : crypto.randomBytes(10).toString('hex'),amount : totalPrice,purcharser : email,products : products});

        console.log(newTicket)

        return newTicket;
    }
}