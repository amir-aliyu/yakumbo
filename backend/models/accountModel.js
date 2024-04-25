const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
    },
    recipeOptIn: {
        type: Boolean,
        default: true,
        required: true,
    },
    image: {
        type: String,
        required: false,
    }
}, { timestamps: true }); // Adding timestamps to track creation and modification times


module.exports = mongoose.model('Account', accountSchema);
