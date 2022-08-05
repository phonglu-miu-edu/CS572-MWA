const express = require('express');
const { getRacesAsync } = require('../controllers/raceController');
const router = express.Router();

router.get('/', getRacesAsync);

module.exports = router;