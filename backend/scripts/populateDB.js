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
        name: "Super Tasty Tomato Soup!",
        ingredients: ["Tomato Plant","Basil"],
        recipeHtml: "./utilities/tomatoSoup.html"
    }, {
        name: "Carrot Cake Recipe",
        ingredients: ["Carrots",],
        recipeHtml: "./utilities/carrotCake.html"
    }, {
        name: "Jollof",
        ingredients: ["Tomato Plant","Onion","Basil"],
        recipeHtml: "./utilities/jollof.html"
    },{
        name: "Pizza",
        ingredients: ["Tomato Plant","Basil"],
        recipeHtml: "./utilities/pizza.html"
    },{
        name: "Lavender Tea",
        ingredients: ["Lavender"],
        recipeHtml: "./utilities/lavender.html"
    }

];

const insertData = async () => {
    try {
        await Recipe.deleteMany();  // Clears all existing entries in the Recipe collection
        await Recipe.insertMany(recipes);  // Inserts new entries into the Recipe collection
        console.log("Success");
    } catch (error) {
        console.error("Error inserting data:", error);  // Logs any errors during the insertion process
    } finally {
        mongoose.disconnect();  // Disconnects from MongoDB once the operations are complete
    }
};

insertData();  // Executes the insertion function
