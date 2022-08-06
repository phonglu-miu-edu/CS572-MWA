const express = require('express');
const { getRaces, getRaceById, createRace, editRace, deleteRace } = require('../controllers/raceController');
const { isAuth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', isAuth, getRaces);
router.get('/:race_id', isAuth, getRaceById);
router.post('/', isAuth, createRace);
router.patch('/:race_id', isAuth, editRace);
router.delete('/:race_id', isAuth, deleteRace);

module.exports = router;