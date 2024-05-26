//middleware par aque solo los admin puedan modificar los productos

export function adminMiddleware(req,res,next){
    if(req.session.rol != "Adm"){
        return res.status(401).send({message : "No tiene los permisos para realizar esta solicitud"})
    }
    next();
}