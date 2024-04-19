const express = require('express');
const router = express.Router();

const {
    getAllAccounts,
    getAccountById,
    addAccount,
    deleteAccountById,
    updateAccountById,
    setLoginCookie,
    getCookies,
    addFriend,
    removeFriend
} = require('../controllers/accountController');

// GET Requests
router.get('/', getAllAccounts);
router.get('/cookies', getCookies);
router.get('/:id', getAccountById);

// POST Requests
router.post('/', addAccount);
router.post('/login', setLoginCookie);
router.post('/register', addAccount);
router.post('/:id/friends', addFriend);

// PATCH Requests
router.patch('/:id', updateAccountById);

// DELETE Requests
router.delete('/:id', deleteAccountById);
router.delete('/:id/friends', removeFriend);



module.exports = router;
