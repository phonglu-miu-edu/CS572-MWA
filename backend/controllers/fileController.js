const azureUtil = require('../utils/azureUtil');

const getUploadUrl = async (req, res, next) => {
    try {
        const { filename } = req.params;

        const url = await azureUtil.getUploadUrl(filename);

        if (url){
            res.status(200).json({ url });
        } else {
            res.status(500).json({ error: 'Error while getting upload url' });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUploadUrl
};