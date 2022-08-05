const UserModel = require('../models/userModel');

const getPaging = async ({ page, pageSize }) => {
    return await UserModel.find({})
        .limit(pageSize)
        .skip(pageSize * page);
};

const getByUsername = async ({ username }) => {
    return await UserModel.findOne({ username });
};

module.exports = {
    getByUsername
};