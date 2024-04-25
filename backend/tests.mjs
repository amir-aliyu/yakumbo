import assert from 'node:assert';
import test from 'node:test';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// NOTE: This requires the server to be running!!!

dotenv.config();

console.log("THIS IS HERE" + process.env.ATLAS_URI);

// Boolean for whether we are connected to the database
let connected = false;
test('Test if we are connected to the database', async () => {
    await mongoose.connect(process.env.ATLAS_URI).then(() => {
        connected = true;
    });
    assert.strictEqual(connected, true);
});

// TESTING API ENDPOINTS
// PLANTS:
// Try to get /api/plants/presets
test('GET /api/plants/presets', async () => {
    const response = await fetch('http://localhost:4000/api/plants/presets');
    assert.strictEqual(response.status, 200);
});

// Set up a test plant to use for the next tests
var testPlant;
var testPlantId;

// Try to post to /api/plants/
test('POST /api/plants/', async () => {
    const response = await fetch('http://localhost:4000/api/plants/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Test Plant',
            type: 'Test Type',
            wateringTime: "Monday",
            owner: 'test'
        })
    });
    // Get the plant's id
    testPlant = await response.json();
    testPlantId = testPlant._id;
    assert.strictEqual(response.status, 200);
});
// Try to edit this plant
test('PATCH /api/plants/', async () => {
    const response = await fetch(`http://localhost:4000/api/plants/${testPlantId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Test Plant 2',
            type: 'Test Type 2',
            wateringTime: "Tuesday",
            owner: 'test'
        })
    });
    assert.strictEqual(response.status, 200);
});
// Get plant from id
test('GET /api/plants/', async () => {
    const response = await fetch(`http://localhost:4000/api/plants/${testPlantId}`);
    const plant = await response.json();
    assert.strictEqual(response.status, 200);
    assert.strictEqual(plant.name, 'Test Plant 2');
    assert.strictEqual(plant.type, 'Test Type 2');
    assert.strictEqual(plant.wateringTime, 'Tuesday');
});
// Remove this plant after the test
test('DELETE /api/plants/', async () => {
    const response = await fetch(`http://localhost:4000/api/plants/${testPlantId}`, {
        method: 'DELETE'
    });
    assert.strictEqual(response.status, 200);
});

//ACCOUNTS:
// Set up a test account to use for the next tests
var testAccount;
var testAccountUUID;
var testAccountId;

// Try to post to /api/accounts/
test('POST /api/accounts/', async () => {
    const response = await fetch('http://localhost:4000/api/accounts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Test Account',
            username: 'test',
            uuid: 'testuuid'
        })
    });
    // Get the account's uuid
    testAccount = await response.json();
    testAccountUUID = testAccount.uuid;
    testAccountId = testAccount._id;
    assert.strictEqual(response.status, 200);
});
// Try to edit this account
test('PATCH /api/accounts/', async () => {
    const response = await fetch(`http://localhost:4000/api/accounts/${testAccountId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Test Account 2',
            username: 'test',
            uuid: 'testuuid'
        })
    });
    assert.strictEqual(response.status, 200);
});
// Try to remove this account
test('DELETE /api/accounts/', async () => {
    const response = await fetch(`http://localhost:4000/api/accounts/${testAccountId}`, {
        method: 'DELETE'
    });
    assert.strictEqual(response.status, 200);
});
