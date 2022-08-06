const UserModel = require('../models/userModel');

const getPaged = async ({ page, pageSize }) => {
    return await UserModel.getPaged({ page, pageSize });
};

const getByEmail = async ({ email }) => {
    return await UserModel.findOne({ email });
};

const create = async (body) => {
    return await UserModel.create(body);
};

module.exports = {
    getPaged,
    getByEmail,
    create
};