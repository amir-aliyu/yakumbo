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
        type: String, // concatenated string of days of the week ex. "Monday Wednesday Friday"
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    owner: {
        type: String,
        required: true,
    }
}, { timestamps: true }); // Adding timestamps to track creation and modification times

module.exports = mongoose.model('Plant', plantSchema);
