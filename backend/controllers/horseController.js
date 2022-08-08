const horseService = require('../services/horseService');
const { extractPatchParams } = require('../utils/projectUtil');

const getPagedHorses = async (req, res, next) => {
    try {
        const { page, pageSize } = req.params;
        const list = await horseService.getPaged({ page, pageSize });
        res.json(list);
    } catch (err) {
        next(err);
    }
};

const getHorseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await horseService.getById(id);

        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Horse not found' });
        }
    } catch (err) {
        next(err);
    }
};

const createHorse = async (req, res, next) => {
    try {
        const { name, description, picture, breed, weight } = req.body;
        const item = await horseService.create({ name, description, picture, breed, weight });
        res.json(item);
    } catch (err) {
        next(err);
    }
};

const editHorse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = {
            id: id
        };

        extractPatchParams(query, req.body, ['name', 'description', 'picture', 'breed', 'weight' ]);

        const item = await horseService.edit(query);
        res.json(item);
    } catch (err) {
        next(err);
    }
};

const deleteHorse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await horseService.delete(id);
        res.json(item);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getPagedHorses,
    getHorseById,
    createHorse,
    editHorse,
    deleteHorse
};