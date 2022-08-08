const createValidation = (req, res, next) => {
    const { name, picture } = req.body;
    if (name && picture) {
        next();
    } else {
        res.status(500).json({error: 'Request body must contains "name", and "picture"'});
    }
};

const editValidation = (req, res, next) => {
    const { name, picture } = req.body;
    if (name || picture) {
        next();
    } else {
        res.status(500).json({error: 'Request body must contains one of these values: "name", or "picture"'});
    }
};

module.exports = {
    createValidation,
    editValidation
};