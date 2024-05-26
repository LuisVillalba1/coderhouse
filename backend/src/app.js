import express from "express";
import mongoose from "mongoose";
import indexRouter from "./routes/index.routes.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { engine } from "express-handlebars";
import {fileURLToPath} from "url";
import path, { dirname } from "path";
import { createProductIO,deleteProductIO,updateProductIO } from "./config/productManager.js";
import { Server } from "socket.io";
import dotenv from "dotenv";
import initializatePassport from "./config/passport/passport.js";
import { dotenvValues } from "./config.js";
import { addLogger } from "./utils/logger.js";
import cors from "cors";
const app = express();


const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = 8080;

dotenv.config()

const server = app.listen(PORT,()=>{
    console.log(`servidor corriendo en el puerto:${PORT}`);
});

const corsOptions = {
    origin : dotenvValues.FrontEndPath,
    methods : "GET,POST,PUT,DELETE,PATCH",
    credentials : true,
    allowedHeaders: ['Content-Type', 'Authorization'], 
}

//creamos nuestro servidor con socket.io
export const io = new Server(server);

//coneccion con la base de datos 

mongoose.connect(dotenvValues.MongoConnect)
.then(console.log("conneccion exitosa"))
.catch((e)=>console.log(e))


io.on("connection",async (socket)=>{
    console.log("cliente conectado");

    //eliminamos un producto
    socket.on("deleteProduct",async(id)=>{
        try{
            await deleteProductIO(id,socket)
        }
        catch(e){
            socket.emit("errorDelete",e.message);
        }

    })

    //update de un producto
    socket.on("updateProduct",async(data)=>{
        try{
            await updateProductIO(data,socket)
        }
        catch(e){
            //en caso de que ocurra un error lo enviamos
            socket.emit("errorEdit",e.message)
        }
    })

    socket.on("createProduct",async data=>{
        try{
            await createProductIO(data,socket)
        }
        catch(e){
            socket.emit("errorCreate",e.message);
        }
    })
})

app.use(cors(corsOptions));
app.use(session({
    secret : dotenvValues.MongoSecret,
    resave : true,
    store : MongoStore.create({
        mongoUrl : dotenvValues.MongoConnect,
        ttl : 5 * 24 * 60 * 60, //5 dias
    }),
    saveUninitialized:true,
}))

//middlewares
app.use(express.json());

//passport
initializatePassport();
app.use(passport.initialize());
app.use(passport.session())
app.use(addLogger)

app.use(express.static(path.join(__dirname,"public")));
app.engine("handlebars",engine());
app.set("view engine","handlebars");
app.set("views",path.join(__dirname,"views"));
;


//routes
app.use(indexRouter)



