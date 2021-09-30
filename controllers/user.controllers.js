// Librería para encriptar información
const bcryptjs = require('bcryptjs');
const Users = require('../models/User');

// Requerimos el modelo de datos de usuario para instanciar nuevos documentos
// e interactuar con la base de datos.
const User = require('../models/User');

const ctrlUsers = {};

// Obtener usuarios activos
ctrlUsers.getUsers = async (req, res) => {
    try {
        const usuarios = await User.find({});
        return res.json(usuarios);
    } catch (error) {
        console.log('Error al obtener usuarios: ', error);
        return res.status(500).json({
            msg: 'Error al obtener usuarios'
        })
    }
};

// Crear un usuario
ctrlUsers.createUser = async (req, res) => {
    let newUser = {};

    // Desestructuramos la información recibida del cliente
    const { username, password, role, ...otros_datos_recibidos } = req.body;

    // Se instancia un nuevo usuario
    try {

        newUser = new User({
            username,
            password,
            role
        })

        // Se encripta la contraseña recibida
        const salt = bcryptjs.genSaltSync();
        newUser.password = bcryptjs.hashSync(password, salt);

        // Se alamacena el nuevo usuario en la base de datos
        await newUser.save();
        return res.json({
            msg: 'Usuario creado exitosamente!',
            usuario: newUser
        });
    } catch (error) {
        console.log('No se pudo crear el usuario, vuelva a intentarlo: ', error);
        return res.status(500).json({
            msg: 'No se pudo crear el usuario, vuelva a intentarlo'
        })
    };


}

// Editar usuario a través de su id.
ctrlUsers.editUser = async (req, res) => {

    const { id } = req.params;

    const { username, password, role, ...resto } = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt); 
    }

    const userUpdated = await Users.findByIdAndUpdate(id, {
        username,
        password: resto.password,
        role
    })

    return res.json({
        msg:'Datos actualizados correctamente!',
        user: userUpdated
    })

}

// Eliminar usuario a través de su id.
ctrlUsers.deleteUser = async (req, res) => {
    const { id } = req.params;

    const userDeleted = await Users.findByIdAndUpdate(id, {
       active: false
    })

    return res.json({
        msg:'Usuario eliminado correctamente!',
        user: userDeleted
    })

}

module.exports = ctrlUsers;