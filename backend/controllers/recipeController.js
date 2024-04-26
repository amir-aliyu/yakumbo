const Recipe = require('../models/recipeModel');
const fs = require('fs').promises; // Import fs promises to handle file operations asynchronously
const path = require('path'); // Import path module to resolve file paths

// Get all recipes
const getAllRecipes = async (req, res) => {
    try {
        let recipes = await Recipe.find(); // Retrieve all recipes from the database
        // Map over each recipe to replace the path with actual HTML content
        recipes = await Promise.all(recipes.map(async (recipe) => {
            try {
                // Resolve the path to the HTML file and read its contents
                const fullPath = path.resolve(__dirname, '..', recipe.recipeHtml); // Move up one directory then into utilities
                const htmlContent = await fs.readFile(fullPath, 'utf8'); // Read file as UTF-8 text
                return { ...recipe.toObject(), recipeHtml: htmlContent }; // Replace the path with the content
            } catch (error) {
                console.error(`Error reading HTML file for recipe ${recipe.name}: ${error.message}`);
                return { ...recipe.toObject(), recipeHtml: "Error loading HTML content." }; // Handle missing or inaccessible files
            }
        }));
        res.status(200).json(recipes); // Send the modified list of recipes with HTML content
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle other errors, like database issues
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
