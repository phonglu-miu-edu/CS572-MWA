const UserModel = require('../models/userModel');

const findByUsernameAsync = async (username) => {
    try {
        return await UserModel.findOne({ username });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    findByUsernameAsync
};