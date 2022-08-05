const jwt = require("jsonwebtoken");
const { getJwtSecretKey } = require('../utils/projectUtil');

const auth = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json();
    }

    try {
        req.authorizedUser = jwt.verify(token, getJwtSecretKey());
    } catch (err) {
        return res.status(401).json();
    }

    return next();
};

module.exports = auth;