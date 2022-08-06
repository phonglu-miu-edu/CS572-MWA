const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { isValidEmail } = require('../middlewares/authMiddleware');

router.post('/register', isValidEmail, register);
router.post('/login', isValidEmail, login);

module.exports = router;