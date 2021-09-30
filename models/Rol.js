const { model, Schema } = require('mongoose');

const RoleSchema = new Schema({
    role: {
        type: String,
        enum: ['admin_user', 'common_user']
    }
});

module.exports = model('Rol', RoleSchema);