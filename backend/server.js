const express = require('express');
const mongoose = require('mongoose');
const WebSocket = require('ws');

require('dotenv').config();

const plantRoutes = require('./routes/plants');
const { schedulePlantWateringJobs } = require('./utilities/cronScheduler');

const PORT = process.env.PORT || 4000;
const WS_PORT = process.env.WS_PORT || 8080; // WebSocket port

// Express app
const app = express();

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/plants', plantRoutes)

// connect to db
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Start HTTP server
        const server = app.listen(PORT, () => {
            console.log(`Successfully connected to MongoDB`);
            console.log(`HTTP server listening on port ${PORT}`);
        });

        // WebSocket server
        const wss = new WebSocket.Server({ server });
        wss.on('connection', function connection(ws) {
            console.log('Client connected to WebSocket');
            ws.on('message', function incoming(message) {
                console.log('Received: %s', message);
            });
        });

        // Schedule cron jobs for plant watering
        schedulePlantWateringJobs(wss).catch(console.error);
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });