const mongoose = require('mongoose');

const generateModel = (name, schema) => {
    const model = mongoose.model(name, schema);

    model.getPaged = function ({ page, pageSize }) {
        return this.find({})
            .limit(pageSize)
            .skip(pageSize * (page - 1));
    };

    return model;
};

module.exports = {
    generateModel
};