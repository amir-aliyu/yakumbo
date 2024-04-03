const express = require('express');
const router = express.Router();

const {
    getAllAccounts,
    getAccountById,
    addAccount,
    deleteAccountById,
    updateAccountById
} = require('../controllers/accountController');

// GET Requests
router.get('/', getAllAccounts);
router.get('/:id', getAccountById);

// POST Requests
router.post('/', addAccount)

// PATCH Requests
router.patch('/:id', updateAccountById);

// DELETE Requests
router.delete('/:id', deleteAccountById);


module.exports = router;
