import passport from "passport";
import local from "passport-local"
import { userModel } from "../../models/userModel.js";
import { registerUser } from "../../controllers/sessionController.js";
import { compareHashValue } from "../crypt.js";
import GithubStrategy from "./strategies/gitHub.js";
import { dotenvValues } from "../../config.js";

//perimitimos que passport trabaje con uno o mas middlewares
const localStrategy = local.Strategy;


const initializatePassport = ()=>{
    //rutas de mis estrategias

    //registrarse
    passport.use("register",new localStrategy({
        passReqToCallback : true,
        usernameField : "email"
    },
    async(req,email,password,done)=>{
        try{
            await registerUser(req.body)
            return done(null,true)
        }
        catch(e){
            if(e instanceof Error){
                return done(null,false,e.message);
            }
            return done("Ha ocurrido un error");
        }
    }
    ))

    //inicializar session
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    })

    //eliminar session de usuario
    passport.deserializeUser(async(id,done)=>{
        const user = await userModel.findById(id);
        done(null,user);
    })

    //logearse
    passport.use("login",new localStrategy({
        usernameField : "email"
    },
    async(email,password,done)=>{
        try{
            const user = await userModel.findOne({email : email});
            if(!user || !await compareHashValue(password,user.password)){
                return done(null,false,{message : "Usuario o contraseña invalidos"})
            }
            user.last_connection = new Date();

            await user.save();
            return done(null,user)
        }
        catch(e){
            return done(e);
        }
    }
    ))

    passport.use("github",new GithubStrategy({
        clientID : dotenvValues.GithubClientID,
        clientSecret : dotenvValues.GithubClientSecret,
        callbackURL : "http://localhost:8080/githubcallback",
    },async(accesToken,refreshToken,profile,done)=>{
        try{
            const user = await userModel.findOne({email : profile._json.email});

            if(user){
                user.last_connection = new Date();
                await user.save();
                return done(null,user);
            }

            const newUser = await userModel.create({email : profile._json.email,name : profile._json.email});


            return done(null,newUser)
        }
        catch(e){
            return done(e)
        }
    }))
}

export default initializatePassport;