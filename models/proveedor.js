const db=require('../config/db');
const sequelize=require('sequelize')
const Proveedores=db.define('proveedores',{
    id:{
        type:sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true,
    },
    nombre:{
        type:sequelize.STRING(50)
    },
    telefono:{
        type:sequelize.STRING(16)
    },

})

module.exports=Proveedores;