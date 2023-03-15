const Usuarios = require("../models/usuario");

const formCrearCuenta=(req,res)=>{
    res.render('crear-cuenta',{
        nombrePagina:"Crear cuenta"
    })
}

const crearCuenta=async(req,res)=>{
    const {nombre,cedula,telefono,email,password}=req.body;
    try {
        await Usuarios.create({nombre,cedula,telefono,email,password,rol:"Repartidor"})
        return res.redirect('/iniciar-sesion')
    } catch (error) {
        error.errors.forEach(error=>{
            req.flash(`${error.path}-error`,error.message)
        })
        const mensajes=req.flash();
        console.log(mensajes)
        res.render('crear-cuenta',{
            nombrePagina:"Crear cuenta",
            mensajes,
            nombre,cedula,telefono,email,password
        })
    }
}

const formIniciarSesion=(req,res)=>{
    console.log(res.locals.mensajes)
    res.render('iniciar-sesion',{
        nombrePagina:'Iniciar sesión'
    })
}

module.exports={
    formCrearCuenta,
    crearCuenta,
    formIniciarSesion
};