const authService = require('../services/authService');
const { sign } = require('jsonwebtoken');
const { getJwtSecretKey } = require('../utils/projectUtil');

const login = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await authService.getByUsername({ username });

    if (user) {
        try {
            const isMatch = await user.validatePassword(password);

            if (isMatch) {
                const { _id, username, fullname, type } = user;
                const token = sign({
                    user_id: _id,
                    username,
                    fullname,
                    type
                }, getJwtSecretKey());

                res.status(200).json({ token: token });
            }
        } catch (err) {
            next(err);
        }
    } else {
        next('User not found');
    }
};

module.exports = {
    login
};