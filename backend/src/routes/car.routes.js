import { Router } from "express";
import {createLoggerError} from "../utils/logger.js"
import * as cartController from "../controllers/cartsController.js"

const carstRouter = Router();
//obtenemos la ruta de nuestro json de los carritos
const carRoute = "./src/database/car.json";

//creamos un nuevo carrito
carstRouter.post("/",async (req,res)=>{
    try{
        return res.status(201).json({
            message : `El id de su carrito es: ${await cartController.createCart()}`
        })
    }
    catch(e){
        createLoggerError(req,e);
        return res.status(500).json({message : "Ha ocurrido un error al crear el carrito"});
    }
})

//permitimos al usuario comprar los productos del carrito
carstRouter.post("/:cid/purchase",async(req,res)=>{
    try{
        const {cid} = req.params;

        return await cartController.purcharseProducts(cid,req,res);
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message);
        }
        createLoggerError(req,e);
        return res.status(500).send({message : "Ha ocurrido un error inesperado,por favor intentelo mas tarde"});
    }
})

//añadimos un producto al carrito
carstRouter.post("/:cid/:pid",async(req,res)=>{
    try{
        let {cid,pid} = req.params
        return res.status(201).send({message : await cartController.addOneProduct(cid,pid)})
    }
    catch(e){
        console.log(e);
        if(e instanceof Error){
            return res.status(404).send(e.message)
        }
        createLoggerError(req,e);
        return res.status(500).send("Ha ocurrido un error")
    }
})

//obtenemos los productos de un carrito
carstRouter.get("/:cid",async(req,res)=>{
    try{
        const {cid} = req.params
    
        const products = await cartController.getCart(cid);
        
        return res.status(200).send(products);
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message)
        }
        createLoggerError(req,e);
        return res.status(500).send("Ha ocurrido un error")
    }
})

//eliminamos un producto de un carrito
carstRouter.delete("/:cid/product/:pid",async (req,res)=>{
    try{
        const {cid,pid} = req.params;

        await cartController.deleteProduct(cid,pid);
        
        return res.status(200).send({message : "Se ha eliminado el producto correctamente"});
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message)
        }
        createLoggerError(req,e)
        return res.status(500).send(e)
    }
})

//eliminamos todos los productos de un carrito
carstRouter.delete("/:cid",async(req,res)=>{
    try{
        const {cid} = req.params;

        await cartController.deleteAllProducts(cid);

        return res.status(200).send("se han eliminado todos los productos del carrito")
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message)
        }
        createLoggerError(req,e)
        return res.send(e);
    }
})

//modificamos todo el objeto de productos de un carrito
carstRouter.put("/:cid",async(req,res)=>{
    try{
        const {body} = req;
        const {cid} = req.params;
        
        const response = await cartController.changeProductPropertyes(cid,body);
        //enviamos como quedo el objeto
        return res.status(201).send(response);
    }   
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message)
        }
        createLoggerError(req,e)
        return res.status(500).send(e)
    }
})

//actualizamos la cantidad de un producto que se encuentra en el carrito
carstRouter.put("/:cid/product/:pid",async(req,res)=>{
    try{
        const {body} = req;
        const {cid,pid} = req.params;

        const response = await cartController.changeQuantity(cid,pid,body);

        return res.status(201).send(response)
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message)
        }
        createLoggerError(req,e)
        return res.status(500).send(e);
    }
})



export default carstRouter