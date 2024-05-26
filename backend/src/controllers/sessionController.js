import passport from "passport";
import { userModel } from "../models/userModel.js";
import { generateCrypt } from "../config/crypt.js";
import { dotenvValues } from "../config.js";

//verificamos si la propiedad es valida
function checkCorrectPropertyes(content,values){
    const keysCotent = Object.keys(content);

    for(let i of keysCotent){
        if(!values.includes(i)){
            throw new Error(`propiedad ${i} invalida,por favor ingrese las propiedades validas,404`)
        }
    }
}

//verificamos si ya existe un usuario con ese mail
async function checkExistEmail(email){
    const emailFound = await userModel.find({email : email});
    if(emailFound.length > 0){
        throw new Error("Ya existe una cuenta con ese email,404");
    }
}

//verificamos que se haya ingresado la propiedad con un valor
function chekLengthPropertyes(body){
    for(let i in body){
        if(body[i].length <= 0){
            throw new Error(`Por favor ingrese un ${i},`)
        }
    }
}

export async function registerUser(body){
    const values = ["name","lastName","email","password"];
    //verificamos que solo se ingrese las propiedades pedidas
    checkCorrectPropertyes(body,values);
    chekLengthPropertyes(body)
    //verificamos si existe o no un usuario con ese mail
    await checkExistEmail(body.email);
    await userModel.create({name : body.name,lastName : body.lastName,email : body.email,password : await generateCrypt(body.password)});
}

//retornamos los scripts que va utilizar nuestro archivo estatico para la ruta de login
export function loginStatics(){
    return {css : "./css/session/login.css",js : "./js/session/login.js"};
}

//logeamos al usuario y guardamos ciertos de sus valores en la session
export function loginAuthenticate(req,res){
    passport.authenticate("login", (err, user, info) => {
        if (!user) {
            return res.status(401).send(info);
        }
        else{
        // Si la autenticación es exitosa, guardamos los valores en la session y lo redirigimos a la vista de productos
        req.session.user = user.email;
        req.session.password = user.password;
        req.session.rol = user.rol;
        return res.status(200).send({message : "sesion exitosa"});
        }
    })(req, res);
}

//retornamos los scripts que va utilizar nuestro archivo estatico para la ruta register

export function registerStatics(){
    return {css : "./css/session/register.css",js : "./js/session/register.js"};
}

//creamos un nuevo usuario
export function createUser(req,res){
    passport.authenticate("register",(error,user,info)=>{
        if(!user){
            if(info.message != "Missing credentials"){
                const parts = info.split(",");
                const statusCode = parseInt(parts.pop());
                const message = parts.join(",")
                return res.status(statusCode).send({message : message})
            }
            else if(info.message == "Missing credentials"){
                return res.status(404).send({message : "Por favor complete todos los campos"})
            }
            return res.status(500).send({message : "Ha ocurrido un error"});
        }
        else{
            return res.status(201).send({message : "Se ha creado el usuario correctamente"});
        }
    })(req,res);
}

//guardamos en la session los datos de los usuario entregados por github
export function saveGithubValues(req){
    req.session.user = req.user.email;
    req.session.rol = req.user.rol;
}

//mostramos la informacion del usuario actual logeado
export async function getCurrentUser(req,res){
    if(req.session.user){
        const user = await userModel.findOne({email : req.session.user}).lean();
        return res.send(user);
    }
    req.logger.error("Usuario no loggeado");
    return res.status(404).send(false);
}

//eliminamos la session del usuario 
export function deleteSession(req,res){
    req.session.destroy(e=>{
        if(e){
            return res.status(500).send({message : "Ha ocurrido un error al eliminar la session"})
        }
        else{
            return res.status(200).send({message : "session eliminada"});
        }
    })
}