import { productModel } from "../models/productsModel.js";
import { createLoggerError} from "../utils/logger.js";
import { io } from "../app.js";

//eliminamos ciertas propiedades
export function deleteProperties(object){
    for(let key in object){
        if(object[key] == "" || object[key] == NaN || object[key] == undefined){
            delete object[key]
        }
    }
    return object
}

//eliminamos un producto para el socket
export async function deleteProductIO(id,socket){
    //obtenemos el producto
    let product = await productModel.findByIdAndDelete(id);;
    //verificamos si ya existe el mismo, en caso de que sea asi lo eliminamos
    if(product){
        socket.emit("deletedProduct",product._id)
    }
    throw new Error("No se ha encontrado el producto solicitado")
}

//update de un producto para el socket
export async function updateProductIO(data,socket){
    //obtenemos el producto en cuestion
    let product = await productModel.findById(data.id);

    if(!product){
        socket.emit("error","No se ha encontrado el producto")
    }

    //en caso de que se ingresen propiedades vacias las eliminamos
    let objetValues = deleteProperties(data)

    if(Object.values(objetValues).length == 0){
        throw new Error("por favor ingrese algun valor")
    }       

    //cambiamos los valores del producto
    let newValues = await changeValues(objetValues,product);

    //enviamos los nuevos datos del producto
    socket.emit("newProductData",newValues);
}

//creamos un producto para el socket
export async function createProductIO(data,socket){
    //verificamos que se ingresen propiedades validas con los tipos de valores correctos
    chekIncorrectPropertys(data)

    checkPropertys(data)
    
    let product = checkThumbnails(data);

    //hacemos que el estatus del producto sea por defecto true
    product.status = true;

    //obtenemos un producto por el codigo y verificiamos si este ya existe
    let productFound = await productModel.findOne({code : product.code});

    if(productFound){
        throw new Error("Ya existe el producto con el codigo " + product.code)
    }
    //creamos el nuevo producto
    product = await productModel.create(product);
    socket.emit("newProduct",product)    
}

//cambiamos los valores de un objeto segun otro dado
export async function changeValues(newData,product){
    //verificamos que sea un objeto el que se haya ingresado
    if(typeof newData != "object" || Object.values(newData).length == 0){
        throw new Error("Por favor ingrese un objeto con propiedades");
    }
    //eliminamos el id en caso de que exista
    if(newData._id){
        delete newData._id
    }
    
    //obtenemos las propiedades del producto a modificar
    let properties = Object.keys(product._doc);

    //modificamos los valores del producto viejo
    for(let i in newData){
        //en caso de que el producto no cuente con una propiedad valida, enviamos un error
        if(!properties.includes(i)){
            throw new Error(`solo se admiten las propiedades ${properties.slice("")}`)
        }
        else{
            //en caso de que el tipo de dato no coincida enviamos un error
            if(typeof product[i] != typeof newData[i]){
                throw new Error(`Por favor ingrese un valor de tipo ${typeof product[i]} para la propiedad ${i}`)
            }
        }
    }
    //modificamos el producto
    // con new : true hacemos que nos devuelva el nuevo objeto generado
    return await productModel.findByIdAndUpdate(product.id,newData,{new : true});
}

//verificamos que el ordenamiento sea solo desc o asc
function correctSort(value){
    if(value != "asc" && value != "desc"){
        throw new Error("solo se permiten ordenamientos por desc y asc")
    }
}

//verificamos que el limit ingresado sea un numero mayor a 0
function isCorrectNumber(value,property){
    if(isNaN(parseInt(value)) || parseInt(value) <= 0){
        throw new Error(`${property} ingresado invalido,por favor ingrese un numero mayor a 0`)
    }
    return parseInt(value)
}

//la query ingresada por el usuario va tener que tener un formato de json 
function queryProdcuts(query){
    try{
        //parseamos el ojeto 
        query = JSON.parse(query);
        if(typeof query != "object"){
            throw new Error("Por favor ingrese un objeto json para ordenar los productos")
        }
    return query
    }
    catch(e){
        throw new Error("Por favor ingrese un objeto json para ordenar los productos")
    }
}

//verificamos que los campos tengan los valores correctos
export function checkPropertys(product){
    //array para verificar que cada campo cuente su tipo de valor correspondiente
    let properties = [["title","string"],["description","string"],["code","string"],["price","number"],["stock","number"],["category","string"],["status","boolean"]]

    for(let i in properties){
        let propertyName = properties[i][0];
        let propertyType = properties[i][1];

        if(!product[propertyName] || typeof product[propertyName] != propertyType){
            throw new Error(`Por favor ingrese un valor de tipo ${propertyType} para la propiedad ${propertyName}`)
        }
    }
}

//le hacemos saber al usuario que propiedades son validas ingresar
export function chekIncorrectPropertys(product){
    let properties = ["title","description","code","status","stock","price","thumbnails","category"];

    for(let i in product){
        if(!properties.includes(i)){
            throw new Error(`La propiedad ${i} no es valida solo se permiten las propiedades ${properties.slice("")}`);
        }
    }
}

//verificamos si existe una ruta para el producto, en caso de que no,creamos una nueva
export function checkThumbnails(product){
    //en caso de que no exista la ruta de strings o agrege un array vacio lo creamos
    if(!product.thumbnails || !Array.isArray(product.thumbnails) || (product.thumbnails).length == 0){
        product.thumbnails = [(new Date).getTime()+product.title]
    }

    return product;
}

export class ProductManager{
    constructor(){

    }

    //filtramos los productos
    async  filterProducts(req,res){
        //obtenemos cada uno de los valores de las querys
        let {limit,page,query,sort} = req.query;
        if(limit){
            limit = isCorrectNumber(limit,"limit");
        }
        if(page){
            page = isCorrectNumber(page,"page");
        }
        if(query){
            query = queryProdcuts(query);
        }
        if(sort){
            correctSort(sort);
        }
        //paginamos los productos
        return await productModel.paginate(query || {},{limit : limit ? limit : 10,page : page ? page : 1, sort : sort ? {price : sort} : {}})
    }

    //cambiamos los valores de un objeto segun otro dado
 async changeValues(newData,product){
    //verificamos que sea un objeto el que se haya ingresado
    if(typeof newData != "object" || Object.values(newData).length == 0){
        throw new Error("Por favor ingrese un objeto con propiedades");
    }
    //eliminamos la propiedad id
    delete newData.id
    
    //obtenemos las propiedades del producto a modificar
    let properties = Object.keys(product._doc);

    //modificamos los valores del producto viejo
    for(let i in newData){
        //en caso de que el producto no cuente con una propiedad valida, enviamos un error
        if(!properties.includes(i)){
            throw new Error(`solo se admiten las propiedades ${properties.slice("")}`)
        }
        else{
            //en caso de que el tipo de dato no coincida enviamos un error
            if(typeof product[i] != typeof newData[i]){
                throw new Error(`Por favor ingrese un valor de tipo ${typeof product[i]} para la propiedad ${i}`)
            }
        }
    }
    //modificamos el producto
    // con new : true hacemos que nos devuelva el nuevo objeto generado
    return await productModel.findByIdAndUpdate(product.id,newData,{new : true});
}

    //creamos un nuevo producto
 async addProduct(req,product,res){
    try{
        //mostramos que propiedades son validas ingresar
        chekIncorrectPropertys(product);
        //verificamos que no existan campos nulos y que los campos tengan los valores correspondientes
        checkPropertys(product);
        //creamos en caso de que sea necesario el array de thumbnails
        product = checkThumbnails(product);

        //hacemos que el estatus del producto sea por defecto true
        product.status = true;

        //obtnemos los productos
        let productFound = await productModel.findOne({code : product.code});

        //en caso de que no exista un producto con ese codigo lo agregamos a nuestra base de datos
        if(!productFound){
            //agregamos el producto a la base de datos
            let newProduct = await productModel.create(product);

            io.emit("newProduct",newProduct)
            return res.status(201).send({message : "Producto añadido con exito"})
        }
        //en caso de que ya exista, modificamos su stock
        await productModel.findByIdAndUpdate(productFound.id,{stock : product.stock})
        return res.status(201).send({message : "Producto añadido con exito"});
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message);
        }
        createLoggerError(req,e);
        return res.status(500).send("Ha ocurrido un error");
    }
}

//modificamos un producto segun su id y nuevos valores ingresados
    async updateProduct(id,newData,res){
    try{
    //obtenemos el producto
    let product = await productModel.findById(id);

    if(!product){
        return res.status(404).send("No se ha encontrado el producto en especifico");
    }

    //obtenemos el producto en concreto con los nuevos valores
    let newValuesProduct = await changeValues(newData,product);

    io.emit("newProductData",newValuesProduct);

    return res.status(201).send("Se ha modificado el objeto");
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message)
        }
        createLoggerError(req,e)
        return res.send(500).send("Ha ocurrido un error inesperado");
    }
}

}