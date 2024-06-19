import passport from "passport";
import { userModel } from "../models/userModel.js";
import { generateCrypt } from "../config/crypt.js";
import { mailer } from "../config/mailer.js";
import { dotenvValues } from "../config.js";
import { SessionManager } from "../config/sessionManager.js";
import { createLoggerError } from "../utils/logger.js";

export async function registerUser(body){
    const values = ["name","lastName","email","password"];
    //verificamos que solo se ingrese las propiedades pedidas
    let manager = new SessionManager();
    manager.checkCorrectPropertyes(body,values)
    manager.chekLengthPropertyes(body);
    //verificamos si existe o no un usuario con ese mail
    await manager.checkExistEmail(body.email)
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


//recuperamos la cuenta del usuario

export async function recuperateAccount(req,res){
    try{
        //verificamos que se introducta un email y que exista el mismo registrado en la base de datos
        if(!req.body.email || req.body.length <= 0){
            throw new Error("Por favor ingrese un email")
        }
        let manager = new SessionManager();
        await manager.checkEmailRegister(req.body.email);
        let link = await manager.linkChangePassword(req.body.email);
        let mail = await mailer.sendMail({
            from : `coderhouseProyect <${dotenvValues.Email}>`,
            to : req.body.email,
            subject : "Recuperar cuenta",
            html : `
                <p>Necesitamos que crees una nueva contraseña para que puedas volver a utilizar tu cuenta, por favor de click </p>
                <a href=${link}>aquí</a>
            `
        })
        return res.status(200).send({message : "Mail enviado con exito, por favor chequea tu bandeja de entra y/o spams"})
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send({error : e.message})
        }
        createLoggerError(req,e);
        return res.status(500).send({error : "Ha ocurrido un error inesperado, por favor intentelo mas tarde"})
    }
}


export function changePassword(req,res){
    try{
        //verificamos que exista un token
        if(!req.query.token){
            throw new Error("Token no existente");
        }
        let manager = new SessionManager();

        //validamos la firma del token
        let email = manager.verifySignToken(req,req.query.token);
        console.log(email);

        manager.checkPropertiesPassword(req.body);
        manager.comparePasswords(req.body);
        manager.changePassword(email,req.body.password);

        return res.status(201).send({message : "Se ha modificado la contraseña correctamente"});
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send({error : e.message});
        }
        createLoggerError(req,e);
        return res.status(500).send({error : "Ha ocurrido un error al cambiar la contraseña, por favor intentalo mas tarde"});
    }
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
        return res.status(200).send(user);
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
