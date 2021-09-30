const { response, request } = require("express");
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Función para validar los tokens recibidos en las rutas protegidas
const validar_jwt = async (req = request, res = response, next) => {
    // Se almacena el token recibido del cliente
    const token = req.header('x-token');
    
    // Se verifica si el token existe en la petición
    if(!token){
        return res.status(400).json({
            msg:'Token inválido'
        })
    };
    
    // Se decodifica el token para obtener el uid y luego buscar el usuario
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        console.log("iud: ",uid)
        

        // Buscar el usuario con la base de datos y luego se verifica si existe
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg:'Token inválido - usuario no existe'
            })
        }

        // Se verifica si el usuario está activo
        if(!user.active){
            return res.status(401).json({
                msg:'Token inválido - usuario no existe'
            })
        }

        // Se añaden los datos del usuario a la petición para que pueda ser leído
        // por los siguientes middlewares
        req.user = user;

        // Continuar al siguiente middleware
        next()
    } catch (error) {
        console.log('Error al verificar token: ', token);
        return res.status(401).json({
            msg:'Token inválido - Error al verificar token'
        })
    }
    

}


module.exports = {
    validar_jwt
};