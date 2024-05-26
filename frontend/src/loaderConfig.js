export const globalLoadingProps = (container)=>{
    if(container){
        return {
            color: '#36b67d',
            opacity : 0.2,
            loader : "spinner",
            container : container.value,
            onCancel : ()=>{
                console.log("chau")
            }
        }
    }
    return {
        color: '#36b67d',
        opacity : 0.2,
        loader : "spinner",
        onCancel : ()=>{
            console.log("chau")
        }
    }
  };