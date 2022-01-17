const mongoose = require('mongoose');

const imageModel = mongoose.model('datn_image', new mongoose.Schema({
    image_name: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    user_id: {
        type: String,
    }
}, {
    timestamps: true
}))

module.exports = {
    imageModel
}