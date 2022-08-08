const express = require('express');
const {
    getHorseById,
    createHorse,
    editHorse,
    deleteHorse,
    getPagedHorses
} = require('../controllers/horseController');
const { isAuth } = require('../middlewares/authMiddleware');
const { createValidation, editValidation } = require('../middlewares/horseMiddleware');
const router = express.Router();

router.get('/:pageSize/:page', isAuth, getPagedHorses);
router.get('/:id', isAuth, getHorseById);
router.post('/', [ isAuth, createValidation ], createHorse);
router.patch('/:id', [ isAuth, editValidation ], editHorse);
router.delete('/:id', isAuth, deleteHorse);

module.exports = router;