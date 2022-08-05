const express = require('express');
const { getBets, getBetById, createBet, editBet, deleteBet } = require('../controllers/betController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', auth, getBets);
router.get('/:bet_id', auth, getBetById);
router.post('/', auth, createBet);
router.patch('/:bet_id', auth, editBet);
router.delete('/:bet_id', auth, deleteBet);

module.exports = router;