const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    wateringTime: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    }
}, { timestamps: true }); 

const accountSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
    }

}, { timestamps: true }); // Adding timestamps to track creation and modification times


module.exports = mongoose.model('Account', accountSchema);