import { Router } from "express";
import { redirectMainProducts } from "../middlewares/userYetLoginMiddleware.js";
import * as sessionController from "../controllers/sessionController.js"
import passport from "passport";
import { dotenvValues } from "../config.js";
import { createLoggerWarning } from "../utils/logger.js";

const sessionRoute = Router();

//view para logear al usuario
//le agregamos un middleware para que el usuario no acceda a esta vista en caso de que ya haya iniciado session y exista una session
sessionRoute.get("/login",redirectMainProducts,(req,res)=>{
    return res.render("login",sessionController.loginStatics());
})

//logeamos al usuario
sessionRoute.post("/login",(req, res) => {
    return sessionController.loginAuthenticate(req,res)
});


//vista para registrarse
sessionRoute.get("/register",(req,res)=>{
    return res.render("register",sessionController.registerStatics())
})

//creamos un nuevo usuario
sessionRoute.post("/register",async(req,res)=>{
    return sessionController.createUser(req,res);
})


sessionRoute.get("/github",passport.authenticate("github",{scope : ["user:email"]}),async(req,res)=>{
})

sessionRoute.get("/githubcallback",passport.authenticate("github"),async(req,res)=>{
    sessionController.saveGithubValues(req);

    return res.redirect(dotenvValues.FrontEndPath + "/products")
})

//verificamos si existe la session del usuario
sessionRoute.get("/current",async(req,res)=>{
    return await sessionController.getCurrentUser(req,res);
})

//eliminamos la session de un usuario
sessionRoute.delete("/deleteSession",async(req,res)=>{
    return sessionController.deleteSession(req,res);
})

export default sessionRoute;