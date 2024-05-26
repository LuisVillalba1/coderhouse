

export  const intersectionProducts = async(elementClass,callback)=>{
    let element = document.querySelector(elementClass)
    const observer = new IntersectionObserver(entries=>{
        handleIntersect(entries,observer,callback)
    })
    observer.observe(element)
}


const handleIntersect = (entries,observer ,callback) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            let response = callback()
            if(!response){
                observer.disconnect()
            }
        }
    });
    };