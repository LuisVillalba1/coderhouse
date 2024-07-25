import { userModel } from "../models/userModel.js";
import { mailer } from "./mailer.js";
import { dotenvValues } from "../config.js";

export class UserManager {
    constructor() {

    }
    //verificamos que los documentos ingresados tengan las propiedades validas
    verifyNewDocuments(documents) {
        //verificamos si es un array
        if (!Array.isArray(documents)) {
            throw new Error("El tipo de dato debe de ser un array")
        }
        if(documents.length == 0){
            throw new Error("Ingrese documentos")
        }
        this.correctDocKeys(documents);
        return documents;
    }
    correctDocKeys(documents) {
        //solo admitiremos las propiedades name y reference
        let correctKeys = ["name", "reference"]
        for (let i in documents) {
            //verificamos que cada uno de los documentos sea un objeto
            if (typeof documents[i] != "object") {
                throw new Error("Es necesario un array de objetos")
            }
            //obtenemos las keys y verificamos que las propiedades sean validas
            let keys = Object.keys(documents[i]);
            keys.forEach(item => {
                if (!correctKeys.includes(item)) {
                    throw new Error(`Las propiedades validas son ${correctKeys}`)
                }
            })
            //verificamos que las propiedades no esten vacias
            if(documents[i].name.length == 0 || documents[i].reference.length == 0){
                throw new Error("Todos los campos son obligatorios")
            }
        }
    }
    //enviamos un email a los usuarios, informandoles que su cuenta fue eliminada por inactividad
    async sendEmailDeleteAccount(emails){
        for(let i of emails){
            let mail = await mailer.sendMail({
                from : `coderhouseProyect <${dotenvValues.Email}>`,
                to : i,
                subject : "Cuenta eliminada por inactividad",
                html : `
                    <p>Su cuenta en la aplicación ha sido eliminada por inactividad</p>`
            })
        }
    }
    //buscamos aquellos usuario que no se conecten hace dos dias
    async deleteUsersInactives(){
        //obtenemos aquellos usuarios
        let users = await userModel.find({last_connection : {$lt : new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)}});
        let emails = [];
        if(users.length > 0){
            //eliminamos los usuarios
            await userModel.deleteMany({last_connection : {$lt : new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)}});
            //enviamos el email para informar a los usuarios que su cuenta ha sido eliminada
            emails = users.map(item=>item.email);
            this.sendEmailDeleteAccount(emails);
        }
    }
}