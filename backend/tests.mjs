import assert from 'node:assert';
import test from 'node:test';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import WebSocket from 'ws';
import getUUID from 'uuid-by-string';
// NOTE: This requires the server to be running!!!
dotenv.config();

// CONNECTIVITY:
// Test if we are connected to the database
let connected = false;
test('Test if we are connected to the database', async () => {
    await mongoose.connect(process.env.ATLAS_URI).then(() => {
        connected = true;
    });
    assert.strictEqual(connected, true);
});
// Test if we are connected to the websocket server
test('Test Websocket connectivity', async () => {
    let ws = new WebSocket('ws://localhost:4000'); // Declare the 'ws' variable
    ws.on('open', () => {
        assert.strictEqual(ws.readyState, WebSocket.OPEN);
    });
});
// Test if server is using cross-origin resource sharing
test('Test if server is using CORS', async () => {
    const response = await fetch('http://localhost:4000/api/plants/', {
        method: 'GET',
        headers: {
            'Origin': 'http://localhost:3000'
        }
    });
    assert.strictEqual(response.headers.get('Access-Control-Allow-Origin'), 'http://localhost:3000');
});
// Test if server can set login cookies
test('Test if server can set cookies', async () => {
    const response = await fetch('http://localhost:4000/api/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: "test@example.com", password: "1234" }),
      });
    const text = await response.text();
});

// TESTING API ENDPOINTS
// PLANTS:
// Try to get /api/plants/presets
test('GET /api/plants/presets', async () => {
    const response = await fetch('http://localhost:4000/plants/presets');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(text.includes('Login successful'), true);
});
// Test if cookie retrieval is working
test('Test if cookie retrieval is working', async () => {
    const response = await fetch('http://localhost:4000/api/accounts/cookies', {
        method: 'GET'
    });
    assert.strictEqual(response.headers.get('Set-Cookie'), null);
});
// Test logout functionality
test('Test logout functionality', async () => {
    const response = await fetch('http://localhost:4000/api/accounts/logout', {
        method: 'POST'
    });
    const text = await response.text();
    assert.strictEqual(response.status, 200);
    assert.strictEqual(text.includes('Logout successful'), true);
});
// Test that server port is correct
test('Test that server port is correct', async () => {
    assert.strictEqual(process.env.PORT, '4000');
});

// SECURITY:
// Test that UUIDs are being generated correctly
test('Test that UUIDs are being generated correctly', async () => {
    const uuid = getUUID('test');
    assert.strictEqual(uuid, 'a94a8fe5-ccb1-5ba6-9c4c-0873d391e987');
});
// Test input validation
test('Test input validation', async () => {
  const maliciousInput = "' OR '1'='1"; // SQL Injection
  const response = await fetch('http://localhost:4000/api/plants/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: maliciousInput }),
  });
  assert.strictEqual(response.status, 400); // Expecting bad request response
});
// Test that the server is using a content security policy header
test('Test content security policy header', async () => {
  const response = await fetch('http://localhost:4000');
  assert(response.headers.has('Content-Security-Policy'), 'CSP header is not set');
});

// PLANTS:
// Set up a test plant to use for the next tests
var testPlant;
var testPlantId;

// Try to post to /api/plants/
test('POST /api/plants/', async () => {
    const response = await fetch('/api/plants/', {
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
    const response = await fetch(`/api/plants/${testPlantId}`, {
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
    const response = await fetch(`/api/plants/${testPlantId}`);
    const plant = await response.json();
    assert.strictEqual(response.status, 200);
    assert.strictEqual(plant.name, 'Test Plant 2');
    assert.strictEqual(plant.type, 'Test Type 2');
    assert.strictEqual(plant.wateringTime, 'Tuesday');
});
// Remove this plant after the test
test('DELETE /api/plants/', async () => {
    const response = await fetch(`/api/plants/${testPlantId}`, {
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
    const response = await fetch('/api/accounts/', {
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
// Try to get this account
test('GET /api/accounts/', async () => {
    const response = await fetch(`http://localhost:4000/api/accounts/${testAccountUUID}`);
    const account = await response.json();
    assert.strictEqual(response.status, 200);
    assert.strictEqual(account.name, 'Test Account');
    assert.strictEqual(account.username, 'test');
    assert.strictEqual(account.uuid, testAccountUUID);
});
// Try to edit this account
test('PATCH /api/accounts/', async () => {
    const response = await fetch(`/api/accounts/${testAccountId}`, {
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
    const response = await fetch(`/api/accounts/${testAccountId}`, {
        method: 'DELETE'
    });
    assert.strictEqual(response.status, 200);
});
// Afterwards, disconnect from the database
test('Disconnect from the database', async () => {
    await mongoose.disconnect();
});
// Stop running tests.mjs
test('Stop running tests.mjs', async () => {
    process.exit();
});
