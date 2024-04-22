const express = require('express');
const router = express.Router();

const {
    getAllRecipes,
    getRecipesByIngredient,
} = require('../controllers/recipeController');

// GET Requests
router.get('/', getAllRecipes); // Get all recipes
router.get('/by-ingredients', getRecipesByIngredient); // Get recipes by a list of ingredients

// POST Requests
//router.post('/', TODO)

module.exports = router;
