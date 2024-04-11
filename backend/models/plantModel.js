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
        type: Number, // Assuming wateringTime is stored as a number (e.g., frequency in hours or days)
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    streak: {
        type: Number,
        required: false,
        default: 0,
    }
}, { timestamps: true }); // Adding timestamps to track creation and modification times

module.exports = mongoose.model('Plant', plantSchema);