const mongoose = require('mongoose');

const otpModel = mongoose.model('datn_otp', new mongoose.Schema({
    otp: {
        type: Number,
        require: true
    },
    user_id: {
        type: String,
    }
}, {
    timestamps: true
}))

module.exports = {
    otpModel
}