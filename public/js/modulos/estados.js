import axios from "axios";
const listaOrdenes=document.querySelector('.listado-pendientes');

if(listaOrdenes){
    listaOrdenes.addEventListener('click',e=>{
        if(e.target.classList.contains('boton')){
            if(!e.target.classList.contains('azul')){
                const padre=e.target.parentElement;
                const botones=padre.children;
                for(let i=0;i<botones.length;i++){
                    if(botones[i].classList.contains('azul')){
                        botones[i].classList.toggle('azul');
                    }
                    
                }
                e.target.classList.toggle('azul');

                const ordenId=e.target.parentElement.parentElement.dataset.orden
                const estadoId=e.target.dataset.estado;

                const padreParrafo=[...e.target.parentElement.parentElement.children];
                
                

                // if(estadoId==1){
                //     padreParrafo.textContent="hola";
                // }
                
                // console.log(estadoId);
                axios.post(`${location.origin}/cambiar-estado/${ordenId}`,{estadoId},{
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then((resp)=>{
                    // console.log(resp);
                    padreParrafo.forEach(hijo=>{
                        if(hijo.classList.contains('parrafoEstado')){
                            hijo.textContent=resp.data.estado;
                        }
                    })
                    // setTimeout(()=>{
                    //     window.location=`${location.origin}/ver-ordenes`
                    // },3000)
                })
            }
            
        }
    })
}