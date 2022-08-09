const raceService = require('../services/raceService');
const { extractPatchParams } = require('../utils/projectUtil');

const getPagedRaces = async (req, res, next) => {
    try {
        const { page, pageSize } = req.params;
        const list = await raceService.getPaged({ page, pageSize });
        res.json(list);
    } catch (err) {
        next(err);
    }
};

const getRaceById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await raceService.getById(id);

        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Race not found' });
        }
    } catch (err) {
        next(err);
    }
};

const createRace = async (req, res, next) => {
    try {
        const { start, horses } = req.body;
        const item = await raceService.create({ start, horses, closed: false });
        res.json(item);
    } catch (err) {
        next(err);
    }
};

const editRace = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = {
            id: id
        };

        extractPatchParams(query, req.body, ['start', 'horses', 'closed' ]);

        const item = await raceService.edit(query);
        res.json(item);
    } catch (err) {
        next(err);
    }
};

const deleteRace = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await raceService.delete(id);
        res.json(item);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getPagedRaces,
    getRaceById,
    createRace,
    editRace,
    deleteRace
};