const express = require('express');
const { getBets, getBetById, createBet, editBet, deleteBet } = require('../controllers/betController');
const { isAuth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', isAuth, getBets);
router.get('/:bet_id', isAuth, getBetById);
router.post('/', isAuth, createBet);
router.patch('/:bet_id', isAuth, editBet);
router.delete('/:bet_id', isAuth, deleteBet);

module.exports = router;