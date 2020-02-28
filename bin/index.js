#!/usr/bin/env node

const compress = require('../lib/compress');
const args= process.argv.splice(2);

if (!args || !args.length) {
    console.log('You must specify the path to the folder');

    return process.exit(1);
}

compress(args[0]);