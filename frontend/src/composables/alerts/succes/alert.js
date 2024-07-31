import Swal from "sweetalert2"

export function showAlertSuccess(message){
    Swal.fire({
        title: "Exito",
        text: message,
        icon: "success",
    })
}