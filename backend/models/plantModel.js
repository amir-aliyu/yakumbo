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
    }
}, { timestamps: true }); // Adding timestamps to track creation and modification times

module.exports = mongoose.model('Plant', plantSchema);