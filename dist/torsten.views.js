(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("collection"), require("torsten"), require("orange"), require("orange.request"), require("eventsjs"), require("views"), require("orange.dom"), require("views.form"));
	else if(typeof define === 'function' && define.amd)
		define(["collection", "torsten", "orange", "orange.request", "eventsjs", "views", "orange.dom", "views.form"], factory);
	else if(typeof exports === 'object')
		exports["views"] = factory(require("collection"), require("torsten"), require("orange"), require("orange.request"), require("eventsjs"), require("views"), require("orange.dom"), require("views.form"));
	else
		root["torsten"] = root["torsten"] || {}, root["torsten"]["views"] = factory(root["collection"], root["torsten"], root["orange"], root["orange"]["request"], root["eventsjs"], root["views"], root["orange"]["dom"], root["views"]["form"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_38__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(1));
	__export(__webpack_require__(13));
	__export(__webpack_require__(22));
	__export(__webpack_require__(31));
	__export(__webpack_require__(29));
	__export(__webpack_require__(36));
	var torsten_1 = __webpack_require__(4);
	function createClient(options) {
	    return new torsten_1.TorstenClient(options);
	}
	exports.createClient = createClient;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var collection_1 = __webpack_require__(2);
	var error_1 = __webpack_require__(3);
	var orange_1 = __webpack_require__(5);
	var torsten_1 = __webpack_require__(4);
	var orange_request_1 = __webpack_require__(6);
	var download_1 = __webpack_require__(7);
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
	    return a instanceof FileInfoModel && a.__torsten == 'FileInfoModel';
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
	            return this._client.endpoint + this.fullPath;
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var torsten_1 = __webpack_require__(4);

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

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var eventsjs_1 = __webpack_require__(8);
	var orange_1 = __webpack_require__(5);
	var Debug = __webpack_require__(9);
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

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(11);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if ('env' in (typeof process === 'undefined' ? {} : process)) {
	    r = process.env.DEBUG;
	  }
	  
	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug.debug = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(12);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    // apply env-specific formatting
	    args = exports.formatArgs.apply(self, args);

	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000
	var m = s * 60
	var h = m * 60
	var d = h * 24
	var y = d * 365.25

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function (val, options) {
	  options = options || {}
	  var type = typeof val
	  if (type === 'string' && val.length > 0) {
	    return parse(val)
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ?
				fmtLong(val) :
				fmtShort(val)
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
	}

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str)
	  if (str.length > 10000) {
	    return
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
	  if (!match) {
	    return
	  }
	  var n = parseFloat(match[1])
	  var type = (match[2] || 'ms').toLowerCase()
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n
	    default:
	      return undefined
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd'
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h'
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm'
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's'
	  }
	  return ms + 'ms'
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms'
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) {
	    return
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's'
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(14));
	__export(__webpack_require__(17));
	__export(__webpack_require__(21));

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(15);
	var orange_dom_1 = __webpack_require__(16);
	var orange_1 = __webpack_require__(5);
	var list_item_1 = __webpack_require__(17);
	var circular_progress_1 = __webpack_require__(21);
	var download_1 = __webpack_require__(7);
	exports.FileListEmptyView = views_1.View.extend({
	    className: 'file-list-empty-view',
	    template: 'No files uploaded yet.'
	});
	var FileListView = function (_views_1$CollectionVi) {
	    _inherits(FileListView, _views_1$CollectionVi);

	    function FileListView(options) {
	        _classCallCheck(this, FileListView);

	        var _this = _possibleConstructorReturn(this, (FileListView.__proto__ || Object.getPrototypeOf(FileListView)).call(this, options));

	        _this.options = options || { client: null };
	        _this.sort = false;
	        _this._onSroll = throttle(orange_1.bind(_this._onSroll, _this), 0);
	        return _this;
	    }

	    _createClass(FileListView, [{
	        key: "onCollection",
	        value: function onCollection(model) {
	            if (model) this._initEvents();
	            if (model) {
	                model.state.limit = 10;
	            }
	        }
	    }, {
	        key: "_initEvents",
	        value: function _initEvents() {
	            var _this2 = this;

	            this.listenTo(this, 'childview:click', function (view, model) {
	                if (this._current) orange_dom_1.removeClass(this._current.el, 'active');
	                this._current = view;
	                orange_dom_1.addClass(view.el, 'active');
	                this.trigger('selected', view, model);
	            });
	            this.listenTo(this, 'childview:dblclick', function (view, model) {
	                if (this._current) orange_dom_1.removeClass(this._current.el, 'active');
	                this._current = view;
	                orange_dom_1.addClass(view.el, 'active');
	                this.trigger('selected', view, model);
	                this.trigger('dblclick', view, model);
	            });
	            this.listenTo(this, 'childview:remove', function (view, _ref) {
	                var model = _ref.model;

	                this.trigger('remove', view, model);
	            });
	            this.listenTo(this, 'childview:image', function (view) {
	                var img = view.$('img')[0];
	                if (img.src === img.getAttribute('data-src')) {
	                    return;
	                }
	            });
	            this.listenTo(this.collection, 'before:fetch', this._showLoaderView);
	            this.listenTo(this.collection, 'fetch', this._hideLoaderView);
	            this.listenTo(this, 'height', this.loadImages, this);
	            this.listenTo(this.collection, 'fetch:progress', function (e) {
	                if (!e.lengthComputable) return;
	                if (_this2._progress) _this2._progress.setPercent(100 / e.total * e.loaded);
	            });
	        }
	    }, {
	        key: "onRenderCollection",
	        value: function onRenderCollection() {
	            this.loadImages();
	        }
	    }, {
	        key: "onRenderChild",
	        value: function onRenderChild(view, index) {
	            if (view.model.get('is_dir') && !this.options.showDirectories) {
	                view.el.style.display = 'none';
	            } else {
	                view.el.style.opacity = 'block';
	            }
	        }
	    }, {
	        key: "_showLoaderView",
	        value: function _showLoaderView() {
	            if (this._progress) return;
	            this._progress = new circular_progress_1.Progress({
	                size: 100,
	                lineWidth: 5
	            });
	            this.el.appendChild(this._progress.render().el);
	            orange_dom_1.addClass(this._progress.el, 'loader');
	        }
	    }, {
	        key: "_hideLoaderView",
	        value: function _hideLoaderView() {
	            if (!this._progress) return;
	            this._progress.remove().destroy();
	        }
	    }, {
	        key: "_onSroll",
	        value: function _onSroll(e) {
	            var _this3 = this;

	            var el = this.el;
	            if (el.scrollTop < el.scrollHeight - el.clientHeight - el.clientHeight || !this.collection.hasNext()) {
	                this.loadImages();
	            } else if (this.collection.hasNext()) {
	                this.collection.getNextPage({
	                    params: {
	                        show_hidden: false
	                    }
	                }).then(function () {
	                    return _this3.loadImages();
	                });
	            }
	        }
	    }, {
	        key: "loadImages",
	        value: function loadImages() {
	            var _this4 = this;

	            var loadImage = function loadImage(img) {
	                var parent = img.parentElement;
	                orange_dom_1.addClass(parent, 'loading');
	                download_1.Downloader.download(_this4.options.client, img.getAttribute('data-src'), { thumbnail: true }).then(function (i) {
	                    img.src = URL.createObjectURL(i);
	                    orange_dom_1.addClass(parent, 'loaded');
	                    orange_dom_1.removeClass(parent, 'loading');
	                }).catch(function (e) {
	                    orange_dom_1.removeClass(parent, 'loading loaded');
	                    orange_dom_1.addClass(parent, "load-error");
	                });
	            };
	            var images = this.el.querySelectorAll('img:not(.loaded)');
	            for (var i = 0, ii = images.length; i < ii; i++) {
	                var img = images[i];
	                if (orange_dom_1.hasClass(img.parentElement, "loaded") || orange_dom_1.hasClass(img.parentElement, "loading")) {
	                    if (!elementInView(img.parentElement, this.el) && orange_dom_1.hasClass(img.parentElement, 'loading')) {
	                        download_1.Downloader.cancel(img.getAttribute('data-src'));
	                        orange_dom_1.removeClass(img, 'loading');
	                    }
	                    continue;
	                }
	                if (elementInView(img.parentElement, this.el)) {
	                    loadImage(img);
	                }
	            }
	        }
	    }, {
	        key: "_initHeight",
	        value: function _initHeight() {
	            var _this5 = this;

	            var parent = this.el.parentElement;
	            if (!parent || parent.clientHeight === 0) {
	                if (!this._timer) {
	                    this._timer = setInterval(function () {
	                        return _this5._initHeight();
	                    }, 200);
	                }
	                return;
	            }
	            if (this._timer) {
	                clearInterval(this._timer);
	                this._timer = void 0;
	            }
	            //this.el.style.height = parent.clientHeight + 'px';
	            this.trigger('height');
	        }
	    }, {
	        key: "onShow",
	        value: function onShow() {
	            this._initHeight();
	        }
	    }]);

	    return FileListView;
	}(views_1.CollectionView);
	FileListView = __decorate([views_1.attributes({
	    className: 'file-list collection-mode',
	    childView: list_item_1.FileListItemView,
	    emptyView: exports.FileListEmptyView,
	    events: {
	        scroll: '_onSroll'
	    }
	}), __metadata("design:paramtypes", [Object])], FileListView);
	exports.FileListView = FileListView;
	function elementInView(ele, container) {
	    var viewport = {
	        top: 0,
	        left: 0,
	        bottom: 0,
	        right: 0
	    };
	    viewport.bottom = container.innerHeight || document.documentElement.clientHeight; // + options.offset;
	    viewport.right = container.innerWidth || document.documentElement.clientWidth; // + options.offset;
	    var rect = ele.getBoundingClientRect();
	    return (
	        // Intersection
	        rect.right >= viewport.left && rect.bottom >= viewport.top && rect.left <= viewport.right && rect.top <= viewport.bottom && !ele.classList.contains('b-error')
	    );
	}
	function throttle(fn, minDelay) {
	    var lastCall = 0;
	    return function () {
	        var now = +new Date();
	        if (now - lastCall < minDelay) {
	            return;
	        }
	        lastCall = now;
	        fn.apply(this, arguments);
	    };
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(15);
	var orange_1 = __webpack_require__(5);
	var orange_dom_1 = __webpack_require__(16);
	var index_1 = __webpack_require__(18);
	var mimetypes_1 = __webpack_require__(19);
	var utils_1 = __webpack_require__(20);
	var FileListItemView = function (_views_1$View) {
	    _inherits(FileListItemView, _views_1$View);

	    function FileListItemView() {
	        _classCallCheck(this, FileListItemView);

	        return _possibleConstructorReturn(this, (FileListItemView.__proto__ || Object.getPrototypeOf(FileListItemView)).apply(this, arguments));
	    }

	    _createClass(FileListItemView, [{
	        key: "onRender",
	        value: function onRender() {
	            var model = this.model;
	            var isDir = model.get('is_dir');
	            orange_dom_1.removeClass(this.ui['mime'], 'mime-unknown');
	            if (isDir) {
	                orange_dom_1.addClass(this.ui['mime'], 'mime-folder');
	            } else {
	                var mime = mimetypes_1.getMimeIcon(model.get('mime')); //model.get('mime').replace(/\//, '-')
	                orange_dom_1.addClass(this.ui['mime'], mime);
	            }
	            this.ui['name'].textContent = orange_1.truncate(model.get('name') || model.get('filename'), 25);
	            if (/^image\/.*/.test(model.get('mime'))) {
	                var img = new Image();
	                img.src = utils_1.emptyImage;
	                img.setAttribute('data-src', this.model.fullPath);
	                this.ui['mime'].parentNode.insertBefore(img, this.ui['mime']);
	            }
	        }
	    }, {
	        key: "_onClick",
	        value: function _onClick(e) {
	            e.preventDefault();
	            var target = e.target;
	            if (target === this.ui['remove']) return;
	            this.triggerMethod('click', this.model);
	        }
	    }, {
	        key: "_onDblClick",
	        value: function _onDblClick(e) {
	            e.preventDefault();
	            var target = e.target;
	            if (target === this.ui['remove']) return;
	            this.triggerMethod('dblclick', this.model);
	        }
	    }, {
	        key: "downloadImage",
	        value: function downloadImage() {
	            var _this2 = this;

	            var model = this.model;
	            if (/^image\/.*/.test(model.get('mime'))) {
	                (function () {
	                    var img = _this2.el.querySelector('img');
	                    _this2.model.open({ thumbnail: false }).then(function (blob) {
	                        img.setAttribute('src', URL.createObjectURL(blob));
	                        //this.ui['mime'].parentNode.insertBefore(img, this.ui['mime']);
	                        _this2.ui['mime'].style.display = 'none';
	                        _this2.trigger('image');
	                    });
	                })();
	            }
	        }
	    }]);

	    return FileListItemView;
	}(views_1.View);
	FileListItemView = __decorate([views_1.attributes({
	    template: function template() {
	        return index_1.default['list-item'];
	    },
	    tagName: 'div',
	    className: 'file-list-item',
	    ui: {
	        remove: '.file-list-item .close-button',
	        name: '.name',
	        mime: '.mime'
	    },
	    triggers: {
	        'click @ui.remove': 'remove'
	    },
	    events: {
	        'click': '_onClick',
	        'dblclick': '_onDblClick'
	    }
	}), __metadata("design:paramtypes", [])], FileListItemView);
	exports.FileListItemView = FileListItemView;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    "crop-editor": "<div class=\"modal-container\"></div>\n<div class=\"crop-container\">\n</div>\n<!--<label class=\"btn btn-sm btn-default\">  <span>Upload</span>  <input style=\"display:none;\" type=\"file\" class=\"upload-btn\" name=\"upload-button\" />  </label>-->\n<button class=\"gallery-btn btn btn-sm btn-default\" title=\"Vælg fra galleri\">Vælg</button>\n<label class=\"btn btn-sm btn-default\">  <span>Upload</span>  <input style=\"display:none;\" type=\"file\" class=\"upload-btn\" name=\"upload-button\" />  </label>\n<button class=\"crop-btn btn btn-sm btn-default pull-right\">Beskær</button>",
	    "file-info": "<div class=\"preview-region\">  <div class=\"preview\"></div>\n</div>\n<div class=\"info-region\">  <table class=\"info\">  <tr>  <td>Name</td>  <td class=\"name\"></td>  </tr>  <tr>  <td>Mime</td>  <td class=\"mimetype\"></td>  </tr>  <tr>  <td>Size</td>  <td class=\"size\"></td>  </tr>  <tr>  <td>Download</td>  <td class=\"download\">  </td>  </tr>  </table>\n</div>",
	    "gallery": "<div class=\"gallery-area\">  <div class=\"gallery-list\">  </div>  <div class=\"gallery-info\"></div>  </div>\n<div class=\"upload-progress-container\">  <div class=\"upload-progress\"></div>\n</div>\n",
	    "list-item": "<a class=\"close-button\"></a>\n<div class=\"thumbnail-container\">  <i class=\"mime mimetype mime-unknown\"></i>\n</div>\n<div class=\"name\"></div>\n",
	    "list": "<div class=\"file-list-item-container\">\n</div>\n<div class=\"file-list-download-progress progress\"></div>\n",
	    "modal-gallery": "<div class=\"views-modal-dialog\">  <div class=\"views-modal-content\">  <div class=\"views-modal-header\">  </div>  <div class=\"views-modal-body\">  </div>  <div class=\"views-modal-footer\">  <div class=\"files-total\">Total: </div>  <button type=\"button\" class=\"btn btn-close\">Close</button>  <button type=\"button\" class=\"btn btn-primary btn-select\">Select</button>  </div>  </div>\n</div>\n"
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	var MimeTypes = {
	    "application-x-7zip": "mime-application-x-7zip",
	    "application-rss+xml": "mime-application-rss+xml",
	    "x-office-drawing": "mime-x-office-drawing",
	    "text-javascript": "mime-text-x-javascript",
	    "text-x-javascript": "mime-text-x-javascript",
	    "message": "mime-message",
	    "application-msword": "mime-application-msword",
	    "multipart-encrypted": "mime-multipart-encrypted",
	    "audio-x-vorbis+ogg": "mime-audio-x-vorbis+ogg",
	    "application-pdf": "mime-application-pdf",
	    "encrypted": "mime-encrypted",
	    "application-pgp-keys": "mime-application-pgp-keys",
	    "text-richtext": "mime-text-richtext",
	    "text-plain": "mime-text-plain",
	    "text-sql": "mime-text-x-sql",
	    "text-x-sql": "mime-text-x-sql",
	    "application-vnd.ms-excel": "mime-application-vnd.ms-excel",
	    "application-vnd.ms-powerpoint": "mime-application-vnd.ms-powerpoint",
	    "application-vnd.oasis.opendocument.formula": "mime-application-vnd.oasis.opendocument.formula",
	    "x-office-spreadsheet": "mime-x-office-spreadsheet",
	    "text-html": "mime-text-html",
	    "x-office-document": "mime-x-office-document",
	    "video-generic": "mime-video-x-generic",
	    "video-x-generic": "mime-video-x-generic",
	    "application-vnd.scribus": "mime-application-vnd.scribus",
	    "application-ace": "mime-application-x-ace",
	    "application-x-ace": "mime-application-x-ace",
	    "application-tar": "mime-application-x-tar",
	    "application-x-tar": "mime-application-x-tar",
	    "application-bittorrent": "mime-application-x-bittorrent",
	    "application-x-bittorrent": "mime-application-x-bittorrent",
	    "application-x-cd-image": "mime-application-x-cd-image",
	    "text-java": "mime-text-x-java",
	    "text-x-java": "mime-text-x-java",
	    "application-gzip": "mime-application-x-gzip",
	    "application-x-gzip": "mime-application-x-gzip",
	    "application-sln": "mime-application-x-sln",
	    "application-x-sln": "mime-application-x-sln",
	    "application-cue": "mime-application-x-cue",
	    "application-x-cue": "mime-application-x-cue",
	    "deb": "mime-deb",
	    "application-glade": "mime-application-x-glade",
	    "application-x-glade": "mime-application-x-glade",
	    "application-theme": "mime-application-x-theme",
	    "application-x-theme": "mime-application-x-theme",
	    "application-executable": "mime-application-x-executable",
	    "application-x-executable": "mime-application-x-executable",
	    "application-x-flash-video": "mime-application-x-flash-video",
	    "application-jar": "mime-application-x-jar",
	    "application-x-jar": "mime-application-x-jar",
	    "application-x-ms-dos-executable": "mime-application-x-ms-dos-executable",
	    "application-msdownload": "mime-application-x-msdownload",
	    "application-x-msdownload": "mime-application-x-msdownload",
	    "package-generic": "mime-package-x-generic",
	    "package-x-generic": "mime-package-x-generic",
	    "application-php": "mime-application-x-php",
	    "application-x-php": "mime-application-x-php",
	    "text-python": "mime-text-x-python",
	    "text-x-python": "mime-text-x-python",
	    "application-rar": "mime-application-x-rar",
	    "application-x-rar": "mime-application-x-rar",
	    "rpm": "mime-rpm",
	    "application-ruby": "mime-application-x-ruby",
	    "application-x-ruby": "mime-application-x-ruby",
	    "text-script": "mime-text-x-script",
	    "text-x-script": "mime-text-x-script",
	    "text-bak": "mime-text-x-bak",
	    "text-x-bak": "mime-text-x-bak",
	    "application-zip": "mime-application-x-zip",
	    "application-x-zip": "mime-application-x-zip",
	    "text-xml": "mime-text-xml",
	    "audio-mpeg": "mime-audio-x-mpeg",
	    "audio-x-mpeg": "mime-audio-x-mpeg",
	    "audio-wav": "mime-audio-x-wav",
	    "audio-x-wav": "mime-audio-x-wav",
	    "audio-generic": "mime-audio-x-generic",
	    "audio-x-generic": "mime-audio-x-generic",
	    "audio-x-mp3-playlist": "mime-audio-x-mp3-playlist",
	    "audio-x-ms-wma": "mime-audio-x-ms-wma",
	    "authors": "mime-authors",
	    "empty": "mime-empty",
	    "extension": "mime-extension",
	    "font-generic": "mime-font-x-generic",
	    "font-x-generic": "mime-font-x-generic",
	    "image-bmp": "mime-image-bmp",
	    "image-gif": "mime-image-gif",
	    "image-jpeg": "mime-image-jpeg",
	    "image-png": "mime-image-png",
	    "image-tiff": "mime-image-tiff",
	    "image-ico": "mime-image-x-ico",
	    "image-x-ico": "mime-image-x-ico",
	    "image-eps": "mime-image-x-eps",
	    "image-x-eps": "mime-image-x-eps",
	    "image-generic": "mime-image-x-generic",
	    "image-x-generic": "mime-image-x-generic",
	    "image-psd": "mime-image-x-psd",
	    "image-x-psd": "mime-image-x-psd",
	    "image-xcf": "mime-image-x-xcf",
	    "image-x-xcf": "mime-image-x-xcf",
	    "x-office-presentation": "mime-x-office-presentation",
	    "unknown": "mime-unknown",
	    "opera-extension": "mime-opera-extension",
	    "opera-unite-application": "mime-opera-unite-application",
	    "opera-widget": "mime-opera-widget",
	    "phatch-actionlist": "mime-phatch-actionlist",
	    "text-makefile": "mime-text-x-makefile",
	    "text-x-makefile": "mime-text-x-makefile",
	    "x-office-address-book": "mime-x-office-address-book",
	    "vcalendar": "mime-vcalendar",
	    "text-source": "mime-text-x-source",
	    "text-x-source": "mime-text-x-source",
	    "text-x-generic-template": "mime-text-x-generic-template",
	    "text-css": "mime-text-css",
	    "text-bibtex": "mime-text-x-bibtex",
	    "text-x-bibtex": "mime-text-x-bibtex",
	    "text-x-c++": "mime-text-x-c++",
	    "text-x-c++hdr": "mime-text-x-c++hdr",
	    "text-c": "mime-text-x-c",
	    "text-x-c": "mime-text-x-c",
	    "text-changelog": "mime-text-x-changelog",
	    "text-x-changelog": "mime-text-x-changelog",
	    "text-chdr": "mime-text-x-chdr",
	    "text-x-chdr": "mime-text-x-chdr",
	    "text-copying": "mime-text-x-copying",
	    "text-x-copying": "mime-text-x-copying",
	    "text-install": "mime-text-x-install",
	    "text-x-install": "mime-text-x-install",
	    "text-preview": "mime-text-x-preview",
	    "text-x-preview": "mime-text-x-preview",
	    "text-readme": "mime-text-x-readme",
	    "text-x-readme": "mime-text-x-readme",
	    "text-tex": "mime-text-x-tex",
	    "text-x-tex": "mime-text-x-tex",
	    "text-xhtml+xml": "mime-text-xhtml+xml",
	    "x-dia-diagram": "mime-x-dia-diagram"
	};
	function getMimeIcon(mime) {
	    mime = mime.replace(/\//gm, "-");
	    if (MimeTypes[mime]) {
	        return MimeTypes[mime].replace(/\+/m, 'p');
	    }
	    return MimeTypes['unknown'];
	}
	exports.getMimeIcon = getMimeIcon;
	;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var orange_1 = __webpack_require__(5);
	function getImageSize(image) {
	    var load = function load() {
	        return new orange_1.Promise(function (resolve, reject) {
	            var i = new Image();
	            i.onload = function () {
	                resolve({
	                    width: i.naturalWidth || i.width,
	                    height: i.naturalHeight || i.height
	                });
	            };
	            i.onerror = reject;
	            i.src = image.src;
	        });
	    };
	    if (image.naturalHeight === undefined) {
	        return load();
	    } else if (image.naturalHeight === 0) {
	        return new orange_1.Promise(function (resolve, reject) {
	            var time = setTimeout(function () {
	                time = null;
	                load().then(resolve, reject);
	            }, 200);
	            image.onload = function () {
	                if (time !== null) {
	                    clearTimeout(time);
	                }
	                resolve({
	                    width: image.naturalWidth,
	                    height: image.naturalHeight
	                });
	            };
	        });
	    } else {
	        return orange_1.Promise.resolve({
	            width: image.naturalWidth,
	            height: image.naturalHeight
	        });
	    }
	}
	exports.getImageSize = getImageSize;
	exports.emptyImage = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(15);
	var orange_1 = __webpack_require__(5);
	var Progress = function (_views_1$View) {
	    _inherits(Progress, _views_1$View);

	    function Progress() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, Progress);

	        var _this = _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).call(this, options));

	        _this.options = orange_1.extend({}, {
	            size: 220,
	            lineWidth: 15,
	            rotate: 0,
	            background: '#efefef',
	            foreground: '#555555'
	        }, options);
	        _this._percent = 0;
	        return _this;
	    }

	    _createClass(Progress, [{
	        key: "setPercent",
	        value: function setPercent(percent) {
	            var _this2 = this;

	            requestAnimationFrame(function () {
	                _this2.ctx.clearRect(0, 0, _this2.options.size, _this2.options.size);
	                _this2._drawCircle(_this2.ctx, _this2.options.background, _this2.options.lineWidth, 100 / 100);
	                _this2._drawCircle(_this2.ctx, _this2.options.foreground, _this2.options.lineWidth, percent / 100);
	                var text = _this2.el.querySelector('span');
	                text.textContent = Math.floor(percent) + '%';
	            });
	        }
	    }, {
	        key: "_drawCircle",
	        value: function _drawCircle(ctx, color, lineWidth, percent) {
	            var radius = (this.options.size - this.options.lineWidth) / 2;
	            percent = Math.min(Math.max(0, percent || 1), 1);
	            ctx.beginPath();
	            ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
	            ctx.strokeStyle = color;
	            ctx.lineCap = 'round'; // butt, round or square
	            ctx.lineWidth = lineWidth;
	            ctx.stroke();
	        }
	    }, {
	        key: "show",
	        value: function show() {
	            this.el.style.display = 'block';
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            this.el.style.display = 'none';
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            _get(Progress.prototype.__proto__ || Object.getPrototypeOf(Progress.prototype), "render", this).call(this);
	            this.el.innerHTML = "";
	            //let percent = parseInt(this.el.getAttribute('data-percent')||<any>0);
	            var options = this.options;
	            var canvas = document.createElement('canvas');
	            var span = document.createElement('span');
	            //span.textContent = Math.round(percent) + '%';
	            if (typeof G_vmlCanvasManager !== 'undefined') {
	                G_vmlCanvasManager.initElement(canvas);
	            }
	            var ctx = canvas.getContext('2d');
	            canvas.width = canvas.height = options.size;
	            this.el.appendChild(span);
	            this.el.appendChild(canvas);
	            this.el.style.width = options.size + 'px';
	            this.el.style.height = options.size + 'px';
	            ctx.translate(options.size / 2, options.size / 2); // change center
	            ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg
	            span.style.lineHeight = options.size + 'px';
	            span.style.width = options.size + 'px';
	            span.style.fontSize = options.size / 5 + 'px';
	            this.ctx = ctx;
	            this.setPercent(0);
	            return this;
	        }
	    }]);

	    return Progress;
	}(views_1.View);
	Progress = __decorate([views_1.attributes({
	    className: "progress"
	}), __metadata("design:paramtypes", [Object])], Progress);
	exports.Progress = Progress;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(23));
	__export(__webpack_require__(28));

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(15);
	var orange_1 = __webpack_require__(5);
	var index_1 = __webpack_require__(13);
	var index_2 = __webpack_require__(24);
	var index_3 = __webpack_require__(18);
	var collection_1 = __webpack_require__(1);
	var dropzone_1 = __webpack_require__(26);
	var uploader_1 = __webpack_require__(27);
	var GalleryView = function (_views_1$LayoutView) {
	    _inherits(GalleryView, _views_1$LayoutView);

	    function GalleryView(options) {
	        _classCallCheck(this, GalleryView);

	        var _this = _possibleConstructorReturn(this, (GalleryView.__proto__ || Object.getPrototypeOf(GalleryView)).call(this, orange_1.extend({}, options, {
	            regions: {
	                list: '.gallery-list',
	                info: '.gallery-info'
	            }
	        })));

	        _this.options = options;
	        _this.collections = [];
	        _this.client = options.client;
	        _this.list = new index_1.FileListView({
	            showDirectories: options.showDirectories || false,
	            client: _this.client
	        });
	        _this.info = new index_2.FileInfoView({
	            client: _this.client
	        });
	        _this.drop = new dropzone_1.DropZone({
	            el: _this.el
	        });
	        _this.uploader = options.uploader;
	        if (!_this.uploader) {
	            _this.uploader = new uploader_1.Uploader({
	                client: _this.client,
	                maxSize: options.maxSize,
	                accept: options.accept || ['*'],
	                mode: options.mode
	            });
	            _this._const_upload = true;
	        }
	        if (options.accept) _this.uploader.accept = options.accept;
	        if (options.maxSize > 0) _this.uploader.maxSize = options.maxSize;
	        _this.listenTo(_this.list, 'selected', _this._onFileInfoSelected);
	        _this.listenTo(_this.list, 'remove', _this._onFileInfoRemoved);
	        _this.listenTo(_this.list, 'dblclick', function () {
	            _this.trigger('dblclick');
	        });
	        _this.listenTo(_this.drop, 'drop', _this._onFileDrop);
	        _this.listenTo(_this.uploader, 'done', function (file) {
	            for (var i = 0, ii = _this.collections.length; i < ii; i++) {
	                if (_this.collections[i].path + '/' == file.get('path')) {
	                    _this.collections[i].add(file);
	                }
	            }
	        });
	        if (_this.options.root) {
	            _this.root = _this.options.root;
	        }
	        return _this;
	    }

	    _createClass(GalleryView, [{
	        key: "_onFileInfoSelected",
	        value: function _onFileInfoSelected(view, model) {
	            this.selected = model;
	        }
	    }, {
	        key: "_onFileInfoRemoved",
	        value: function _onFileInfoRemoved(view, model) {
	            this.client.remove(model.fullPath).then(function (res) {
	                if (res.message === 'ok') {
	                    model.remove();
	                }
	            });
	        }
	    }, {
	        key: "_setCollection",
	        value: function _setCollection(collection) {
	            this.list.collection = collection;
	        }
	    }, {
	        key: "_onFileDrop",
	        value: function _onFileDrop(file) {
	            var collection = this.collections[this.collections.length - 1];
	            this.uploader.upload(collection.path, file, {
	                progress: function progress(e) {
	                    if (!e.lengthComputable) return;
	                }
	            });
	        }
	    }, {
	        key: "onRender",
	        value: function onRender() {
	            this.regions['list'].show(this.list);
	            this.regions['info'].show(this.info);
	            this.drop.render();
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.drop.destroy();
	            if (this._const_upload) {
	                this.uploader.destroy();
	            }
	            _get(GalleryView.prototype.__proto__ || Object.getPrototypeOf(GalleryView.prototype), "destroy", this).call(this);
	            return this;
	        }
	    }, {
	        key: "collection",
	        get: function get() {
	            if (this.collections.length == 0) return null;
	            return this.collections[this.collections.length - 1];
	        }
	    }, {
	        key: "root",
	        set: function set(path) {
	            if (this._root == path) return;
	            this._root = path;
	            for (var i = 0, ii = this.collections.length; i < ii; i++) {
	                this.collections[i].destroy();
	            }
	            this.collections = [new collection_1.FileCollection(null, {
	                client: this.client,
	                path: this._root,
	                limit: 100
	            })];
	            this._setCollection(this.collections[0]);
	            this.collections[0].fetch({
	                params: {
	                    show_hidden: this.options.showHidden
	                }
	            });
	        },
	        get: function get() {
	            return this._root;
	        }
	    }, {
	        key: "selected",
	        get: function get() {
	            return this._selected;
	        },
	        set: function set(model) {
	            this._selected = model;
	            if (model) {
	                this.info.model = model.get('is_dir') ? null : model;
	            } else {
	                this.info.model = null;
	            }
	        }
	    }]);

	    return GalleryView;
	}(views_1.LayoutView);
	GalleryView = __decorate([views_1.attributes({
	    template: function template() {
	        return index_3.default['gallery'];
	    },
	    className: 'torsten-gallery gallery'
	}), __metadata("design:paramtypes", [Object])], GalleryView);
	exports.GalleryView = GalleryView;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(25));

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(15);
	var index_1 = __webpack_require__(18);
	var orange_1 = __webpack_require__(5);
	var download_1 = __webpack_require__(7);
	var FileInfoView = function (_views_1$View) {
	    _inherits(FileInfoView, _views_1$View);

	    function FileInfoView(options) {
	        _classCallCheck(this, FileInfoView);

	        var _this = _possibleConstructorReturn(this, (FileInfoView.__proto__ || Object.getPrototypeOf(FileInfoView)).call(this, options));

	        _this.options = options;
	        _this.client = options.client;
	        return _this;
	    }

	    _createClass(FileInfoView, [{
	        key: "onModel",
	        value: function onModel(model) {
	            this.clear();
	            if (model == null) {
	                return;
	            }
	            this._update_ui(model);
	        }
	    }, {
	        key: "onRender",
	        value: function onRender() {
	            this.__rendered = true;
	            if (this.model) this._update_ui(this.model);
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            if (!this.__rendered) return this;
	            var ui = this.ui;
	            ui.name.textContent = '';
	            ui.mime.textContent = '';
	            ui.size.textContent = '';
	            ui.download.textContent = '';
	            var img = ui.preview.querySelector('img');
	            if (img) {
	                URL.revokeObjectURL(img.src);
	            }
	            ui.preview.innerHTML = '';
	            this.el.style.opacity = "0";
	            return this;
	        }
	    }, {
	        key: "_update_ui",
	        value: function _update_ui(model) {
	            if (!this.__rendered) return this;
	            var ui = this.ui;
	            ui.name.textContent = model.get('name');
	            ui.mime.textContent = model.get('mime');
	            ui.size.textContent = orange_1.humanFileSize(model.get('size'));
	            ui.download.textContent = model.get('name');
	            if (/image\/.*/.test(model.get('mime'))) {
	                download_1.Downloader.download(this.client, model.fullPath, {}).then(function (blob) {
	                    var img = document.createElement('img');
	                    img.src = URL.createObjectURL(blob);
	                    ui.preview.appendChild(img);
	                });
	            }
	            this.el.style.opacity = "1";
	        }
	    }, {
	        key: "_onDownload",
	        value: function _onDownload(e) {
	            var _this2 = this;

	            e.preventDefault();
	            this.model.open().then(function (blob) {
	                var a = document.createElement('a');
	                var url = URL.createObjectURL(blob);
	                a.href = url;
	                a.download = _this2.model.get('name');
	                document.body.appendChild(a);
	                a.click();
	                setTimeout(function () {
	                    document.body.removeChild(a);
	                    window.URL.revokeObjectURL(url);
	                }, 100);
	            }).catch(function (e) {
	                console.log(e);
	            });
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.clear();
	            _get(FileInfoView.prototype.__proto__ || Object.getPrototypeOf(FileInfoView.prototype), "destroy", this).call(this);
	        }
	    }]);

	    return FileInfoView;
	}(views_1.View);
	FileInfoView = __decorate([views_1.attributes({
	    className: 'file-info',
	    template: function template() {
	        return index_1.default['file-info'];
	    },
	    ui: {
	        name: '.name',
	        mime: '.mimetype',
	        size: '.size',
	        download: '.download',
	        preview: '.preview'
	    },
	    events: {
	        'click @ui.download': '_onDownload'
	    }
	}), __metadata("design:paramtypes", [Object])], FileInfoView);
	exports.FileInfoView = FileInfoView;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(15);
	var orange_dom_1 = __webpack_require__(16);
	var orange_1 = __webpack_require__(5);
	var DropZone = function (_views_1$View) {
	    _inherits(DropZone, _views_1$View);

	    function DropZone() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, DropZone);

	        var _this = _possibleConstructorReturn(this, (DropZone.__proto__ || Object.getPrototypeOf(DropZone)).call(this, options));

	        _this.uploader = options.uploader;
	        _this.path = options.path || "/";
	        if (options.mode) _this.mode = options.mode;
	        return _this;
	    }

	    _createClass(DropZone, [{
	        key: "_onDragEnter",
	        value: function _onDragEnter(e) {
	            orange_dom_1.addClass(this.el, 'drag-enter');
	            e.preventDefault();
	            e.stopPropagation();
	        }
	    }, {
	        key: "_onDragEnd",
	        value: function _onDragEnd(e) {
	            orange_dom_1.removeClass(this.el, 'drag-enter');
	            e.preventDefault();
	            e.stopPropagation();
	        }
	    }, {
	        key: "_onDrop",
	        value: function _onDrop(e) {
	            var _this2 = this;

	            orange_dom_1.removeClass(this.el, 'drag-enter');
	            this.triggerMethod('before:drop', e);
	            e.preventDefault();
	            e.stopPropagation();
	            var options = {};
	            if (this.mode) options.mode = this.mode;
	            if (this.uploader) {
	                var files = orange_1.slice(e.dataTransfer.files);
	                orange_1.mapAsync(files, function (file) {
	                    return _this2.uploader.upload(_this2.path, file, options);
	                }, this, true).catch(function (e) {
	                    _this2.trigger('error', e);
	                });
	            }
	            this.triggerMethod('drop', e);
	        }
	    }]);

	    return DropZone;
	}(views_1.View);
	DropZone = __decorate([views_1.events({
	    dragenter: '_onDragEnter',
	    dragleave: '_onDragEnd',
	    dragstart: '_onDragEnter',
	    drop: '_onDrop',
	    drag: '_onDragEnter',
	    dragover: '_onDragEnter'
	}), __metadata("design:paramtypes", [Object])], DropZone);
	exports.DropZone = DropZone;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var eventsjs_1 = __webpack_require__(8);
	var torsten_1 = __webpack_require__(4);
	var orange_1 = __webpack_require__(5);
	var collection_1 = __webpack_require__(1);
	var error_1 = __webpack_require__(3);
	var Debug = __webpack_require__(9);
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

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var index_1 = __webpack_require__(29);
	var gallery_1 = __webpack_require__(23);
	var views_1 = __webpack_require__(15);
	var index_2 = __webpack_require__(18);
	var orange_dom_1 = __webpack_require__(16);
	var orange_1 = __webpack_require__(5);
	var GalleryModal = function (_index_1$Modal) {
	    _inherits(GalleryModal, _index_1$Modal);

	    function GalleryModal(options) {
	        _classCallCheck(this, GalleryModal);

	        var _this = _possibleConstructorReturn(this, (GalleryModal.__proto__ || Object.getPrototypeOf(GalleryModal)).call(this, options));

	        delete options.el;
	        _this._gallery = new gallery_1.GalleryView(options);
	        _this.listenTo(_this._gallery, 'dblclick', function () {
	            _this.trigger('selected', _this.selected);
	            _this.close();
	        });
	        _this.listenTo(_this._gallery, 'selected', function () {
	            _this.trigger('selected', _this.selected);
	        });
	        _this._setHeight = orange_1.bind(_this._setHeight, _this);
	        _this.listenTo(_this._gallery.collection, 'fetch', function () {
	            var total = _this._gallery.collection.totalLength || 0;
	            var tel = _this.el.querySelector('.files-total');
	            tel.innerHTML = "Total: " + total;
	        });
	        return _this;
	    }

	    _createClass(GalleryModal, [{
	        key: "onBeforeOpen",
	        value: function onBeforeOpen() {
	            this._setHeight();
	            orange_dom_1.addEventListener(window, 'resize', this._setHeight);
	        }
	    }, {
	        key: "onBeforeClose",
	        value: function onBeforeClose() {
	            orange_dom_1.removeEventListener(window, 'resize', this._setHeight);
	        }
	    }, {
	        key: "_setHeight",
	        value: function _setHeight() {
	            var height = window.innerHeight;
	            var fh = this.el.querySelector('.views-modal-footer').clientHeight;
	            var hh = this.el.querySelector('.views-modal-header').clientHeight;
	            var rect = this.el.getBoundingClientRect();
	            var margin = fh + hh + rect.top + 30 + 30 + 20;
	            var gallery = this.el.querySelector('.torsten-gallery');
	            gallery.style.height = height - margin + 'px';
	        }
	    }, {
	        key: "onOpen",
	        value: function onOpen() {
	            this.gallery.list.loadImages();
	        }
	    }, {
	        key: "onRender",
	        value: function onRender() {
	            this._gallery.render();
	            this.ui['content'].appendChild(this._gallery.el);
	            orange_dom_1.addClass(this.el, 'gallery-modal slidein-bottom');
	        }
	    }, {
	        key: "_onSelect",
	        value: function _onSelect(e) {
	            e.preventDefault();
	            if (this.selected) this.trigger('selected', this.selected);
	            this.close();
	        }
	    }, {
	        key: "onDestroy",
	        value: function onDestroy() {
	            this.close();
	            this._gallery.destroy();
	        }
	    }, {
	        key: "gallery",
	        get: function get() {
	            return this._gallery;
	        }
	    }, {
	        key: "selected",
	        get: function get() {
	            return this.gallery.selected;
	        }
	    }, {
	        key: "root",
	        set: function set(root) {
	            this._gallery.root = root;
	        }
	    }]);

	    return GalleryModal;
	}(index_1.Modal);
	GalleryModal = __decorate([views_1.attributes({
	    template: function template() {
	        return index_2.default['modal-gallery'];
	    },
	    ui: {
	        content: '.views-modal-body'
	    },
	    events: {
	        'click .btn-close': function clickBtnClose() {
	            this.close();
	        },
	        'click .btn-select': '_onSelect'
	    }
	}), __metadata("design:paramtypes", [Object])], GalleryModal);
	exports.GalleryModal = GalleryModal;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(30));

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(15);
	var orange_dom_1 = __webpack_require__(16);
	var orange_1 = __webpack_require__(5);
	var Modal = function (_views_1$View) {
	    _inherits(Modal, _views_1$View);

	    function Modal(options) {
	        _classCallCheck(this, Modal);

	        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, options));

	        _this.__rendered = false;
	        if (options.el) {
	            orange_dom_1.addClass(_this.el, _this.className);
	        }
	        _this._onClose = orange_1.bind(_this._onClose, _this);
	        return _this;
	    }

	    _createClass(Modal, [{
	        key: "render",
	        value: function render() {
	            _get(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), "render", this).call(this);
	            this.__rendered = true;
	            var overlay = document.body.querySelector('.views-modal-overlay');
	            if (!overlay) {
	                overlay = orange_dom_1.createElement('div', {});
	                orange_dom_1.addClass(overlay, 'views-modal-overlay');
	                document.body.appendChild(overlay);
	            }
	            return this;
	        }
	    }, {
	        key: "open",
	        value: function open() {
	            var _this2 = this;

	            console.log('open');
	            var body = document.body;
	            if (orange_dom_1.hasClass(body, "views-modal-open")) {
	                return;
	            }
	            this.triggerMethod('before:open');
	            requestAnimationFrame(function () {
	                orange_dom_1.addClass(_this2.el, 'views-modal-show');
	                orange_dom_1.addClass(body, 'views-modal-open');
	            });
	            orange_dom_1.animationEnd(this.el, function () {
	                _this2.triggerMethod('open');
	            });
	            return this;
	        }
	    }, {
	        key: "_onClose",
	        value: function _onClose(e) {
	            if (orange_dom_1.hasClass(e.target, 'views-modal')) {
	                this.close();
	            }
	        }
	    }, {
	        key: "close",
	        value: function close() {
	            var _this3 = this;

	            var body = document.body;
	            if (!orange_dom_1.hasClass(this.el, "views-modal-show")) {
	                return;
	            }
	            this.triggerMethod('before:close');
	            var overlay = body.querySelector('.views-modal-overlay');
	            orange_dom_1.removeEventListener(overlay, 'click', this.close);
	            orange_dom_1.removeClass(this.el, 'views-modal-show');
	            orange_dom_1.removeClass(body, 'views-modal-open');
	            orange_dom_1.animationEnd(this.el, function () {
	                _this3.triggerMethod('close');
	            });
	            return this;
	        }
	    }, {
	        key: "toggle",
	        value: function toggle() {
	            if (!orange_dom_1.hasClass(this.el, "views-modal-show")) {
	                this.open();
	            } else {
	                this.close();
	            }
	            return this;
	        }
	    }, {
	        key: "onDestroy",
	        value: function onDestroy() {
	            this.close().remove();
	        }
	    }, {
	        key: "remove",
	        value: function remove() {
	            _get(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), "remove", this).call(this);
	            var overlay = document.body.querySelector('.views-modal-overlay');
	            if (overlay) {
	                document.body.removeChild(overlay);
	            }
	            return this;
	        }
	    }]);

	    return Modal;
	}(views_1.View);
	Modal = __decorate([views_1.attributes({
	    tagName: 'div',
	    className: 'views-modal',
	    events: {
	        'click': '_onClose'
	    }
	}), __metadata("design:paramtypes", [Object])], Modal);
	exports.Modal = Modal;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(32));
	__export(__webpack_require__(34));
	__export(__webpack_require__(33));

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(15);
	var types_1 = __webpack_require__(33);
	var utils_1 = __webpack_require__(20);
	var orange_dom_1 = __webpack_require__(16);

	var CropPreview = function () {
	    function CropPreview(el, options) {
	        _classCallCheck(this, CropPreview);

	        this._el = el;
	        orange_dom_1.addClass(el, 'torsten cropping-preview');
	    }

	    _createClass(CropPreview, [{
	        key: "update",
	        value: function update() {
	            var _this = this;

	            var img = this._el.querySelector("img");
	            return utils_1.getImageSize(img).then(function (size) {
	                var el = _this._el;
	                if (_this._cropping == null) {
	                    if (_this._opts.aspectRatio == null) {
	                        return _this;
	                    }
	                    _this._cropping = types_1.getCropping(size, _this._opts.aspectRatio);
	                }
	                var cropping = _this._cropping;
	                var cw = el.clientWidth,
	                    ch = el.clientHeight,
	                    rx = cw / cropping.width,
	                    ry = ch / cropping.height;
	                var width = size.width,
	                    height = size.height;
	                var e = {
	                    width: Math.round(rx * width) + 'px',
	                    height: Math.round(ry * height) + 'px',
	                    marginLeft: '-' + Math.round(rx * cropping.x) + 'px',
	                    marginTop: '-' + Math.round(ry * cropping.y) + 'px'
	                };
	                for (var key in e) {
	                    img.style[key] = e[key];
	                }
	            });
	        }
	    }, {
	        key: "cropping",
	        set: function set(cropping) {
	            this._cropping = cropping;
	            this.update();
	        },
	        get: function get() {
	            return this._cropping;
	        }
	    }]);

	    return CropPreview;
	}();

	exports.CropPreview = CropPreview;
	var CropPreView = function (_views_1$View) {
	    _inherits(CropPreView, _views_1$View);

	    function CropPreView() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, CropPreView);

	        var _this2 = _possibleConstructorReturn(this, (CropPreView.__proto__ || Object.getPrototypeOf(CropPreView)).call(this, options));

	        _this2.options = options;
	        return _this2;
	    }

	    _createClass(CropPreView, [{
	        key: "render",
	        value: function render() {
	            this.triggerMethod('before:render');
	            this.undelegateEvents();
	            var image = this.el.querySelector('img');
	            if (image == null) {
	                image = document.createElement('img');
	                this.el.appendChild(image);
	            }
	            this.delegateEvents();
	            this.triggerMethod('render');
	            if (image.src !== '') {
	                this.update();
	            }
	            return this;
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            var _this3 = this;

	            this.triggerMethod('before:update');
	            var img = this.ui['image'];
	            return utils_1.getImageSize(img).then(function (size) {
	                if (_this3.ui['image'] == null) return _this3;
	                var el = _this3.el;
	                if (_this3._cropping == null) {
	                    if (_this3.options.aspectRatio == null) {
	                        return _this3;
	                    }
	                    _this3._cropping = types_1.getCropping(size, _this3.options.aspectRatio);
	                }
	                var cropping = _this3._cropping;
	                var cw = el.clientWidth,
	                    ch = el.clientHeight,
	                    rx = cw / cropping.width,
	                    ry = ch / cropping.height;
	                var width = size.width,
	                    height = size.height;
	                var e = {
	                    width: Math.round(rx * width) + 'px',
	                    height: Math.round(ry * height) + 'px',
	                    marginLeft: '-' + Math.round(rx * cropping.x) + 'px',
	                    marginTop: '-' + Math.round(ry * cropping.y) + 'px'
	                };
	                for (var key in e) {
	                    img.style[key] = e[key];
	                }
	                _this3.triggerMethod('update');
	            });
	        }
	    }, {
	        key: "cropping",
	        set: function set(cropping) {
	            this._cropping = cropping;
	            this.update();
	        },
	        get: function get() {
	            return this._cropping;
	        }
	    }]);

	    return CropPreView;
	}(views_1.View);
	CropPreView = __decorate([views_1.attributes({
	    className: 'torsten cropping-preview',
	    ui: {
	        image: 'img'
	    }
	}), __metadata("design:paramtypes", [Object])], CropPreView);
	exports.CropPreView = CropPreView;

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";

	function getCropping(size, ratio) {
	    var width = size.width,
	        height = size.height;
	    var nh = height,
	        nw = width;
	    if (width > height) {
	        nh = width / ratio;
	    } else {
	        nw = height * ratio;
	    }
	    if (nw == width && nh > height) {
	        nw = height * ratio;
	        nh = nw / ratio;
	    }
	    return {
	        x: 0,
	        y: 0,
	        width: nw,
	        height: nh,
	        rotate: 0,
	        scaleX: 1,
	        scaleY: 1
	    };
	}
	exports.getCropping = getCropping;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var views_1 = __webpack_require__(15);
	var cropperjs_1 = __webpack_require__(35);
	var types_1 = __webpack_require__(33);
	var collection_1 = __webpack_require__(1);
	var utils_1 = __webpack_require__(20);
	var orange_1 = __webpack_require__(5);
	var orange_dom_1 = __webpack_require__(16);
	/**
	 *
	 *
	 * @export
	 * @class CropView
	 * @extends {View<HTMLDivElement>}
	 */
	var CropView = function (_views_1$View) {
	    _inherits(CropView, _views_1$View);

	    /**
	     * Creates an instance of CropView.
	     *
	     * @param {CropViewOptions} options
	     *
	     * @memberOf CropView
	     */
	    function CropView(options) {
	        _classCallCheck(this, CropView);

	        if (options == null || options.client == null) throw new Error('No options and no client');

	        var _this = _possibleConstructorReturn(this, (CropView.__proto__ || Object.getPrototypeOf(CropView)).call(this, options));

	        _this.options = options;
	        _this.client = options.client;
	        return _this;
	    }
	    /**
	     *
	     *
	     * @readonly
	     *
	     * @memberOf CropView
	     */


	    _createClass(CropView, [{
	        key: "setModel",

	        /**
	         *
	         *
	         * @param {any} model
	         * @returns
	         *
	         * @memberOf CropView
	         */
	        value: function setModel(model) {
	            var _this2 = this;

	            if (model && !collection_1.isFileInfo(model)) {
	                throw new Error("not a file info model");
	            }
	            if (model && !/^image\/.*/.test(model.get('mime'))) {
	                this.showMessage("The file is not an image", true);
	            }
	            if (this.ui['image'] == null) return this;
	            this.deactivate();
	            var image = this.ui['image'];
	            if (image.src) {
	                window.URL.revokeObjectURL(image.src);
	            }
	            image.src = utils_1.emptyImage;
	            // image.style.display = 'none';
	            if (model == null) {
	                if (this.model) this.stopListening(this.model);
	                this._model = model;
	                return;
	            }
	            _get(CropView.prototype.__proto__ || Object.getPrototypeOf(CropView.prototype), "setModel", this).call(this, model);
	            this.cropping = null;
	            this._updateImage().then(function (loaded) {
	                if (loaded && _this2.options.aspectRatio != null) {
	                    utils_1.getImageSize(image).then(function (size) {
	                        if (_this2.cropping) {
	                            if (_this2.options.previewView) {
	                                _this2.options.previewView.update();
	                            }
	                            return;
	                        }
	                        _this2.cropping = types_1.getCropping(size, _this2.options.aspectRatio);
	                    }).catch(function (e) {
	                        _this2.trigger('error', e);
	                    });
	                }
	            });
	            return this;
	        }
	        /**
	         * Activate cropper
	         *
	         * @returns
	         *
	         * @memberOf CropView
	         */

	    }, {
	        key: "activate",
	        value: function activate() {
	            var _this3 = this;

	            if (this.model == null) return;
	            if (this._cropper != null) {
	                return this;
	            }
	            var o = this.options;
	            var opts = {
	                crop: function crop(e) {
	                    _this3._cropping = e.detail;
	                    _this3.triggerMethod('crop', e.detail);
	                    if (orange_1.isFunction(o.crop)) o.crop(e);
	                },
	                data: this.cropping,
	                built: function built() {
	                    _this3.triggerMethod('built');
	                    if (orange_1.isFunction(o.built)) o.built();
	                },
	                cropstart: function cropstart(e) {
	                    _this3.triggerMethod('cropstart');
	                    if (orange_1.isFunction(o.cropstart)) o.cropstart(e);
	                },
	                cropmove: function cropmove(e) {
	                    _this3.triggerMethod('cropmove', e);
	                    if (orange_1.isFunction(o.cropmove)) o.cropmove(e);
	                },
	                cropend: function cropend(e) {
	                    _this3.triggerMethod('cropend', e);
	                    if (orange_1.isFunction(o.cropend)) o.cropend(e);
	                }
	            };
	            opts = orange_1.extend({}, this.options, opts);
	            this._cropper = new cropperjs_1.default(this.ui['image'], opts);
	            return this;
	        }
	        /**
	         * Deactivate cropper
	         *
	         * @returns
	         *
	         * @memberOf CropView
	         */

	    }, {
	        key: "deactivate",
	        value: function deactivate() {
	            if (this._cropper) {
	                this._cropper.destroy();
	                this._cropper = void 0;
	            }
	            return this;
	        }
	        /**
	         * Toggle cropper
	         *
	         * @returns
	         *
	         * @memberOf CropView
	         */

	    }, {
	        key: "toggle",
	        value: function toggle() {
	            return this._cropper != null ? this.deactivate() : this.activate();
	        }
	    }, {
	        key: "onCrop",
	        value: function onCrop(cropping) {
	            if (this.options.previewView) {
	                this.options.previewView.cropping = cropping;
	            }
	        }
	        /**
	         *
	         *
	         * @returns
	         *
	         * @memberOf CropView
	         */

	    }, {
	        key: "render",
	        value: function render() {
	            this.triggerMethod('before:render');
	            this.undelegateEvents();
	            var image = this.el.querySelector('img');
	            if (image == null) {
	                image = document.createElement('img');
	                this.el.appendChild(image);
	            }
	            var $i = orange_dom_1.Html.query(document.createElement('div'));
	            $i.addClass('message');
	            this._message = $i;
	            this.el.appendChild($i.get(0));
	            this.delegateEvents();
	            this.triggerMethod('render');
	            return this;
	        }
	        /**
	         *
	         *
	         * @param {string} str
	         * @param {boolean} [error=false]
	         * @param {number} [timeout]
	         * @returns
	         *
	         * @memberOf CropView
	         */

	    }, {
	        key: "showMessage",
	        value: function showMessage(str) {
	            var _this4 = this;

	            var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	            var timeout = arguments[2];

	            this._message.html(str).addClass('shown');
	            if (error) this._message.addClass('error');else this._message.removeClass('error');
	            if (timeout) {
	                setTimeout(function () {
	                    return _this4.hideMessage();
	                }, timeout);
	            }
	            return this;
	        }
	        /**
	         *
	         *
	         * @returns
	         *
	         * @memberOf CropView
	         */

	    }, {
	        key: "hideMessage",
	        value: function hideMessage() {
	            this._message.removeClass('shown');
	            return this;
	        }
	    }, {
	        key: "_updateImage",
	        value: function _updateImage() {
	            var _this5 = this;

	            var img = this.el.querySelector('img');
	            orange_dom_1.removeClass(img, 'loaded');
	            if (this.model === null) {
	                img.src = utils_1.emptyImage;
	                return Promise.resolve(false);
	            }
	            this.hideMessage();
	            var _progress = this.options.progress;
	            if (_progress) {
	                _progress.show();
	            }
	            return this.model.open({
	                progress: function progress(e) {
	                    if (e.total == 0) return;
	                    if (_progress) _progress.setPercent(100 / e.total * e.loaded);
	                }
	            }, this.client).then(function (blob) {
	                var fn = function fn(e) {
	                    if (_progress) _progress.hide();
	                    img.removeEventListener('load', fn);
	                };
	                if (!/image\/.*/.test(blob.type)) {
	                    //this.triggerMethod('image', false);
	                    throw new Error('The file is not an image');
	                }
	                //img.addEventListener('load', fn);
	                img.src = URL.createObjectURL(blob);
	                fn(null);
	                _this5.triggerMethod('image', true);
	                return true;
	            }).then(function () {
	                orange_dom_1.addClass(img, 'loaded');
	                return true;
	            }).catch(function (e) {
	                if (_progress) _progress.hide();
	                _this5.trigger('error', e);
	                _this5.showMessage(e.message, true);
	            });
	        }
	        /**
	         *
	         *
	         *
	         * @memberOf CropView
	         */

	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.deactivate();
	            _get(CropView.prototype.__proto__ || Object.getPrototypeOf(CropView.prototype), "destroy", this).call(this);
	        }
	    }, {
	        key: "cropper",
	        get: function get() {
	            if (this._cropper != null) return this._cropper;
	            if (this.ui['image'] == null) return null;
	            return this.activate()._cropper;
	        }
	        /**
	         * The current cropping
	         * @memberOf CropView
	         */

	    }, {
	        key: "cropping",
	        get: function get() {
	            return this._cropping;
	        }
	        /**
	         *
	         *
	         *
	         * @memberOf CropView
	         */
	        ,
	        set: function set(cropping) {
	            this._cropping = cropping;
	            if (this.options.previewView) this.options.previewView.cropping = cropping;
	        }
	    }]);

	    return CropView;
	}(views_1.View);
	CropView = __decorate([views_1.attributes({
	    className: 'torsten cropping-view',
	    ui: {
	        image: 'img'
	    }
	}), __metadata("design:paramtypes", [Object])], CropView);
	exports.CropView = CropView;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Cropper.js v0.8.1
	 * https://github.com/fengyuanchen/cropperjs
	 *
	 * Copyright (c) 2015-2016 Fengyuan Chen
	 * Released under the MIT license
	 *
	 * Date: 2016-09-03T04:55:16.458Z
	 */

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else {
			var a = factory();
			for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
		}
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
		
		var _defaults = __webpack_require__(1);
		
		var _defaults2 = _interopRequireDefault(_defaults);
		
		var _template = __webpack_require__(2);
		
		var _template2 = _interopRequireDefault(_template);
		
		var _render = __webpack_require__(3);
		
		var _render2 = _interopRequireDefault(_render);
		
		var _preview = __webpack_require__(5);
		
		var _preview2 = _interopRequireDefault(_preview);
		
		var _events = __webpack_require__(6);
		
		var _events2 = _interopRequireDefault(_events);
		
		var _handlers = __webpack_require__(7);
		
		var _handlers2 = _interopRequireDefault(_handlers);
		
		var _change = __webpack_require__(8);
		
		var _change2 = _interopRequireDefault(_change);
		
		var _methods = __webpack_require__(9);
		
		var _methods2 = _interopRequireDefault(_methods);
		
		var _utilities = __webpack_require__(4);
		
		var $ = _interopRequireWildcard(_utilities);
		
		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		// Constants
		var NAMESPACE = 'cropper';
		
		// Classes
		var CLASS_HIDDEN = NAMESPACE + '-hidden';
		
		// Events
		var EVENT_ERROR = 'error';
		var EVENT_LOAD = 'load';
		var EVENT_READY = 'ready';
		var EVENT_CROP = 'crop';
		
		// RegExps
		var REGEXP_DATA_URL = /^data:/;
		var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg.*;base64,/;
		
		var AnotherCropper = void 0;
		
		var Cropper = function () {
		  function Cropper(element, options) {
		    _classCallCheck(this, Cropper);
		
		    var self = this;
		
		    self.element = element;
		    self.options = $.extend({}, _defaults2.default, $.isPlainObject(options) && options);
		    self.loaded = false;
		    self.ready = false;
		    self.complete = false;
		    self.rotated = false;
		    self.cropped = false;
		    self.disabled = false;
		    self.replaced = false;
		    self.limited = false;
		    self.wheeling = false;
		    self.isImg = false;
		    self.originalUrl = '';
		    self.canvasData = null;
		    self.cropBoxData = null;
		    self.previews = null;
		    self.init();
		  }
		
		  _createClass(Cropper, [{
		    key: 'init',
		    value: function init() {
		      var self = this;
		      var element = self.element;
		      var tagName = element.tagName.toLowerCase();
		      var url = void 0;
		
		      if ($.getData(element, NAMESPACE)) {
		        return;
		      }
		
		      $.setData(element, NAMESPACE, self);
		
		      if (tagName === 'img') {
		        self.isImg = true;
		
		        // e.g.: "img/picture.jpg"
		        self.originalUrl = url = element.getAttribute('src');
		
		        // Stop when it's a blank image
		        if (!url) {
		          return;
		        }
		
		        // e.g.: "http://example.com/img/picture.jpg"
		        url = element.src;
		      } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
		        url = element.toDataURL();
		      }
		
		      self.load(url);
		    }
		  }, {
		    key: 'load',
		    value: function load(url) {
		      var self = this;
		      var options = self.options;
		      var element = self.element;
		
		      if (!url) {
		        return;
		      }
		
		      self.url = url;
		      self.imageData = {};
		
		      if (!options.checkOrientation || !window.ArrayBuffer) {
		        self.clone();
		        return;
		      }
		
		      // XMLHttpRequest disallows to open a Data URL in some browsers like IE11 and Safari
		      if (REGEXP_DATA_URL.test(url)) {
		        if (REGEXP_DATA_URL_JPEG) {
		          self.read($.dataURLToArrayBuffer(url));
		        } else {
		          self.clone();
		        }
		        return;
		      }
		
		      var xhr = new XMLHttpRequest();
		
		      xhr.onerror = xhr.onabort = function () {
		        self.clone();
		      };
		
		      xhr.onload = function () {
		        self.read(xhr.response);
		      };
		
		      if (options.checkCrossOrigin && $.isCrossOriginURL(url) && element.crossOrigin) {
		        url = $.addTimestamp(url);
		      }
		
		      xhr.open('get', url);
		      xhr.responseType = 'arraybuffer';
		      xhr.send();
		    }
		  }, {
		    key: 'read',
		    value: function read(arrayBuffer) {
		      var self = this;
		      var options = self.options;
		      var orientation = $.getOrientation(arrayBuffer);
		      var imageData = self.imageData;
		      var rotate = 0;
		      var scaleX = 1;
		      var scaleY = 1;
		
		      if (orientation > 1) {
		        self.url = $.arrayBufferToDataURL(arrayBuffer);
		
		        switch (orientation) {
		
		          // flip horizontal
		          case 2:
		            scaleX = -1;
		            break;
		
		          // rotate left 180°
		          case 3:
		            rotate = -180;
		            break;
		
		          // flip vertical
		          case 4:
		            scaleY = -1;
		            break;
		
		          // flip vertical + rotate right 90°
		          case 5:
		            rotate = 90;
		            scaleY = -1;
		            break;
		
		          // rotate right 90°
		          case 6:
		            rotate = 90;
		            break;
		
		          // flip horizontal + rotate right 90°
		          case 7:
		            rotate = 90;
		            scaleX = -1;
		            break;
		
		          // rotate left 90°
		          case 8:
		            rotate = -90;
		            break;
		        }
		      }
		
		      if (options.rotatable) {
		        imageData.rotate = rotate;
		      }
		
		      if (options.scalable) {
		        imageData.scaleX = scaleX;
		        imageData.scaleY = scaleY;
		      }
		
		      self.clone();
		    }
		  }, {
		    key: 'clone',
		    value: function clone() {
		      var self = this;
		      var element = self.element;
		      var url = self.url;
		      var crossOrigin = void 0;
		      var crossOriginUrl = void 0;
		      var start = void 0;
		      var stop = void 0;
		
		      if (self.options.checkCrossOrigin && $.isCrossOriginURL(url)) {
		        crossOrigin = element.crossOrigin;
		
		        if (crossOrigin) {
		          crossOriginUrl = url;
		        } else {
		          crossOrigin = 'anonymous';
		
		          // Bust cache when there is not a "crossOrigin" property
		          crossOriginUrl = $.addTimestamp(url);
		        }
		      }
		
		      self.crossOrigin = crossOrigin;
		      self.crossOriginUrl = crossOriginUrl;
		
		      var image = $.createElement('img');
		
		      if (crossOrigin) {
		        image.crossOrigin = crossOrigin;
		      }
		
		      image.src = crossOriginUrl || url;
		      self.image = image;
		      self.onStart = start = $.proxy(self.start, self);
		      self.onStop = stop = $.proxy(self.stop, self);
		
		      if (self.isImg) {
		        if (element.complete) {
		          self.start();
		        } else {
		          $.addListener(element, EVENT_LOAD, start);
		        }
		      } else {
		        $.addListener(image, EVENT_LOAD, start);
		        $.addListener(image, EVENT_ERROR, stop);
		        $.addClass(image, 'cropper-hide');
		        element.parentNode.insertBefore(image, element.nextSibling);
		      }
		    }
		  }, {
		    key: 'start',
		    value: function start(event) {
		      var self = this;
		      var image = self.isImg ? self.element : self.image;
		
		      if (event) {
		        $.removeListener(image, EVENT_LOAD, self.onStart);
		        $.removeListener(image, EVENT_ERROR, self.onStop);
		      }
		
		      $.getImageSize(image, function (naturalWidth, naturalHeight) {
		        $.extend(self.imageData, {
		          naturalWidth: naturalWidth,
		          naturalHeight: naturalHeight,
		          aspectRatio: naturalWidth / naturalHeight
		        });
		
		        self.loaded = true;
		        self.build();
		      });
		    }
		  }, {
		    key: 'stop',
		    value: function stop() {
		      var self = this;
		      var image = self.image;
		
		      $.removeListener(image, EVENT_LOAD, self.onStart);
		      $.removeListener(image, EVENT_ERROR, self.onStop);
		
		      $.removeChild(image);
		      self.image = null;
		    }
		  }, {
		    key: 'build',
		    value: function build() {
		      var self = this;
		      var options = self.options;
		      var element = self.element;
		      var image = self.image;
		      var container = void 0;
		      var cropper = void 0;
		      var canvas = void 0;
		      var dragBox = void 0;
		      var cropBox = void 0;
		      var face = void 0;
		
		      if (!self.loaded) {
		        return;
		      }
		
		      // Unbuild first when replace
		      if (self.ready) {
		        self.unbuild();
		      }
		
		      var template = $.createElement('div');
		      template.innerHTML = _template2.default;
		
		      // Create cropper elements
		      self.container = container = element.parentNode;
		      self.cropper = cropper = $.getByClass(template, 'cropper-container')[0];
		      self.canvas = canvas = $.getByClass(cropper, 'cropper-canvas')[0];
		      self.dragBox = dragBox = $.getByClass(cropper, 'cropper-drag-box')[0];
		      self.cropBox = cropBox = $.getByClass(cropper, 'cropper-crop-box')[0];
		      self.viewBox = $.getByClass(cropper, 'cropper-view-box')[0];
		      self.face = face = $.getByClass(cropBox, 'cropper-face')[0];
		
		      $.appendChild(canvas, image);
		
		      // Hide the original image
		      $.addClass(element, CLASS_HIDDEN);
		
		      // Inserts the cropper after to the current image
		      container.insertBefore(cropper, element.nextSibling);
		
		      // Show the image if is hidden
		      if (!self.isImg) {
		        $.removeClass(image, 'cropper-hide');
		      }
		
		      self.initPreview();
		      self.bind();
		
		      options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
		      options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;
		
		      if (options.autoCrop) {
		        self.cropped = true;
		
		        if (options.modal) {
		          $.addClass(dragBox, 'cropper-modal');
		        }
		      } else {
		        $.addClass(cropBox, CLASS_HIDDEN);
		      }
		
		      if (!options.guides) {
		        $.addClass($.getByClass(cropBox, 'cropper-dashed'), CLASS_HIDDEN);
		      }
		
		      if (!options.center) {
		        $.addClass($.getByClass(cropBox, 'cropper-center'), CLASS_HIDDEN);
		      }
		
		      if (options.background) {
		        $.addClass(cropper, 'cropper-bg');
		      }
		
		      if (!options.highlight) {
		        $.addClass(face, 'cropper-invisible');
		      }
		
		      if (options.cropBoxMovable) {
		        $.addClass(face, 'cropper-move');
		        $.setData(face, 'action', 'all');
		      }
		
		      if (!options.cropBoxResizable) {
		        $.addClass($.getByClass(cropBox, 'cropper-line'), CLASS_HIDDEN);
		        $.addClass($.getByClass(cropBox, 'cropper-point'), CLASS_HIDDEN);
		      }
		
		      self.setDragMode(options.dragMode);
		      self.render();
		      self.ready = true;
		      self.setData(options.data);
		
		      // Call the "ready" option asynchronously to keep "image.cropper" is defined
		      self.completing = setTimeout(function () {
		        if ($.isFunction(options.ready)) {
		          $.addListener(element, EVENT_READY, options.ready, true);
		        }
		
		        $.dispatchEvent(element, EVENT_READY);
		        $.dispatchEvent(element, EVENT_CROP, self.getData());
		
		        self.complete = true;
		      }, 0);
		    }
		  }, {
		    key: 'unbuild',
		    value: function unbuild() {
		      var self = this;
		
		      if (!self.ready) {
		        return;
		      }
		
		      if (!self.complete) {
		        clearTimeout(self.completing);
		      }
		
		      self.ready = false;
		      self.complete = false;
		      self.initialImageData = null;
		
		      // Clear `initialCanvasData` is necessary when replace
		      self.initialCanvasData = null;
		      self.initialCropBoxData = null;
		      self.containerData = null;
		      self.canvasData = null;
		
		      // Clear `cropBoxData` is necessary when replace
		      self.cropBoxData = null;
		      self.unbind();
		
		      self.resetPreview();
		      self.previews = null;
		
		      self.viewBox = null;
		      self.cropBox = null;
		      self.dragBox = null;
		      self.canvas = null;
		      self.container = null;
		
		      $.removeChild(self.cropper);
		      self.cropper = null;
		    }
		  }], [{
		    key: 'noConflict',
		    value: function noConflict() {
		      window.Cropper = AnotherCropper;
		      return Cropper;
		    }
		  }, {
		    key: 'setDefaults',
		    value: function setDefaults(options) {
		      $.extend(_defaults2.default, $.isPlainObject(options) && options);
		    }
		  }]);
		
		  return Cropper;
		}();
		
		$.extend(Cropper.prototype, _render2.default);
		$.extend(Cropper.prototype, _preview2.default);
		$.extend(Cropper.prototype, _events2.default);
		$.extend(Cropper.prototype, _handlers2.default);
		$.extend(Cropper.prototype, _change2.default);
		$.extend(Cropper.prototype, _methods2.default);
		
		if (typeof window !== 'undefined') {
		  AnotherCropper = window.Cropper;
		  window.Cropper = Cropper;
		}
		
		exports.default = Cropper;

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = {
		  // Define the view mode of the cropper
		  viewMode: 0, // 0, 1, 2, 3
		
		  // Define the dragging mode of the cropper
		  dragMode: 'crop', // 'crop', 'move' or 'none'
		
		  // Define the aspect ratio of the crop box
		  aspectRatio: NaN,
		
		  // An object with the previous cropping result data
		  data: null,
		
		  // A selector for adding extra containers to preview
		  preview: '',
		
		  // Re-render the cropper when resize the window
		  responsive: true,
		
		  // Restore the cropped area after resize the window
		  restore: true,
		
		  // Check if the current image is a cross-origin image
		  checkCrossOrigin: true,
		
		  // Check the current image's Exif Orientation information
		  checkOrientation: true,
		
		  // Show the black modal
		  modal: true,
		
		  // Show the dashed lines for guiding
		  guides: true,
		
		  // Show the center indicator for guiding
		  center: true,
		
		  // Show the white modal to highlight the crop box
		  highlight: true,
		
		  // Show the grid background
		  background: true,
		
		  // Enable to crop the image automatically when initialize
		  autoCrop: true,
		
		  // Define the percentage of automatic cropping area when initializes
		  autoCropArea: 0.8,
		
		  // Enable to move the image
		  movable: true,
		
		  // Enable to rotate the image
		  rotatable: true,
		
		  // Enable to scale the image
		  scalable: true,
		
		  // Enable to zoom the image
		  zoomable: true,
		
		  // Enable to zoom the image by dragging touch
		  zoomOnTouch: true,
		
		  // Enable to zoom the image by wheeling mouse
		  zoomOnWheel: true,
		
		  // Define zoom ratio when zoom the image by wheeling mouse
		  wheelZoomRatio: 0.1,
		
		  // Enable to move the crop box
		  cropBoxMovable: true,
		
		  // Enable to resize the crop box
		  cropBoxResizable: true,
		
		  // Toggle drag mode between "crop" and "move" when click twice on the cropper
		  toggleDragModeOnDblclick: true,
		
		  // Size limitation
		  minCanvasWidth: 0,
		  minCanvasHeight: 0,
		  minCropBoxWidth: 0,
		  minCropBoxHeight: 0,
		  minContainerWidth: 200,
		  minContainerHeight: 100,
		
		  // Shortcuts of events
		  ready: null,
		  cropstart: null,
		  cropmove: null,
		  cropend: null,
		  crop: null,
		  zoom: null
		};

	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = '<div class="cropper-container">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-action="e"></span>' + '<span class="cropper-line line-n" data-action="n"></span>' + '<span class="cropper-line line-w" data-action="w"></span>' + '<span class="cropper-line line-s" data-action="s"></span>' + '<span class="cropper-point point-e" data-action="e"></span>' + '<span class="cropper-point point-n" data-action="n"></span>' + '<span class="cropper-point point-w" data-action="w"></span>' + '<span class="cropper-point point-s" data-action="s"></span>' + '<span class="cropper-point point-ne" data-action="ne"></span>' + '<span class="cropper-point point-nw" data-action="nw"></span>' + '<span class="cropper-point point-sw" data-action="sw"></span>' + '<span class="cropper-point point-se" data-action="se"></span>' + '</div>' + '</div>';

	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _utilities = __webpack_require__(4);
		
		var $ = _interopRequireWildcard(_utilities);
		
		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
		
		exports.default = {
		  render: function render() {
		    var self = this;
		
		    self.initContainer();
		    self.initCanvas();
		    self.initCropBox();
		
		    self.renderCanvas();
		
		    if (self.cropped) {
		      self.renderCropBox();
		    }
		  },
		  initContainer: function initContainer() {
		    var self = this;
		    var options = self.options;
		    var element = self.element;
		    var container = self.container;
		    var cropper = self.cropper;
		    var containerData = void 0;
		
		    $.addClass(cropper, 'cropper-hidden');
		    $.removeClass(element, 'cropper-hidden');
		
		    self.containerData = containerData = {
		      width: Math.max(container.offsetWidth, Number(options.minContainerWidth) || 200),
		      height: Math.max(container.offsetHeight, Number(options.minContainerHeight) || 100)
		    };
		
		    $.setStyle(cropper, {
		      width: containerData.width,
		      height: containerData.height
		    });
		
		    $.addClass(element, 'cropper-hidden');
		    $.removeClass(cropper, 'cropper-hidden');
		  },
		
		
		  // Canvas (image wrapper)
		  initCanvas: function initCanvas() {
		    var self = this;
		    var viewMode = self.options.viewMode;
		    var containerData = self.containerData;
		    var imageData = self.imageData;
		    var rotated = Math.abs(imageData.rotate) === 90;
		    var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
		    var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
		    var aspectRatio = naturalWidth / naturalHeight;
		    var canvasWidth = containerData.width;
		    var canvasHeight = containerData.height;
		
		    if (containerData.height * aspectRatio > containerData.width) {
		      if (viewMode === 3) {
		        canvasWidth = containerData.height * aspectRatio;
		      } else {
		        canvasHeight = containerData.width / aspectRatio;
		      }
		    } else if (viewMode === 3) {
		      canvasHeight = containerData.width / aspectRatio;
		    } else {
		      canvasWidth = containerData.height * aspectRatio;
		    }
		
		    var canvasData = {
		      naturalWidth: naturalWidth,
		      naturalHeight: naturalHeight,
		      aspectRatio: aspectRatio,
		      width: canvasWidth,
		      height: canvasHeight
		    };
		
		    canvasData.oldLeft = canvasData.left = (containerData.width - canvasWidth) / 2;
		    canvasData.oldTop = canvasData.top = (containerData.height - canvasHeight) / 2;
		
		    self.canvasData = canvasData;
		    self.limited = viewMode === 1 || viewMode === 2;
		    self.limitCanvas(true, true);
		    self.initialImageData = $.extend({}, imageData);
		    self.initialCanvasData = $.extend({}, canvasData);
		  },
		  limitCanvas: function limitCanvas(sizeLimited, positionLimited) {
		    var self = this;
		    var options = self.options;
		    var viewMode = options.viewMode;
		    var containerData = self.containerData;
		    var canvasData = self.canvasData;
		    var aspectRatio = canvasData.aspectRatio;
		    var cropBoxData = self.cropBoxData;
		    var cropped = self.cropped && cropBoxData;
		    var minCanvasWidth = void 0;
		    var minCanvasHeight = void 0;
		    var newCanvasLeft = void 0;
		    var newCanvasTop = void 0;
		
		    if (sizeLimited) {
		      minCanvasWidth = Number(options.minCanvasWidth) || 0;
		      minCanvasHeight = Number(options.minCanvasHeight) || 0;
		
		      if (viewMode > 1) {
		        minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
		        minCanvasHeight = Math.max(minCanvasHeight, containerData.height);
		
		        if (viewMode === 3) {
		          if (minCanvasHeight * aspectRatio > minCanvasWidth) {
		            minCanvasWidth = minCanvasHeight * aspectRatio;
		          } else {
		            minCanvasHeight = minCanvasWidth / aspectRatio;
		          }
		        }
		      } else if (viewMode > 0) {
		        if (minCanvasWidth) {
		          minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0);
		        } else if (minCanvasHeight) {
		          minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0);
		        } else if (cropped) {
		          minCanvasWidth = cropBoxData.width;
		          minCanvasHeight = cropBoxData.height;
		
		          if (minCanvasHeight * aspectRatio > minCanvasWidth) {
		            minCanvasWidth = minCanvasHeight * aspectRatio;
		          } else {
		            minCanvasHeight = minCanvasWidth / aspectRatio;
		          }
		        }
		      }
		
		      if (minCanvasWidth && minCanvasHeight) {
		        if (minCanvasHeight * aspectRatio > minCanvasWidth) {
		          minCanvasHeight = minCanvasWidth / aspectRatio;
		        } else {
		          minCanvasWidth = minCanvasHeight * aspectRatio;
		        }
		      } else if (minCanvasWidth) {
		        minCanvasHeight = minCanvasWidth / aspectRatio;
		      } else if (minCanvasHeight) {
		        minCanvasWidth = minCanvasHeight * aspectRatio;
		      }
		
		      canvasData.minWidth = minCanvasWidth;
		      canvasData.minHeight = minCanvasHeight;
		      canvasData.maxWidth = Infinity;
		      canvasData.maxHeight = Infinity;
		    }
		
		    if (positionLimited) {
		      if (viewMode) {
		        newCanvasLeft = containerData.width - canvasData.width;
		        newCanvasTop = containerData.height - canvasData.height;
		
		        canvasData.minLeft = Math.min(0, newCanvasLeft);
		        canvasData.minTop = Math.min(0, newCanvasTop);
		        canvasData.maxLeft = Math.max(0, newCanvasLeft);
		        canvasData.maxTop = Math.max(0, newCanvasTop);
		
		        if (cropped && self.limited) {
		          canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width));
		          canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height));
		          canvasData.maxLeft = cropBoxData.left;
		          canvasData.maxTop = cropBoxData.top;
		
		          if (viewMode === 2) {
		            if (canvasData.width >= containerData.width) {
		              canvasData.minLeft = Math.min(0, newCanvasLeft);
		              canvasData.maxLeft = Math.max(0, newCanvasLeft);
		            }
		
		            if (canvasData.height >= containerData.height) {
		              canvasData.minTop = Math.min(0, newCanvasTop);
		              canvasData.maxTop = Math.max(0, newCanvasTop);
		            }
		          }
		        }
		      } else {
		        canvasData.minLeft = -canvasData.width;
		        canvasData.minTop = -canvasData.height;
		        canvasData.maxLeft = containerData.width;
		        canvasData.maxTop = containerData.height;
		      }
		    }
		  },
		  renderCanvas: function renderCanvas(changed) {
		    var self = this;
		    var canvasData = self.canvasData;
		    var imageData = self.imageData;
		    var rotate = imageData.rotate;
		    var aspectRatio = void 0;
		    var rotatedData = void 0;
		
		    if (self.rotated) {
		      self.rotated = false;
		
		      // Computes rotated sizes with image sizes
		      rotatedData = $.getRotatedSizes({
		        width: imageData.width,
		        height: imageData.height,
		        degree: rotate
		      });
		
		      aspectRatio = rotatedData.width / rotatedData.height;
		
		      if (aspectRatio !== canvasData.aspectRatio) {
		        canvasData.left -= (rotatedData.width - canvasData.width) / 2;
		        canvasData.top -= (rotatedData.height - canvasData.height) / 2;
		        canvasData.width = rotatedData.width;
		        canvasData.height = rotatedData.height;
		        canvasData.aspectRatio = aspectRatio;
		        canvasData.naturalWidth = imageData.naturalWidth;
		        canvasData.naturalHeight = imageData.naturalHeight;
		
		        // Computes rotated sizes with natural image sizes
		        if (rotate % 180) {
		          rotatedData = $.getRotatedSizes({
		            width: imageData.naturalWidth,
		            height: imageData.naturalHeight,
		            degree: rotate
		          });
		
		          canvasData.naturalWidth = rotatedData.width;
		          canvasData.naturalHeight = rotatedData.height;
		        }
		
		        self.limitCanvas(true, false);
		      }
		    }
		
		    if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
		      canvasData.left = canvasData.oldLeft;
		    }
		
		    if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
		      canvasData.top = canvasData.oldTop;
		    }
		
		    canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
		    canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
		
		    self.limitCanvas(false, true);
		
		    canvasData.oldLeft = canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft);
		    canvasData.oldTop = canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop);
		
		    $.setStyle(self.canvas, {
		      width: canvasData.width,
		      height: canvasData.height,
		      left: canvasData.left,
		      top: canvasData.top
		    });
		
		    self.renderImage();
		
		    if (self.cropped && self.limited) {
		      self.limitCropBox(true, true);
		    }
		
		    if (changed) {
		      self.output();
		    }
		  },
		  renderImage: function renderImage(changed) {
		    var self = this;
		    var canvasData = self.canvasData;
		    var imageData = self.imageData;
		    var newImageData = void 0;
		    var reversedData = void 0;
		    var reversedWidth = void 0;
		    var reversedHeight = void 0;
		
		    if (imageData.rotate) {
		      reversedData = $.getRotatedSizes({
		        width: canvasData.width,
		        height: canvasData.height,
		        degree: imageData.rotate,
		        aspectRatio: imageData.aspectRatio
		      }, true);
		
		      reversedWidth = reversedData.width;
		      reversedHeight = reversedData.height;
		
		      newImageData = {
		        width: reversedWidth,
		        height: reversedHeight,
		        left: (canvasData.width - reversedWidth) / 2,
		        top: (canvasData.height - reversedHeight) / 2
		      };
		    }
		
		    $.extend(imageData, newImageData || {
		      width: canvasData.width,
		      height: canvasData.height,
		      left: 0,
		      top: 0
		    });
		
		    var transform = $.getTransform(imageData);
		
		    $.setStyle(self.image, {
		      width: imageData.width,
		      height: imageData.height,
		      marginLeft: imageData.left,
		      marginTop: imageData.top,
		      WebkitTransform: transform,
		      msTransform: transform,
		      transform: transform
		    });
		
		    if (changed) {
		      self.output();
		    }
		  },
		  initCropBox: function initCropBox() {
		    var self = this;
		    var options = self.options;
		    var aspectRatio = options.aspectRatio;
		    var autoCropArea = Number(options.autoCropArea) || 0.8;
		    var canvasData = self.canvasData;
		    var cropBoxData = {
		      width: canvasData.width,
		      height: canvasData.height
		    };
		
		    if (aspectRatio) {
		      if (canvasData.height * aspectRatio > canvasData.width) {
		        cropBoxData.height = cropBoxData.width / aspectRatio;
		      } else {
		        cropBoxData.width = cropBoxData.height * aspectRatio;
		      }
		    }
		
		    self.cropBoxData = cropBoxData;
		    self.limitCropBox(true, true);
		
		    // Initialize auto crop area
		    cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
		    cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
		
		    // The width/height of auto crop area must large than "minWidth/Height"
		    cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea);
		    cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea);
		    cropBoxData.oldLeft = cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
		    cropBoxData.oldTop = cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;
		
		    self.initialCropBoxData = $.extend({}, cropBoxData);
		  },
		  limitCropBox: function limitCropBox(sizeLimited, positionLimited) {
		    var self = this;
		    var options = self.options;
		    var aspectRatio = options.aspectRatio;
		    var containerData = self.containerData;
		    var canvasData = self.canvasData;
		    var cropBoxData = self.cropBoxData;
		    var limited = self.limited;
		    var minCropBoxWidth = void 0;
		    var minCropBoxHeight = void 0;
		    var maxCropBoxWidth = void 0;
		    var maxCropBoxHeight = void 0;
		
		    if (sizeLimited) {
		      minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
		      minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
		
		      // The min/maxCropBoxWidth/Height must be less than containerWidth/Height
		      minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
		      minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);
		      maxCropBoxWidth = Math.min(containerData.width, limited ? canvasData.width : containerData.width);
		      maxCropBoxHeight = Math.min(containerData.height, limited ? canvasData.height : containerData.height);
		
		      if (aspectRatio) {
		        if (minCropBoxWidth && minCropBoxHeight) {
		          if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
		            minCropBoxHeight = minCropBoxWidth / aspectRatio;
		          } else {
		            minCropBoxWidth = minCropBoxHeight * aspectRatio;
		          }
		        } else if (minCropBoxWidth) {
		          minCropBoxHeight = minCropBoxWidth / aspectRatio;
		        } else if (minCropBoxHeight) {
		          minCropBoxWidth = minCropBoxHeight * aspectRatio;
		        }
		
		        if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
		          maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
		        } else {
		          maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
		        }
		      }
		
		      // The minWidth/Height must be less than maxWidth/Height
		      cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
		      cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
		      cropBoxData.maxWidth = maxCropBoxWidth;
		      cropBoxData.maxHeight = maxCropBoxHeight;
		    }
		
		    if (positionLimited) {
		      if (limited) {
		        cropBoxData.minLeft = Math.max(0, canvasData.left);
		        cropBoxData.minTop = Math.max(0, canvasData.top);
		        cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width;
		        cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height;
		      } else {
		        cropBoxData.minLeft = 0;
		        cropBoxData.minTop = 0;
		        cropBoxData.maxLeft = containerData.width - cropBoxData.width;
		        cropBoxData.maxTop = containerData.height - cropBoxData.height;
		      }
		    }
		  },
		  renderCropBox: function renderCropBox() {
		    var self = this;
		    var options = self.options;
		    var containerData = self.containerData;
		    var cropBoxData = self.cropBoxData;
		
		    if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
		      cropBoxData.left = cropBoxData.oldLeft;
		    }
		
		    if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
		      cropBoxData.top = cropBoxData.oldTop;
		    }
		
		    cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
		    cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
		
		    self.limitCropBox(false, true);
		
		    cropBoxData.oldLeft = cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft);
		    cropBoxData.oldTop = cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop);
		
		    if (options.movable && options.cropBoxMovable) {
		      // Turn to move the canvas when the crop box is equal to the container
		      $.setData(self.face, 'action', cropBoxData.width === containerData.width && cropBoxData.height === containerData.height ? 'move' : 'all');
		    }
		
		    $.setStyle(self.cropBox, {
		      width: cropBoxData.width,
		      height: cropBoxData.height,
		      left: cropBoxData.left,
		      top: cropBoxData.top
		    });
		
		    if (self.cropped && self.limited) {
		      self.limitCanvas(true, true);
		    }
		
		    if (!self.disabled) {
		      self.output();
		    }
		  },
		  output: function output() {
		    var self = this;
		
		    self.preview();
		
		    if (self.complete) {
		      $.dispatchEvent(self.element, 'crop', self.getData());
		    }
		  }
		};

	/***/ },
	/* 4 */
	/***/ function(module, exports) {

		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
		
		exports.typeOf = typeOf;
		exports.isNumber = isNumber;
		exports.isUndefined = isUndefined;
		exports.isObject = isObject;
		exports.isPlainObject = isPlainObject;
		exports.isFunction = isFunction;
		exports.isArray = isArray;
		exports.toArray = toArray;
		exports.trim = trim;
		exports.each = each;
		exports.extend = extend;
		exports.proxy = proxy;
		exports.setStyle = setStyle;
		exports.hasClass = hasClass;
		exports.addClass = addClass;
		exports.removeClass = removeClass;
		exports.toggleClass = toggleClass;
		exports.hyphenate = hyphenate;
		exports.getData = getData;
		exports.setData = setData;
		exports.removeData = removeData;
		exports.removeListener = removeListener;
		exports.dispatchEvent = dispatchEvent;
		exports.getEvent = getEvent;
		exports.getOffset = getOffset;
		exports.getTouchesCenter = getTouchesCenter;
		exports.getByTag = getByTag;
		exports.getByClass = getByClass;
		exports.createElement = createElement;
		exports.appendChild = appendChild;
		exports.removeChild = removeChild;
		exports.empty = empty;
		exports.isCrossOriginURL = isCrossOriginURL;
		exports.addTimestamp = addTimestamp;
		exports.getImageSize = getImageSize;
		exports.getTransform = getTransform;
		exports.getRotatedSizes = getRotatedSizes;
		exports.getSourceCanvas = getSourceCanvas;
		exports.getStringFromCharCode = getStringFromCharCode;
		exports.getOrientation = getOrientation;
		exports.dataURLToArrayBuffer = dataURLToArrayBuffer;
		exports.arrayBufferToDataURL = arrayBufferToDataURL;
		// RegExps
		var REGEXP_DATA_URL_HEAD = /^data:([^;]+);base64,/;
		var REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;
		var REGEXP_ORIGINS = /^(https?:)\/\/([^:\/\?#]+):?(\d*)/i;
		var REGEXP_SPACES = /\s+/;
		var REGEXP_SUFFIX = /^(width|height|left|top|marginLeft|marginTop)$/;
		var REGEXP_TRIM = /^\s+(.*)\s+$/;
		var REGEXP_USERAGENT = /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i;
		var navigator = window.navigator;
		var IS_SAFARI_OR_UIWEBVIEW = navigator && REGEXP_USERAGENT.test(navigator.userAgent);
		
		// Utilities
		var objectProto = Object.prototype;
		var toString = objectProto.toString;
		var hasOwnProperty = objectProto.hasOwnProperty;
		var slice = Array.prototype.slice;
		var fromCharCode = String.fromCharCode;
		
		function typeOf(obj) {
		  return toString.call(obj).slice(8, -1).toLowerCase();
		}
		
		function isNumber(num) {
		  return typeof num === 'number' && !isNaN(num);
		}
		
		function isUndefined(obj) {
		  return typeof obj === 'undefined';
		}
		
		function isObject(obj) {
		  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
		}
		
		function isPlainObject(obj) {
		  if (!isObject(obj)) {
		    return false;
		  }
		
		  try {
		    var _constructor = obj.constructor;
		    var prototype = _constructor.prototype;
		
		    return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
		  } catch (e) {
		    return false;
		  }
		}
		
		function isFunction(fn) {
		  return typeOf(fn) === 'function';
		}
		
		function isArray(arr) {
		  return Array.isArray ? Array.isArray(arr) : typeOf(arr) === 'array';
		}
		
		function toArray(obj, offset) {
		  offset = offset >= 0 ? offset : 0;
		
		  if (Array.from) {
		    return Array.from(obj).slice(offset);
		  }
		
		  return slice.call(obj, offset);
		}
		
		function trim(str) {
		  if (typeof str === 'string') {
		    str = str.trim ? str.trim() : str.replace(REGEXP_TRIM, '$1');
		  }
		
		  return str;
		}
		
		function each(obj, callback) {
		  if (obj && isFunction(callback)) {
		    var i = void 0;
		
		    if (isArray(obj) || isNumber(obj.length) /* array-like */) {
		        var length = obj.length;
		
		        for (i = 0; i < length; i++) {
		          if (callback.call(obj, obj[i], i, obj) === false) {
		            break;
		          }
		        }
		      } else if (isObject(obj)) {
		      Object.keys(obj).forEach(function (key) {
		        callback.call(obj, obj[key], key, obj);
		      });
		    }
		  }
		
		  return obj;
		}
		
		function extend() {
		  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		    args[_key] = arguments[_key];
		  }
		
		  var deep = args[0] === true;
		  var data = deep ? args[1] : args[0];
		
		  if (args.length > 1) {
		    // if (Object.assign) {
		    //   return Object.assign.apply(Object, args);
		    // }
		
		    args.shift();
		
		    args.forEach(function (arg) {
		      if (isObject(arg)) {
		        Object.keys(arg).forEach(function (key) {
		          if (deep && isObject(data[key])) {
		            extend(true, data[key], arg[key]);
		          } else {
		            data[key] = arg[key];
		          }
		        });
		      }
		    });
		  }
		
		  return data;
		}
		
		function proxy(fn, context) {
		  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
		    args[_key2 - 2] = arguments[_key2];
		  }
		
		  return function () {
		    for (var _len3 = arguments.length, args2 = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
		      args2[_key3] = arguments[_key3];
		    }
		
		    return fn.apply(context, args.concat(args2));
		  };
		}
		
		function setStyle(element, styles) {
		  var style = element.style;
		
		  each(styles, function (value, property) {
		    if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
		      value += 'px';
		    }
		
		    style[property] = value;
		  });
		}
		
		function hasClass(element, value) {
		  return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
		}
		
		function addClass(element, value) {
		  if (isNumber(element.length)) {
		    each(element, function (elem) {
		      addClass(elem, value);
		    });
		    return;
		  }
		
		  if (element.classList) {
		    element.classList.add(value);
		    return;
		  }
		
		  var className = trim(element.className);
		
		  if (!className) {
		    element.className = value;
		  } else if (className.indexOf(value) < 0) {
		    element.className = className + ' ' + value;
		  }
		}
		
		function removeClass(element, value) {
		  if (isNumber(element.length)) {
		    each(element, function (elem) {
		      removeClass(elem, value);
		    });
		    return;
		  }
		
		  if (element.classList) {
		    element.classList.remove(value);
		    return;
		  }
		
		  if (element.className.indexOf(value) >= 0) {
		    element.className = element.className.replace(value, '');
		  }
		}
		
		function toggleClass(element, value, added) {
		  if (isNumber(element.length)) {
		    each(element, function (elem) {
		      toggleClass(elem, value, added);
		    });
		    return;
		  }
		
		  // IE10-11 doesn't support the second parameter of `classList.toggle`
		  if (added) {
		    addClass(element, value);
		  } else {
		    removeClass(element, value);
		  }
		}
		
		function hyphenate(str) {
		  return str.replace(REGEXP_HYPHENATE, '$1-$2').toLowerCase();
		}
		
		function getData(element, name) {
		  if (isObject(element[name])) {
		    return element[name];
		  } else if (element.dataset) {
		    return element.dataset[name];
		  }
		
		  return element.getAttribute('data-' + hyphenate(name));
		}
		
		function setData(element, name, data) {
		  if (isObject(data)) {
		    element[name] = data;
		  } else if (element.dataset) {
		    element.dataset[name] = data;
		  } else {
		    element.setAttribute('data-' + hyphenate(name), data);
		  }
		}
		
		function removeData(element, name) {
		  if (isObject(element[name])) {
		    delete element[name];
		  } else if (element.dataset) {
		    delete element.dataset[name];
		  } else {
		    element.removeAttribute('data-' + hyphenate(name));
		  }
		}
		
		function removeListener(element, type, handler) {
		  var types = trim(type).split(REGEXP_SPACES);
		
		  if (types.length > 1) {
		    each(types, function (t) {
		      removeListener(element, t, handler);
		    });
		    return;
		  }
		
		  if (element.removeEventListener) {
		    element.removeEventListener(type, handler, false);
		  } else if (element.detachEvent) {
		    element.detachEvent('on' + type, handler);
		  }
		}
		
		function addListener(element, type, _handler, once) {
		  var types = trim(type).split(REGEXP_SPACES);
		  var originalHandler = _handler;
		
		  if (types.length > 1) {
		    each(types, function (t) {
		      addListener(element, t, _handler);
		    });
		    return;
		  }
		
		  if (once) {
		    _handler = function handler() {
		      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
		        args[_key4] = arguments[_key4];
		      }
		
		      removeListener(element, type, _handler);
		
		      return originalHandler.apply(element, args);
		    };
		  }
		
		  if (element.addEventListener) {
		    element.addEventListener(type, _handler, false);
		  } else if (element.attachEvent) {
		    element.attachEvent('on${type}', _handler);
		  }
		}
		
		exports.addListener = addListener;
		function dispatchEvent(element, type, data) {
		  if (element.dispatchEvent) {
		    var event = void 0;
		
		    // Event and CustomEvent on IE9-11 are global objects, not constructors
		    if (isFunction(Event) && isFunction(CustomEvent)) {
		      if (isUndefined(data)) {
		        event = new Event(type, {
		          bubbles: true,
		          cancelable: true
		        });
		      } else {
		        event = new CustomEvent(type, {
		          detail: data,
		          bubbles: true,
		          cancelable: true
		        });
		      }
		    } else if (isUndefined(data)) {
		      event = document.createEvent('Event');
		      event.initEvent(type, true, true);
		    } else {
		      event = document.createEvent('CustomEvent');
		      event.initCustomEvent(type, true, true, data);
		    }
		
		    // IE9+
		    return element.dispatchEvent(event);
		  } else if (element.fireEvent) {
		    // IE6-10 (native events only)
		    return element.fireEvent('on' + type);
		  }
		
		  return true;
		}
		
		function getEvent(event) {
		  var e = event || window.event;
		
		  // Fix target property (IE8)
		  if (!e.target) {
		    e.target = e.srcElement || document;
		  }
		
		  if (!isNumber(e.pageX) && isNumber(e.clientX)) {
		    var eventDoc = event.target.ownerDocument || document;
		    var doc = eventDoc.documentElement;
		    var body = eventDoc.body;
		
		    e.pageX = e.clientX + ((doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0));
		    e.pageY = e.clientY + ((doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0));
		  }
		
		  return e;
		}
		
		function getOffset(element) {
		  var doc = document.documentElement;
		  var box = element.getBoundingClientRect();
		
		  return {
		    left: box.left + ((window.scrollX || doc && doc.scrollLeft || 0) - (doc && doc.clientLeft || 0)),
		    top: box.top + ((window.scrollY || doc && doc.scrollTop || 0) - (doc && doc.clientTop || 0))
		  };
		}
		
		function getTouchesCenter(touches) {
		  var length = touches.length;
		  var pageX = 0;
		  var pageY = 0;
		
		  if (length) {
		    each(touches, function (touch) {
		      pageX += touch.pageX;
		      pageY += touch.pageY;
		    });
		
		    pageX /= length;
		    pageY /= length;
		  }
		
		  return {
		    pageX: pageX,
		    pageY: pageY
		  };
		}
		
		function getByTag(element, tagName) {
		  return element.getElementsByTagName(tagName);
		}
		
		function getByClass(element, className) {
		  return element.getElementsByClassName ? element.getElementsByClassName(className) : element.querySelectorAll('.' + className);
		}
		
		function createElement(tagName) {
		  return document.createElement(tagName);
		}
		
		function appendChild(element, elem) {
		  element.appendChild(elem);
		}
		
		function removeChild(element) {
		  if (element.parentNode) {
		    element.parentNode.removeChild(element);
		  }
		}
		
		function empty(element) {
		  while (element.firstChild) {
		    element.removeChild(element.firstChild);
		  }
		}
		
		function isCrossOriginURL(url) {
		  var parts = url.match(REGEXP_ORIGINS);
		
		  return parts && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
		}
		
		function addTimestamp(url) {
		  var timestamp = 'timestamp=' + new Date().getTime();
		
		  return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
		}
		
		function getImageSize(image, callback) {
		  // Modern browsers (ignore Safari)
		  if (image.naturalWidth && !IS_SAFARI_OR_UIWEBVIEW) {
		    callback(image.naturalWidth, image.naturalHeight);
		    return;
		  }
		
		  // IE8: Don't use `new Image()` here
		  var newImage = createElement('img');
		
		  newImage.onload = function load() {
		    callback(this.width, this.height);
		  };
		
		  newImage.src = image.src;
		}
		
		function getTransform(data) {
		  var transforms = [];
		  var rotate = data.rotate;
		  var scaleX = data.scaleX;
		  var scaleY = data.scaleY;
		
		  // Rotate should come first before scale to match orientation transform
		  if (isNumber(rotate) && rotate !== 0) {
		    transforms.push('rotate(' + rotate + 'deg)');
		  }
		
		  if (isNumber(scaleX) && scaleX !== 1) {
		    transforms.push('scaleX(' + scaleX + ')');
		  }
		
		  if (isNumber(scaleY) && scaleY !== 1) {
		    transforms.push('scaleY(' + scaleY + ')');
		  }
		
		  return transforms.length ? transforms.join(' ') : 'none';
		}
		
		function getRotatedSizes(data, reversed) {
		  var deg = Math.abs(data.degree) % 180;
		  var arc = (deg > 90 ? 180 - deg : deg) * Math.PI / 180;
		  var sinArc = Math.sin(arc);
		  var cosArc = Math.cos(arc);
		  var width = data.width;
		  var height = data.height;
		  var aspectRatio = data.aspectRatio;
		  var newWidth = void 0;
		  var newHeight = void 0;
		
		  if (!reversed) {
		    newWidth = width * cosArc + height * sinArc;
		    newHeight = width * sinArc + height * cosArc;
		  } else {
		    newWidth = width / (cosArc + sinArc / aspectRatio);
		    newHeight = newWidth / aspectRatio;
		  }
		
		  return {
		    width: newWidth,
		    height: newHeight
		  };
		}
		
		function getSourceCanvas(image, data) {
		  var canvas = createElement('canvas');
		  var context = canvas.getContext('2d');
		  var dstX = 0;
		  var dstY = 0;
		  var dstWidth = data.naturalWidth;
		  var dstHeight = data.naturalHeight;
		  var rotate = data.rotate;
		  var scaleX = data.scaleX;
		  var scaleY = data.scaleY;
		  var scalable = isNumber(scaleX) && isNumber(scaleY) && (scaleX !== 1 || scaleY !== 1);
		  var rotatable = isNumber(rotate) && rotate !== 0;
		  var advanced = rotatable || scalable;
		  var canvasWidth = dstWidth * Math.abs(scaleX || 1);
		  var canvasHeight = dstHeight * Math.abs(scaleY || 1);
		  var translateX = void 0;
		  var translateY = void 0;
		  var rotated = void 0;
		
		  if (scalable) {
		    translateX = canvasWidth / 2;
		    translateY = canvasHeight / 2;
		  }
		
		  if (rotatable) {
		    rotated = getRotatedSizes({
		      width: canvasWidth,
		      height: canvasHeight,
		      degree: rotate
		    });
		
		    canvasWidth = rotated.width;
		    canvasHeight = rotated.height;
		    translateX = canvasWidth / 2;
		    translateY = canvasHeight / 2;
		  }
		
		  canvas.width = canvasWidth;
		  canvas.height = canvasHeight;
		
		  if (advanced) {
		    dstX = -dstWidth / 2;
		    dstY = -dstHeight / 2;
		
		    context.save();
		    context.translate(translateX, translateY);
		  }
		
		  // Rotate should come first before scale as in the "getTransform" function
		  if (rotatable) {
		    context.rotate(rotate * Math.PI / 180);
		  }
		
		  if (scalable) {
		    context.scale(scaleX, scaleY);
		  }
		
		  context.drawImage(image, Math.floor(dstX), Math.floor(dstY), Math.floor(dstWidth), Math.floor(dstHeight));
		
		  if (advanced) {
		    context.restore();
		  }
		
		  return canvas;
		}
		
		function getStringFromCharCode(dataView, start, length) {
		  var str = '';
		  var i = start;
		
		  for (length += start; i < length; i++) {
		    str += fromCharCode(dataView.getUint8(i));
		  }
		
		  return str;
		}
		
		function getOrientation(arrayBuffer) {
		  var dataView = new DataView(arrayBuffer);
		  var length = dataView.byteLength;
		  var orientation = void 0;
		  var exifIDCode = void 0;
		  var tiffOffset = void 0;
		  var firstIFDOffset = void 0;
		  var littleEndian = void 0;
		  var endianness = void 0;
		  var app1Start = void 0;
		  var ifdStart = void 0;
		  var offset = void 0;
		  var i = void 0;
		
		  // Only handle JPEG image (start by 0xFFD8)
		  if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
		    offset = 2;
		
		    while (offset < length) {
		      if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
		        app1Start = offset;
		        break;
		      }
		
		      offset++;
		    }
		  }
		
		  if (app1Start) {
		    exifIDCode = app1Start + 4;
		    tiffOffset = app1Start + 10;
		
		    if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
		      endianness = dataView.getUint16(tiffOffset);
		      littleEndian = endianness === 0x4949;
		
		      if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
		          if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
		            firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
		
		            if (firstIFDOffset >= 0x00000008) {
		              ifdStart = tiffOffset + firstIFDOffset;
		            }
		          }
		        }
		    }
		  }
		
		  if (ifdStart) {
		    length = dataView.getUint16(ifdStart, littleEndian);
		
		    for (i = 0; i < length; i++) {
		      offset = ifdStart + i * 12 + 2;
		
		      if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {
		          // 8 is the offset of the current tag's value
		          offset += 8;
		
		          // Get the original orientation value
		          orientation = dataView.getUint16(offset, littleEndian);
		
		          // Override the orientation with its default value for Safari
		          if (IS_SAFARI_OR_UIWEBVIEW) {
		            dataView.setUint16(offset, 1, littleEndian);
		          }
		
		          break;
		        }
		    }
		  }
		
		  return orientation;
		}
		
		function dataURLToArrayBuffer(dataURL) {
		  var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
		  var binary = atob(base64);
		  var length = binary.length;
		  var arrayBuffer = new ArrayBuffer(length);
		  var dataView = new Uint8Array(arrayBuffer);
		  var i = void 0;
		
		  for (i = 0; i < length; i++) {
		    dataView[i] = binary.charCodeAt(i);
		  }
		
		  return arrayBuffer;
		}
		
		// Only available for JPEG image
		function arrayBufferToDataURL(arrayBuffer) {
		  var dataView = new Uint8Array(arrayBuffer);
		  var length = dataView.length;
		  var base64 = '';
		  var i = void 0;
		
		  for (i = 0; i < length; i++) {
		    base64 += fromCharCode(dataView[i]);
		  }
		
		  return 'data:image/jpeg;base64,' + btoa(base64);
		}

	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _utilities = __webpack_require__(4);
		
		var $ = _interopRequireWildcard(_utilities);
		
		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
		
		var DATA_PREVIEW = 'preview';
		
		exports.default = {
		  initPreview: function initPreview() {
		    var self = this;
		    var preview = self.options.preview;
		    var image = $.createElement('img');
		    var crossOrigin = self.crossOrigin;
		    var url = crossOrigin ? self.crossOriginUrl : self.url;
		
		    if (crossOrigin) {
		      image.crossOrigin = crossOrigin;
		    }
		
		    image.src = url;
		    $.appendChild(self.viewBox, image);
		    self.image2 = image;
		
		    if (!preview) {
		      return;
		    }
		
		    var previews = document.querySelectorAll(preview);
		
		    self.previews = previews;
		
		    $.each(previews, function (element) {
		      var img = $.createElement('img');
		
		      // Save the original size for recover
		      $.setData(element, DATA_PREVIEW, {
		        width: element.offsetWidth,
		        height: element.offsetHeight,
		        html: element.innerHTML
		      });
		
		      if (crossOrigin) {
		        img.crossOrigin = crossOrigin;
		      }
		
		      img.src = url;
		
		      /**
		       * Override img element styles
		       * Add `display:block` to avoid margin top issue
		       * Add `height:auto` to override `height` attribute on IE8
		       * (Occur only when margin-top <= -height)
		       */
		
		      img.style.cssText = 'display:block;' + 'width:100%;' + 'height:auto;' + 'min-width:0!important;' + 'min-height:0!important;' + 'max-width:none!important;' + 'max-height:none!important;' + 'image-orientation:0deg!important;"';
		
		      $.empty(element);
		      $.appendChild(element, img);
		    });
		  },
		  resetPreview: function resetPreview() {
		    $.each(this.previews, function (element) {
		      var data = $.getData(element, DATA_PREVIEW);
		
		      $.setStyle(element, {
		        width: data.width,
		        height: data.height
		      });
		
		      element.innerHTML = data.html;
		      $.removeData(element, DATA_PREVIEW);
		    });
		  },
		  preview: function preview() {
		    var self = this;
		    var imageData = self.imageData;
		    var canvasData = self.canvasData;
		    var cropBoxData = self.cropBoxData;
		    var cropBoxWidth = cropBoxData.width;
		    var cropBoxHeight = cropBoxData.height;
		    var width = imageData.width;
		    var height = imageData.height;
		    var left = cropBoxData.left - canvasData.left - imageData.left;
		    var top = cropBoxData.top - canvasData.top - imageData.top;
		    var transform = $.getTransform(imageData);
		    var transforms = {
		      WebkitTransform: transform,
		      msTransform: transform,
		      transform: transform
		    };
		
		    if (!self.cropped || self.disabled) {
		      return;
		    }
		
		    $.setStyle(self.image2, $.extend({
		      width: width,
		      height: height,
		      marginLeft: -left,
		      marginTop: -top
		    }, transforms));
		
		    $.each(self.previews, function (element) {
		      var data = $.getData(element, DATA_PREVIEW);
		      var originalWidth = data.width;
		      var originalHeight = data.height;
		      var newWidth = originalWidth;
		      var newHeight = originalHeight;
		      var ratio = 1;
		
		      if (cropBoxWidth) {
		        ratio = originalWidth / cropBoxWidth;
		        newHeight = cropBoxHeight * ratio;
		      }
		
		      if (cropBoxHeight && newHeight > originalHeight) {
		        ratio = originalHeight / cropBoxHeight;
		        newWidth = cropBoxWidth * ratio;
		        newHeight = originalHeight;
		      }
		
		      $.setStyle(element, {
		        width: newWidth,
		        height: newHeight
		      });
		
		      $.setStyle($.getByTag(element, 'img')[0], $.extend({
		        width: width * ratio,
		        height: height * ratio,
		        marginLeft: -left * ratio,
		        marginTop: -top * ratio
		      }, transforms));
		    });
		  }
		};

	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _utilities = __webpack_require__(4);
		
		var $ = _interopRequireWildcard(_utilities);
		
		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
		
		// Events
		var EVENT_MOUSE_DOWN = 'mousedown touchstart pointerdown MSPointerDown';
		var EVENT_MOUSE_MOVE = 'mousemove touchmove pointermove MSPointerMove';
		var EVENT_MOUSE_UP = 'mouseup touchend touchcancel pointerup pointercancel' + ' MSPointerUp MSPointerCancel';
		var EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
		var EVENT_DBLCLICK = 'dblclick';
		var EVENT_RESIZE = 'resize';
		var EVENT_CROP_START = 'cropstart';
		var EVENT_CROP_MOVE = 'cropmove';
		var EVENT_CROP_END = 'cropend';
		var EVENT_CROP = 'crop';
		var EVENT_ZOOM = 'zoom';
		
		exports.default = {
		  bind: function bind() {
		    var self = this;
		    var options = self.options;
		    var element = self.element;
		    var cropper = self.cropper;
		
		    if ($.isFunction(options.cropstart)) {
		      $.addListener(element, EVENT_CROP_START, options.cropstart);
		    }
		
		    if ($.isFunction(options.cropmove)) {
		      $.addListener(element, EVENT_CROP_MOVE, options.cropmove);
		    }
		
		    if ($.isFunction(options.cropend)) {
		      $.addListener(element, EVENT_CROP_END, options.cropend);
		    }
		
		    if ($.isFunction(options.crop)) {
		      $.addListener(element, EVENT_CROP, options.crop);
		    }
		
		    if ($.isFunction(options.zoom)) {
		      $.addListener(element, EVENT_ZOOM, options.zoom);
		    }
		
		    $.addListener(cropper, EVENT_MOUSE_DOWN, self.onCropStart = $.proxy(self.cropStart, self));
		
		    if (options.zoomable && options.zoomOnWheel) {
		      $.addListener(cropper, EVENT_WHEEL, self.onWheel = $.proxy(self.wheel, self));
		    }
		
		    if (options.toggleDragModeOnDblclick) {
		      $.addListener(cropper, EVENT_DBLCLICK, self.onDblclick = $.proxy(self.dblclick, self));
		    }
		
		    $.addListener(document, EVENT_MOUSE_MOVE, self.onCropMove = $.proxy(self.cropMove, self));
		    $.addListener(document, EVENT_MOUSE_UP, self.onCropEnd = $.proxy(self.cropEnd, self));
		
		    if (options.responsive) {
		      $.addListener(window, EVENT_RESIZE, self.onResize = $.proxy(self.resize, self));
		    }
		  },
		  unbind: function unbind() {
		    var self = this;
		    var options = self.options;
		    var element = self.element;
		    var cropper = self.cropper;
		
		    if ($.isFunction(options.cropstart)) {
		      $.removeListener(element, EVENT_CROP_START, options.cropstart);
		    }
		
		    if ($.isFunction(options.cropmove)) {
		      $.removeListener(element, EVENT_CROP_MOVE, options.cropmove);
		    }
		
		    if ($.isFunction(options.cropend)) {
		      $.removeListener(element, EVENT_CROP_END, options.cropend);
		    }
		
		    if ($.isFunction(options.crop)) {
		      $.removeListener(element, EVENT_CROP, options.crop);
		    }
		
		    if ($.isFunction(options.zoom)) {
		      $.removeListener(element, EVENT_ZOOM, options.zoom);
		    }
		
		    $.removeListener(cropper, EVENT_MOUSE_DOWN, self.onCropStart);
		
		    if (options.zoomable && options.zoomOnWheel) {
		      $.removeListener(cropper, EVENT_WHEEL, self.onWheel);
		    }
		
		    if (options.toggleDragModeOnDblclick) {
		      $.removeListener(cropper, EVENT_DBLCLICK, self.onDblclick);
		    }
		
		    $.removeListener(document, EVENT_MOUSE_MOVE, self.onCropMove);
		    $.removeListener(document, EVENT_MOUSE_UP, self.onCropEnd);
		
		    if (options.responsive) {
		      $.removeListener(window, EVENT_RESIZE, self.onResize);
		    }
		  }
		};

	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.REGEXP_ACTIONS = undefined;
		
		var _utilities = __webpack_require__(4);
		
		var $ = _interopRequireWildcard(_utilities);
		
		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
		
		var REGEXP_ACTIONS = exports.REGEXP_ACTIONS = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/;
		
		exports.default = {
		  resize: function resize() {
		    var self = this;
		    var restore = self.options.restore;
		    var container = self.container;
		    var containerData = self.containerData;
		
		    // Check `container` is necessary for IE8
		    if (self.disabled || !containerData) {
		      return;
		    }
		
		    var ratio = container.offsetWidth / containerData.width;
		    var canvasData = void 0;
		    var cropBoxData = void 0;
		
		    // Resize when width changed or height changed
		    if (ratio !== 1 || container.offsetHeight !== containerData.height) {
		      if (restore) {
		        canvasData = self.getCanvasData();
		        cropBoxData = self.getCropBoxData();
		      }
		
		      self.render();
		
		      if (restore) {
		        self.setCanvasData($.each(canvasData, function (n, i) {
		          canvasData[i] = n * ratio;
		        }));
		        self.setCropBoxData($.each(cropBoxData, function (n, i) {
		          cropBoxData[i] = n * ratio;
		        }));
		      }
		    }
		  },
		  dblclick: function dblclick() {
		    var self = this;
		
		    if (self.disabled) {
		      return;
		    }
		
		    self.setDragMode($.hasClass(self.dragBox, 'cropper-crop') ? 'move' : 'crop');
		  },
		  wheel: function wheel(event) {
		    var self = this;
		    var e = $.getEvent(event);
		    var ratio = Number(self.options.wheelZoomRatio) || 0.1;
		    var delta = 1;
		
		    if (self.disabled) {
		      return;
		    }
		
		    e.preventDefault();
		
		    // Limit wheel speed to prevent zoom too fast (#21)
		    if (self.wheeling) {
		      return;
		    }
		
		    self.wheeling = true;
		
		    setTimeout(function () {
		      self.wheeling = false;
		    }, 50);
		
		    if (e.deltaY) {
		      delta = e.deltaY > 0 ? 1 : -1;
		    } else if (e.wheelDelta) {
		      delta = -e.wheelDelta / 120;
		    } else if (e.detail) {
		      delta = e.detail > 0 ? 1 : -1;
		    }
		
		    self.zoom(-delta * ratio, e);
		  },
		  cropStart: function cropStart(event) {
		    var self = this;
		    var options = self.options;
		    var e = $.getEvent(event);
		    var touches = e.touches;
		    var touchesLength = void 0;
		    var touch = void 0;
		    var action = void 0;
		
		    if (self.disabled) {
		      return;
		    }
		
		    if (touches) {
		      touchesLength = touches.length;
		
		      if (touchesLength > 1) {
		        if (options.zoomable && options.zoomOnTouch && touchesLength === 2) {
		          touch = touches[1];
		          self.startX2 = touch.pageX;
		          self.startY2 = touch.pageY;
		          action = 'zoom';
		        } else {
		          return;
		        }
		      }
		
		      touch = touches[0];
		    }
		
		    action = action || $.getData(e.target, 'action');
		
		    if (REGEXP_ACTIONS.test(action)) {
		      if ($.dispatchEvent(self.element, 'cropstart', {
		        originalEvent: e,
		        action: action
		      }) === false) {
		        return;
		      }
		
		      e.preventDefault();
		
		      self.action = action;
		      self.cropping = false;
		
		      self.startX = touch ? touch.pageX : e.pageX;
		      self.startY = touch ? touch.pageY : e.pageY;
		
		      if (action === 'crop') {
		        self.cropping = true;
		        $.addClass(self.dragBox, 'cropper-modal');
		      }
		    }
		  },
		  cropMove: function cropMove(event) {
		    var self = this;
		    var options = self.options;
		    var e = $.getEvent(event);
		    var touches = e.touches;
		    var action = self.action;
		    var touchesLength = void 0;
		    var touch = void 0;
		
		    if (self.disabled) {
		      return;
		    }
		
		    if (touches) {
		      touchesLength = touches.length;
		
		      if (touchesLength > 1) {
		        if (options.zoomable && options.zoomOnTouch && touchesLength === 2) {
		          touch = touches[1];
		          self.endX2 = touch.pageX;
		          self.endY2 = touch.pageY;
		        } else {
		          return;
		        }
		      }
		
		      touch = touches[0];
		    }
		
		    if (action) {
		      if ($.dispatchEvent(self.element, 'cropmove', {
		        originalEvent: e,
		        action: action
		      }) === false) {
		        return;
		      }
		
		      e.preventDefault();
		
		      self.endX = touch ? touch.pageX : e.pageX;
		      self.endY = touch ? touch.pageY : e.pageY;
		
		      self.change(e.shiftKey, action === 'zoom' ? e : null);
		    }
		  },
		  cropEnd: function cropEnd(event) {
		    var self = this;
		    var options = self.options;
		    var e = $.getEvent(event);
		    var action = self.action;
		
		    if (self.disabled) {
		      return;
		    }
		
		    if (action) {
		      e.preventDefault();
		
		      if (self.cropping) {
		        self.cropping = false;
		        $.toggleClass(self.dragBox, 'cropper-modal', self.cropped && options.modal);
		      }
		
		      self.action = '';
		
		      $.dispatchEvent(self.element, 'cropend', {
		        originalEvent: e,
		        action: action
		      });
		    }
		  }
		};

	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _utilities = __webpack_require__(4);
		
		var $ = _interopRequireWildcard(_utilities);
		
		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
		
		// Actions
		var ACTION_EAST = 'e';
		var ACTION_WEST = 'w';
		var ACTION_SOUTH = 's';
		var ACTION_NORTH = 'n';
		var ACTION_SOUTH_EAST = 'se';
		var ACTION_SOUTH_WEST = 'sw';
		var ACTION_NORTH_EAST = 'ne';
		var ACTION_NORTH_WEST = 'nw';
		
		exports.default = {
		  change: function change(shiftKey, originalEvent) {
		    var self = this;
		    var options = self.options;
		    var containerData = self.containerData;
		    var canvasData = self.canvasData;
		    var cropBoxData = self.cropBoxData;
		    var aspectRatio = options.aspectRatio;
		    var action = self.action;
		    var width = cropBoxData.width;
		    var height = cropBoxData.height;
		    var left = cropBoxData.left;
		    var top = cropBoxData.top;
		    var right = left + width;
		    var bottom = top + height;
		    var minLeft = 0;
		    var minTop = 0;
		    var maxWidth = containerData.width;
		    var maxHeight = containerData.height;
		    var renderable = true;
		    var offset = void 0;
		
		    // Locking aspect ratio in "free mode" by holding shift key
		    if (!aspectRatio && shiftKey) {
		      aspectRatio = width && height ? width / height : 1;
		    }
		
		    if (self.limited) {
		      minLeft = cropBoxData.minLeft;
		      minTop = cropBoxData.minTop;
		      maxWidth = minLeft + Math.min(containerData.width, canvasData.width, canvasData.left + canvasData.width);
		      maxHeight = minTop + Math.min(containerData.height, canvasData.height, canvasData.top + canvasData.height);
		    }
		
		    var range = {
		      x: self.endX - self.startX,
		      y: self.endY - self.startY
		    };
		
		    if (aspectRatio) {
		      range.X = range.y * aspectRatio;
		      range.Y = range.x / aspectRatio;
		    }
		
		    switch (action) {
		      // Move crop box
		      case 'all':
		        left += range.x;
		        top += range.y;
		        break;
		
		      // Resize crop box
		      case ACTION_EAST:
		        if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
		          renderable = false;
		          break;
		        }
		
		        width += range.x;
		
		        if (aspectRatio) {
		          height = width / aspectRatio;
		          top -= range.Y / 2;
		        }
		
		        if (width < 0) {
		          action = ACTION_WEST;
		          width = 0;
		        }
		
		        break;
		
		      case ACTION_NORTH:
		        if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
		          renderable = false;
		          break;
		        }
		
		        height -= range.y;
		        top += range.y;
		
		        if (aspectRatio) {
		          width = height * aspectRatio;
		          left += range.X / 2;
		        }
		
		        if (height < 0) {
		          action = ACTION_SOUTH;
		          height = 0;
		        }
		
		        break;
		
		      case ACTION_WEST:
		        if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
		          renderable = false;
		          break;
		        }
		
		        width -= range.x;
		        left += range.x;
		
		        if (aspectRatio) {
		          height = width / aspectRatio;
		          top += range.Y / 2;
		        }
		
		        if (width < 0) {
		          action = ACTION_EAST;
		          width = 0;
		        }
		
		        break;
		
		      case ACTION_SOUTH:
		        if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
		          renderable = false;
		          break;
		        }
		
		        height += range.y;
		
		        if (aspectRatio) {
		          width = height * aspectRatio;
		          left -= range.X / 2;
		        }
		
		        if (height < 0) {
		          action = ACTION_NORTH;
		          height = 0;
		        }
		
		        break;
		
		      case ACTION_NORTH_EAST:
		        if (aspectRatio) {
		          if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
		            renderable = false;
		            break;
		          }
		
		          height -= range.y;
		          top += range.y;
		          width = height * aspectRatio;
		        } else {
		          if (range.x >= 0) {
		            if (right < maxWidth) {
		              width += range.x;
		            } else if (range.y <= 0 && top <= minTop) {
		              renderable = false;
		            }
		          } else {
		            width += range.x;
		          }
		
		          if (range.y <= 0) {
		            if (top > minTop) {
		              height -= range.y;
		              top += range.y;
		            }
		          } else {
		            height -= range.y;
		            top += range.y;
		          }
		        }
		
		        if (width < 0 && height < 0) {
		          action = ACTION_SOUTH_WEST;
		          height = 0;
		          width = 0;
		        } else if (width < 0) {
		          action = ACTION_NORTH_WEST;
		          width = 0;
		        } else if (height < 0) {
		          action = ACTION_SOUTH_EAST;
		          height = 0;
		        }
		
		        break;
		
		      case ACTION_NORTH_WEST:
		        if (aspectRatio) {
		          if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
		            renderable = false;
		            break;
		          }
		
		          height -= range.y;
		          top += range.y;
		          width = height * aspectRatio;
		          left += range.X;
		        } else {
		          if (range.x <= 0) {
		            if (left > minLeft) {
		              width -= range.x;
		              left += range.x;
		            } else if (range.y <= 0 && top <= minTop) {
		              renderable = false;
		            }
		          } else {
		            width -= range.x;
		            left += range.x;
		          }
		
		          if (range.y <= 0) {
		            if (top > minTop) {
		              height -= range.y;
		              top += range.y;
		            }
		          } else {
		            height -= range.y;
		            top += range.y;
		          }
		        }
		
		        if (width < 0 && height < 0) {
		          action = ACTION_SOUTH_EAST;
		          height = 0;
		          width = 0;
		        } else if (width < 0) {
		          action = ACTION_NORTH_EAST;
		          width = 0;
		        } else if (height < 0) {
		          action = ACTION_SOUTH_WEST;
		          height = 0;
		        }
		
		        break;
		
		      case ACTION_SOUTH_WEST:
		        if (aspectRatio) {
		          if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
		            renderable = false;
		            break;
		          }
		
		          width -= range.x;
		          left += range.x;
		          height = width / aspectRatio;
		        } else {
		          if (range.x <= 0) {
		            if (left > minLeft) {
		              width -= range.x;
		              left += range.x;
		            } else if (range.y >= 0 && bottom >= maxHeight) {
		              renderable = false;
		            }
		          } else {
		            width -= range.x;
		            left += range.x;
		          }
		
		          if (range.y >= 0) {
		            if (bottom < maxHeight) {
		              height += range.y;
		            }
		          } else {
		            height += range.y;
		          }
		        }
		
		        if (width < 0 && height < 0) {
		          action = ACTION_NORTH_EAST;
		          height = 0;
		          width = 0;
		        } else if (width < 0) {
		          action = ACTION_SOUTH_EAST;
		          width = 0;
		        } else if (height < 0) {
		          action = ACTION_NORTH_WEST;
		          height = 0;
		        }
		
		        break;
		
		      case ACTION_SOUTH_EAST:
		        if (aspectRatio) {
		          if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
		            renderable = false;
		            break;
		          }
		
		          width += range.x;
		          height = width / aspectRatio;
		        } else {
		          if (range.x >= 0) {
		            if (right < maxWidth) {
		              width += range.x;
		            } else if (range.y >= 0 && bottom >= maxHeight) {
		              renderable = false;
		            }
		          } else {
		            width += range.x;
		          }
		
		          if (range.y >= 0) {
		            if (bottom < maxHeight) {
		              height += range.y;
		            }
		          } else {
		            height += range.y;
		          }
		        }
		
		        if (width < 0 && height < 0) {
		          action = ACTION_NORTH_WEST;
		          height = 0;
		          width = 0;
		        } else if (width < 0) {
		          action = ACTION_SOUTH_WEST;
		          width = 0;
		        } else if (height < 0) {
		          action = ACTION_NORTH_EAST;
		          height = 0;
		        }
		
		        break;
		
		      // Move canvas
		      case 'move':
		        self.move(range.x, range.y);
		        renderable = false;
		        break;
		
		      // Zoom canvas
		      case 'zoom':
		        self.zoom(function (x1, y1, x2, y2) {
		          var z1 = Math.sqrt(x1 * x1 + y1 * y1);
		          var z2 = Math.sqrt(x2 * x2 + y2 * y2);
		
		          return (z2 - z1) / z1;
		        }(Math.abs(self.startX - self.startX2), Math.abs(self.startY - self.startY2), Math.abs(self.endX - self.endX2), Math.abs(self.endY - self.endY2)), originalEvent);
		        self.startX2 = self.endX2;
		        self.startY2 = self.endY2;
		        renderable = false;
		        break;
		
		      // Create crop box
		      case 'crop':
		        if (!range.x || !range.y) {
		          renderable = false;
		          break;
		        }
		
		        offset = $.getOffset(self.cropper);
		        left = self.startX - offset.left;
		        top = self.startY - offset.top;
		        width = cropBoxData.minWidth;
		        height = cropBoxData.minHeight;
		
		        if (range.x > 0) {
		          action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
		        } else if (range.x < 0) {
		          left -= width;
		          action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
		        }
		
		        if (range.y < 0) {
		          top -= height;
		        }
		
		        // Show the crop box if is hidden
		        if (!self.cropped) {
		          $.removeClass(self.cropBox, 'cropper-hidden');
		          self.cropped = true;
		
		          if (self.limited) {
		            self.limitCropBox(true, true);
		          }
		        }
		
		        break;
		
		      // No default
		    }
		
		    if (renderable) {
		      cropBoxData.width = width;
		      cropBoxData.height = height;
		      cropBoxData.left = left;
		      cropBoxData.top = top;
		      self.action = action;
		
		      self.renderCropBox();
		    }
		
		    // Override
		    self.startX = self.endX;
		    self.startY = self.endY;
		  }
		};

	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _utilities = __webpack_require__(4);
		
		var $ = _interopRequireWildcard(_utilities);
		
		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
		
		function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
		
		exports.default = {
		  // Show the crop box manually
		  crop: function crop() {
		    var self = this;
		
		    if (self.ready && !self.disabled) {
		      if (!self.cropped) {
		        self.cropped = true;
		        self.limitCropBox(true, true);
		
		        if (self.options.modal) {
		          $.addClass(self.dragBox, 'cropper-modal');
		        }
		
		        $.removeClass(self.cropBox, 'cropper-hidden');
		      }
		
		      self.setCropBoxData(self.initialCropBoxData);
		    }
		
		    return self;
		  },
		
		
		  // Reset the image and crop box to their initial states
		  reset: function reset() {
		    var self = this;
		
		    if (self.ready && !self.disabled) {
		      self.imageData = $.extend({}, self.initialImageData);
		      self.canvasData = $.extend({}, self.initialCanvasData);
		      self.cropBoxData = $.extend({}, self.initialCropBoxData);
		
		      self.renderCanvas();
		
		      if (self.cropped) {
		        self.renderCropBox();
		      }
		    }
		
		    return self;
		  },
		
		
		  // Clear the crop box
		  clear: function clear() {
		    var self = this;
		
		    if (self.cropped && !self.disabled) {
		      $.extend(self.cropBoxData, {
		        left: 0,
		        top: 0,
		        width: 0,
		        height: 0
		      });
		
		      self.cropped = false;
		      self.renderCropBox();
		
		      self.limitCanvas();
		
		      // Render canvas after crop box rendered
		      self.renderCanvas();
		
		      $.removeClass(self.dragBox, 'cropper-modal');
		      $.addClass(self.cropBox, 'cropper-hidden');
		    }
		
		    return self;
		  },
		
		
		  /**
		   * Replace the image's src and rebuild the cropper
		   *
		   * @param {String} url
		   * @param {Boolean} onlyColorChanged (optional)
		   */
		  replace: function replace(url, onlyColorChanged) {
		    var self = this;
		
		    if (!self.disabled && url) {
		      if (self.isImg) {
		        self.element.src = url;
		      }
		
		      if (onlyColorChanged) {
		        self.url = url;
		        self.image.src = url;
		
		        if (self.ready) {
		          self.image2.src = url;
		
		          $.each(self.previews, function (element) {
		            $.getByTag(element, 'img')[0].src = url;
		          });
		        }
		      } else {
		        if (self.isImg) {
		          self.replaced = true;
		        }
		
		        // Clear previous data
		        self.options.data = null;
		        self.load(url);
		      }
		    }
		
		    return self;
		  },
		
		
		  // Enable (unfreeze) the cropper
		  enable: function enable() {
		    var self = this;
		
		    if (self.ready) {
		      self.disabled = false;
		      $.removeClass(self.cropper, 'cropper-disabled');
		    }
		
		    return self;
		  },
		
		
		  // Disable (freeze) the cropper
		  disable: function disable() {
		    var self = this;
		
		    if (self.ready) {
		      self.disabled = true;
		      $.addClass(self.cropper, 'cropper-disabled');
		    }
		
		    return self;
		  },
		
		
		  // Destroy the cropper and remove the instance from the image
		  destroy: function destroy() {
		    var self = this;
		    var element = self.element;
		    var image = self.image;
		
		    if (self.loaded) {
		      if (self.isImg && self.replaced) {
		        element.src = self.originalUrl;
		      }
		
		      self.unbuild();
		      $.removeClass(element, 'cropper-hidden');
		    } else if (self.isImg) {
		      $.removeListener(element, 'load', self.start);
		    } else if (image) {
		      $.removeChild(image);
		    }
		
		    $.removeData(element, 'cropper');
		
		    return self;
		  },
		
		
		  /**
		   * Move the canvas with relative offsets
		   *
		   * @param {Number} offsetX
		   * @param {Number} offsetY (optional)
		   */
		  move: function move(offsetX, offsetY) {
		    var self = this;
		    var canvasData = self.canvasData;
		
		    return self.moveTo($.isUndefined(offsetX) ? offsetX : canvasData.left + Number(offsetX), $.isUndefined(offsetY) ? offsetY : canvasData.top + Number(offsetY));
		  },
		
		
		  /**
		   * Move the canvas to an absolute point
		   *
		   * @param {Number} x
		   * @param {Number} y (optional)
		   */
		  moveTo: function moveTo(x, y) {
		    var self = this;
		    var canvasData = self.canvasData;
		    var changed = false;
		
		    // If "y" is not present, its default value is "x"
		    if ($.isUndefined(y)) {
		      y = x;
		    }
		
		    x = Number(x);
		    y = Number(y);
		
		    if (self.ready && !self.disabled && self.options.movable) {
		      if ($.isNumber(x)) {
		        canvasData.left = x;
		        changed = true;
		      }
		
		      if ($.isNumber(y)) {
		        canvasData.top = y;
		        changed = true;
		      }
		
		      if (changed) {
		        self.renderCanvas(true);
		      }
		    }
		
		    return self;
		  },
		
		
		  /**
		   * Zoom the canvas with a relative ratio
		   *
		   * @param {Number} ratio
		   * @param {Event} _originalEvent (private)
		   */
		  zoom: function zoom(ratio, _originalEvent) {
		    var self = this;
		    var canvasData = self.canvasData;
		
		    ratio = Number(ratio);
		
		    if (ratio < 0) {
		      ratio = 1 / (1 - ratio);
		    } else {
		      ratio = 1 + ratio;
		    }
		
		    return self.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, _originalEvent);
		  },
		
		
		  /**
		   * Zoom the canvas to an absolute ratio
		   *
		   * @param {Number} ratio
		   * @param {Event} _originalEvent (private)
		   */
		  zoomTo: function zoomTo(ratio, _originalEvent) {
		    var self = this;
		    var options = self.options;
		    var canvasData = self.canvasData;
		    var width = canvasData.width;
		    var height = canvasData.height;
		    var naturalWidth = canvasData.naturalWidth;
		    var naturalHeight = canvasData.naturalHeight;
		    var newWidth = void 0;
		    var newHeight = void 0;
		    var offset = void 0;
		    var center = void 0;
		
		    ratio = Number(ratio);
		
		    if (ratio >= 0 && self.ready && !self.disabled && options.zoomable) {
		      newWidth = naturalWidth * ratio;
		      newHeight = naturalHeight * ratio;
		
		      if ($.dispatchEvent(self.element, 'zoom', {
		        originalEvent: _originalEvent,
		        oldRatio: width / naturalWidth,
		        ratio: newWidth / naturalWidth
		      }) === false) {
		        return self;
		      }
		
		      if (_originalEvent) {
		        offset = $.getOffset(self.cropper);
		        center = _originalEvent.touches ? $.getTouchesCenter(_originalEvent.touches) : {
		          pageX: _originalEvent.pageX,
		          pageY: _originalEvent.pageY
		        };
		
		        // Zoom from the triggering point of the event
		        canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width);
		        canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
		      } else {
		        // Zoom from the center of the canvas
		        canvasData.left -= (newWidth - width) / 2;
		        canvasData.top -= (newHeight - height) / 2;
		      }
		
		      canvasData.width = newWidth;
		      canvasData.height = newHeight;
		      self.renderCanvas(true);
		    }
		
		    return self;
		  },
		
		
		  /**
		   * Rotate the canvas with a relative degree
		   *
		   * @param {Number} degree
		   */
		  rotate: function rotate(degree) {
		    var self = this;
		
		    return self.rotateTo((self.imageData.rotate || 0) + Number(degree));
		  },
		
		
		  /**
		   * Rotate the canvas to an absolute degree
		   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#rotate()
		   *
		   * @param {Number} degree
		   */
		  rotateTo: function rotateTo(degree) {
		    var self = this;
		
		    degree = Number(degree);
		
		    if ($.isNumber(degree) && self.ready && !self.disabled && self.options.rotatable) {
		      self.imageData.rotate = degree % 360;
		      self.rotated = true;
		      self.renderCanvas(true);
		    }
		
		    return self;
		  },
		
		
		  /**
		   * Scale the image
		   * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#scale()
		   *
		   * @param {Number} scaleX
		   * @param {Number} scaleY (optional)
		   */
		  scale: function scale(scaleX, scaleY) {
		    var self = this;
		    var imageData = self.imageData;
		    var changed = false;
		
		    // If "scaleY" is not present, its default value is "scaleX"
		    if ($.isUndefined(scaleY)) {
		      scaleY = scaleX;
		    }
		
		    scaleX = Number(scaleX);
		    scaleY = Number(scaleY);
		
		    if (self.ready && !self.disabled && self.options.scalable) {
		      if ($.isNumber(scaleX)) {
		        imageData.scaleX = scaleX;
		        changed = true;
		      }
		
		      if ($.isNumber(scaleY)) {
		        imageData.scaleY = scaleY;
		        changed = true;
		      }
		
		      if (changed) {
		        self.renderImage(true);
		      }
		    }
		
		    return self;
		  },
		
		
		  /**
		   * Scale the abscissa of the image
		   *
		   * @param {Number} scaleX
		   */
		  scaleX: function scaleX(_scaleX) {
		    var self = this;
		    var scaleY = self.imageData.scaleY;
		
		    return self.scale(_scaleX, $.isNumber(scaleY) ? scaleY : 1);
		  },
		
		
		  /**
		   * Scale the ordinate of the image
		   *
		   * @param {Number} scaleY
		   */
		  scaleY: function scaleY(_scaleY) {
		    var self = this;
		    var scaleX = self.imageData.scaleX;
		
		    return self.scale($.isNumber(scaleX) ? scaleX : 1, _scaleY);
		  },
		
		
		  /**
		   * Get the cropped area position and size data (base on the original image)
		   *
		   * @param {Boolean} rounded (optional)
		   * @return {Object} data
		   */
		  getData: function getData(rounded) {
		    var self = this;
		    var options = self.options;
		    var imageData = self.imageData;
		    var canvasData = self.canvasData;
		    var cropBoxData = self.cropBoxData;
		    var ratio = void 0;
		    var data = void 0;
		
		    if (self.ready && self.cropped) {
		      data = {
		        x: cropBoxData.left - canvasData.left,
		        y: cropBoxData.top - canvasData.top,
		        width: cropBoxData.width,
		        height: cropBoxData.height
		      };
		
		      ratio = imageData.width / imageData.naturalWidth;
		
		      $.each(data, function (n, i) {
		        n /= ratio;
		        data[i] = rounded ? Math.round(n) : n;
		      });
		    } else {
		      data = {
		        x: 0,
		        y: 0,
		        width: 0,
		        height: 0
		      };
		    }
		
		    if (options.rotatable) {
		      data.rotate = imageData.rotate || 0;
		    }
		
		    if (options.scalable) {
		      data.scaleX = imageData.scaleX || 1;
		      data.scaleY = imageData.scaleY || 1;
		    }
		
		    return data;
		  },
		
		
		  /**
		   * Set the cropped area position and size with new data
		   *
		   * @param {Object} data
		   */
		  setData: function setData(data) {
		    var self = this;
		    var options = self.options;
		    var imageData = self.imageData;
		    var canvasData = self.canvasData;
		    var cropBoxData = {};
		    var rotated = void 0;
		    var scaled = void 0;
		    var ratio = void 0;
		
		    if ($.isFunction(data)) {
		      data = data.call(self.element);
		    }
		
		    if (self.ready && !self.disabled && $.isPlainObject(data)) {
		      if (options.rotatable) {
		        if ($.isNumber(data.rotate) && data.rotate !== imageData.rotate) {
		          imageData.rotate = data.rotate;
		          self.rotated = rotated = true;
		        }
		      }
		
		      if (options.scalable) {
		        if ($.isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
		          imageData.scaleX = data.scaleX;
		          scaled = true;
		        }
		
		        if ($.isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
		          imageData.scaleY = data.scaleY;
		          scaled = true;
		        }
		      }
		
		      if (rotated) {
		        self.renderCanvas();
		      } else if (scaled) {
		        self.renderImage();
		      }
		
		      ratio = imageData.width / imageData.naturalWidth;
		
		      if ($.isNumber(data.x)) {
		        cropBoxData.left = data.x * ratio + canvasData.left;
		      }
		
		      if ($.isNumber(data.y)) {
		        cropBoxData.top = data.y * ratio + canvasData.top;
		      }
		
		      if ($.isNumber(data.width)) {
		        cropBoxData.width = data.width * ratio;
		      }
		
		      if ($.isNumber(data.height)) {
		        cropBoxData.height = data.height * ratio;
		      }
		
		      self.setCropBoxData(cropBoxData);
		    }
		
		    return self;
		  },
		
		
		  /**
		   * Get the container size data
		   *
		   * @return {Object} data
		   */
		  getContainerData: function getContainerData() {
		    var self = this;
		
		    return self.ready ? self.containerData : {};
		  },
		
		
		  /**
		   * Get the image position and size data
		   *
		   * @return {Object} data
		   */
		  getImageData: function getImageData() {
		    var self = this;
		
		    return self.loaded ? self.imageData : {};
		  },
		
		
		  /**
		   * Get the canvas position and size data
		   *
		   * @return {Object} data
		   */
		  getCanvasData: function getCanvasData() {
		    var self = this;
		    var canvasData = self.canvasData;
		    var data = {};
		
		    if (self.ready) {
		      $.each(['left', 'top', 'width', 'height', 'naturalWidth', 'naturalHeight'], function (n) {
		        data[n] = canvasData[n];
		      });
		    }
		
		    return data;
		  },
		
		
		  /**
		   * Set the canvas position and size with new data
		   *
		   * @param {Object} data
		   */
		  setCanvasData: function setCanvasData(data) {
		    var self = this;
		    var canvasData = self.canvasData;
		    var aspectRatio = canvasData.aspectRatio;
		
		    if ($.isFunction(data)) {
		      data = data.call(self.element);
		    }
		
		    if (self.ready && !self.disabled && $.isPlainObject(data)) {
		      if ($.isNumber(data.left)) {
		        canvasData.left = data.left;
		      }
		
		      if ($.isNumber(data.top)) {
		        canvasData.top = data.top;
		      }
		
		      if ($.isNumber(data.width)) {
		        canvasData.width = data.width;
		        canvasData.height = data.width / aspectRatio;
		      } else if ($.isNumber(data.height)) {
		        canvasData.height = data.height;
		        canvasData.width = data.height * aspectRatio;
		      }
		
		      self.renderCanvas(true);
		    }
		
		    return self;
		  },
		
		
		  /**
		   * Get the crop box position and size data
		   *
		   * @return {Object} data
		   */
		  getCropBoxData: function getCropBoxData() {
		    var self = this;
		    var cropBoxData = self.cropBoxData;
		    var data = void 0;
		
		    if (self.ready && self.cropped) {
		      data = {
		        left: cropBoxData.left,
		        top: cropBoxData.top,
		        width: cropBoxData.width,
		        height: cropBoxData.height
		      };
		    }
		
		    return data || {};
		  },
		
		
		  /**
		   * Set the crop box position and size with new data
		   *
		   * @param {Object} data
		   */
		  setCropBoxData: function setCropBoxData(data) {
		    var self = this;
		    var cropBoxData = self.cropBoxData;
		    var aspectRatio = self.options.aspectRatio;
		    var widthChanged = void 0;
		    var heightChanged = void 0;
		
		    if ($.isFunction(data)) {
		      data = data.call(self.element);
		    }
		
		    if (self.ready && self.cropped && !self.disabled && $.isPlainObject(data)) {
		      if ($.isNumber(data.left)) {
		        cropBoxData.left = data.left;
		      }
		
		      if ($.isNumber(data.top)) {
		        cropBoxData.top = data.top;
		      }
		
		      if ($.isNumber(data.width)) {
		        widthChanged = true;
		        cropBoxData.width = data.width;
		      }
		
		      if ($.isNumber(data.height)) {
		        heightChanged = true;
		        cropBoxData.height = data.height;
		      }
		
		      if (aspectRatio) {
		        if (widthChanged) {
		          cropBoxData.height = cropBoxData.width / aspectRatio;
		        } else if (heightChanged) {
		          cropBoxData.width = cropBoxData.height * aspectRatio;
		        }
		      }
		
		      self.renderCropBox();
		    }
		
		    return self;
		  },
		
		
		  /**
		   * Get a canvas drawn the cropped image
		   *
		   * @param {Object} options (optional)
		   * @return {HTMLCanvasElement} canvas
		   */
		  getCroppedCanvas: function getCroppedCanvas(options) {
		    var self = this;
		
		    if (!self.ready || !window.HTMLCanvasElement) {
		      return null;
		    }
		
		    // Return the whole canvas if not cropped
		    if (!self.cropped) {
		      return $.getSourceCanvas(self.image, self.imageData);
		    }
		
		    if (!$.isPlainObject(options)) {
		      options = {};
		    }
		
		    var data = self.getData();
		    var originalWidth = data.width;
		    var originalHeight = data.height;
		    var aspectRatio = originalWidth / originalHeight;
		    var scaledWidth = void 0;
		    var scaledHeight = void 0;
		    var scaledRatio = void 0;
		
		    if ($.isPlainObject(options)) {
		      scaledWidth = options.width;
		      scaledHeight = options.height;
		
		      if (scaledWidth) {
		        scaledHeight = scaledWidth / aspectRatio;
		        scaledRatio = scaledWidth / originalWidth;
		      } else if (scaledHeight) {
		        scaledWidth = scaledHeight * aspectRatio;
		        scaledRatio = scaledHeight / originalHeight;
		      }
		    }
		
		    // The canvas element will use `Math.floor` on a float number, so floor first
		    var canvasWidth = Math.floor(scaledWidth || originalWidth);
		    var canvasHeight = Math.floor(scaledHeight || originalHeight);
		
		    var canvas = $.createElement('canvas');
		    var context = canvas.getContext('2d');
		
		    canvas.width = canvasWidth;
		    canvas.height = canvasHeight;
		
		    if (options.fillColor) {
		      context.fillStyle = options.fillColor;
		      context.fillRect(0, 0, canvasWidth, canvasHeight);
		    }
		
		    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
		    var parameters = function () {
		      var source = $.getSourceCanvas(self.image, self.imageData);
		      var sourceWidth = source.width;
		      var sourceHeight = source.height;
		      var canvasData = self.canvasData;
		      var params = [source];
		
		      // Source canvas
		      var srcX = data.x + canvasData.naturalWidth * (Math.abs(data.scaleX || 1) - 1) / 2;
		      var srcY = data.y + canvasData.naturalHeight * (Math.abs(data.scaleY || 1) - 1) / 2;
		      var srcWidth = void 0;
		      var srcHeight = void 0;
		
		      // Destination canvas
		      var dstX = void 0;
		      var dstY = void 0;
		      var dstWidth = void 0;
		      var dstHeight = void 0;
		
		      if (srcX <= -originalWidth || srcX > sourceWidth) {
		        srcX = srcWidth = dstX = dstWidth = 0;
		      } else if (srcX <= 0) {
		        dstX = -srcX;
		        srcX = 0;
		        srcWidth = dstWidth = Math.min(sourceWidth, originalWidth + srcX);
		      } else if (srcX <= sourceWidth) {
		        dstX = 0;
		        srcWidth = dstWidth = Math.min(originalWidth, sourceWidth - srcX);
		      }
		
		      if (srcWidth <= 0 || srcY <= -originalHeight || srcY > sourceHeight) {
		        srcY = srcHeight = dstY = dstHeight = 0;
		      } else if (srcY <= 0) {
		        dstY = -srcY;
		        srcY = 0;
		        srcHeight = dstHeight = Math.min(sourceHeight, originalHeight + srcY);
		      } else if (srcY <= sourceHeight) {
		        dstY = 0;
		        srcHeight = dstHeight = Math.min(originalHeight, sourceHeight - srcY);
		      }
		
		      params.push(Math.floor(srcX), Math.floor(srcY), Math.floor(srcWidth), Math.floor(srcHeight));
		
		      // Scale destination sizes
		      if (scaledRatio) {
		        dstX *= scaledRatio;
		        dstY *= scaledRatio;
		        dstWidth *= scaledRatio;
		        dstHeight *= scaledRatio;
		      }
		
		      // Avoid "IndexSizeError" in IE and Firefox
		      if (dstWidth > 0 && dstHeight > 0) {
		        params.push(Math.floor(dstX), Math.floor(dstY), Math.floor(dstWidth), Math.floor(dstHeight));
		      }
		
		      return params;
		    }();
		
		    context.drawImage.apply(context, _toConsumableArray(parameters));
		
		    return canvas;
		  },
		
		
		  /**
		   * Change the aspect ratio of the crop box
		   *
		   * @param {Number} aspectRatio
		   */
		  setAspectRatio: function setAspectRatio(aspectRatio) {
		    var self = this;
		    var options = self.options;
		
		    if (!self.disabled && !$.isUndefined(aspectRatio)) {
		      // 0 -> NaN
		      options.aspectRatio = Math.max(0, aspectRatio) || NaN;
		
		      if (self.ready) {
		        self.initCropBox();
		
		        if (self.cropped) {
		          self.renderCropBox();
		        }
		      }
		    }
		
		    return self;
		  },
		
		
		  /**
		   * Change the drag mode
		   *
		   * @param {String} mode (optional)
		   */
		  setDragMode: function setDragMode(mode) {
		    var self = this;
		    var options = self.options;
		    var dragBox = self.dragBox;
		    var face = self.face;
		    var croppable = void 0;
		    var movable = void 0;
		
		    if (self.loaded && !self.disabled) {
		      croppable = mode === 'crop';
		      movable = options.movable && mode === 'move';
		      mode = croppable || movable ? mode : 'none';
		
		      $.setData(dragBox, 'action', mode);
		      $.toggleClass(dragBox, 'cropper-crop', croppable);
		      $.toggleClass(dragBox, 'cropper-move', movable);
		
		      if (!options.cropBoxMovable) {
		        // Sync drag mode to crop box when it is not movable
		        $.setData(face, 'action', mode);
		        $.toggleClass(face, 'cropper-crop', croppable);
		        $.toggleClass(face, 'cropper-move', movable);
		      }
		    }
		
		    return self;
		  }
		};

	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=cropper.js.map

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(37));

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = undefined && undefined.__metadata || function (k, v) {
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var dropzone_1 = __webpack_require__(26);
	var index_1 = __webpack_require__(31);
	var views_form_1 = __webpack_require__(38);
	var views_1 = __webpack_require__(15);
	var index_2 = __webpack_require__(22);
	var orange_dom_1 = __webpack_require__(16);
	var orange_1 = __webpack_require__(5);
	var index_3 = __webpack_require__(18);
	var circular_progress_1 = __webpack_require__(21);
	;
	/**
	 *
	 *
	 * @export
	 * @class CropEditor
	 * @extends {BaseEditor<HTMLDivElement, CropResult>}
	 */
	var CropEditor = function (_views_form_1$BaseEdi) {
	    _inherits(CropEditor, _views_form_1$BaseEdi);

	    /**
	     * Creates an instance of CropEditor.
	     *
	     * @param {CropEditorOptions} options
	     *
	     * @memberOf CropEditor
	     */
	    function CropEditor(options) {
	        _classCallCheck(this, CropEditor);

	        var _this = _possibleConstructorReturn(this, (CropEditor.__proto__ || Object.getPrototypeOf(CropEditor)).call(this, options));

	        _this.options = options = _this._getOptions(orange_1.extend({}, options));
	        options.root = options.root || '/';
	        var client = options.client;
	        if (client == null) {
	            throw new Error("no client");
	        }
	        _this.modal = new index_2.GalleryModal({
	            client: client,
	            showDirectories: false,
	            accept: ["image/*"],
	            mode: _this.options.mode,
	            maxSize: _this.options.maxSize,
	            uploader: _this.options.uploader,
	            root: _this.options.root
	        });
	        _this.drop = new dropzone_1.DropZone({
	            el: _this.el,
	            uploader: _this.modal.gallery.uploader,
	            path: options.root,
	            mode: _this.options.mode
	        });
	        _this.progress = new circular_progress_1.Progress({
	            size: 100,
	            lineWidth: 5
	        });
	        var o = orange_1.extend({
	            zoomable: false,
	            scalable: false,
	            autoCropArea: 0.6,
	            resize: true,
	            progress: _this.progress
	        }, orange_1.omit(_this.options, ['el']));
	        _this.crop = new index_1.CropView(o);
	        _this.preview = new index_1.CropPreView({
	            el: _this.crop.el
	        });
	        _this.crop.options.previewView = _this.preview;
	        _this.listenTo(_this.modal, 'selected', _this._onFileSelected);
	        var up = _this.modal.gallery.uploader;
	        _this.listenTo(up, 'started', function (e) {
	            _this.clear();
	            _this._removeDropIndicator();
	            _this.progress.setPercent(0);
	            _this.progress.show();
	        });
	        _this.listenTo(up, 'progress', function (e) {
	            var pc = 100 / e.total * e.loaded;
	            _this.progress.setPercent(pc);
	        });
	        _this.listenTo(up, 'done', function (file) {
	            _this.progress.hide();
	            _this.value = {
	                file: file,
	                cropping: null
	            };
	        });
	        _this.listenTo(up, 'error', function (e) {
	            _this.progress.hide();
	            _this.crop.showMessage(e.message);
	            setTimeout(function () {
	                _this._showDropIndicator();
	            }, 4000);
	        });
	        _this.listenTo(_this.crop, 'error', function () {
	            setTimeout(function () {
	                return _this._showDropIndicator();
	            }, 4000);
	        });
	        _this.listenTo(_this.drop, 'before:drop', function () {
	            _this.model = null;
	            _this.crop.hideMessage();
	        });
	        _this.progress.hide();
	        return _this;
	    }
	    /**
	     *
	     *
	     * @returns {CropResult}
	     *
	     * @memberOf CropEditor
	     */


	    _createClass(CropEditor, [{
	        key: "getValue",
	        value: function getValue() {
	            if (!this.model) return null;
	            return {
	                file: this.model,
	                cropping: this.crop.cropping
	            };
	        }
	        /**
	         *
	         *
	         * @param {CropResult} result
	         * @returns
	         *
	         * @memberOf CropEditor
	         */

	    }, {
	        key: "setValue",
	        value: function setValue(result) {
	            if (result == null) {
	                this.model = null;
	                return;
	            }
	            //console.log('set value', this.crop.cropping, result.cropping);
	            if (result.file !== this.model) {
	                this.model = result.file;
	            }
	            if (!orange_1.equal(result.cropping, this.crop.cropping)) {
	                this.crop.cropping = result.cropping;
	            }
	        }
	        /**
	         *
	         *
	         * @param {FileInfoModel} model
	         *
	         * @memberOf CropEditor
	         */

	    }, {
	        key: "onModel",
	        value: function onModel(model) {
	            if (model) this._removeDropIndicator();
	            this._toggled = false;
	            orange_dom_1.Html.query('.crop-btn').removeClass('active');
	            this.crop.model = model;
	        }
	        /**
	         *
	         *
	         *
	         * @memberOf CropEditor
	         */

	    }, {
	        key: "onSetElement",
	        value: function onSetElement() {
	            this.options = this._getOptions(this.options);
	        }
	        /**
	         * Parse options options and the element
	         *
	         * @private
	         * @param {CropEditorOptions} options
	         * @returns {CropEditorOptions}
	         *
	         * @memberOf CropEditor
	         */

	    }, {
	        key: "_getOptions",
	        value: function _getOptions(options) {
	            var _this2 = this;

	            ['host', 'maxSize', 'mimeType', 'ratio', 'cropping'].forEach(function (m) {
	                var l = m.toLowerCase();
	                var attr = _this2.el.getAttribute(l); // || this.el.getAttribute('o-' + l);
	                if (attr == null) {
	                    return;
	                } else if (attr == "") attr = true;
	                if (m == 'ratio') {
	                    m = 'aspectRatio';
	                    attr = parseFloat(attr);
	                } else if (m == 'maxSize') {
	                    attr = parseInt(attr);
	                }
	                options[m] = attr;
	            });
	            return options;
	        }
	    }, {
	        key: "onRender",
	        value: function onRender() {
	            this.ui['modal'].appendChild(this.modal.render().el);
	            if (this.crop) {
	                this.ui['crop'].appendChild(this.crop.render().el);
	                orange_dom_1.addClass(this.crop.el, 'crop-preview cropping-preview');
	                orange_dom_1.addClass(this.crop.ui['image'], 'content');
	            }
	            this.preview.render();
	            this.drop.render();
	            this.crop.el.appendChild(this.progress.render().el);
	        }
	        /**
	         *
	         *
	         *
	         * @memberOf CropEditor
	         */

	    }, {
	        key: "clear",
	        value: function clear() {
	            this.model = null;
	            this.crop.showMessage("Drag'n'Drop image here");
	        }
	    }, {
	        key: "_showDropIndicator",
	        value: function _showDropIndicator() {
	            this.crop.showMessage("Drag'n'Drop image here");
	        }
	    }, {
	        key: "_removeDropIndicator",
	        value: function _removeDropIndicator() {
	            this.crop.hideMessage();
	        }
	        /*private _showError(e) {
	            this._removeDropIndicator();
	            let i = <HTMLDivElement>this.crop.el.querySelector('.error');
	            if (!i) {
	                i = document.createElement('div')
	                addClass(i, "error");
	                this.crop.el.appendChild(i);
	            }
	             i.innerHTML = `
	                <h3>Could not upload image!</h3>
	                <p>${e.message}</p>
	            `;
	        }
	         private _removeError() {
	            let i = <HTMLDivElement>this.crop.el.querySelector('.error')
	            if (i && i.parentElement) {
	                this.crop.el.removeChild(i);
	            }
	        }*/

	    }, {
	        key: "_onToggleCropper",
	        value: function _onToggleCropper(e) {
	            e.preventDefault();
	            if (this.model == null) return;
	            this.crop.toggle();
	            this._toggled = !this._toggled;
	            if (this._toggled) {
	                orange_dom_1.addClass(e.target, 'active');
	            } else {
	                orange_dom_1.removeClass(e.target, 'active');
	                this.triggerMethod('change');
	            }
	        }
	        /**
	         * Called when a file is selected in the gallery modal
	         * @memberOf CropEditor
	         */

	    }, {
	        key: "_onFileSelected",
	        value: function _onFileSelected(model) {
	            this.model = model;
	            this.trigger('change');
	        }
	    }, {
	        key: "_onUploadBtnChanged",
	        value: function _onUploadBtnChanged(e) {
	            var target = e.target;
	            var uploader = this._getUploader();
	            var file = target.files.item(0);
	            if (!file) return;
	            uploader.upload(this.options.root, file, {
	                mode: this.options.mode
	            });
	        }
	    }, {
	        key: "_getUploader",
	        value: function _getUploader() {
	            return this.options.uploader || this.modal.gallery.uploader;
	        }
	        /**
	         *
	         *
	         * @memberOf CropEditor
	         */

	    }, {
	        key: "destroy",
	        value: function destroy() {
	            if (this.crop.options.previewView) {
	                this.crop.options.previewView.destroy();
	            }
	            this.crop.destroy();
	            this.modal.destroy();
	            this.drop.destroy();
	            this.progress.destroy();
	        }
	    }]);

	    return CropEditor;
	}(views_form_1.BaseEditor);
	CropEditor = __decorate([views_1.attributes({
	    template: function template() {
	        return index_3.default['crop-editor'];
	    },
	    ui: {
	        modal: '.modal-container',
	        crop: '.crop-container'
	    },
	    events: {
	        'click .gallery-btn': function clickGalleryBtn(e) {
	            e.preventDefault();
	            this.modal.toggle();
	        },
	        'change input.upload-btn': '_onUploadBtnChanged',
	        'click .crop-btn': '_onToggleCropper'
	    }
	}), views_form_1.editor('torsten.crop'), __metadata("design:paramtypes", [Object])], CropEditor);
	exports.CropEditor = CropEditor;

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_38__;

/***/ }
/******/ ])
});
;