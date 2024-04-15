import assert from 'node:assert';
import test from 'node:test';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

test('that 1 is equal 1', () => {
  assert.strictEqual(1, 1);
});

// Boolean for whether we are connected to the database
let connected = false;

test('Test if we are connected to the database', async () => {
    await mongoose.connect(process.env.ATLAS_URI).then(() => {
        connected = true;
    });
    assert.strictEqual(connected, true);
});