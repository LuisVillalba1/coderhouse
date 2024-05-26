import { messageModel } from "../models/messagesModel.js";

export async function getMessages(){
    return await messageModel.find();
}