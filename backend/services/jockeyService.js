const JockeyModel = require('../models/jockeyModel');

const getPaged = async ({ page, pageSize }) => {
    return await JockeyModel.getPaged({ page, pageSize });
};

const getById = async (id) => {
    return await JockeyModel.findById(id);
};

const create = async (body) => {
    return await JockeyModel.create(body);
};

const edit = async (body) => {
    const { id, ...data } = body;
    return await JockeyModel.findByIdAndUpdate(id, data);
};

const del = async (id) => {
    return await JockeyModel.findByIdAndDelete(id);
};

module.exports = {
    getPaged,
    getById,
    create,
    edit,
    delete: del
};