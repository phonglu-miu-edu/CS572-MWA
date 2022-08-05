const express = require('express');
const { getRaces, getRaceById, createRace, editRace, deleteRace } = require('../controllers/raceController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', auth, getRaces);
router.get('/:race_id', auth, getRaceById);
router.post('/', auth, createRace);
router.patch('/:race_id', auth, editRace);
router.delete('/:race_id', auth, deleteRace);

module.exports = router;