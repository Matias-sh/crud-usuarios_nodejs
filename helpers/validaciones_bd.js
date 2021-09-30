// Se importa el Schema Role
const { response } = require('express');
const Rol = require('../models/Rol');
const User = require('../models/User');

// Función que consulta a la base de datos si existe el rol enviado por el usuario
const rolValido = async (role = '') => {
    // Se busca el rol en la base de datos
    const rolEncontrado = await Rol.findOne({ role });
    // Si el resultado de la consulta es undefined, se evalúa como false
    if (!rolEncontrado) {
        throw new Error('El rol seleccionado no es válido')
    }
};


// Función que verifica si el email ya existe en la base de datos
const existeEmail = async (username = '') => {
    const emailEncontrado = await User.findOne({ username });
    if (emailEncontrado) {
        throw new Error('Ya existe un usuario registrado con ese nombre')
    };
}

const existeUsuario = async (id) => {
    const user = await User.findById(id);

    if(!user){
        throw new Error('El usuario no existe')
    }
}

module.exports = {
    rolValido,
    existeEmail,
    existeUsuario
}