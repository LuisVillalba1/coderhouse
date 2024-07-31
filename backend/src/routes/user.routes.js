import { Router } from "express";
import {sendDocuments,getAllUsers,deleteUsersNotActives,deleteUser} from "../controllers/userController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const userRouter = Router();


userRouter.post("/:uid/documents",async(req,res)=>{
    return await sendDocuments(req,res)
})

userRouter.get("/allUsers",async(req,res)=>{
    return await getAllUsers(req,res);
})

//solo el administrador puede eliminar los usuarios inactivos
userRouter.get("/deleteUsersNotActives",adminMiddleware,async(req,res)=>{
    return await deleteUsersNotActives(req,res);
})

//eliminamos un usuario, solo el administrador podra hacerlo
userRouter.delete("/deleteUser/:id",adminMiddleware,async(req,res)=>{
    return await deleteUser(req,res);
})


export default userRouter