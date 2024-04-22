const cron = require('node-cron');
const Plant = require('../models/plantModel');
const nodemailer = require('nodemailer');
const fs = require('fs').promises; // Import fs module with promises

async function getPlantsFromDB() {
    try {
        const plants = await Plant.find({}); // Fetch all documents from the plants collection
        return plants; // Returns a promise resolved with the array of plants
    } catch (error) {
        console.error("Failed to fetch plants from DB:", error);
        throw error; // Rethrow or handle as needed
    }
}

// function to grab the html from plantEmail.html and also replace the variables correctly
// do this with watering streak 
async function readHtmlFile(filePath, name, time, id, currentStreak) {
    try {
        const htmlContent = await fs.readFile(filePath, 'utf8');
        // insert the correct plant name into the HTML 
        const replacedHtmlContent = htmlContent
            .replace(/\{plantName\}/g, name)
           // .replace(/\{plantType\}/g, type) add in plant type 
            .replace(/\{plantWateringTime}/g, time)
            .replace(/\{plantID}/g, id)
            .replace(/\{currentStreak}/g, currentStreak);
            
        return replacedHtmlContent;
    } catch (error) {
        console.error('Error reading HTML file:', error);
        throw error;
    }
}

// Can possibly use 'to' for when we add accounts
async function sendEmail(to, subject, htmlFilePath, name, time, id, currentStreak) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                // Must use 2FA to get this to work
                user: 'csds393.plant.people@gmail.com',
                pass: 'jqxm ooji zqgr zawu' // This is from App Passwords 
            }
        });

        const htmlContent = await readHtmlFile(htmlFilePath, name, time, id, currentStreak); // setup the HTML email

        let info = await transporter.sendMail({
            from: 'csds393.plant.people@gmail.com',
            to: 'saa210@case.edu',
            //to: 'mfc56@case.edu, jsy47@case.edu, eje55@case.edu, jcd171@case.edu, saa210@case.edu, axo193@case.edu', // Hard coding this for just for sprint 1
            subject: subject,
            html: htmlContent // use the HTML content from the file 
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

function parseDaysToCron(days) {
    const daysOfWeek = {
        'Sunday': 0, 'Monday': 1, 'Tuesday': 2,
        'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6
    };

    if (!days) {
        console.error("CRON Error: wateringDays is undefined or not provided.");
        return '*'; // This will default to running the job every day
    }

    // Trim the overall string, split by spaces, and then trim each individual day string
    return days.trim().split(/\s+/).map(day => day.trim()).map(day => {
        if (daysOfWeek.hasOwnProperty(day)) {
            return daysOfWeek[day];
        } else {
            console.error("CRON Invalid day name:", day);
            return null; // Handle invalid day names gracefully
        }
    }).filter(day => day !== null).join(',');
}


// Function to schedule cron jobs for plant watering
async function schedulePlantWateringJobs(wss) {
    console.log(`schedulePlantWateringJobs ${wss}`)

    stopAllCronJobs(); // Stop existing jobs

    const plants = await getPlantsFromDB(); // Retrieve plants from DB

    // Schedule new jobs
    plants.forEach((plant) => {
        console.log(`Scheduling: ${plant.name}`)
        const daysCronFormat = parseDaysToCron(plant.wateringTime);
        const job = cron.schedule(`0 8 * * ${daysCronFormat}`, () => { // Runs at 08:00 on specified days
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
            // setup variables for plant email filepath and name/watering times
            const emailFilePath = "./utilities/plantEmail.html";
            let plantName = `${plant.name}`
            let plantType = `${plant.type}` //store the plant type
            let plantWateringTime = `${plant.wateringTime}`
            let plantID = `${plant.id}`
            let currentStreak = `${plant.streak}`
           
            // Change 'Email' for second sprint
            sendEmail('Email', 'Plant Watering Reminder', emailFilePath, plantName, plantWateringTime, plantID, currentStreak).catch(error => {
                         console.error('Failed to send email:', error);
            });
        });
        cronJobs.push(job); // Add new job to the list
    });
}

module.exports = { schedulePlantWateringJobs };