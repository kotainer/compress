const brotliTextSettings = {
    extension: 'br',
    skipLarger: true,
    mode: 1,
    quality: 11,
    lgwin: 12
};

const brotliFontSettings = {
    ...brotliTextSettings,
    mode: 2,
}

const brotliFontTTFSettings = {
    ...brotliTextSettings,
    mode: 0,
}

const zopfliSettings = {
    verbose: false,
    verbose_more: false,
    numiterations: 10,
    blocksplitting: true,
    blocksplittinglast: false,
    blocksplittingmax: 15
}

module.exports = {
    brotliTextSettings,
    brotliFontSettings,
    brotliFontTTFSettings,
    zopfliSettings,
}
