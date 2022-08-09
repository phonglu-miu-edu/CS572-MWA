const createValidation = (req, res, next) => {
    const { name, picture, jockey } = req.body;
    if (name && picture && jockey) {
        next();
    } else {
        res.status(500).json({error: 'Request body must contains "name", "picture", and "jockey"'});
    }
};

const editValidation = (req, res, next) => {
    const { name, picture, jockey } = req.body;
    if (name || picture || jockey) {
        next();
    } else {
        res.status(500).json({error: 'Request body must contains one of these values: "name", "picture", or "jockey"'});
    }
};

module.exports = {
    createValidation,
    editValidation
};