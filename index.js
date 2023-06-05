const express=require('express');
const path=require('path');
const bodyParser=require('body-parser')
const flash=require('connect-flash')
const session=require('express-session');
const cookieParser=require('cookie-parser');
const db=require('./config/db');
const passport=require('./config/passport')


//importar el modelo
require('./models/cliente')
require('./models/estado')

// require('./models/estado_orden')
require('./models/orden')
require('./models/proveedor')
require('./models/usuario')

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

//Agregar flash-messages
app.use(flash()); 

// Sessiones nos permiten navegar entre distintas paginas
// Sin tenernos que autenticar
app.use(cookieParser());

app.use(session({
    secret: 'superSecreto',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());


app.use((req,res,next)=>{
    res.locals.mensajes=req.flash();
    res.locals.user={...req.user} || null;
    // console.log(req.flash())
    next();
})


app.use('/',require('./routes'))

app.listen(3000)