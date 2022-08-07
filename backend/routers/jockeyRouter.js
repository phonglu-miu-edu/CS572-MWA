const express = require('express');
const {
    getJockeyById,
    createJockey,
    editJockey,
    deleteJockey,
    getPagedJockeys
} = require('../controllers/jockeyController');
const { isAuth } = require('../middlewares/authMiddleware');
const { createValidation, editValidation } = require('../middlewares/jockeyMiddleware');
const router = express.Router();

router.get('/:pageSize/:page', isAuth, getPagedJockeys);
router.get('/:id', isAuth, getJockeyById);
router.post('/', [ isAuth, createValidation ], createJockey);
router.patch('/:id', [ isAuth, editValidation ], editJockey);
router.delete('/:id', isAuth, deleteJockey);

module.exports = router;