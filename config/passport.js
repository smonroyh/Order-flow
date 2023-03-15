const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;

//Referencia al modelo donde vamos a autenticar
const Usuarios = require("../models/usuario");

//local strategy - Login con credenciales propios (usuario y password)

passport.use(
    new LocalStrategy(
        //Por default passport espera un usuario y password
        {
            usernameField:"email",
            passwordField:"password",
        },
        async (email,password,done)=>{
            try {
                const usuario =await Usuarios.findOne({where:{email}})

                //El usuario existe pero el password es incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null,false,{
                        message:"Password es incorrecto"
                    })
                }
                //Email existe y password correcto
                return done(null,usuario)
            } catch (error) {
                //Ese usuario no existe
                return done(null,false,{
                    message:"Esa cuenta no existe"
                })
            }
        }
    )
)

passport.serializeUser((usuario,done)=>{
    done(null,usuario)
})

passport.deserializeUser((usuario,done)=>{
    done(null,usuario)
})

module.exports=passport;