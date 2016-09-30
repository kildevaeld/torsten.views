"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var torsten_1 = require('torsten');

var TorstenGuiError = function (_torsten_1$TorstenCli) {
    _inherits(TorstenGuiError, _torsten_1$TorstenCli);

    function TorstenGuiError(message) {
        _classCallCheck(this, TorstenGuiError);

        return _possibleConstructorReturn(this, (TorstenGuiError.__proto__ || Object.getPrototypeOf(TorstenGuiError)).call(this, torsten_1.ErrorCode.Unknown, message));
    }

    return TorstenGuiError;
}(torsten_1.TorstenClientError);

exports.TorstenGuiError = TorstenGuiError;

var TorstenValidateError = function (_torsten_1$TorstenCli2) {
    _inherits(TorstenValidateError, _torsten_1$TorstenCli2);

    function TorstenValidateError(message) {
        _classCallCheck(this, TorstenValidateError);

        return _possibleConstructorReturn(this, (TorstenValidateError.__proto__ || Object.getPrototypeOf(TorstenValidateError)).call(this, torsten_1.ErrorCode.Unknown, message));
    }

    return TorstenValidateError;
}(torsten_1.TorstenClientError);

exports.TorstenValidateError = TorstenValidateError;