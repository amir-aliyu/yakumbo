const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    recipeHtml: {
        type: String,
        required: true
    }
}, { timestamps: true }); // This will add `createdAt` and `updatedAt` fields

module.exports = mongoose.model('Recipe', recipeSchema);
