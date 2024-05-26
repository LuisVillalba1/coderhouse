import { ticketModel } from "../models/ticketModel.js";

export class TicketManager{
    constructor(){

    }

    async createTicket(products,totalPrice,email){
        let newTicket = await ticketModel.create({purchase_datetime : new Date(),amount : totalPrice,purcharser : email,products : products});

        return newTicket;
    }
}