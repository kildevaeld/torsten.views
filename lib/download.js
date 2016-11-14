"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eventsjs_1 = require("eventsjs");
var orange_1 = require("orange");
var Debug = require("debug");
var debug = Debug("torsten:downloader");

var CancelError = function (_Error) {
    _inherits(CancelError, _Error);

    function CancelError() {
        _classCallCheck(this, CancelError);

        return _possibleConstructorReturn(this, (CancelError.__proto__ || Object.getPrototypeOf(CancelError)).apply(this, arguments));
    }

    return CancelError;
}(Error);

exports.CancelError = CancelError;

var Downloader = function (_eventsjs_1$EventEmit) {
    _inherits(Downloader, _eventsjs_1$EventEmit);

    function Downloader() {
        _classCallCheck(this, Downloader);

        var _this2 = _possibleConstructorReturn(this, (Downloader.__proto__ || Object.getPrototypeOf(Downloader)).call(this));

        _this2._queue = [];
        _this2._downloading = 0;
        _this2.size = 10;
        _this2.listenTo(_this2, 'ready', _this2._onReady);
        return _this2;
    }

    _createClass(Downloader, [{
        key: "download",
        value: function download(client, path, options) {
            if (this._downloading > this.size) {
                var defer = orange_1.deferred();
                debug("enqueue %i : %s", this._queue.length, path);
                this._queue.push([path, defer, options, client]);
                return defer.promise;
            }
            return this._download(client, path, options);
        }
    }, {
        key: "_cancel",
        value: function _cancel(path) {
            var index = -1;
            for (var i = 0, ii = this._queue.length; i < ii; i++) {
                if (this._queue[i][0] === path) {
                    index = i;
                    break;
                }
            }
            if (index == -1) return;
            var item = this._queue[index];
            debug('cancel %s', item[0]);
            item[1].reject(new CancelError("cancel"));
            this._queue.splice(index, 1);
        }
    }, {
        key: "_download",
        value: function _download(client, path, options) {
            var _this3 = this;

            var emit = function emit() {
                _this3._downloading--;
                debug('download ready %s', path);
                _this3.trigger('ready');
            };
            this._downloading++;
            return client.open(path, options).then(function (blob) {
                emit();
                return blob;
            }).catch(function (e) {
                emit();
                return orange_1.Promise.reject(e);
            });
        }
    }, {
        key: "_onReady",
        value: function _onReady() {
            if (!this._queue.length || this._downloading > this.size) {
                return;
            }

            var _queue$shift = this._queue.shift(),
                _queue$shift2 = _slicedToArray(_queue$shift, 4),
                path = _queue$shift2[0],
                defer = _queue$shift2[1],
                options = _queue$shift2[2],
                client = _queue$shift2[3];

            this._download(client, path, options).then(defer.resolve).catch(defer.reject);
        }
    }], [{
        key: "download",
        value: function download(client, path, options) {
            return this.instance.download(client, path, options);
        }
    }, {
        key: "cancel",
        value: function cancel(path) {
            return this.instance._cancel(path);
        }
    }, {
        key: "instance",
        get: function get() {
            if (!this._instance) {
                this._instance = new Downloader();
            }
            return this._instance;
        }
    }]);

    return Downloader;
}(eventsjs_1.EventEmitter);

exports.Downloader = Downloader;