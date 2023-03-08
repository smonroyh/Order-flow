

const orden=document.querySelector('.agregar-proyecto');

if(orden){
    orden.addEventListener('click',e=>{
        if(e.target.classList.contains('fa-plus')){
            //Crear fieldset
            const fieldset=document.createElement('FIELDSET');
            fieldset.classList.add('amplitud');
            const padre=e.target.parentElement.previousElementSibling;
            padre.appendChild(fieldset);
            //legend
            const legend=document.createElement('legend');
            legend.textContent="Producto";
            fieldset.appendChild(legend)

            //el fragment de los campos
            const fragmentCampos=document.createDocumentFragment();
            //el fragment de los minimos
            const fragment=document.createDocumentFragment();

            //Campo nombre producto
            const campoNombre=document.createElement('div');
            campoNombre.classList.add('campo')
            //label nombre
            const labelNombre=document.createElement('label');
            labelNombre.setAttribute("for","nombre");
            labelNombre.textContent="Nombre Producto:";
            fragment.appendChild(labelNombre);
            //input nombre
            const inputNombre=document.createElement('input');
            inputNombre.setAttribute('type',"text");inputNombre.setAttribute('id',"nombre");inputNombre.setAttribute('name',"nombreProducto");
            inputNombre.setAttribute('placeholder',"Nombre Producto");
            fragment.appendChild(inputNombre);
            
            campoNombre.appendChild(fragment);
            fragmentCampos.appendChild(campoNombre);

            //Campo precio producto
            const campoPrecio=document.createElement('div');
            campoPrecio.classList.add('campo')
            //label precio
            const labelPrecio=document.createElement('label');
            labelPrecio.setAttribute("for","precio");
            labelPrecio.textContent="Precio Producto:";
            fragment.appendChild(labelPrecio);
            //input precio
            const inputPrecio=document.createElement('input');
            inputPrecio.setAttribute('type',"text");inputPrecio.setAttribute('id',"precio");inputPrecio.setAttribute('name',"precioProducto");
            inputPrecio.setAttribute('placeholder',"Precio Producto");
            fragment.appendChild(inputPrecio);
            
            campoPrecio.appendChild(fragment);
            fragmentCampos.appendChild(campoPrecio);


            //Campo tarifa producto
            const campoTarifa=document.createElement('div');
            campoTarifa.classList.add('campo')
            //label tarifa
            const labelTarifa=document.createElement('label');
            labelTarifa.setAttribute("for","tarifa");
            labelTarifa.textContent="Tarifa Producto:";
            fragment.appendChild(labelTarifa);
            //input tarifa
            const inputTarifa=document.createElement('input');
            inputTarifa.setAttribute('type',"text");inputTarifa.setAttribute('id',"tarifa");inputTarifa.setAttribute('name',"tarifaProducto");
            inputTarifa.setAttribute('placeholder',"Tarifa Producto");
            fragment.appendChild(inputTarifa);
            
            campoTarifa.appendChild(fragment);
            fragmentCampos.appendChild(campoTarifa);

            //Campo descripcion producto
            const campoDescripcion=document.createElement('div');
            campoDescripcion.classList.add('campo')
            //label descripcion
            const labelDescripcion=document.createElement('label');
            labelDescripcion.setAttribute("for","descripcion");
            labelDescripcion.textContent="Descripcion Producto:";
            fragment.appendChild(labelDescripcion);
            //input descripcion
            const textArea=document.createElement('textarea');
            textArea.setAttribute('id','descripcion');textArea.setAttribute('name','descripcion');
            textArea.setAttribute('cols','75');textArea.setAttribute('rows','5')
            fragment.appendChild(textArea);

            campoDescripcion.appendChild(fragment);
            fragmentCampos.appendChild(campoDescripcion);
            

            //Campo tipoPago producto
            const campoPago=document.createElement("div");
            campoPago.classList.add('campo')
            //label tipoPago
            const labelTipoPago=document.createElement('label');
            labelTipoPago.setAttribute("for","tipoPago");
            labelTipoPago.textContent="Tipo Pago:";
            fragment.appendChild(labelTipoPago);

            const select=document.createElement('select');
            select.setAttribute('name','tipoPago');select.setAttribute('id','tipoPago')
            const option0=document.createElement('option')
            option0.setAttribute('value',"");option0.setAttribute("selected","selected");option0.setAttribute("disabled","disabled")
            option0.text="-Seleccione-";
            const option1=document.createElement('option')
            option1.setAttribute('value',1)
            option1.text="Pago";
            const option2=document.createElement('option')
            option2.setAttribute('value',2)
            option2.text="No pago";
            select.add(option0)
            select.add(option1)
            select.add(option2)
            fragment.appendChild(select);

            campoPago.appendChild(fragment);
            fragmentCampos.appendChild(campoPago);

            
            

            fieldset.appendChild(fragmentCampos);

            const btnEliminarProducto=document.createElement('i')
            btnEliminarProducto.classList.add('fas','fa-trash')
            btnEliminarProducto.textContent="  Eliminar producto"

            const divBtn=document.createElement('div');
            divBtn.classList.add('agregar-producto')
            divBtn.appendChild(btnEliminarProducto);
            fieldset.appendChild(divBtn);

            // console.dir(label)

        }
        if(e.target.classList.contains('fa-trash')){
            const productoEliminar=e.target.parentElement.parentElement;
            const padre=productoEliminar.parentElement;
            padre.removeChild(productoEliminar)
        }
    })
}