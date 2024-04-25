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
        const account = await Account.findOne({ uuid: req.params.id });
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

// Update an account by uuid
const updateAccountByUUID = async (req, res) => {
    try {
        const account = await Account.findOneAndUpdate({ uuid: req.body.uuid }, req.body, { new: true });
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

// Set logout cookie
const setLogoutCookie = async (req, res) => {
    res.clearCookie('uuid');
    res.status(200).json({ message: 'Logout successful' });
};

// Get cookies
const getCookies = async (req, res) => {
    // Get all cookies
    res.send(req.cookies);
};

// Add a friend to the account
const addFriend = async (req, res) => {
    try {
        // given the email in req.body.friend, find the account with that email
        const friendAccount = await Account.findOne({ username: req.body.friend });
        console.log(friendAccount.uuid);
        const friendUUID = friendAccount ? friendAccount.uuid : null;

        const account = await Account.findOne({ uuid: req.params.id });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        account.friends.push(friendUUID);
        await account.save();
        res.status(200).json(friendAccount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a friend from the account
const removeFriend = async (req, res) => {
    try {
        const account = await Account.findOne({ uuid: req.params.id }); // Account we want to remove a friend from
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        const friendIndex = account.friends.indexOf(req.body.friend); // Index of the friend we want to remove
        if (friendIndex === -1) {
            return res.status(404).json({ message: 'Friend not found in the account\'s friend list' });
        }
        account.friends.splice(friendIndex, 1);
        await account.save();
        res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllAccounts,
    getAccountById,
    addAccount,
    updateAccountById,
    updateAccountByUUID,
    deleteAccountById,
    setLoginCookie,
    getCookies,
    addFriend,
    removeFriend,
    setLogoutCookie
};
