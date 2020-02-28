const fs = require('fs');

function checkSize(filename) {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size / 1024;

    if (fileSizeInBytes > 1) {
        return true;
    }

    return false;
}

function getFileSizeInBytes(filename, ext = '.br') {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size / 1024;

    const zipFile = fs.statSync(filename + ext);
    const zipFileSizeInBytes = zipFile.size / 1024;

    const percent = (fileSizeInBytes - zipFileSizeInBytes) / fileSizeInBytes * 100;

    return {
        fileSizeInBytes,
        zipFileSizeInBytes,
        percent,
    };
}

function isAlreadyCompressed(file) {
    if ((fs.existsSync(file + '.br') || fs.existsSync(file + '.gz')) && !file.endsWith('.css')) {
        return true;
    }

    return false;
}

module.exports = {
    checkSize,
    getFileSizeInBytes,
    isAlreadyCompressed,
}