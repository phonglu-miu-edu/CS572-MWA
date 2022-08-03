const { findNearestAsync } = require('../services/searchService');

const search = async (req, res, next) => {
    const locations =  await findNearestAsync(req.query.category);
    
    res.send(locations);
};

module.exports = {
    search: search
}