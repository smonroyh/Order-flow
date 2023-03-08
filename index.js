const express=require('express');
const path=require('path');
const bodyParser=require('body-parser')
const db=require('./config/db');

//importar el modelo
require('./models/cliente')
require('./models/estado')

// require('./models/estado_orden')
require('./models/orden')
require('./models/proveedor')
require('./models/repartidor')

db.sync()
    .then(()=>console.log('Conectado al servidor'))
    .catch(console.log)

const app=express();

//Habilitar temp engine (pug)
app.set('view engine','pug')
//Añadir la carpeta de las vistas
app.set('views',path.join(__dirname,'./views'))

//Lectura y parseo del body
app.use(bodyParser.urlencoded({extended:true}))

//Cargar archivos estaticos
app.use(express.static('public'))


app.use('/',require('./routes'))

app.listen(3000)