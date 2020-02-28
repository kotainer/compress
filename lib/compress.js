const chalk = require('chalk');
const recursive = require('recursive-readdir');
const path = require('path');
const {
    checkSize,
    getFileSizeInBytes,
    isAlreadyCompressed,
} = require('./utils/utils');
const Brotli = require('./compressors/brotli');
const Zopfli = require('./compressors/zopfli');

async function compress(dirPath) {
    let compressedKB = 0;
    let compressedFiles = 0;

    console.log('');
    console.log(chalk.green.bold('[Compress start]'));
    console.log(chalk.green.bold('for dir', dirPath));
    console.log('------------------------------------');

    const files = await new Promise((resolve) => {
        recursive(dirPath, ['*.ico', '*.jpg', '*.br', '*.gz'], (_, files) => {
            return resolve(files);
        });
    });

    for (const file of files) {
        if (!checkSize(file) || isAlreadyCompressed(file)) {
            continue;
        }

        let algorithmName;

        if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html') || file.endsWith('.json')) {
            Brotli.compressTextFile(file);
            algorithmName = Brotli.name;
        } else if (file.endsWith('.ttf') || file.endsWith('.otf')) {
            Brotli.compressTTFFile(file);
            algorithmName = Brotli.name;
        } else if (file.endsWith('.png')) {
            Zopfli.compressFile(file);
            algorithmName = Zopfli.name;
        } else if (file.endsWith('.woff2')) {
            Brotli.compressFontFile(file);
            algorithmName = Brotli.name;
        } else {
            continue;
        }

        const fileSizes = getFileSizeInBytes(
            file,
            algorithmName === Brotli.name ? '.br': '.gz');

        logInfo(algorithmName, path.basename(file), fileSizes)
        
        compressedKB += fileSizes.fileSizeInBytes - fileSizes.zipFileSizeInBytes;
        compressedFiles ++;
    }

    console.log('------------------------------------');
    console.log(chalk.green.bold(`[Compress complete]`));
    console.log(chalk.green.bold(`Saved ${compressedKB.toFixed(2)}kb`));
    console.log(chalk.green.bold(`Files compressed ${compressedFiles}`));
    
    process.exit(0);
}

function logInfo(algorithm, fileBaseName, fileSizes) {

    console.log(
        chalk.cyan(`[${algorithm}]`),
        chalk.magenta.bold(fileBaseName),
        chalk.blue(`${fileSizes.fileSizeInBytes.toFixed(1)}kb -> ${fileSizes.zipFileSizeInBytes.toFixed(1)}kb`),
        chalk.green(`${fileSizes.percent.toFixed(1)}%`)
    );
}

module.exports = compress;