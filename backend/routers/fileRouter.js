const express = require('express');
const { getUploadUrl } = require('../controllers/fileController');
const { isAuth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/uploadUrl/:filename', getUploadUrl);

module.exports = router;