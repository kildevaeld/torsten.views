"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var eventsjs_1 = require("eventsjs");
var torsten_1 = require("torsten");
var orange_1 = require("orange");
var collection_1 = require("./collection");
var error_1 = require("./error");
var Debug = require("debug");
var Path = torsten_1.path;
var debug = Debug('torsten:uploader');
function itemToEvent(item) {
    return {
        id: item.id,
        path: item.path,
        name: item.file.name,
        size: item.file.size,
        mime: item.file.type
    };
}
function itemToProgresEvent(item, e) {
    return orange_1.extend(itemToEvent(item), {
        originalEvent: e,
        total: e.total,
        loaded: e.loaded
    });
}

var Uploader = function (_eventsjs_1$EventEmit) {
    _inherits(Uploader, _eventsjs_1$EventEmit);

    function Uploader() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Uploader);

        var _this = _possibleConstructorReturn(this, (Uploader.__proto__ || Object.getPrototypeOf(Uploader)).call(this));

        _this._queue = [];
        _this._uploading = 0;
        _this.accept = ["*"];
        _this.maxSize = 1024 * 1024 * 2;
        _this.queueSize = 10;
        _this.mode = 500;
        orange_1.extend(_this, options);
        return _this;
    }

    _createClass(Uploader, [{
        key: "_validateFile",
        value: function _validateFile(file) {
            if (file.size > this.maxSize) {
                throw new error_1.TorstenValidateError("The file is to large. The maximum size is: " + orange_1.humanFileSize(this.maxSize));
            }
            var mimeValid = false;
            for (var i = 0, ii = this.accept.length; i < ii; i++) {
                if (this.accept[i] === "*") {
                    mimeValid = true;
                    break;
                }
                var r = new RegExp(this.accept[i]);
                if (r.test(file.type)) {
                    mimeValid = true;
                    break;
                }
            }
            if (!mimeValid) throw new error_1.TorstenValidateError("Cannot upload a file of type: " + file.type);
        }
    }, {
        key: "upload",
        value: function upload(path, file) {
            var _this2 = this;

            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            try {
                this._validateFile(file);
            } catch (e) {
                this.trigger('error', {
                    name: file.name,
                    mime: file.type,
                    size: file.size,
                    path: path,
                    id: orange_1.uniqueId(),
                    message: e.message
                });
                return Promise.reject(e);
            }
            var item = {
                id: orange_1.uniqueId(),
                file: file,
                options: options,
                path: path,
                defer: orange_1.deferred()
            };
            debug("enqueue %i : %s", this._queue.length, path);
            this._queue.push(item);
            this.trigger('queue', itemToEvent(item));
            orange_1.nextTick(function () {
                return _this2._onReady();
            });
            return item.defer.promise;
        }
    }, {
        key: "_upload",
        value: function _upload(item) {
            var _this3 = this;

            var path = item.path,
                file = item.file,
                options = item.options,
                event = itemToEvent(item);

            var emit = function emit(e, file) {
                _this3._uploading--;
                debug('upload ready %s', path);
                if (e) {
                    _this3.trigger('error', orange_1.extend(event, { message: e.message, code: e.code }));
                } else {
                    _this3.trigger('done', file);
                }
            };
            console.log(item);
            path = Path.join(path, file.name);
            var o = orange_1.extend({}, options, {
                progress: function progress(e) {
                    _this3.trigger('progress', itemToProgresEvent(item, e));
                    if (options.progress) {
                        options.progress(e);
                    }
                }
            });
            if (!o.mode) o.mode = this.mode;
            this.trigger('started', event);
            this._uploading++;
            return this._client.create(path, file, o).then(function (info) {
                var model = new collection_1.FileInfoModel(info, { client: _this3._client });
                ;
                emit(null, model);
                return model;
            }).catch(function (e) {
                emit(e);
                return Promise.reject(e);
            });
        }
    }, {
        key: "_onReady",
        value: function _onReady() {
            if (!this._queue.length || this._uploading > this.queueSize) {
                return;
            }
            while (this._uploading < this.queueSize) {
                var i = this._queue.shift();
                this._upload(i).then(i.defer.resolve).catch(i.defer.reject);
                if (this._queue.length === 0) return;
            }
        }
    }, {
        key: "client",
        set: function set(client) {
            var _this4 = this;

            if (this._client == null && this._queue.length > 0) {
                orange_1.nextTick(function () {
                    return _this4._onReady();
                });
            }
            this._client = client;
        }
    }]);

    return Uploader;
}(eventsjs_1.EventEmitter);

exports.Uploader = Uploader;