const brotli = require('brotli');
const fs = require('fs')
const {
    brotliTextSettings,
    brotliFontSettings,
    brotliFontTTFSettings,
} = require('../const/const');

class Brotli {
    static compressTextFile(file) {
        const result = brotli.compress(fs.readFileSync(file), brotliTextSettings);
        
        fs.writeFileSync(file + '.br', result);
    }
    
    static compressTTFFile(file) {
        const result = brotli.compress(fs.readFileSync(file), brotliFontTTFSettings);
        
        fs.writeFileSync(file + '.br', result);
    }
    
    static compressFontFile(file) {
        const result = brotli.compress(fs.readFileSync(file), brotliFontSettings);
        
        fs.writeFileSync(file + '.br', result);
    }
}

module.exports = Brotli;