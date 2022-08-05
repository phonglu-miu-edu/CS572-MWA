const express = require('express');
const { getHorsesAsync } = require('../controllers/horseController');
const router = express.Router();

router.get('/', getHorsesAsync);

module.exports = router;