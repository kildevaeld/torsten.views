"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./collection'));
__export(require('./list/index'));
__export(require('./gallery/index'));
__export(require('./crop/index'));
const torsten_1 = require('torsten');
function createClient(options) {
    return new torsten_1.TorstenClient(options);
}
exports.createClient = createClient;
