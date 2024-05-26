const registerLink = $(".register_link");

const form = $(".form_container");

//añadimos el link para iniciar session con github
function addLinkGithub(){
    $(".login_github").attr("href",window.location.origin + "/github");
}

addLinkGithub();

//añadimos el link para registrarse en caso de que se desee
function addLinkRegister(){
    const location = window.location.href;
    let newUrl = location.replace("login","register");
    $(registerLink).attr("href", newUrl);
}

addLinkRegister();

//añadimos el metodo y el link al formulario
function addAttrsForm(){
    $(form).attr("action", window.location.href);
    $(form).attr("method","Post");
}

addAttrsForm();

//obtenemos los valores de los inputs
function getFormValues(){
    const values = {
        email : $(".email_input").val(),
        password : $(".password_input").val()
    }

    return values;
}


function sendForm(){
    $(".send_form_container").on("click", async function () {
        try{
            const response = await fetch($(form).attr("action"),{
                method : $(form).attr("method"),
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(getFormValues())
            })
            if (!response.ok) { 
                let data = await response.json();
                throw new Error(data.message);
            }
            
            window.location.href = response.url;
        }
        catch(e){
            $(".error_form").text(e.message)
        }
    });
}

sendForm();