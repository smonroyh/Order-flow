const nav=document.querySelector('.nav-detalles ')

if(nav){
    nav.addEventListener('click',(e)=>{
        if(e.target.classList.contains('opcion-detalles')||e.target.classList.contains('opcion-mapa')){
            const padreOpcion=e.target.parentElement;
            const mapa=document.querySelector('.mapa');
            const principal=document.querySelector('.principal');
            if(e.target.classList.contains('opcion-detalles')){      
                mapa.style.display="none";
                principal.style.display="grid";
            }
            else if(e.target.classList.contains('opcion-mapa')){   
                principal.style.display="none";
                mapa.style.display="flex";
            }
            // let principal;

            [...padreOpcion.parentElement.children].forEach((hijo)=>{
                if(hijo.classList.contains('seleccionado')){
                    hijo.classList.remove('seleccionado','enmarcado')
                    // principal=document.querySelector('.principal')
                }
            });
            // console.log(principal)
            padreOpcion.classList.add('seleccionado','enmarcado');
        }
    })
}