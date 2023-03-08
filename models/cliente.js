const db=require('../config/db');
const sequelize=require('sequelize')
const Clientes=db.define('clientes',{
    cedula:{
        type:sequelize.STRING(11),
        primaryKey:true,
    },
    nombre:{
        type:sequelize.STRING(50)
    },
    telefono:{
        type:sequelize.STRING(16)
    },
    direccion:{
        type:sequelize.STRING(30)
    }

})

module.exports=Clientes;