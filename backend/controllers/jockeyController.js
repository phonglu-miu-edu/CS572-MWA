const jockeyService = require('../services/jockeyService');
const { extractPatchParams } = require('../utils/projectUtil');

const getPagedJockeys = async (req, res, next) => {
    try {
        const { page, pageSize } = req.params;
        const list = await jockeyService.getPaged({ page, pageSize });
        res.json(list);
    } catch (err) {
        next(err);
    }
};

const getJockeyById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await jockeyService.getById(id);

        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Jockey not found' });
        }
    } catch (err) {
        next(err);
    }
};

const createJockey = async (req, res, next) => {
    try {
        const { name, description, picture } = req.body;
        const item = await jockeyService.create({ name, description, picture });
        res.json(item);
    } catch (err) {
        next(err);
    }
};

const editJockey = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = {
            id: id
        };

        extractPatchParams(query, req.body, ['name', 'description', 'picture' ]);

        const item = await jockeyService.edit(query);
        res.json(item);
    } catch (err) {
        next(err);
    }
};

const deleteJockey = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await jockeyService.delete(id);
        res.json(item);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getPagedJockeys,
    getJockeyById,
    createJockey,
    editJockey,
    deleteJockey
};