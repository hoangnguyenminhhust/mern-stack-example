const mongoose = require('mongoose');

const roleModel = mongoose.model('datn_role', new mongoose.Schema({
    role_type: {
        type: String,
        enum: ['ADMIN', 'MANAGER', 'CUSTOMER', 'DRIVER', 'NOT_APPROVE'],
        unique: true
    },
    role_code: {
        type: Number,
        enum: [0, 1, 2, 3, 4],
        unique: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
}))



module.exports = {
    roleModel,
    createRole: async (newRole) => {
        return await roleModel.create(newRole)
    },
    createRoleIfNotFound: async (newRole) => {
        const existedRole = await roleModel.findOne({
            role_code: newRole.role_code
        })
        if (existedRole) {
            return
        } else {
            return await roleModel.create(newRole)
        }
    }
}