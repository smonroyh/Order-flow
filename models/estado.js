const db=require('../config/db');
const sequelize=require('sequelize')
const Estados=db.define('estados',{
    id:{
        type:sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    estado:{
        type:sequelize.STRING
    }

},{timestamps:false})

module.exports=Estados;