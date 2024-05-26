export function redirectMainProducts(req,res,next){
    if(req.session.user){
        return res.redirect("/products");
    }
    next()
}