import { createIntersectionObserver } from "../utils/utilsIntersection.js";

//obtenemos el nombre del usuario
async function getUserData(){
    const href = window.location.origin + "/userData";
    try{
        const response = await fetch(href,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        $(".welcome_title").text("Bienvenido " + data.userName);
    }
    catch(e){
        console.log(e);
    }
}

getUserData();

//eliminamos la session del usuario
function deleteSession(){
    $(".delete_session").on("click", async function (e) {
        try{
            const response = await fetch(window.location.origin + "/deleteSession",{
                method : "DELETE",
                headers : {
                    'Content-Type': 'application/json'
                }
            });
            window.location.href = response.url;
        }
        catch(e){
            console.log(e);
        }
    });
}

deleteSession();

const productsContainer = $(".products_container");

//obtenemos todos los productos
async function getProducts(page){
    try{
        const response = await fetch(window.location.href + `/details?page=${page}`,{
            method : "Get",
            headers : {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        showProducts(data.docs,data.nextPage)
    }
    catch(e){
        console.log(e);
    }
}

getProducts(1)

//mostramos los productos
function showProducts(docs,nextPage){
    for(let i of docs){
        //creamos el contenedor del producto y le añadimos su id correspondiente
        const productContainer  = $("<div></div>");
        $(productContainer).addClass("product");
        $(productContainer).attr("id", i._id);

        let productName = i.title;
        let productThubnail = i.thumbnails[0];
        let price = i.price;

        //añadimos la imagen del producto
        $(productContainer).append(appendImgProduct(productName,productThubnail));

        //añadimos la informacion del producto
        $(productContainer).append(productContent(productName,price));

        $(productContainer).append(appendButtonAddCar());

        $(productsContainer).append(productContainer);
    }
    if(nextPage){
        createIntersectionObserver(".product",getProducts.bind(null,nextPage));
    }
}

//creamos el contenedor y la imagen del producto
function appendImgProduct(productName,urlImg){
    let imgProductContainer = $("<div></div>");
    $(imgProductContainer).addClass("img_product_container");
    let imgProduct = $("<img></img>");
    $(imgProduct).attr("href", urlImg);
    $(imgProduct).attr("alt",productName);

    //añadimos la imagen respectiva al contenedor
    $(imgProductContainer).append(imgProduct);
    return imgProductContainer
}

function productContent(productName,price){
    //contenedor de la informacion del producto
    let productContentContainer = $("<div></div>");
    $(productContentContainer).addClass("product_content_container");

    //contenedor del nombre del producto
    let productTitleContainer = $("<div></div>");
    $(productTitleContainer).addClass("product_title_container");
    let titleProduct = $("<h4></h4>");
    $(titleProduct).text(productName);

    $(productTitleContainer).append(titleProduct);

    //contenedor del precio del producto
    let priceContainer = $("<div></div>")
    $(priceContainer).addClass("price_container");

    let priceSymbol = $("<p></p>");
    $(priceSymbol).addClass("price_symbol");
    $(priceSymbol).text("$");

    let priceProduct = $("<p></p>");
    $(priceProduct).text(price);

    $(priceContainer).append(priceSymbol);
    $(priceContainer).append(priceProduct);

    //añadimos todo al contenedor del contenido del producto
    $(productContentContainer).append(productTitleContainer);
    $(productContentContainer).append(priceContainer);

    return productContentContainer;
}

//añadimos el boton para suamar al carrito
function appendButtonAddCar(){
    let buttonContainer = $("<div></div>");
    $(buttonContainer).addClass("button_container");

    let textButton = $("<p></p>");
    $(textButton).text("Sumar al carrito");

    $(buttonContainer).append(textButton);

    return buttonContainer;
}
