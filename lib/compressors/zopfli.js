const zopfli = require('node-zopfli');
const fs = require('fs');
const {
    zopfliSettings,
} = require('../const/const');

class Zopfli {
    static compressFile(file) {
        const result = zopfli.gzipSync(fs.readFileSync(file), zopfliSettings);

        fs.writeFileSync(file + '.gz', result);
    }
}

module.exports = Zopfli;
