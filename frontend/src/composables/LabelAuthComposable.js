//vamos a desplazar los inputs dependiendo de si esta focus o si esta escrita en el input en concreto

export function useLabelAuthComposable(){
    const focusInput = (labelTransform,label,inputValue)=>{
        if(!labelTransform[label] || inputValue.length > 0){
            labelTransform[label] = true
        }
    }

    const blurInput = (labelTransform,label,inputValue)=>{
        if(labelTransform[label] && inputValue.length == 0){
            labelTransform[label] = false;
        }
    }

    return {focusInput,blurInput}
}