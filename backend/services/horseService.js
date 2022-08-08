const HorseModel = require('../models/horseModel');

const getPaged = async ({ page, pageSize }) => {
    return await HorseModel.getPaged({ page, pageSize });
};

const getById = async (id) => {
    return await HorseModel.findById(id);
};

const create = async (body) => {
    return await HorseModel.create(body);
};

const edit = async (body) => {
    const { id, ...data } = body;
    return await HorseModel.findByIdAndUpdate(id, data);
};

const del = async (id) => {
    return await HorseModel.findByIdAndDelete(id);
};

module.exports = {
    getPaged,
    getById,
    create,
    edit,
    delete: del
};