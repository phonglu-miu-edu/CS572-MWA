const crc32 = require('crc/crc32');
const fs = require('fs');
const path = require('path');

const getJwtSecretKey = () => crc32(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')).toString(16);

const extractPatchParams = (patchObject, requestBody, keys) => {
    keys.forEach(key => {
        if (requestBody[key]) {
            patchObject[key] = requestBody[key];
        }
    });
};

module.exports = {
    getJwtSecretKey,
    extractPatchParams
};