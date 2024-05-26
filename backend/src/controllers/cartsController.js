import { carManager } from "../config/cartsManager.js";
import { cartsModel } from "../models/cartsModel.js";

//creamos un nuevo carrito
export async function createCart(){
    let newCart = await cartsModel.create({});
    return newCart._id;
}

//obtenemos cierto carrito
export async function getCart(cid){
    const cart = new carManager();

    let products = await cart.getProductsCart(cid);
    //agregamos la propiedad para obtener el precio total de la aquisicion
    for(let i of products){
        i.productID.totalPrice = i.productID.price * i.quantity
    }

    return products;
}

//modificamos la cantidad de productos en el carrito
export async function changeProductQuantity(quantity,cid,pid,res){
    const cart = new carManager();
    if(!quantity || isNaN(parseInt(quantity)) || parseInt(quantity) <= 0){
        throw new Error("Por favor ingrese un quantity correcto");
    }
    //añadimos el producto con un numero redondo
    return await cart.addProduct(cid,pid,parseInt(quantity),res);
}

//eliminamos un producto del carrito
export async function deleteProduct(cid,pid){
    const cart = new carManager();

    await cart.deleteProduct(cid,pid);
}

//eliminamos todos los productos de un carrito
export async function deleteAllProducts(cid){
    const cart = new carManager();

    await cart.deleteAllProducts(cid)
}

//modificamos todo el objeto de un producto del carrito
export async function changeProductPropertyes(cid,body){
    const cart = new carManager();

    return await cart.updateAllCart(cid,body);
}

//actualizamos la cantidad de un producto que se encuentra en el carrito
export async function changeQuantity(cid,pid,body){
    const cart = new carManager();

    return await cart.updateProductQuantity(cid,body,pid);
}

export async function purcharseProducts(cid,req,res){
    let cartFound = await cartsModel.findById(cid);

    let cart = new carManager();

    return cart.purcharseProducts(cartFound,cartFound.products,req,res);

}
