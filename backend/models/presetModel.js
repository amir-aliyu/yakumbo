const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const presetSchema = new Schema({
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
    }
}, { timestamps: true }); // Adding timestamps to track creation and modification times


module.exports = mongoose.model('Preset', presetSchema);