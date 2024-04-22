const Recipe = require('../models/recipeModel');


// Get all recipes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get recipes by ingredient list
const getRecipesByIngredient = async (req, res) => {
    try {
        const { ingredients } = req.query;  // Ingredients are expected as a comma-separated string
        if (!ingredients) {
            return res.status(400).json({ message: 'No ingredients provided' });
        }
        const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim());
        const recipes = await Recipe.find({ ingredients: { $all: ingredientList } });
        if (recipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found that contain all the given ingredients' });
        }
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    getAllRecipes,
    getRecipesByIngredient,
};
