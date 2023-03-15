const db=require('../config/db');
const sequelize=require('sequelize');
const {Ordenes}= require('./orden');
const bcrypt=require('bcrypt-nodejs')
const Usuarios=db.define('usuarios',{
    cedula:{
        type:sequelize.STRING(11),
        primaryKey:true,
        validate:{
            notEmpty:{
                msg:"Ingresa una cedula valida"
            }
        },
        unique:{
            args:true,
            msg:"Ya existe un usuario con esta cedula"
        }
    },
    nombre:{
        type:sequelize.STRING(50)
    },
    telefono:{
        type:sequelize.STRING(16)
    },
    email:{
        type:sequelize.STRING(60),
        allowNull:false,
        validate:{
            isEmail:{
                msg:"Email no valido"
            }
        },
        unique:{
            args:true,
            msg:"Usuario con correo ya existente"
        }
    },
    password:{
        type:sequelize.STRING(60),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Ingresa una contraseña"
            }
        }
    },
    rol:{
        type:sequelize.STRING(20),
        allowNull:false
    }

},{
    hooks:{
        beforeCreate(usuario){
            usuario.password=bcrypt.hashSync(usuario.password,bcrypt.genSaltSync(10))
        }
    }
})

//metodos personalizados
Usuarios.prototype.verificarPassword=function(password){
    return bcrypt.compareSync(password,this.password)
}

Usuarios.hasMany(Ordenes)

module.exports=Usuarios;