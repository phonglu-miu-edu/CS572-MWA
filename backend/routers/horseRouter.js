const express = require('express');
const { getHorses, getHorseById, createHorse, editHorse, deleteHorse } = require('../controllers/horseController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', auth, getHorses);
router.get('/:horse_id', auth, getHorseById);
router.post('/', auth, createHorse);
router.patch('/:horse_id', auth, editHorse);
router.delete('/:horse_id', auth, deleteHorse);

module.exports = router;