const bcryptjs = require('bcryptjs');
const { generar_jwt } = require("../helpers/generar_jwt");
const User = require("../models/User");

const ctrlAuth = {};

ctrlAuth.login = async (req, res) => {

    let { username, password } = req.body

    try {
        // Se valida si existe el nombre de usuario
    const user = await User.findOne({ username });
    
    if(!user){
        return res.status(401).json({
            msg:'El nombre de usuario es incorrecto'
        });
    }
    
    // Verifica que el usuario se encuentre activo
    if(!user.active){
        return res.status(401).json({
            msg:'El usuario se encuentra inactivo'
        });
    }

    // Verifica que la contraseña sea correcta
    const contrasena = bcryptjs.compareSync(password, user.password)
    
    if(!contrasena){
        return res.status(401).json({
            msg:'La contraseña ingresada no es correcta'
        })
    }

    
    const token = await generar_jwt(user.id) // Se genera el token

    // Enviar la respuesta al usuario
    res.json({
       user,
       token
    })

    // En caso de un error desconocido
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Consulte al Administrador del sitio'
        })
    }

};

module.exports = ctrlAuth;