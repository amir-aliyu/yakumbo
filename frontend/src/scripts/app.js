const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const {
    v4: uuidv4
} = require('uuid'); // Import uuidv4 from uuid library
const WebSocket = require('ws'); // Import WebSocket library
const cron = require('node-cron'); // Import node-cron library
require('dotenv').config(); // Import dotenv library

// MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const uri = process.env.ATLAS_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Create a WebSocket server
const wss = new WebSocket.Server({
    noServer: true
});
// Connect to the WebSocket server
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);
    });
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Serve script.js
app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js');
});

// Serve style.css
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
});

// Example database in memory (will be replaced with a real database, probably MongoDB Atlas?)
// Hehe I'm using MongoDB Atlas
// let plants = [];
let cronJobs = [];

// Endpoint to add a plant
app.post('/add-plant', (req, res) => {
    const {
        plantName,
        plantType,
        wateringTime
    } = req.body;

    addPlantToDB(plantName, plantType, wateringTime).then((plantId) => {
        scheduleCronJobs(); // Update cron jobs after adding a plant

        // Notify connected clients about the new plant
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
            // client.send(JSON.stringify({
            //   type: 'notification',
            //   message: `New plant added to server: ${name}`
            // }));
            }
        });

        res.json({
            message: `Plant "${plantName}" (${plantType}) added successfully with ID ${plantId}`
        });
    });
});

// Endpoint to get all plants
app.get('/get-plants', (req, res) => {
    // Get plants from MongoDB (async function)
    getPlantsFromDB().then((plants) => {
        res.json(plants);
    });
    // res.json(getPlantsFromDB());
});

// Endpoint to delete a plant by ID
app.delete('/delete-plant/:id', (req, res) => {
    const plantId = req.params.id;

    deletePlantFromDB(plantId).then((numDeleted) => {
        if (numDeleted == 1) {
            scheduleCronJobs(); // Update cron jobs after adding a plant
            res.json({
                message: 'Plant deleted successfully'
            });
        } else if (numDeleted == 0){
            res.status(404).json({
            error: 'Plant not found'
            });
        }
    });

});

// Function to schedule cron jobs based on plant data
function scheduleCronJobs() {
    // Cancel existing cron jobs
    cronJobs.forEach((job) => job.stop());
    cronJobs = [];
    const plants = Array.from(getPlantsFromDB()); // Get plants from MongoDB (async function)

    // Schedule notifications for each plant (in seconds)
    plants.forEach((plant) => {
        const job = cron.schedule(`*/${plant.wateringTime} * * * * *`, () => {
        // Send notification to WebSocket clients about watering the plant
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'notification',
                message: `Water your ${plant.name} now!`
            }));
            console.log(`Sent notification to clients for plant ${plant.name}`);
            }
        });
        });
        cronJobs.push(job);
    });
}

// Function to add plant to MongoDB
async function addPlantToDB(plantName, plantType, wateringTime) {
    try {
        const database = client.db("Master_Database");
        const collection = database.collection("Test_User");
        const plant = {
            name: plantName,
            type: plantType,
            wateringTime: wateringTime
        };
        const result = await collection.insertOne(plant);
        console.log(`New plant added with the following id: ${result.insertedId}`);
        return result.insertedId;
    } finally {
    }
}

// Function to get plants as an array from MongoDB
async function getPlantsFromDB() {
    let plants = [];
    try {
        // Currently no separate users, only one collection
        const database = client.db("Master_Database");
        const collection = database.collection("Test_User");
        const query = {};
        plants = await collection.find(query).toArray();
    } finally {
    }
    return plants;
}

// Function to delete a plant from MongoDB
async function deletePlantFromDB(plantId) {
    try {
        const database = client.db("Master_Database");
        const collection = database.collection("Test_User");
        const query = {"_id": new ObjectId(plantId)};
        const result = await collection.deleteOne(query);
        if (result.deletedCount == 1) {
            console.log(`Deleted plant with the following id: ${plantId}`);
        } else {
            console.log(`No plant found with the following id: ${plantId}`);
        }
        return result.deletedCount;
    } catch (error){
        console.error('Error deleting plant:', error);
    }
}

// Create HTTP server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Upgrade HTTP server to WebSocket server
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

// Schedule cron jobs for existing plants
scheduleCronJobs();

// Logging for WebSocket server
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});
