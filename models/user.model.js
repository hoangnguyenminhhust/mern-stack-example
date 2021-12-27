const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userModel = mongoose.model('datn_user', new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    is_delete: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    role_code: {
        type: Number,
        enum: [0, 1, 2, 3, 4],
        default: 4
    },
    truck_id: [{
        truck_id: mongoose.Schema.Types.ObjectId
    }],
    address: String
}))

module.exports = {
    userModel,
    createUser: async (newUser) => {
        return await userModel.create({
            ...newUser,
            password: await bcrypt.hash(newUser.password, 8)
        })
    },
    createUserIfNotFound: async (newUser) => {
        const existedUser = await userModel.findOne({
            username: newUser.username
        })
        if (existedUser) {
            return
        } else {
            return await userModel.create({
                ...newUser,
                password: await bcrypt.hash(newUser.password, 8)
            })
        }
    }
}