const azureUtil = require('../utils/azureUtil');

const getUploadUrl = async (req, res, next) => {
    try {
        const { filename } = req.params;
        const uploadObj = await azureUtil.getUploadUrl(filename);

        if (uploadObj) {
            res.status(200).json({ ...uploadObj });
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