const mongoose = require('mongoose');

const roadModel = mongoose.model('datn_road', new mongoose.Schema({
    target_from: {
        type: String
    },
    target_to: {
        type: String
    },
    start_time: Date, 
    report_time: Date, 
    bill_price: String, 
    payable_price: String,
    driver_id: mongoose.Schema.Types.ObjectId,
    status: {
        type: String,
        enum: [ 'WAIT', 'RUNNING', 'SUCCESS', 'FAILED']
    }
}, {
    timestamps: true
}))

module.exports = {
    roadModel
}