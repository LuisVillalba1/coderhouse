export function upload(req,res){
    try{
        return res.status(201).send("Archivo cargado correctamente")
    }
    catch(e){
        if(e instanceof Error){
            return res.status(404).send(e.message);
        }
        return res.status(500).send(e)
    }
}