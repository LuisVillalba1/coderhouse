import { Router } from "express";
import { getMessages } from "../controllers/messageController.js";

const messageRoute = Router();

//obtenemos todos los mensajes
messageRoute.get("/",async(req,res)=>{
    res.send(await getMessages());
})

export default messageRoute;