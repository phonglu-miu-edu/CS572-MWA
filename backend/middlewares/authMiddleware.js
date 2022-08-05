const jwt = require("jsonwebtoken");
const { getJwtSecretKey } = require('../utils/projectUtil');

const auth = (req, res, next) => {
    const token = req.headers["Authorization"];

    if (!token) {
        return res.status(401);
    }
    try {
        req.authorizedUser = jwt.verify(token, getJwtSecretKey());
    } catch (err) {
        return res.status(401);
    }

    return next();
};

module.exports = auth;