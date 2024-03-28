const cron = require('node-cron');
const Plant = require('../models/plantModel');
const nodemailer = require('nodemailer');

async function getPlantsFromDB() {
    try {
        const plants = await Plant.find({}); // Fetch all documents from the plants collection
        return plants; // Returns a promise resolved with the array of plants
    } catch (error) {
        console.error("Failed to fetch plants from DB:", error);
        throw error; // Rethrow or handle as needed
    }
}

// Can possibly use 'to' for when we add accounts
async function sendEmail(to, subject, text) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                // Must use 2FA to get this to work
                user: 'csds393.plant.people@gmail.com',
                pass: 'jqxm ooji zqgr zawu' // This is from App Passwords 
            }
        });

        let info = await transporter.sendMail({
            from: 'csds393.plant.people@gmail.com',
            to: 'saa210@case.edu',
            //to: 'mfc56@case.edu, jsy47@case.edu, eje55@case.edu, jcd171@case.edu, saa210@case.edu, axo193@case.edu', // Hard coding this for just for sprint 1
            subject: subject,
            html: text // formatting it in html 
        });

        console.log('Email sent: ', info.response);
    } catch (error) {
        console.error('Failed to send email: ', error);
        throw error;
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
            // Send email notification
            // Change 'Email' for second sprint
            // elongate the message-- add in watering times and image
            let imageUrl = 'https://i.pinimg.com/736x/b9/29/6d/b9296d9f9242ecac6f918942a6368b8e.jpg'
            let message = `
            <p>Time to water ${plant.name}!\n 
            Your plant ${plant.name} needs to be watered every ${plant.wateringTime} seconds</p> 
            <img src="${imageUrl}" alt="Plant Image" style=:max-width: 100%;">
            `;
            sendEmail('Email', 'Plant Watering Reminder', message)
                    .catch(error => {
                        console.error('Failed to send email:', error);
                    });
        });

        cronJobs.push(job); // Add new job to the list
    });
}

module.exports = { schedulePlantWateringJobs };
