"use strict";
const torsten_1 = require('torsten');
class TorstenGuiError extends torsten_1.TorstenClientError {
    constructor(message) {
        super(torsten_1.ErrorCode.Unknown, message);
    }
}
exports.TorstenGuiError = TorstenGuiError;
class TorstenValidateError extends torsten_1.TorstenClientError {
    constructor(message) {
        super(torsten_1.ErrorCode.Unknown, message);
    }
}
exports.TorstenValidateError = TorstenValidateError;
