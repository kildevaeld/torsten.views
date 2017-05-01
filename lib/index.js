"use strict";

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./collection"));
__export(require("./list/index"));
__export(require("./gallery/index"));
__export(require("./crop/index"));
__export(require("./modal/index"));
__export(require("./form/index"));
var torsten_1 = require("torsten");
function createClient(options) {
    return new torsten_1.TorstenClient(options);
}
exports.createClient = createClient;
exports.version = "0.2.14";