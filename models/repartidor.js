const db=require('../config/db');
const sequelize=require('sequelize')
const Repartidores=db.define('repartidores',{
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

})

module.exports=Repartidores;