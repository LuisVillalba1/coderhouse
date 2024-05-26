import { Router } from "express";
import * as productController from "../controllers/productController.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const productRouter = Router();

//ruta para ver todos los productos
productRouter.get("/",async(req,res)=>{
    return res.render("productsMain",productController.productMain());
})

productRouter.get("/details",async(req,res)=>{
    //obtenemos los productos correspondientes
    try{
        return res.send(await productController.getProducts(req,res))
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message)
        }
        return res.send(e);
    }
})

//solo el administrador podra crear nuevos productos
productRouter.post("/mockingproducts",adminMiddleware,async(req,res)=>{
    return await productController.mockingProducts(res)
})

//obtenemos cierto producto
productRouter.get("/:pid",async(req,res)=>{
    return await productController.getProductById(req,req.params.pid.res);
})

//creamos un nuevo productos
productRouter.post("/",adminMiddleware,async(req,res)=>{
    return await productController.addProduct(req,req.body,res);
})


productRouter.put("/:pid",adminMiddleware,async(req,res)=>{
    const id = req.params.pid
    return await productController.updateProduct(req,id,req.body,res);
})

productRouter.delete("/:pid",adminMiddleware,async(req,res)=>{
    const id = req.params.pid;

    return await productController.deleteProduct(req,id,res);
})




export default productRouter;