import {userModel} from "../models/userModel.js";
import { UserManager } from "../config/userManager.js";

//guardamos los docuementos de un usuario
export async function sendDocuments(req,res){
    try{
        let newUserManager = new UserManager();
        //verificamos que se ingresen los campos y las propiedades sean validas
        let newDocuments = newUserManager.verifyNewDocuments(req.body);
        //modificamos los documentos del usuario
        let user = await userModel.findByIdAndUpdate(req.params.uid,
            {
                $push : {
                    documents : {
                        $each : newDocuments
                    }
                }
            }
        ,{new : true});
        if(!user){
            return res.status(404).send("Usuario no encontrado")
        }
        return res.status(200).send(user);
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message)
        }
        return res.status(500).send(e)
    }
}
