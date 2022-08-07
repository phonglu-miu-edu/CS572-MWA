const jwt = require('jsonwebtoken');
const { getJwtSecretKey } = require('../utils/projectUtil');
const projectUtil = require('../utils/projectUtil');

const isAuth = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json();
    }

    try {
        const tokenPair = token.split(' ');
        if (tokenPair.length === 2 && tokenPair[0].toLowerCase() === 'bearer') {
            req.authorizedUser = jwt.verify(tokenPair[1], getJwtSecretKey());
        }
    } catch (err) {
        return res.status(401).json();
    }

    return next();
};

const isValidEmail = (req, res, next) => {
    const { email } = req.body;

    try {
        if (!projectUtil.isValidEmail(email)) {
            return res.status(400).json({ error: 'Email is invalid' });
        }
    } catch (err) {
        return next(err);
    }

    return next();
};

module.exports = {
    isAuth,
    isValidEmail
};