import { productModel } from "../models/productsModel.js";
import { io } from "../app.js";
import { ProductManager } from "../config/productManager.js";
import { faker } from "@faker-js/faker";
import {createLoggerError} from "../utils/logger.js";

//obtenemos la configuracion para ver la ruta principal de productos
export function productMain(){
    return {css : "../css/products/products.css",js : "../js/products/products.js"}
}

//obtenemos todos los productos
export async function getProducts(req,res){
    const productManager = new ProductManager()

    return productManager.filterProducts(req,res)
}

//obtenemos un producto segun su id
export async function getProductById(req,id,res){
    try{
        const product = await productModel.findById(id);
        
        //si se encuentra el producto lo devolvemos, si no lanzamos una exepcion
        if(product){
            return res.send(product);
        }
        
        return res.status(404).send("No se ha encontrado el producto");

    }
    catch(e){
        createLoggerError(req,e);
        return res.status(500).send("Ha ocurrido un error");
    }
}

//creamos un nuevo producto
export async function addProduct(req,product,res){
    let productManager = new ProductManager();

    return await productManager.addProduct(req,product,res);
}

//modificamos un producto segun su id y nuevos valores ingresados
export async function updateProduct(req,id,newData,res){
    let productManager = new ProductManager();

    return await productManager.updateProduct(req,id,newData,res);
}

//eliminamos un producto segun el id
export async function deleteProduct(req,id,res){
    try{
        //eliminamos el producto
        let product = await productModel.findByIdAndDelete(id);

        if(!product){
            throw new Error("No se ha encontrado el producto")
        }
        //lo emitimos en nuestro socket
        io.emit("deletedProduct",product._id);

        return res.send("Se ha eliminado el producto :c");
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message);
        }
        return res.status(500).send("Ha ocurrido un error inesperado");
    }
}

//creamos 100 productos aleatorios
export async function mockingProducts(res){
    try{
        let products = [];
        for(let i=0; i<100;i++){
            let productTitle = faker.commerce.productName();
            let newProduct = {
                category : faker.commerce.department(),
                title : productTitle,
                description : faker.commerce.productAdjective(),
                price : faker.commerce.price({ min: 100000,max : 500000 }),
                code : productTitle + faker.commerce.isbn(),
                stock  : faker.number.int({ min: 5000 }),
                Status : true,
                thunbnails : [(new Date).getTime() + productTitle.replace(/ /g, "_")]
            }
            products.push(newProduct)
        }
        await productModel.insertMany(products);
        return res.status(200).send({message : "Se han creados los productos con exito"});
    }
    catch(e){
        return res.send({message : e.message})
    }
}