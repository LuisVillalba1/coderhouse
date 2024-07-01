import { Router } from "express";
import {sendDocuments} from "../controllers/userController.js";

const userRouter = Router();


userRouter.post("/:uid/documents",async(req,res)=>{
    return await sendDocuments(req,res)
})

export default userRouter