export const globalLoadingProps = (container)=>{
    if(container){
        return {
            color: '#36b67d',
            opacity : 0.2,
            loader : "spinner",
            container : container.value,
        }
    }
    return {
        color: '#36b67d',
        opacity : 0.2,
        loader : "spinner",
        isFullPage : true,
    }
  };