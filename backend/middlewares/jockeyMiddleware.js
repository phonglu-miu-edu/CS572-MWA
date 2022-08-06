const createValidation = (req, res, next) => {
    const { name, picture, dob } = req.body;
    if (name && picture && dob) {
        next();
    } else {
        res.status(500).json({error: 'Request body must contains "name", "picture", and "dob"'});
    }
};

const editValidation = (req, res, next) => {
    const { name, picture, dob } = req.body;
    if (name || picture || dob) {
        next();
    } else {
        res.status(500).json({error: 'Request body must contains one of these values: "name", "picture", or "dob"'});
    }
};

module.exports = {
    createValidation,
    editValidation
};