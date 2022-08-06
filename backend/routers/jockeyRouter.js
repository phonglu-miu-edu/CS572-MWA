const express = require('express');
const {
    getJockeyById,
    createJockey,
    editJockey,
    deleteJockey,
    getPagedJockeys
} = require('../controllers/jockeyController');
const { isAuth } = require('../middlewares/authMiddleware');
const { bodyValidation, idValidation } = require('../middlewares/jockeyMiddleware');
const router = express.Router();

router.get('/', isAuth, getPagedJockeys);
router.get('/:id', [isAuth, idValidation], getJockeyById);
router.post('/', [isAuth, bodyValidation], createJockey);
router.patch('/:id', isAuth, editJockey);
router.delete('/:id', isAuth, deleteJockey);

module.exports = router;