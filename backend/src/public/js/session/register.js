function addLinkLogin(){
    const linkLogin = $(".redirect_login");

    const location = window.location.href;

    const locationLogin = location.replace("register","login");
    $(linkLogin).attr("href", locationLogin);
}

addLinkLogin();

const form = $(".form_container");

//añadimos el metodo y el link al formulario
function addLinkRegister(){
    $(form).attr("action", window.location.href);
    $(form).attr("method","Post");
}

addLinkRegister();


function getFormValues(){
    const values = {
        name : $(".name_input").val(),
        lastName : $(".last_name_input").val(),
        email : $(".email_input").val(),
        password : $(".password_input").val()
    }

    return values;
}


function sendForm(){
    $(".send_form_container").on("click", async function (e) {
        try {
            const response = await fetch($(form).attr("action"), {
                method: $(form).attr("method"),
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(getFormValues())
            });
            
            if (!response.ok) { 
                const data = await response.json();
                throw new Error(data.message);
            }
        
            const responseData = await response.json();
            $(".exit_form").text(responseData.message);
        
        } catch (error) {
           $(".error_form").text(error.message)
        }
    });
}


sendForm();
