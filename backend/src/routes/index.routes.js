import { Router } from "express";
import carstRouter from "./car.routes.js";
import productRouter from "./products.routes.js";
import messageRoute from "./message.routes.js";
import sessionRoute from "./session.routes.js";
import { verificationSession } from "../middlewares/sessionMiddleware.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
import { createLoggerWarning,createLoggerError} from "../utils/logger.js";
import userRouter from "./user.routes.js";
import multerRouter from "./multer.routes.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const indexRouter = Router();

//test de loggers
indexRouter.get("/logger",(req,res)=>{
    req.logger.info("soy la info");
    createLoggerError(req,"Error");
    createLoggerWarning(req,"Warning")
    return res.status(200).send({message : "Logger implementado correctamente"});
})

//routes
indexRouter.use("/carts",userMiddleware,carstRouter);//solo los usuario van a poder agregar productos o modificar su carrito
indexRouter.use("/products",verificationSession,productRouter)//verificamos que se haya iniciado session
indexRouter.use("/message",messageRoute);
indexRouter.use("/user",userRouter);
indexRouter.use("/multer",multerRouter)
indexRouter.use("/",sessionRoute);


export default indexRouter