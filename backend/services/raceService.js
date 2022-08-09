const RaceModel = require('../models/raceModel');

const getPaged = async ({ page, pageSize }) => {
    return await RaceModel.getPaged({ page, pageSize });
};

const getById = async (id) => {
    return await RaceModel.findById(id);
};

const create = async (body) => {
    return await RaceModel.create(body);
};

const edit = async (body) => {
    const { id, ...data } = body;
    return await RaceModel.findByIdAndUpdate(id, data);
};

const del = async (id) => {
    return await RaceModel.findByIdAndDelete(id);
};

module.exports = {
    getPaged,
    getById,
    create,
    edit,
    delete: del
};