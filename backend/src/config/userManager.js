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
}