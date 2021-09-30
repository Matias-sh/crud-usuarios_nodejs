const mongoose = require('mongoose');

mongoose.connect(process.env.URI, (err) =>{
    if(err){
        console.log('ERROR DB: ', err);
    }
    console.log('Base de Datos Conectada')
});