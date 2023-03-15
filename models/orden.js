const db=require('../config/db');
const sequelize=require('sequelize');
const Estados = require('./estado');
const Proveedores = require('./proveedor');
const Clientes = require('./cliente');
const shortid = require('shortid');
const Ordenes=db.define('ordenes',{
    id:{
        type:sequelize.STRING(15),
        defaultValue:shortid.generate(),
        primaryKey:true,
        allowNull:false
    },
    fecha:{
        type:sequelize.DATE
    },
    productos:{
        type:sequelize.JSON,
    }

})
//Relación N:M ordenes estados
const Estados_Ordenes=db.define('estados_ordenes',{
    id:{
        type:sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    estadoId:{
        type:sequelize.INTEGER(11),
        references:{
            model:Estados,
            key:"id"
        },
    },
    ordeneId:{
        type:sequelize.STRING(15),
        references:{
            model:Ordenes,
            key:"id"
        },
    },
})

Ordenes.hasMany(Estados_Ordenes)
Estados_Ordenes.belongsTo(Estados);
// Estados.belongsToMany(Ordenes,{through:Estados_Ordenes})
// Ordenes.belongsToMany(Estados,{through:Estados_Ordenes})


//Relación 1:M ordenes proveedores
Ordenes.belongsTo(Proveedores)
//Relación 1:M ordenes repartidores
// Ordenes.belongsTo(Usuarios)
//Relación 1:M ordenes clientes
Ordenes.belongsTo(Clientes)


module.exports={Ordenes,
Estados_Ordenes};