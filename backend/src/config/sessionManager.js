import jsonWebToken from "jsonwebtoken"
import { dotenvValues } from "../config.js";
import { userModel } from "../models/userModel.js";
import { generateCrypt } from "./crypt.js";
import { createLoggerWarning } from "../utils/logger.js";
export class SessionManager {
    constructor() {

    }

    //verificamos si la propiedad es valida
    checkCorrectPropertyes(content, values) {
        const keysCotent = Object.keys(content);

        for (let i of keysCotent) {
            if (!values.includes(i)) {
                throw new Error(`propiedad ${i} invalida,por favor ingrese las propiedades validas,404`)
            }
        }
    }

    //verificamos si ya existe un usuario con ese mail
    async checkExistEmail(email) {
        const emailFound = await userModel.find({ email: email });
        if (emailFound.length > 0) {
            throw new Error("Ya existe una cuenta con ese email,404");
        }
    }

    //verificamos si existe una cuenta registrada con el email correspondiente
    async checkEmailRegister(email) {
        const emailFound = await userModel.findOne({ email: email });

        if (!emailFound) {
            throw new Error("No existe una cuenta registrada con ese email");
        }
        return emailFound;
    }




    //verificamos que se haya ingresado la propiedad con un valor
    chekLengthPropertyes(body) {
        for (let i in body) {
            if (body[i].length <= 0) {
                throw new Error(`Por favor ingrese un ${i},`)
            }
        }
    }

    //creamos una ruta para poder cambiar la contraseña
    async linkChangePassword(email) {
        //firmamos el email del usuario el cual tiene una expiracion de 1 hora
        let sing = jsonWebToken.sign({ userEmail: email }, dotenvValues.JsonCodeSecret, { expiresIn: '1h' });
        //enviamos el link correspondiente
        let link = `${dotenvValues.FrontEndPath}/reset-password?token=${sing}`;
        return link;
    }

    verifySignToken(req,token) {
        let tokenValue = jsonWebToken.verify(token,dotenvValues.JsonCodeSecret,(error,decoded)=>{
            if(error){
                createLoggerWarning(req,error);
                throw new Error("Token invalido");
            }
            return decoded.userEmail
        })
        return tokenValue;
    }

    //verificamos que se ingrese una contraseña y su confirmacion
    checkPropertiesPassword(body){
        if(!body.password || !body.repeatPassword){
            throw new Error("Por favor ingrese una contraseña y su confirmacion")
        }
    }

    //verificamos que las contraseñas coincidan
    comparePasswords(body){
        if(body.password != body.repeatPassword){
            throw new Error("La contraseñas no coinciden");
        }
    }

    //cambiamos la contraseña
    async changePassword(email,password){
        //verificamos primero si existe una cuenta registrada con ese email
        let userData = await this.checkEmailRegister(email);

        userData.password = await generateCrypt(password);

        await userModel.findByIdAndUpdate(userData._id,userData);
    }

}