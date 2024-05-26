//en caso de que el usuario quiera ingresar a la vista para logearse y ya existe una session, lo mandamos a la vista de productos
export function verificationSession(req,res,next){
    if(!req.session.user){
        return res.redirect("/login");
    }
    next()
}