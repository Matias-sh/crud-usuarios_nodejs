const { response } = require('express');
const jwt = require('jsonwebtoken');

const generar_jwt = (uid = '') => {
    const payload = { uid };
    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,
            (error, token) => {
                if (error) {
                    console.log(error)
                    reject('Error al generar token')
                }

                resolve(token)
            }
        )
    });
};

module.exports = {
    generar_jwt
}