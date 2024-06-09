import { Router } from "express";
import * as productController from "../controllers/productController.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { productModel } from "../models/productsModel.js";

const productRouter = Router();

//ruta para ver todos los productos
// productRouter.get("/",async(req,res)=>{
//     return res.render("productsMain",productController.productMain());
// })

productRouter.get("/",async(req,res)=>{
    //obtenemos los productos correspondientes
    try{
        return res.status(200).send(await productController.getProducts(req,res))
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message)
        }
        return res.send(e);
    }
})

//creamos un nuevo productos
productRouter.post("/",adminMiddleware,async(req,res)=>{
    return await productController.addProduct(req,req.body,res);
})

//obtenemos cierto producto
productRouter.get("/:pid",async(req,res)=>{
    return await productController.getProductById(req,req.params.pid,res);
})

//modificamos un productos
productRouter.put("/:pid",adminMiddleware,async(req,res)=>{
    const id = req.params.pid
    return await productController.updateProduct(id,req.body,res);
})

//eliminamos un producto
productRouter.delete("/:pid",adminMiddleware,async(req,res)=>{
    const id = req.params.pid;

    return await productController.deleteProduct(req,id,res);
})

//solo el administrador podra crear nuevos productos
productRouter.post("/mockingproducts",adminMiddleware,async(req,res)=>{
    return await productController.mockingProducts(res)
})



export default productRouter;