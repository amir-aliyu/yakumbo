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
    const { name, email, uuid } = req.body;
    try {
        const account = await Account.create({ name, email, uuid });
        res.status(200).json(account);
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
    // Set username cookie to request body
    res.cookie('username', req.body.username, { sameSite: 'none', secure: false });
    res.cookie('password', req.body.password, { sameSite: 'none', secure: false });
    // return UUID based on username and password
    const uuid = getUUID(req.body.username + req.body.password);
    res.send(uuid);
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
