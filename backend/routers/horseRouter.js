const express = require('express');
const { getHorses, getHorseById, createHorse, editHorse, deleteHorse } = require('../controllers/horseController');
const { isAuth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', isAuth, getHorses);
router.get('/:horse_id', isAuth, getHorseById);
router.post('/', isAuth, createHorse);
router.patch('/:horse_id', isAuth, editHorse);
router.delete('/:horse_id', isAuth, deleteHorse);

module.exports = router;