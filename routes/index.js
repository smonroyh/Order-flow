const express=require("express");
const { ordenes, formOrden, crearOrden, verOrdenes, cambiarEstado, verOrden } = require("../controller/orden");

const router=express.Router();

router.get('/',ordenes)

router.get('/nueva-orden',formOrden);

router.post('/nueva-orden',crearOrden)

router.get('/ver-ordenes',verOrdenes)

router.post('/cambiar-estado/:id',cambiarEstado)

router.get("/ver-orden/:id",verOrden)

module.exports=router;