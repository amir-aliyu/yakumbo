/**
 * Script: populateDB.js
 * Description: This script is designed to populate the MongoDB database with placeholder data for development and testing purposes. 
 * It inserts predefined sets of recipes into the database, ~~ DELETING ALL EXISTING DATA ~~ in those collections to prevent duplicates. 
 * This is intended as a single-use script to be run manually when setting up a new environment or refreshing the data.
 * 
 * Usage:
 * 1. Ensure MongoDB connection parameters are set in the .env file using ATLAS_URI.
 * 2. From the project root, run this script using Node.js to populate the database:
 *    $ node scripts/populateDB.js
 * 
 * Note: ONLY RUN THIS SCRIPT IF THE recipe DB table is EMPTY -- IT WILL CLEAR IT!!
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('../models/recipeModel'); 

mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log("MongoDB connected successfully."))
    .catch(err => console.error("MongoDB connection error:", err));

const recipes = [
    {
        name: "Garden Patch Pasta Salad",
        ingredients: ["Tomato Plant", "Daisy", "Carrots", "Peony"],
        recipeHtml: "<p>A refreshing pasta salad perfect for any garden party. Begin by boiling diced 'Carrots' until tender. Mix with cooked pasta shells and fresh 'Tomato Plant' chunks. Garnish with 'Daisy' petals and 'Peony' petals for a colorful, edible delight. Drizzle with olive oil and a squeeze of lemon before serving.</p>"
    },
    {
        name: "Bonsai Tree Stir-Fry",
        ingredients: ["Bonsai Tree", "Hydrangea", "Snake Plant", "Spider Plant"],
        recipeHtml: "<p>Experience a unique stir-fry with a blend of horticultural wonders. Heat a skillet and add thinly sliced 'Snake Plant' strips and 'Spider Plant' shoots. Once softened, add 'Bonsai Tree' leaves and stir until they just begin to wilt. Toss in a handful of 'Hydrangea' blossoms for a touch of sweetness. Serve hot, seasoned with soy sauce and ginger.</p>"
    },
    {
        name: "Forest Floor Roast",
        ingredients: ["Carrots", "Hydrangea", "Daisy", "Peony"],
        recipeHtml: "<p>This hearty roast combines the earthy flavors of the garden. Layer a baking dish with 'Carrots' and 'Hydrangea' roots. Top with 'Daisy' buds and roast until everything is tender. Sprinkle with 'Peony' petals before serving to add a floral aroma and vibrant color to this rustic dish.</p>"
    }
];

const insertData = async () => {
    try {
        await Recipe.deleteMany();  // Clears all existing entries in the Recipe collection
        await Recipe.insertMany(recipes);  // Inserts new entries into the Recipe collection
        console.log("Placeholder data successfully inserted.");
    } catch (error) {
        console.error("Error inserting data:", error);  // Logs any errors during the insertion process
    } finally {
        mongoose.disconnect();  // Disconnects from MongoDB once the operations are complete
    }
};

insertData();  // Executes the insertion function
