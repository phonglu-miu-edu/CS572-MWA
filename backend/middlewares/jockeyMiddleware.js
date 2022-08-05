const bodyValidation = (req, res, next) => {
    const { name, picture, dob } = req.body;
    if (name && picture && dob) {
        next();
    } else {
        res.status(500).json({error: 'Request body must contains "name", "picture", and "dob"'});
    }
};

const idValidation = (req, res, next) => {
    const { id } = req.params;
    if (id) {
        next();
    } else {
        res.status(500).json({error: 'Request param must contains "id"'});
    }
};

module.exports = {
    bodyValidation,
    idValidation
};