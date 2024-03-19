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
const uri = process.env.ATLAS_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
    try {
        // Connect the client to the server    (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
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
let plants = [];
let cronJobs = [];

// Endpoint to add a plant
app.post('/add-plant', (req, res) => {
    const {
        plantName,
        plantType,
        wateringTime
    } = req.body;
    const plantId = uuidv4();

    addPlantToDB(plantName, plantType, wateringTime); // Add plant to MongoDB (async function)

    plants.push({
        id: plantId,
        name,
        wateringTime
    });

    // Notify connected clients about the new plant
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
        // client.send(JSON.stringify({
        //   type: 'notification',
        //   message: `New plant added to server: ${name}`
        // }));
        }
    });
    scheduleCronJobs(); // Update cron jobs after adding a plant
    res.json({
        message: `Plant "${plantName}" (${plantType}) added successfully with ID ${plantId}`
    });
});

// Endpoint to get all plants
app.get('/get-plants', (req, res) => {
    res.json(plants);
});

// Endpoint to delete a plant by ID
app.delete('/delete-plant/:id', (req, res) => {
    const plantId = req.params.id;
    const index = plants.findIndex((plant) => plant.id === plantId);
    if (index !== -1) {
        plants.splice(index, 1);
        scheduleCronJobs(); // Update cron jobs after adding a plant
        res.json({
        message: 'Plant deleted successfully'
        });
    } else {
        res.status(404).json({
        error: 'Plant not found'
        });
    }
});

// Function to schedule cron jobs based on plant data
function scheduleCronJobs() {
    // Cancel existing cron jobs
    cronJobs.forEach((job) => job.stop());
    cronJobs = [];

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
        await client.connect();
        const database = client.db("Master_Database");
        const collection = database.collection("Test_User");
        const plant = {
            name: plantName,
            type: plantType,
            wateringTime: wateringTime
        };
        const result = await collection.insertOne(plant);
        console.log(`New plant added with the following id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

async function getPlantsFromDB() {
    try {
        await client.connect();
        const database = client.db("Master_Database");
        const collection = database.collection("Test_User");
        const query = {};
        const plants = await collection.find(query).toArray();
    } finally {
        await client.close();
    }
    return plants;
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