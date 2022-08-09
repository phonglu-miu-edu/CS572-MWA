const express = require('express');
const {
    getRaceById,
    createRace,
    editRace,
    deleteRace,
    getPagedRaces
} = require('../controllers/raceController');
const { isAuth } = require('../middlewares/authMiddleware');
const { createValidation, editValidation } = require('../middlewares/raceMiddleware');
const router = express.Router();

router.get('/:pageSize/:page', isAuth, getPagedRaces);
router.get('/:id', isAuth, getRaceById);
router.post('/', [ isAuth, createValidation ], createRace);
router.patch('/:id', [ isAuth, editValidation ], editRace);
router.delete('/:id', isAuth, deleteRace);

module.exports = router;