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

const isValidEmail = email => {
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    return emailRegex.test(email);
};

module.exports = {
    getJwtSecretKey,
    extractPatchParams,
    isValidEmail
};