const mongoose = require('mongoose');

const roadSchema = new mongoose.Schema({
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
        enum: ['WAIT', 'RUNNING', 'SUCCESS', 'FAILED']
    },
    customer: String,
    description: String,
    is_sign: Boolean,
    latitude: String,
    longitude: String,
}, {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } ,
    timestamps: true
})

roadSchema.virtual('driver', {
    ref: 'datn_user',
    localField: 'driver_id',
    foreignField: '_id'
});

roadSchema.virtual('user', {
    ref: 'datn_user',
    localField: 'user_id',
    foreignField: '_id'
});

const roadModel = mongoose.model('datn_road', roadSchema)


module.exports = {
    roadModel
}