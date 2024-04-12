const Account = require('../models/accountModel');
const getUUID = require('uuid-by-string')

// Get all plants
const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.status(200).json(accounts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific account by ID
const getAccountById = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add new account
const addAccount = async (req, res) => {
    const { name, username, password } = req.body;
    const uuid = getUUID(username + password);
    try {
        const existingAccount = await Account.findOne({ username: username });
        if (existingAccount) {
            return res.status(400).json({ message: 'Account already exists' });
        } else {
            const account = await Account.create({ name, username, uuid });
            res.status(200).json(account);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an account by ID
const updateAccountById = async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!account) {
            return res.status(404).json({ message: 'Plant not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an account by ID
const deleteAccountById = async (req, res) => {
    try {
        const result = await Account.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json({ message: `Account with ID ${req.params.id} deleted` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Set login cookie
const setLoginCookie = async (req, res) => {
    // return UUID based on username and password
    const uuid = getUUID(req.body.username + req.body.password);
    const account = await Account.findOne({ username: req.body.username });
    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    } else if (account.uuid !== uuid) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    // set cookie
    res.cookie('uuid', uuid, { sameSite: 'none', secure: false });
    res.status(200).json({ message: 'Login successful' });
};

// Get cookies
const getCookies = async (req, res) => {
    // Get all cookies
    res.send(req.cookies);
};

module.exports = {
    getAllAccounts,
    getAccountById,
    addAccount,
    updateAccountById,
    deleteAccountById,
    setLoginCookie,
    getCookies
};
