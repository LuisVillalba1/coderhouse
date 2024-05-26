//verificamos que el rol que tenga sea de usuario

export function userMiddleware(req,res,next){
    if(req.session.rol != "User"){
        return res.status(401).send({message : "Solo disponible para los usuarios"});
    }
    next();
}