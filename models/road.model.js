const mongoose = require('mongoose');

const roadModel = mongoose.model('datn_road', new mongoose.Schema({
    target_from: {
        type: String
    },
    target_to: {
        type: String
    },
    start_time: Date, 
    user_id: mongoose.Schema.Types.ObjectId,
    report_time: Date, 
    end_time: Date,
    bill_price: String, 
    payable_price: String,
    driver_id: mongoose.Schema.Types.ObjectId,
    status: {
        type: String,
        enum: [ 'WAIT', 'RUNNING', 'SUCCESS', 'FAILED']
    },
    customer: String,
    description:  String,
    is_sign: Boolean,
    latitude: String,
    longitude : String,
}, {
    timestamps: true
}))

module.exports = {
    roadModel
}