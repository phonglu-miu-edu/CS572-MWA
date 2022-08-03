const LocationModel = require('../models/locationModel');

const miuLocation = [-91.9707903, 41.0159219];

const findNearestAsync = async (category) => {
    return await LocationModel.find({
        category,
        location : { $near : miuLocation, $maxDistance: 0.03 } // increase maxDistance to get more locations
    });
};

module.exports = {
    findNearestAsync
};