const express=require("express");
const { autenticarUsuario, usuarioAutenticado, cerrarSesion } = require("../controller/authController");
const { ordenes, formOrden, crearOrden, verOrdenes, cambiarEstado, verOrden } = require("../controller/orden");
const { formCrearCuenta, crearCuenta, formIniciarSesion } = require("../controller/usuariosController");

const router=express.Router();

router.get('/',usuarioAutenticado,ordenes)

router.get('/nueva-orden',usuarioAutenticado,formOrden);

router.post('/nueva-orden',usuarioAutenticado,crearOrden)

router.get('/ver-ordenes',usuarioAutenticado,verOrdenes)

router.post('/cambiar-estado/:id',usuarioAutenticado,cambiarEstado)

router.get("/ver-orden/:id",usuarioAutenticado,verOrden)

router.get('/crear-cuenta',formCrearCuenta)

router.post('/crear-cuenta',crearCuenta)

router.get('/iniciar-sesion',formIniciarSesion)
router.post('/iniciar-sesion',autenticarUsuario,(req,res)=>{
    res.render('layout')
})

//cerrar sesión
router.get('/cerrar-sesion',cerrarSesion)

module.exports=router;