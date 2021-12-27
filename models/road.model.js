const mongoose = require('mongoose');

const roadModel = mongoose.model('datn_road', new mongoose.Schema({
    target_from: {
        type: String
    },
    target_to: {
        type: String
    },
    customer_id: mongoose.Schema.Types.ObjectId,
    driver_id: mongoose.Schema.Types.ObjectId,
    status: {
        type: String,
        enum: ['CREATED', 'WAIT', 'APPROVED','REJECTD' ,'RUNNING', 'SUCCESS', 'FAILED']
    }
}, {
    timestamps: true
}))

module.exports = {
    roadModel
}