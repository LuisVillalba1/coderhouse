import { Router } from "express";
import {createLoggerWarning} from "../utils/logger.js"
import * as cartController from "../controllers/cartsController.js"

const carstRouter = Router();
//obtenemos la ruta de nuestro json de los carritos
const carRoute = "./src/database/car.json";

//creamos un nuevo carrito
carstRouter.post("/",async (req,res)=>{
    try{
        return res.json({
            message : `El id de su carrito es: ${await cartController.createCart()}`
        })
    }
    catch(e){
        createLoggerWarning(req,e);
        return res.json({message : "Ha ocurrido un error al crear el carrito"});
    }
})

//obtenemos cierto carrito
carstRouter.get("/:cid",async(req,res)=>{
    try{
        const {cid} = req.params
    
        const products = await cartController.getCart(cid);
        
        return res.render("cart",{products,css : "../css/cart.css",js : "../js/cart.js"});
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message)
        }
        createLoggerWarning(req,e);
        return res.status(500).send("Ha ocurrido un error")
    }
})

//modificamos la cantidad de productos en el carrito
carstRouter.post("/:cid/product/:pid",async(req,res)=>{
    try{
        
    //obtenemos la cantidad del producto que se desea añadir
    const {quantity} = req.body;
    const {cid,pid} = req.params;

    return await cartController.changeProductQuantity(quantity,cid,pid,res);
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send({message : e.message})
        }
        createLoggerWarning(req,e)
        return res.status(500).send({message : "Ha ocurrido un erorr inesperado"});
    }
})

//eliminamos un producto de un carrito
carstRouter.delete("/:cid/product/:pid",async (req,res)=>{
    try{
        const {cid,pid} = req.params;

        await cartController.deleteProduct(cid,pid);
        
        return res.send("Se ha eliminado el producto correctamente")
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message)
        }
        createLoggerWarning(req,e)
        return res.status(500).send(e)
    }
})

//eliminamos todos los productos de un carrito
carstRouter.delete("/:cid",async(req,res)=>{
    try{
        const {cid} = req.params;

        await cartController.deleteAllProducts(cid);

        return res.send("se han eliminado todos los productos del carrito")
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message)
        }
        createLoggerWarning(req,e)
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
        createLoggerWarning(req,e)
        return res.status(500).send(e)
    }
})

//actualizamos la cantidad de un producto que se encuentra en el carrito
carstRouter.put("/:cid/products/:pid",async(req,res)=>{
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
        createLoggerWarning(req,e)
        return res.status(500).send(e);
    }
})

//permitimos al usuario comprar los productos del carrito
carstRouter.post("/:cid/purcharse",async(req,res)=>{
    try{
        const {cid} = req.params;

        return await cartController.purcharseProducts(cid,req,res);
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message);
        }
        createLoggerWarning(req,e);
        return res.status(500).send({message : "Ha ocurrido un error inesperado,por favor intentelo mas tarde"});
    }
})


export default carstRouter