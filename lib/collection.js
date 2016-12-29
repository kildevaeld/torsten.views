"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var collection_1 = require("collection");
var error_1 = require("./error");
var orange_1 = require("orange");
var torsten_1 = require("torsten");
var orange_request_1 = require("orange.request");
var download_1 = require("./download");
var PARAM_TRIM_RE = /[\s'"]/g;
var URL_TRIM_RE = /[<>\s'"]/g;
function parseLinkHeaders(resp) {
    var link = {};
    var linkHeader = resp.headers.get('Link');
    if (linkHeader == null) return {};
    linkHeader = linkHeader.split(',');
    var relations = ['first', 'prev', 'next', 'last'];
    for (var i = 0, ii = linkHeader.length; i < ii; i++) {
        var linkParts = linkHeader[i].split(';'),
            url = linkParts[0].replace(URL_TRIM_RE, ''),
            params = linkParts.slice(1);
        for (var x = 0, xx = params.length; x < xx; x++) {
            var paramParts = params[x].split('='),
                key = paramParts[0].replace(PARAM_TRIM_RE, ''),
                value = paramParts[1].replace(PARAM_TRIM_RE, '');
            if (key == 'rel' && !!~relations.indexOf(value)) link[value] = url;
        }
    }
    return link;
}
function isFileInfo(a) {
    return a instanceof FileInfoModel || a.__torsten == 'FileInfoModel';
}
exports.isFileInfo = isFileInfo;

var FileInfoModel = function (_collection_1$Model) {
    _inherits(FileInfoModel, _collection_1$Model);

    function FileInfoModel(attr) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, FileInfoModel);

        var _this = _possibleConstructorReturn(this, (FileInfoModel.__proto__ || Object.getPrototypeOf(FileInfoModel)).call(this, attr, options));

        _this.__torsten = 'FileInfoModel';
        _this.idAttribute = "id";
        _this._client = options.client;
        return _this;
    }

    _createClass(FileInfoModel, [{
        key: "open",
        value: function open(o, client) {
            return download_1.Downloader.instance.download(client || this._client, this.fullPath, o);
        }
    }, {
        key: "fullPath",
        get: function get() {
            return this.get('path') + this.get('name');
        }
    }, {
        key: "url",
        get: function get() {
            return this._client.endpoint + "/v1" + this.fullPath;
        }
    }]);

    return FileInfoModel;
}(collection_1.Model);

exports.FileInfoModel = FileInfoModel;
function normalizePath(path) {
    if (path == "") path = "/";
    if (path != "/" && path.substr(0, 1) != '/') {
        path = "/" + path;
    }
    return path;
}

var RestCollection = function (_collection_1$Collect) {
    _inherits(RestCollection, _collection_1$Collect);

    function RestCollection(models, options) {
        _classCallCheck(this, RestCollection);

        var _this2 = _possibleConstructorReturn(this, (RestCollection.__proto__ || Object.getPrototypeOf(RestCollection)).call(this, models, options));

        options = options || {};
        if (!options.limit) options.limit = 50;
        _this2._options = options;
        _this2.state = { first: 1, last: -1, current: 1 };
        _this2._link = {};
        _this2.queryParams = {
            page: 'page',
            limit: 'limit'
        };
        return _this2;
    }

    _createClass(RestCollection, [{
        key: "hasNext",
        value: function hasNext() {
            return this.hasPage(this.state.current + 1);
        }
    }, {
        key: "hasPrevious",
        value: function hasPrevious() {
            return this.hasPage(this.state.current - 1);
        }
    }, {
        key: "hasPage",
        value: function hasPage(page) {
            if (this.state.last > -1) {
                return page <= this.state.last;
            }
            return false;
        }
    }, {
        key: "getPreviousPage",
        value: function getPreviousPage(options) {
            options = options ? orange_1.extend({}, options) : {};
            options.page = this.state.current - 1;
            return this.getPage(options);
        }
    }, {
        key: "getNextPage",
        value: function getNextPage(options) {
            options = options ? orange_1.extend({}, options) : {};
            options.page = this.state.current + 1;
            return this.getPage(options);
        }
    }, {
        key: "getPage",
        value: function getPage(options) {
            options = options ? orange_1.extend({}, options) : {};
            if (options.page === void 0) return Promise.reject(new Error("No page"));
            if (this.state.last < options.page && this.state.last != -1) {
                options.page = this.state.last;
            } else if (options.page < this.state.first) {
                options.page = this.state.first;
            }
            return this.fetch(options);
        }
    }]);

    return RestCollection;
}(collection_1.Collection);

exports.RestCollection = RestCollection;

var FileCollection = function (_RestCollection) {
    _inherits(FileCollection, _RestCollection);

    function FileCollection(models, options) {
        _classCallCheck(this, FileCollection);

        var _this3 = _possibleConstructorReturn(this, (FileCollection.__proto__ || Object.getPrototypeOf(FileCollection)).call(this, models, options));

        _this3.Model = FileInfoModel;
        options = options || {};
        if (!options.client) {
            throw new error_1.TorstenGuiError("No client");
        }
        if (!options.path || options.path == "") {
            options.path = "/";
        }
        _this3._client = options.client;
        _this3._path = normalizePath(options.path);
        //this._url = this._client.endpoint + path;
        return _this3;
    }

    _createClass(FileCollection, [{
        key: "fetch",
        value: function fetch(options) {
            var _this4 = this;

            if (this._fetch) {
                return Promise.resolve([]);
            }
            options = options ? orange_1.extend({}, options) : {};
            var url = void 0;
            if (!orange_1.has(options, 'page')) {
                options.page = this.state.current;
            }
            options.page = parseInt(options.page);
            var params = options.params ? orange_1.extend({}, options.params) : {};
            if (orange_1.has(params, this.queryParams.page)) delete params[this.queryParams.page];
            url = this._link[options.page];
            if (!url) {
                url = this._client.endpoint + '/v1' + this.path;
            }
            if (!url) return Promise.reject(new Error("no url specified"));
            var idx = url.indexOf('?');
            if (idx > -1) {
                params = orange_1.extend(params, orange_request_1.queryStringToParams(url.substr(idx + 1)));
                url = url.substr(0, idx);
            }
            if (!orange_1.has(params, this.queryParams.page)) {
                params[this.queryParams.page] = options.page;
            }
            params[this.queryParams.limit] = this._options.limit;
            this._fetch = true;
            this.trigger('before:fetch');
            var request = new orange_request_1.HttpRequest(orange_request_1.HttpMethod.GET, url);
            return request.params(params).header('Authorization', 'Bearer ' + this._client.token).downloadProgress(function (e) {
                if (e.lengthComputable) {
                    _this4.trigger('fetch:progress', e);
                }
            }).end().then(function (res) {
                var models = _this4._processResponse(res, options);
                _this4._fetch = false;
                _this4.trigger('fetch');
                return models;
            });
        }
    }, {
        key: "upload",
        value: function upload(name, data) {
            var _this5 = this;

            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var fullPath = torsten_1.path.join(this.path, name);
            this.trigger('before:upload', fullPath, options);
            return this._client.create(fullPath, data, {
                progress: function progress(e) {
                    _this5.trigger('upload:progress', e);
                    if (options.progress) options.progress(e);
                }
            }).then(function (info) {
                var model = new FileInfoModel(info, {
                    client: _this5._client
                });
                _this5.trigger('upload', model);
                _this5.add(model);
                return model;
            });
        }
    }, {
        key: "_prepareModel",
        value: function _prepareModel(value) {
            if (isFileInfo(value)) return value;
            if (orange_1.isObject(value) && !collection_1.isModel(value)) return new this.Model(value, {
                //parse: true,
                client: this._client
            });
            throw new Error('Value not an Object or an instance of a model, but was: ' + (typeof value === "undefined" ? "undefined" : _typeof(value)));
        }
    }, {
        key: "_processResponse",
        value: function _processResponse(resp, options) {
            var _this6 = this;

            var currentPage = options.page;
            var links = parseLinkHeaders(resp);
            if (links.first) this._link[this.state.first] = links.first;
            if (links.prev) this._link[currentPage - 1] = links.prev;
            if (links.next) this._link[currentPage + 1] = links.next;
            if (links.last) {
                var last = links.last;
                var idx = last.indexOf('?');
                if (idx > -1) {
                    var params = orange_request_1.queryStringToParams(last.substr(idx + 1));
                    if (orange_1.has(params, this.queryParams.page)) {
                        this._link[params[this.queryParams.page]] = last;
                        this.state.last = parseInt(params[this.queryParams.page]);
                    }
                }
            }
            this.state.current = currentPage;
            var total = resp.headers.get("X-Total-Count");
            if (total) this._total = parseInt(total);
            return resp.json().then(function (body) {
                return body.data;
            }).then(function (data) {
                _this6.add(data);
                return data;
            });
        }
    }, {
        key: "__classType",
        get: function get() {
            return 'RestCollection';
        }
    }, {
        key: "path",
        get: function get() {
            return this._path;
        }
    }, {
        key: "totalLength",
        get: function get() {
            return this._total;
        }
    }]);

    return FileCollection;
}(RestCollection);

exports.FileCollection = FileCollection;