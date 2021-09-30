// Utilizamos el método Router perteneciente a la librería express
// el cual nos permitirá crear las rutas del servidor
const router = require('express').Router();
const { check } = require('express-validator');

const { rolValido, existeEmail, existeUsuario } = require('../helpers/validaciones_bd');
const { validarCampos } = require('../middlewares/validar_campos');
const { validar_jwt } = require('../middlewares/validar_jwt');
const { adminRole, tieneRol } = require('../middlewares/validar_roles');

// Requerimos los controladores (funciones que contendrán la lógica del endpoint)
const {
    getUsers,
    createUser,
    editUser,
    deleteUser } = require('../controllers/user.controllers');

// Ruta para obtener todos los usuarios activos
router.get('/', getUsers)

// Ruta para crear un usuario
router.post('/', [
    validar_jwt,
    // adminRole,
    tieneRol('ADMIN_USER', 'COMMON_USER'),
    check('username', 'El usuario no es correcto')
    .isEmail(),

    check('username')
    .custom(existeEmail),
    
    check('password', 'La contraseña debe contener al menos 8 caracteres')
    .isLength({min:8}),
    
    check('role', 'El rol es obligatorio')
    .not()
    .isEmpty(),

    check('role')
    .custom(rolValido),

    validarCampos
] ,createUser)

// Ruta para editar un usuario
router.put('/:id', [
    validar_jwt,
    
    tieneRol('ADMIN_USER'),
    
    check('id', 'No es un ID de MongoDB válido')
    .isMongoId(),
    
    check('id').custom(existeUsuario),
    
    check('role').custom(rolValido),

    check('username', 'El nombre de usuario debe ser un e-mail')
    .isEmail(),
    
    validarCampos
] ,editUser)

// Ruta para eliminar un usuario - update del estado
router.delete('/:id', [
    validar_jwt,
    
    tieneRol('ADMIN_USER'),
    
    check('id', 'No se recibió un ID de MongoDB válido')
    .isMongoId(),

    check('id')
    .custom(existeUsuario),

    validarCampos
    
], deleteUser)



module.exports = router;