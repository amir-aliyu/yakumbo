const cron = require('node-cron');
const Plant = require('../models/plantModel');

async function getPlantsFromDB() {
    try {
        const plants = await Plant.find({}); // Fetch all documents from the plants collection
        return plants; // Returns a promise resolved with the array of plants
    } catch (error) {
        console.error("Failed to fetch plants from DB:", error);
        throw error; // Rethrow or handle as needed
    }
}

let cronJobs = []; // Keep track of the cron jobs

// Function to stop all jobs
function stopAllCronJobs() {
    cronJobs.forEach((job) => job.stop());
    cronJobs = [];
}

// Function to schedule cron jobs for plant watering
async function schedulePlantWateringJobs(wss) {
    console.log(`schedulePlantWateringJobs ${wss}`)

    stopAllCronJobs(); // Stop existing jobs

    const plants = await getPlantsFromDB(); // Retrieve plants from DB

    // Schedule new jobs
    plants.forEach((plant) => {
        const job = cron.schedule(`*/${plant.wateringTime} * * * * *`, () => {
            console.log(`------ Notification: Time to water your ${plant.name}!`)
            console.log(`clients: ${wss.clients.size}`)
            wss.clients.forEach((client) => {
                    client.send(JSON.stringify({
                        type: 'notification',
                        message: `Time to water your ${plant.name}!`
                    }));
                    console.log(`Notification sent for ${plant.name}`);
            });
        });

        cronJobs.push(job); // Add new job to the list
    });
}

module.exports = { schedulePlantWateringJobs };
