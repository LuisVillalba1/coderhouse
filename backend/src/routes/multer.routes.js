import { Router } from "express";
import {uploadDocuments,uploadProduct,uploadProfile} from "../multer.js"
import { upload } from "../controllers/multerControler.js";

const multerRouter = Router();

//subimos un documento
multerRouter.post("/docs",uploadDocuments.single("document"),(req,res)=>{
    return upload(req,res)
})

//subimos una imagen de perfil
multerRouter.post("/profile",uploadProfile.single("profile"),(req,res)=>{
    return upload(req,res);
})

//subimos un producto
multerRouter.post("/product",uploadProduct.single("product"),(req,res)=>{
    return upload(req,res);
})


export default multerRouter