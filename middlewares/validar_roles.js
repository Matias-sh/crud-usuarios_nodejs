const { response } = require("express");

// Verifica si el usuario tiene privilegios de administrador
const adminRole = async (req, res = response, next ) => {

    if(!req.user) {
        return res.status(500).json({
            msg:'Se quiere verificar rol sin validar el token'
        })
    };

    const { role, username } = req.user;

    if(role !== 'ADMIN_USER') {
        return res.status(401).json({
            msg: 'No eres administrador'
        })
    }

    next();


}

const tieneRol = (...roles) => {
    return (req, res = response, next) => {
        console.log(req.user)
        
        // Se verifica si existe el usuario en la request 
        if(!req.user) {
            return res.status(500).json({
                msg:'Se quiere verificar rol sin validar el token'
            })
        };

        // Se verifica si el rol del usuario es alguno de los permitidos
        if( !roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `Se requieren alguno de los siguientes roles ${roles}`
            })
        }
    

        next();
    };
}

module.exports = {
    adminRole,
    tieneRol
}