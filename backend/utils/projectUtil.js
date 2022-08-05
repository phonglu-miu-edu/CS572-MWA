const crc32 = require('crc/crc32');
const fs = require('fs');

const getJwtSecretKey = () => {
    return crc32(fs.readFileSync('../package.json', 'utf-8')).toString(16);
};

module.exports = {
    getJwtSecretKey
};