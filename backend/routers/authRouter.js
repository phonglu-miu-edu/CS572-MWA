const express = require('express');
const { loginAsync } = require('../controllers/authController');
const router = express.Router();

router.post('/login', loginAsync);

module.exports = router;