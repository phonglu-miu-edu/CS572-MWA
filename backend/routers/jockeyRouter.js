const express = require('express');
const {
    getJockeyById,
    createJockey,
    editJockey,
    deleteJockey,
    getPagedJockeys
} = require('../controllers/jockeyController');
const auth = require('../middlewares/authMiddleware');
const { bodyValidation, idValidation } = require('../middlewares/jockeyMiddleware');
const router = express.Router();

router.get('/', auth, getPagedJockeys);
router.get('/:id', [auth, idValidation], getJockeyById);
router.post('/', [auth, bodyValidation], createJockey);
router.patch('/:id', auth, editJockey);
router.delete('/:id', auth, deleteJockey);

module.exports = router;