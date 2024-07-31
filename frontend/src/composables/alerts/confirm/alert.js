import Swal from "sweetalert2"

export function showAlertConfirm(message,callback){
    Swal.fire({
        title: "Eliminar texto",
        text: message,
        icon: "question",
        showDenyButton: true,
        confirmButtonText : "Si",
        denyButtonText : `No`,
    }).then(async result=>{
        console.log(result)
        if(result.isConfirmed){
            return await callback()
        }
    })
}