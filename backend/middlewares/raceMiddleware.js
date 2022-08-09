const createValidation = (req, res, next) => {
    const { start, horses } = req.body;
    if (start && horses) {
        next();
    } else {
        res.status(500).json({error: 'Request body must contains "start", and "horses"'});
    }
};

const editValidation = (req, res, next) => {
    const { start, horses, closed } = req.body;
    if (start || horses || closed) {
        next();
    } else {
        res.status(500).json({error: 'Request body must contains one of these values: "start", "horses", or "closed"'});
    }
};

module.exports = {
    createValidation,
    editValidation
};