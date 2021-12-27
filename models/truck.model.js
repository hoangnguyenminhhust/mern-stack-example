const mongoose = require('mongoose');

const truckModel = mongoose.model('datn_truck', new mongoose.Schema({
    type: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
    }
}))

module.exports = {
    truckModel
}