const express = require('express');
const router = express.Router();
const { google, callback, register, login } = require('../controllers/authController');

// api/auth

router.get('/google', google);
router.get('/callback', callback);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
