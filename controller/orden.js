const sequelize=require('sequelize');
const Clientes = require("../models/cliente")
const Estados = require("../models/estado")
// const Estados_Ordenes = require("../models/estado_orden")
const Ordenes = require("../models/orden")
const Proveedores = require("../models/proveedor")
const Repartidores = require("../models/repartidor")

const ordenes=(req,res)=>{
    res.render('layout',{
        nombrePagina:"Inicio"
    })
}   

const formOrden=(req,res)=>{
    res.render('nuevaOrden',{
        nombrePagina:"Crear orden"
    })
}

const crearOrden=async(req,res)=>{
    // const {nombreProducto}=req.body; 
    console.log(req.body)
    const {nombreCliente,cedulaCliente,telefonoCliente,direccionCliente}=req.body;
    let cliente=await Clientes.findOne({where:{cedula:cedulaCliente}})

    if(!cliente){
        cliente=await Clientes.create({
            cedula:cedulaCliente,
            nombre:nombreCliente,
            telefono:telefonoCliente,
            direccion:direccionCliente
        })
    }
    else{
        cliente.nombre=nombreCliente;
        cliente.telefono=telefonoCliente;
        cliente.direccion=direccionCliente;
        await cliente.save();
    }

    //repartidor por ahora si no existe, se crea 
    //Pero despues el repartidor creará una cuenta y se validara
    //que el repartidor exista para que se pueda crear una orden con un repartidor existente
    const {cedulaRepartidor}=req.body;
    let repartidor=await Repartidores.findOne({where:{cedula:cedulaRepartidor}});

    if(!repartidor){
        repartidor=await Repartidores.create({cedula:cedulaRepartidor})
    }

    //proveedor  ????
    const {nombreProveedor,telefonoProveedor}=req.body;
    let proveedor=await Proveedores.findOne({where:{nombre:nombreProveedor,telefono:telefonoProveedor}})
    if(!proveedor){
        proveedor=await Proveedores.create({nombre:nombreProveedor,telefono:telefonoProveedor})
    }

    //meter los productos en el JSON
    const {nombreProducto,precioProducto,tarifaProducto,descripcion,tipoPago}=req.body;
    const productos={}

    let cantidadProductos;
    //Si array es falso quedan dos opciones
    if(!Array.isArray(nombreProducto)){
        //Que no venga nada (No deberia seguir)
        if(nombreProducto==""){
            console.log("llo")
        }
        //O que solo venga un producto
        else{
            cantidadProductos=1;
        }
    }
    //Este caso es que venga más de un producto
    else{
        cantidadProductos=nombreProducto.length;
    }

    let producto
    if(cantidadProductos==1){
        producto=`producto-${1}`;
        productos[producto]={
            nombreProducto:nombreProducto,
            precioProducto:precioProducto,
            tarifaProducto:tarifaProducto,
            descripcion:descripcion,
            tipoPago:tipoPago,
        }
    }
    else{
        for(let i=0;i<cantidadProductos;i++){
            producto=`producto-${i+1}`;
            productos[producto]={
                nombreProducto:nombreProducto[i],
                precioProducto:precioProducto[i],
                tarifaProducto:tarifaProducto[i],
                descripcion:descripcion[i],
                tipoPago:tipoPago[i],
            }
        }
    }
    // console.log(">>>",productos)

    //Crear la orden
    const orden=await Ordenes.Ordenes.create({
        fecha:Date.now(),
        productos,
        proveedoreId:proveedor.id,
        repartidoreCedula:repartidor.cedula,
        clienteCedula:cliente.cedula
    })

    //orden_estado
    await Ordenes.Estados_Ordenes.create({
        ordeneId:orden.id,
        estadoId:4,
        // fecha:Date.now(),
    })

    // Ordenes

    res.redirect('/ver-ordenes')
}

const verOrdenes=async(req,res)=>{
    const [ultimoEstadoOrden,ord]=await Promise.all([Ordenes.Estados_Ordenes.findAll({
        attributes: [
          'ordeneId',
          [sequelize.fn('MAX', sequelize.col('createdAt')), 'lastStateChange'],
        ],
        group: ['ordeneId'],
      }), Ordenes.Ordenes.findAll({include:[{model:Proveedores}]})]);
      
    const ordenes=[];
    let a;

    for(let i=0;i<ord.length;i++){
        ordenes[i]={...ord[i].dataValues};
        for(let j=0;j<ultimoEstadoOrden.length;j++){
            if(ultimoEstadoOrden[j].ordeneId==ordenes[i].id){
                a=await Ordenes.Estados_Ordenes.findOne({
                    where:{
                        createdAt:ultimoEstadoOrden[j].dataValues.lastStateChange
                    }
                })
                ordenes[i]["ultimoEstadoOrden"]={...a.dataValues}
            }
        }
    }
    console.log(ordenes)

    res.render('ordenes',{
        nombrePagina:'Ordenes',
        ordenes
    })
}

const cambiarEstado=async(req, res)=>{
    const {id}=req.params;
    const {estadoId}=req.body;

    const [estado,estadoOrden]=await Promise.all([Estados.findOne({where:{id:estadoId}})
        ,Ordenes.Estados_Ordenes.create({ordeneId:id,estadoId})])

    res.send(estado)
}

const verOrden=async(req,res)=>{
    const {id}=req.params;
    const orden=await Ordenes.Ordenes.findOne({where:{id},include:[
        {
            model:Proveedores
        },
        {
            model:Clientes
        },
        {
            model:Repartidores
        }
    ]})
    console.log(orden.productos['producto-2'].nombreProducto)
    res.render('orden',{
        nombrePagina:"Detalles orden",
        orden
    })
}

module.exports={
    ordenes,
    formOrden,
    crearOrden,
    verOrdenes,
    cambiarEstado,
    verOrden
}