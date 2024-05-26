//seleccionamos todos los productos
//nuestra funcion va recibir un callback la cual nos permitira obtener mas productos cuando se visualize el ultimo
export function createIntersectionObserver(containerName,callback){
    //obtenemos todos los post
    let products = document.querySelectorAll(containerName);

    //con el metodo forEach iteramos sobre cada producto y con el index obtenemos cual es el ultimo producto visualizado
    products.forEach((product,index)=>{
        //verificamos cuando el ultimo post ha sido interceptado
        let isLastProduct = index == products.length - 1;
        //verificamos la interseccion de cada post
        let observer = new IntersectionObserver(entries=>chekIntersection(entries,isLastProduct,observer,callback),{});
        observer.observe(product)
    })
}

//obtenemos el post visualizado
function chekIntersection(e,isLastProduct,observer,callback){
    //obtenemos el post que se ha visualidado
    let data = e[0];

    //si se observa el ultimo post detenemos el observer y mostramos mas posts en caso de que existan
    if(isLastProduct && data.isIntersecting){
        observer.disconnect()
        callback()
        return
    }
}


