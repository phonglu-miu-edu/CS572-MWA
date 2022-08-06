const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { generateModel } = require('./baseModel');
const { isValidEmail } = require('../utils/projectUtil');

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: { unique: true },
        trim: true,
        validate: [ isValidEmail, 'Email is invalid' ]
    },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    type: { type: String, enum: [ 'ADMIN', 'USER' ], default: 'USER', required: true }
});

UserSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.validatePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = generateModel('User', UserSchema);