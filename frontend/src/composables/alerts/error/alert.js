import Swal from "sweetalert2"

export function showAlertError(message){
    Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
    })
}