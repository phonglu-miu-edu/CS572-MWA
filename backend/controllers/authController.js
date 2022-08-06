const authService = require('../services/authService');
const { sign } = require('jsonwebtoken');
const { getJwtSecretKey } = require('../utils/projectUtil');

const register = async (req, res, next) => {
    try {
        const { email, fullname, password, type } = req.body;
        let user = await authService.getByEmail({ email });

        if (!user) {
            user = await authService.create({ email, fullname, password, type });
            res.status(200).json({ user });
        } else {
            res.status(409).json({ error: 'Existed' });
        }
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authService.getByEmail({ email });

        if (user) {
            const isMatch = await user.validatePassword(password);

            if (isMatch) {
                const { _id, email, fullname, type } = user;
                const token = sign({
                    user_id: _id,
                    email,
                    fullname,
                    type
                }, getJwtSecretKey());

                res.status(200).json({ token });
            } else {
                next('Password is incorrect');
            }
        } else {
            next('User not found');
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
    login
};