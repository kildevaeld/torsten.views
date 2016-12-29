(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["views"] = factory();
	else
		root["torsten"] = root["torsten"] || {}, root["torsten"]["views"] = factory();
})(this, function() {
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
	__export(__webpack_require__(46));
	__export(__webpack_require__(67));
	__export(__webpack_require__(76));
	__export(__webpack_require__(74));
	__export(__webpack_require__(81));
	var torsten_1 = __webpack_require__(30);
	function createClient(options) {
	    return new torsten_1.TorstenClient(options);
	}
	exports.createClient = createClient;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var collection_1 = __webpack_require__(2);
	var error_1 = __webpack_require__(29);
	var orange_1 = __webpack_require__(6);
	var torsten_1 = __webpack_require__(30);
	var orange_request_1 = __webpack_require__(19);
	var download_1 = __webpack_require__(41);
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(3));
	__export(__webpack_require__(14));
	__export(__webpack_require__(15));
	__export(__webpack_require__(16));
	__export(__webpack_require__(17));
	__export(__webpack_require__(28));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var object_1 = __webpack_require__(4);
	var model_1 = __webpack_require__(14);
	var orange_1 = __webpack_require__(6);
	function isCollection(a) {
	    if (a == null)
	        return false;
	    return (a instanceof Collection) || a.__classType == 'Collection' || a.__classType == 'RestCollection';
	}
	exports.isCollection = isCollection;
	var setOptions = { add: true, remove: true, merge: true };
	var addOptions = { add: true, remove: false };
	var Collection = (function (_super) {
	    __extends(Collection, _super);
	    function Collection(models, options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this);
	        this.options = options;
	        if (this.options.model) {
	            this.Model = this.options.model;
	        }
	        if (models) {
	            this.add(models);
	        }
	    }
	    Object.defineProperty(Collection.prototype, "__classType", {
	        get: function () { return 'Collection'; },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    Object.defineProperty(Collection.prototype, "length", {
	        get: function () {
	            return this.models.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Collection.prototype, "Model", {
	        get: function () {
	            if (!this._model) {
	                this._model = model_1.Model;
	            }
	            return this._model;
	        },
	        set: function (con) {
	            this._model = con;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Collection.prototype, "models", {
	        get: function () {
	            return this._models || (this._models = []);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Collection.prototype.add = function (models, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        if (!Array.isArray(models)) {
	            if (!(models instanceof this.Model)) {
	                models = this._prepareModel(models);
	            }
	        }
	        else {
	            models = models.map(function (item) {
	                return (item instanceof _this.Model) ? item : (_this._prepareModel(item));
	            });
	        }
	        this.set(models, orange_1.extend({ merge: false }, options, addOptions));
	    };
	    Collection.prototype.set = function (items, options) {
	        if (options === void 0) { options = {}; }
	        options = orange_1.extend({}, setOptions, options);
	        if (options.parse)
	            items = this.parse(items, options);
	        var singular = !Array.isArray(items);
	        var models = (singular ? (items ? [items] : []) : items.slice());
	        var i, l, id, model, attrs, existing, sort;
	        var at = options.at;
	        var sortable = this.comparator && (at == null) && options.sort !== false;
	        var sortAttr = typeof this.comparator === 'string' ? this.comparator : null;
	        var toAdd = [], toRemove = [], modelMap = {};
	        var add = options.add, merge = options.merge, remove = options.remove;
	        var order = !sortable && add && remove ? [] : null;
	        for (i = 0, l = models.length; i < l; i++) {
	            model = models[i];
	            model = this._prepareModel(model);
	            id = model.get(model.idAttribute) || model.uid;
	            if (existing = this.get(id)) {
	                if (remove)
	                    modelMap[existing.uid] = true;
	                if (merge) {
	                    attrs = model.toJSON();
	                    existing.set(attrs, options);
	                    if (sortable && !sort && existing.hasChanged(sortAttr))
	                        sort = true;
	                }
	                models[i] = existing;
	            }
	            else if (add) {
	                models[i] = model;
	                if (!model)
	                    continue;
	                toAdd.push(model);
	                this._addReference(model, options);
	            }
	            model = existing || model;
	            if (order && !modelMap[model.id])
	                order.push(model);
	            modelMap[model.uid] = true;
	        }
	        if (remove) {
	            for (i = 0, l = this.length; i < l; ++i) {
	                if (!modelMap[(model = this.models[i]).uid])
	                    toRemove.push(model);
	            }
	            if (toRemove.length)
	                this.remove(toRemove, options);
	        }
	        if (toAdd.length || (order && order.length)) {
	            if (sortable)
	                sort = true;
	            if (at != null) {
	                for (i = 0, l = toAdd.length; i < l; i++) {
	                    this.models.splice(at + i, 0, toAdd[i]);
	                }
	            }
	            else {
	                if (order)
	                    this.models.length = 0;
	                var orderedModels = order || toAdd;
	                for (i = 0, l = orderedModels.length; i < l; i++) {
	                    this.models.push(orderedModels[i]);
	                }
	            }
	        }
	        if (sort)
	            this.sort({ silent: true });
	        if (!options.silent) {
	            for (i = 0, l = toAdd.length; i < l; i++) {
	                (model = toAdd[i]).trigger('add', model, this, options);
	            }
	            if (sort || (order && order.length))
	                this.trigger('sort', this, options);
	            if (toAdd.length || toRemove.length)
	                this.trigger('update', this, options);
	        }
	        return singular ? models[0] : models;
	    };
	    Collection.prototype.remove = function (models, options) {
	        if (options === void 0) { options = {}; }
	        var singular = !Array.isArray(models);
	        models = (singular ? [models] : models.slice());
	        var i, l, index, model;
	        for (i = 0, l = models.length; i < l; i++) {
	            model = models[i] = this.get(models[i]);
	            if (!model)
	                continue;
	            index = this.indexOf(model);
	            this.models.splice(index, 1);
	            if (!options.silent) {
	                options.index = index;
	                model.trigger('remove', model, this, options);
	            }
	            this._removeReference(model, options);
	        }
	        return singular ? models[0] : models;
	    };
	    Collection.prototype.get = function (id) {
	        return this.find(id);
	    };
	    Collection.prototype.at = function (index) {
	        return this.models[index];
	    };
	    Collection.prototype.clone = function (options) {
	        options = options || this.options;
	        return new this.constructor(this.models, options);
	    };
	    Collection.prototype.sort = function (options) {
	        if (options === void 0) { options = {}; }
	        if (!this.comparator)
	            throw new Error('Cannot sort a set without a comparator');
	        if (typeof this.comparator === 'string' || this.comparator.length === 1) {
	            this._models = this.sortBy(this.comparator, this);
	        }
	        else {
	            this.models.sort(this.comparator.bind(this));
	        }
	        if (!options.silent)
	            this.trigger('sort', this, options);
	        return this;
	    };
	    Collection.prototype.sortBy = function (key, context) {
	        return orange_1.sortBy(this._models, key, context);
	    };
	    Collection.prototype.push = function (model, options) {
	        if (options === void 0) { options = {}; }
	        return this.add(model, orange_1.extend({ at: this.length }, options));
	    };
	    Collection.prototype.reset = function (models, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        this.forEach(function (model) {
	            _this._removeReference(model, options);
	        });
	        options.previousModels = this.models;
	        this._reset();
	        models = this.add(models, options);
	        if (!options.silent)
	            this.trigger('reset', this, options);
	        return models;
	    };
	    Collection.prototype.create = function (values, options) {
	        if (options === void 0) { options = { add: true }; }
	        var model = new this.Model(values, options);
	        if (options.add)
	            this.add(model);
	        return model;
	    };
	    Collection.prototype.parse = function (models, options) {
	        if (options === void 0) { options = {}; }
	        return models;
	    };
	    Collection.prototype.find = function (nidOrFn) {
	        var model;
	        if (typeof nidOrFn === 'function') {
	            model = orange_1.find(this.models, nidOrFn);
	        }
	        else {
	            model = orange_1.find(this.models, function (model) {
	                return model.id == nidOrFn || model.uid == nidOrFn || nidOrFn === model;
	            });
	        }
	        return model;
	    };
	    Collection.prototype.forEach = function (iterator, ctx) {
	        for (var i = 0, l = this.models.length; i < l; i++) {
	            iterator.call(ctx || this, this.models[i], i);
	        }
	        return this;
	    };
	    Collection.prototype.map = function (iterator, thisArgs) {
	        var out = [];
	        for (var i = 0, ii = this.length; i < ii; i++) {
	            out.push(iterator.call(thisArgs, this.models[i], i, this));
	        }
	        return out;
	    };
	    Collection.prototype.filter = function (fn) {
	        var out = [];
	        this.forEach(function (m, i) {
	            if (fn(m, i))
	                out.push(m);
	        });
	        return out;
	    };
	    Collection.prototype.indexOf = function (model) {
	        return this.models.indexOf(model);
	    };
	    Collection.prototype.toJSON = function () {
	        return this.models.map(function (m) { return m.toJSON(); });
	    };
	    Collection.prototype._prepareModel = function (value) {
	        if (model_1.isModel(value))
	            return value;
	        if (orange_1.isObject(value))
	            return new this.Model(value, { parse: true });
	        throw new Error('Value not an Object or an instance of a model, but was: ' + typeof value);
	    };
	    Collection.prototype._removeReference = function (model, options) {
	        if (this === model.collection)
	            delete model.collection;
	        this.stopListening(model);
	    };
	    Collection.prototype._addReference = function (model, options) {
	        if (!model.collection)
	            model.collection = this;
	        this.listenTo(model, 'all', this._onModelEvent);
	    };
	    Collection.prototype._reset = function () {
	        this._models = [];
	    };
	    Collection.prototype._onModelEvent = function (event, model, collection, options) {
	        if ((event === 'add' || event === 'remove') && collection !== this)
	            return;
	        if (event === 'destroy')
	            this.remove(model, options);
	        orange_1.callFunc(this.trigger, this, orange_1.slice(arguments));
	    };
	    Collection.prototype.destroy = function () {
	        var _this = this;
	        this.models.forEach(function (m) {
	            if (typeof m.destroy === 'function' &&
	                m.collection == _this)
	                m.destroy();
	        });
	        _super.prototype.destroy.call(this);
	    };
	    return Collection;
	}(object_1.BaseObject));
	exports.Collection = Collection;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var eventsjs_1 = __webpack_require__(5);
	var orange_1 = __webpack_require__(6);
	var BaseObject = (function (_super) {
	    __extends(BaseObject, _super);
	    function BaseObject() {
	        _super.apply(this, arguments);
	    }
	    BaseObject.extend = function (proto, stat) {
	        return orange_1.inherits(this, proto, stat);
	    };
	    return BaseObject;
	}(eventsjs_1.EventEmitter));
	exports.BaseObject = BaseObject;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var idCounter = 0;
	function getID() {
	    return "" + (++idCounter);
	}
	/**
	 *
	 *
	 * @export
	 * @class EventEmitterError
	 * @extends {Error}
	 */
	var EventEmitterError = (function (_super) {
	    __extends(EventEmitterError, _super);
	    /**
	     * Creates an instance of EventEmitterError.
	     *
	     * @param {string} [message]
	     * @param {string} [method]
	     * @param {*} [klass]
	     * @param {*} [ctx]
	     *
	     * @memberOf EventEmitterError
	     */
	    function EventEmitterError(message, method, klass, ctx) {
	        _super.call(this, message);
	        this.message = message;
	        this.method = method;
	        this.klass = klass;
	        this.ctx = ctx;
	    }
	    /**
	     *
	     *
	     * @returns
	     *
	     * @memberOf EventEmitterError
	     */
	    EventEmitterError.prototype.toString = function () {
	        var prefix = "EventEmitterError";
	        if (this.method && this.method != "") {
	            prefix = "EventEmitter#" + this.method;
	        }
	        return prefix + ": " + this.message;
	    };
	    return EventEmitterError;
	}(Error));
	exports.EventEmitterError = EventEmitterError;
	function removeFromListener(listeners, fn, ctx) {
	    for (var i = 0; i < listeners.length; i++) {
	        var e = listeners[i];
	        if ((fn == null && ctx != null && e.ctx === ctx) ||
	            (fn != null && ctx == null && e.handler === fn) ||
	            (fn != null && ctx != null && e.handler === fn && e.ctx === ctx)) {
	            listeners.splice(i, 1);
	        }
	    }
	    return listeners;
	}
	/**
	 *
	 *
	 * @export
	 * @param {Events[]} fn
	 * @param {any[]} [args=[]]
	 * @returns
	 */
	function callFunc(fn, args) {
	    if (args === void 0) { args = []; }
	    var l = fn.length, i = -1, a1 = args[0], a2 = args[1], a3 = args[2], a4 = args[3];
	    switch (args.length) {
	        case 0:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx);
	            return;
	        case 1:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx, a1);
	            return;
	        case 2:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx, a1, a2);
	            return;
	        case 3:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx, a1, a2, a3);
	            return;
	        case 4:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4);
	            return;
	        default:
	            while (++i < l)
	                fn[i].handler.apply(fn[i].ctx, args);
	            return;
	    }
	}
	exports.callFunc = callFunc;
	/**
	 *
	 *
	 * @export
	 * @param {*} a
	 * @returns {a is Function}
	 */
	function isFunction(a) {
	    return typeof a === 'function';
	}
	exports.isFunction = isFunction;
	/**
	 *
	 *
	 * @export
	 * @param {*} a
	 * @returns {a is EventEmitter}
	 */
	function isEventEmitter(a) {
	    return a && (a instanceof EventEmitter || (isFunction(a.on) && isFunction(a.once) && isFunction(a.off) && isFunction(a.trigger)));
	}
	exports.isEventEmitter = isEventEmitter;
	/**
	 *
	 *
	 * @export
	 * @class EventEmitter
	 * @implements {IEventEmitter}
	 * @implements {Destroyable}
	 */
	var EventEmitter = (function () {
	    function EventEmitter() {
	    }
	    Object.defineProperty(EventEmitter.prototype, "listeners", {
	        /**
	         *
	         *
	         * @readonly
	         * @type {{ [key: string]: Events[] }}
	         * @memberOf EventEmitter
	         */
	        get: function () {
	            return this._listeners;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     *
	     *
	     * @param {string} event
	     * @param {EventHandler} fn
	     * @param {*} [ctx]
	     * @param {boolean} [once=false]
	     * @returns {*}
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.on = function (event, fn, ctx, once) {
	        if (once === void 0) { once = false; }
	        var events = (this._listeners || (this._listeners = {}))[event] || (this._listeners[event] = []);
	        events.push({
	            name: event,
	            once: once,
	            handler: fn,
	            ctx: ctx || this
	        });
	        return this;
	    };
	    /**
	     *
	     *
	     * @param {string} event
	     * @param {EventHandler} fn
	     * @param {*} [ctx]
	     * @returns {*}
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.once = function (event, fn, ctx) {
	        return this.on(event, fn, ctx, true);
	    };
	    /**
	     *
	     *
	     * @param {string} [eventName]
	     * @param {EventHandler} [fn]
	     * @param {*} [ctx]
	     * @returns {*}
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.off = function (eventName, fn, ctx) {
	        this._listeners = this._listeners || {};
	        if (eventName == null && ctx == null) {
	            this._listeners = {};
	        }
	        else if (this._listeners[eventName]) {
	            var events = this._listeners[eventName];
	            if (fn == null && ctx == null) {
	                this._listeners[eventName] = [];
	            }
	            else {
	                /*for (let i = 0; i < events.length; i++) {
	                  let e = events[i];
	                  if ((fn == null && ctx != null && e.ctx === ctx) ||
	                    (fn != null && ctx == null && e.handler === fn) ||
	                    (fn != null && ctx != null && e.handler === fn && e.ctx === ctx)) {
	                    this._listeners[eventName].splice(i, 1);
	                  }
	                }*/
	                removeFromListener(events, fn, ctx);
	            }
	        }
	        else {
	            for (var en in this.listeners) {
	                var l = this.listeners[en];
	                removeFromListener(l, fn, ctx);
	            }
	        }
	        return this;
	    };
	    /**
	     *
	     *
	     * @param {string} eventName
	     * @param {...any[]} args
	     * @returns {*}
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.trigger = function (eventName) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        this._listeners = this._listeners || {};
	        var events = (this._listeners[eventName] || []).concat(this._listeners['all'] || []).concat(this._listeners["*"] || []);
	        if (EventEmitter.debugCallback)
	            EventEmitter.debugCallback(this.constructor.name, this.name, eventName, args, events);
	        var event, a, index;
	        var calls = [];
	        var alls = [];
	        for (var i = 0, ii = events.length; i < ii; i++) {
	            event = events[i];
	            a = args;
	            if (events[i].name == 'all' || events[i].name == '*') {
	                alls.push(events[i]);
	            }
	            else {
	                calls.push(events[i]);
	            }
	            if (events[i].once === true) {
	                index = this._listeners[events[i].name].indexOf(events[i]);
	                this._listeners[events[i].name].splice(index, 1);
	            }
	        }
	        if (alls.length) {
	            var a_1 = [eventName].concat(args);
	            this._executeListener(alls, a_1);
	        }
	        if (calls.length)
	            this._executeListener(calls, args);
	        return this;
	    };
	    /**
	     *
	     *
	     * @param {Events[]} func
	     * @param {any[]} [args]
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype._executeListener = function (func, args) {
	        EventEmitter.executeListenerFunction(func, args);
	    };
	    /**
	     *
	     *
	     * @param {IEventEmitter} obj
	     * @param {string} event
	     * @param {EventHandler} fn
	     * @param {*} [ctx]
	     * @param {boolean} [once=false]
	     * @returns {*}
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.listenTo = function (obj, event, fn, ctx, once) {
	        if (once === void 0) { once = false; }
	        if (!isEventEmitter(obj)) {
	            if (EventEmitter.throwOnError)
	                throw new EventEmitterError("obj is not an EventEmitter", once ? "listenToOnce" : "listenTo", this, obj);
	            return this;
	        }
	        var listeningTo, id, meth;
	        listeningTo = this._listeningTo || (this._listeningTo = {});
	        id = obj.listenId || (obj.listenId = getID());
	        listeningTo[id] = obj;
	        meth = once ? 'once' : 'on';
	        obj[meth](event, fn, this);
	        return this;
	    };
	    /**
	     *
	     *
	     * @param {IEventEmitter} obj
	     * @param {string} event
	     * @param {EventHandler} fn
	     * @param {*} [ctx]
	     * @returns {*}
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.listenToOnce = function (obj, event, fn, ctx) {
	        return this.listenTo(obj, event, fn, ctx, true);
	    };
	    /**
	     *
	     *
	     * @param {IEventEmitter} [obj]
	     * @param {string} [event]
	     * @param {EventHandler} [callback]
	     * @returns
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.stopListening = function (obj, event, callback) {
	        if (obj && !isEventEmitter(obj)) {
	            if (EventEmitter.throwOnError)
	                throw new EventEmitterError("obj is not an EventEmitter", "stopListening", this, obj);
	            return this;
	        }
	        var listeningTo = this._listeningTo;
	        if (!listeningTo)
	            return this;
	        var remove = !event && !callback;
	        if (!callback && typeof event === 'object')
	            callback = this;
	        if (obj)
	            (listeningTo = {})[obj.listenId] = obj;
	        for (var id in listeningTo) {
	            obj = listeningTo[id];
	            obj.off(event, callback, this);
	            if (remove || !Object.keys(obj.listeners).length)
	                delete this._listeningTo[id];
	        }
	        return this;
	    };
	    /**
	     *
	     *
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.prototype.destroy = function () {
	        this.stopListening();
	        this.off();
	    };
	    /**
	     *
	     *
	     * @static
	     * @type {boolean}
	     * @memberOf EventEmitter
	     */
	    EventEmitter.throwOnError = true;
	    /**
	     *
	     *
	     * @static
	     *
	     * @memberOf EventEmitter
	     */
	    EventEmitter.executeListenerFunction = function (func, args) {
	        callFunc(func, args);
	    };
	    return EventEmitter;
	}());
	exports.EventEmitter = EventEmitter;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(7));
	__export(__webpack_require__(8));
	__export(__webpack_require__(11));
	__export(__webpack_require__(9));
	__export(__webpack_require__(12));
	__export(__webpack_require__(10));
	__export(__webpack_require__(13));

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function isObject(obj) {
	    return obj === Object(obj);
	}
	exports.isObject = isObject;
	function isString(a) {
	    return typeof a === 'string';
	}
	exports.isString = isString;
	function isNumber(a) {
	    return typeof a === 'number';
	}
	exports.isNumber = isNumber;
	function isRegExp(a) {
	    return a && a instanceof RegExp;
	}
	exports.isRegExp = isRegExp;
	function isDate(a) {
	    return a && a instanceof Date;
	}
	exports.isDate = isDate;
	function isArray(a) {
	    return Array.isArray(a);
	}
	exports.isArray = isArray;
	function isFunction(a) {
	    return typeof a === 'function';
	}
	exports.isFunction = isFunction;
	var idCounter = 0;
	/** Generate an unique id with an optional prefix
	 * @param { string } prefix
	 * @return { string }
	 */
	function uniqueId() {
	    var prefix = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	    return prefix + ++idCounter;
	}
	exports.uniqueId = uniqueId;
	function equal(a, b) {
	    return eq(a, b, [], []);
	}
	exports.equal = equal;
	function getOption(option, objs) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = objs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var o = _step.value;

	            if (isObject(o) && o[option]) return o[option];
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return null;
	}
	exports.getOption = getOption;
	exports.nextTick = function () {
	    var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
	    var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
	    if (canSetImmediate) {
	        return function (f) {
	            return window.setImmediate(f);
	        };
	    }
	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	}();
	function xmlHttpRequest() {
	    var e;
	    if (window.hasOwnProperty('XMLHttpRequest')) {
	        return new XMLHttpRequest();
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp.6.0');
	    } catch (_error) {
	        e = _error;
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp.3.0');
	    } catch (_error) {
	        e = _error;
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp');
	    } catch (_error) {
	        e = _error;
	    }
	    throw e;
	}
	exports.xmlHttpRequest = xmlHttpRequest;
	var _has = Object.prototype.hasOwnProperty;
	function eq(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a == 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    //if (a instanceof _) a = a._wrapped;
	    //if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className != toString.call(b)) return false;
	    switch (className) {
	        // Strings, numbers, dates, and booleans are compared by value.
	        case '[object String]':
	            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	            // equivalent to `new String("5")`.
	            return a == String(b);
	        case '[object Number]':
	            // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
	            // other numeric values.
	            return a !== +a ? b !== +b : a === 0 ? 1 / a === 1 / b : a === +b;
	        case '[object Date]':
	        case '[object Boolean]':
	            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	            // millisecond representations. Note that invalid dates with millisecond representations
	            // of `NaN` are not equivalent.
	            return +a == +b;
	        // RegExps are compared by their source patterns and flags.
	        case '[object RegExp]':
	            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
	    }
	    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	    var length = aStack.length;
	    while (length--) {
	        // Linear search. Performance is inversely proportional to the number of
	        // unique nested structures.
	        if (aStack[length] == a) return bStack[length] == b;
	    }
	    // Objects with different constructors are not equivalent, but `Object`s
	    // from different frames are.
	    var aCtor = a.constructor,
	        bCtor = b.constructor;
	    if (aCtor !== bCtor && !(typeof aCtor === 'function' && aCtor instanceof aCtor && typeof bCtor === 'function' && bCtor instanceof bCtor)) {
	        return false;
	    }
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	    var size = 0,
	        result = true;
	    // Recursively compare objects and arrays.
	    if (className === '[object Array]') {
	        // Compare array lengths to determine if a deep comparison is necessary.
	        size = a.length;
	        result = size === b.length;
	        if (result) {
	            // Deep compare the contents, ignoring non-numeric properties.
	            while (size--) {
	                if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	            }
	        }
	    } else {
	        // Deep compare objects.
	        for (var key in a) {
	            if (_has.call(a, key)) {
	                // Count the expected number of properties.
	                size++;
	                // Deep compare each member.
	                if (!(result = _has.call(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	            }
	        }
	        // Ensure that both objects contain the same number of properties.
	        if (result) {
	            for (key in b) {
	                if (_has.call(b, key) && !size--) break;
	            }
	            result = !size;
	        }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return result;
	}
	;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var arrays_1 = __webpack_require__(9);
	var strings_1 = __webpack_require__(10);
	var objects_1 = __webpack_require__(11);
	var nativeBind = Function.prototype.bind;
	function proxy(from, to, fns) {
	    if (!Array.isArray(fns)) fns = [fns];
	    fns.forEach(function (fn) {
	        if (typeof to[fn] === 'function') {
	            from[fn] = bind(to[fn], to);
	        }
	    });
	}
	exports.proxy = proxy;
	function bind(method, context) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
	    }

	    if (typeof method !== 'function') throw new Error('method not at function');
	    if (nativeBind != null) return nativeBind.call.apply(nativeBind, [method, context].concat(_toConsumableArray(args)));
	    args = args || [];
	    var fnoop = function fnoop() {};
	    var fBound = function fBound() {
	        var ctx = this instanceof fnoop ? this : context;
	        return callFunc(method, ctx, args.concat(arrays_1.slice(arguments)));
	    };
	    fnoop.prototype = this.prototype;
	    fBound.prototype = new fnoop();
	    return fBound;
	}
	exports.bind = bind;
	function callFunc(fn, ctx) {
	    var args = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	    switch (args.length) {
	        case 0:
	            return fn.call(ctx);
	        case 1:
	            return fn.call(ctx, args[0]);
	        case 2:
	            return fn.call(ctx, args[0], args[1]);
	        case 3:
	            return fn.call(ctx, args[0], args[1], args[2]);
	        case 4:
	            return fn.call(ctx, args[0], args[1], args[2], args[3]);
	        case 5:
	            return fn.call(ctx, args[0], args[1], args[2], args[3], args[4]);
	        default:
	            return fn.apply(ctx, args);
	    }
	}
	exports.callFunc = callFunc;
	function triggerMethodOn(obj, eventName, args) {
	    var ev = strings_1.camelcase("on-" + eventName.replace(':', '-'));
	    if (obj[ev] && typeof obj[ev] === 'function') {
	        callFunc(obj[ev], obj, args);
	    }
	    if (typeof obj.trigger === 'function') {
	        args = [eventName].concat(args);
	        callFunc(obj.trigger, obj, args);
	    }
	}
	exports.triggerMethodOn = triggerMethodOn;
	function inherits(parent, protoProps, staticProps) {
	    var child;
	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent's constructor.
	    if (protoProps && objects_1.has(protoProps, 'constructor')) {
	        child = protoProps.constructor;
	    } else {
	        child = function child() {
	            return parent.apply(this, arguments);
	        };
	    }
	    // Add static properties to the constructor function, if supplied.
	    objects_1.extend(child, parent, staticProps);
	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent`'s constructor function.
	    var Surrogate = function Surrogate() {
	        this.constructor = child;
	    };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    // Add prototype properties (instance properties) to the subclass,
	    // if supplied.
	    if (protoProps) objects_1.extend(child.prototype, protoProps);
	    // Set a convenience property in case the parent's prototype is needed
	    // later.
	    child.__super__ = parent.prototype;
	    return child;
	}
	exports.inherits = inherits;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	/*class KeyValuePair<K, V> {
	    key: K;
	    value: V;
	    constructor(key: K, value: V) {
	        this.key = key;
	        this.value = value;
	    }
	}
	export class Map<K, V> { // class MapDDD<K,V> implements Map
	    // -------------- Fields -----------------------
	    private keyAndValues: Array<KeyValuePair<K, V>>;
	    // ---------------------------------------------
	    constructor() {
	        this.keyAndValues = [];
	    }
	    // --- Public Methods ---
	    getKeysOfValue(value: V) {
	        var keysToReturn: Array<K> = [];
	        var valueToFind = value;
	        this.keyAndValues.forEach(function (value: KeyValuePair<K, V>, index: number, array: KeyValuePair<K, V>[]): void {
	            if (value.value === valueToFind) {
	                keysToReturn.push(value.key);
	            }
	        });
	        return keysToReturn;
	    }

	    // Standard:
	    clear(): void {
	        this.keyAndValues = [];
	    }
	    delete(key: K): boolean {
	        var found = false;
	        this.keyAndValues.forEach(function (value: KeyValuePair<K, V>, index: number, array: KeyValuePair<K, V>[]): void {
	            if (found) return;
	            if (key === value.key) {
	                array = array.slice(0, index).concat(array.slice(index + 1));
	                found = true;
	            }
	        });
	        return found;
	    }
	    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
	        this.keyAndValues.forEach(function (value: KeyValuePair<K, V>, index: number, array: KeyValuePair<K, V>[]): void {
	            callbackfn.apply(thisArg, [value.value, value.key, this]);
	        }, this);
	    }
	    get(key: K): V {
	        var valueToReturn: V = undefined;
	        this.keyAndValues.forEach(function (value: KeyValuePair<K, V>, index: number, array: KeyValuePair<K, V>[]): void {
	            if (valueToReturn !== undefined) return;
	            if (key === value.key) {
	                valueToReturn = value.value;
	            }
	        });
	        return valueToReturn;
	    }
	    has(key: K): boolean {
	        var found = false;
	        this.keyAndValues.forEach(function (value: KeyValuePair<K, V>, index: number, array: KeyValuePair<K, V>[]): void {
	            if (found) return;
	            if (key === value.key) {
	                found = true;
	            }
	        });
	        return found;
	    }
	    set(key: K, value: V): Map<K, V> {
	        var found = false;
	        var valueToSet = value;
	        this.keyAndValues.forEach(function (value: KeyValuePair<K, V>, index: number, array: KeyValuePair<K, V>[]): void {
	            if (found) return;
	            if (key === value.key) {
	                found = true;
	                value.value = valueToSet;
	            }
	        });
	        if (!found) {
	            this.keyAndValues.push(new KeyValuePair<K, V>(key, valueToSet));
	        }
	        return this;
	    }
	    // ----------------------

	    // Getters:
	    // Standard:
	    get size() {
	        return this.keyAndValues.length;
	    }
	}*/
	// Return a new array with duplicates removed

	function unique(array) {
	    var seen = new Map();
	    return array.filter(function (e, i) {
	        if (seen.has(e)) return false;
	        /*for (i += 1; i < array.length; i += 1) {
	          if (equal(e, array[i])) {
	            return false;
	          }
	        }*/
	        seen.set(e, true);
	        return true;
	    });
	}
	exports.unique = unique;
	function any(array, predicate) {
	    for (var i = 0, ii = array.length; i < ii; i++) {
	        if (predicate(array[i])) return true;
	    }
	    return false;
	}
	exports.any = any;
	function indexOf(array, item) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (array[i] === item) return i;
	    }return -1;
	}
	exports.indexOf = indexOf;
	function find(array, callback, ctx) {
	    var v = void 0;
	    for (var i = 0, ii = array.length; i < ii; i++) {
	        if (callback.call(ctx, array[i])) return array[i];
	    }
	    return null;
	}
	exports.find = find;
	function slice(array, begin, end) {
	    return Array.prototype.slice.call(array, begin, end);
	}
	exports.slice = slice;
	function flatten(arr) {
	    return arr.reduce(function (flat, toFlatten) {
	        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	    }, []);
	}
	exports.flatten = flatten;
	function sortBy(obj, value, context) {
	    var iterator = typeof value === 'function' ? value : function (obj) {
	        return obj[value];
	    };
	    return obj.map(function (value, index, list) {
	        return {
	            value: value,
	            index: index,
	            criteria: iterator.call(context, value, index, list)
	        };
	    }).sort(function (left, right) {
	        var a = left.criteria,
	            b = right.criteria;
	        if (a !== b) {
	            if (a > b || a === void 0) return 1;
	            if (a < b || b === void 0) return -1;
	        }
	        return left.index - right.index;
	    }).map(function (item) {
	        return item.value;
	    });
	}
	exports.sortBy = sortBy;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	function camelcase(input) {
	    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
	        return group1.toUpperCase();
	    });
	}
	exports.camelcase = camelcase;
	;
	function truncate(str, length) {
	    var n = str.substring(0, Math.min(length, str.length));
	    return n + (n.length == str.length ? '' : '...');
	}
	exports.truncate = truncate;
	function humanFileSize(bytes) {
	    var si = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	    var thresh = si ? 1000 : 1024;
	    if (Math.abs(bytes) < thresh) {
	        return bytes + ' B';
	    }
	    var units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
	    var u = -1;
	    do {
	        bytes /= thresh;
	        ++u;
	    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
	    return bytes.toFixed(1) + ' ' + units[u];
	}
	exports.humanFileSize = humanFileSize;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var utils_1 = __webpack_require__(7);
	var arrays_1 = __webpack_require__(9);
	/**
	 * Takes a nested object and returns a shallow object keyed with the path names
	 * e.g. { "level1.level2": "value" }
	 *
	 * @param  {Object}      Nested object e.g. { level1: { level2: 'value' } }
	 * @return {Object}      Shallow object with path names e.g. { 'level1.level2': 'value' }
	 */
	function objToPaths(obj) {
	    var separator = arguments.length <= 1 || arguments[1] === undefined ? "." : arguments[1];

	    var ret = {};
	    for (var key in obj) {
	        var val = obj[key];
	        if (val && (val.constructor === Object || val.constructor === Array) && !isEmpty(val)) {
	            //Recursion for embedded objects
	            var obj2 = objToPaths(val);
	            for (var key2 in obj2) {
	                var val2 = obj2[key2];
	                ret[key + separator + key2] = val2;
	            }
	        } else {
	            ret[key] = val;
	        }
	    }
	    return ret;
	}
	exports.objToPaths = objToPaths;
	function isEmpty(obj) {
	    return Object.keys(obj).length === 0;
	}
	exports.isEmpty = isEmpty;
	function extend(obj) {
	    if (!utils_1.isObject(obj)) return obj;
	    var o = void 0,
	        k = void 0;

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            o = _step.value;

	            if (!utils_1.isObject(o)) continue;
	            for (k in o) {
	                if (has(o, k)) obj[k] = o[k];
	            }
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return obj;
	}
	exports.extend = extend;
	var nativeAssign = Object.assign;
	function assign(target) {
	    if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert first argument to object');
	    }

	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	    }

	    if (nativeAssign) return nativeAssign.apply(undefined, [target].concat(args));
	    var to = Object(target);
	    for (var i = 0, ii = args.length; i < ii; i++) {
	        var nextSource = args[i];
	        if (nextSource === undefined || nextSource === null) {
	            continue;
	        }
	        nextSource = Object(nextSource);
	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	            var nextKey = keysArray[nextIndex];
	            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	            if (desc !== undefined && desc.enumerable) {
	                to[nextKey] = nextSource[nextKey];
	            }
	        }
	    }
	    return to;
	}
	exports.assign = assign;
	var _has = Object.prototype.hasOwnProperty;
	function has(obj, prop) {
	    return _has.call(obj, prop);
	}
	exports.has = has;
	function pick(obj, props) {
	    var out = {},
	        prop = void 0;
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	        for (var _iterator2 = props[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            prop = _step2.value;

	            if (has(obj, prop)) out[prop] = obj[prop];
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }

	    return out;
	}
	exports.pick = pick;
	function omit(obj, props) {
	    var out = {};
	    for (var key in obj) {
	        if (!!~props.indexOf(key)) continue;
	        out[key] = obj[key];
	    }
	    return out;
	}
	exports.omit = omit;
	function result(obj, prop, ctx, args) {
	    var ret = obj[prop];
	    return typeof ret === 'function' ? ret.appl(ctx, args || []) : ret;
	}
	exports.result = result;
	function values(obj) {
	    var output = [];
	    for (var k in obj) {
	        if (has(obj, k)) {
	            output.push(obj[k]);
	        }
	    }return output;
	}
	exports.values = values;
	function intersectionObjects(a, b, predicate) {
	    var results = [],
	        aElement,
	        existsInB;
	    for (var i = 0, ii = a.length; i < ii; i++) {
	        aElement = a[i];
	        existsInB = arrays_1.any(b, function (bElement) {
	            return predicate(bElement, aElement);
	        });
	        if (existsInB) {
	            results.push(aElement);
	        }
	    }
	    return results;
	}
	function intersection(results) {
	    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        args[_key3 - 1] = arguments[_key3];
	    }

	    var lastArgument = args[args.length - 1];
	    var arrayCount = args.length;
	    var areEqualFunction = utils_1.equal;
	    if (typeof lastArgument === "function") {
	        areEqualFunction = lastArgument;
	        arrayCount--;
	    }
	    for (var i = 0; i < arrayCount; i++) {
	        var array = args[i];
	        results = intersectionObjects(results, array, areEqualFunction);
	        if (results.length === 0) break;
	    }
	    return results;
	}
	exports.intersection = intersection;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var arrays_1 = __webpack_require__(9);
	var utils_1 = __webpack_require__(7);
	exports.Promise = typeof window === 'undefined' ? global.Promise : window.Promise;
	// Promises
	function isPromise(obj) {
	    return obj && typeof obj.then === 'function';
	}
	exports.isPromise = isPromise;
	function toPromise(obj) {
	    /* jshint validthis:true */
	    if (!obj) {
	        return obj;
	    }
	    if (isPromise(obj)) {
	        return obj;
	    }
	    if (utils_1.isFunction(obj)) {
	        return thunkToPromise.call(this, obj);
	    }
	    if (Array.isArray(obj)) {
	        return arrayToPromise.call(this, obj);
	    }
	    if (utils_1.isObject(obj)) {
	        return objectToPromise.call(this, obj);
	    }
	    return exports.Promise.resolve(obj);
	}
	exports.toPromise = toPromise;
	/**
	 * Convert a thunk to a promise.
	 *
	 * @param {Function}
	 * @return {Promise}
	 * @api private
	 */
	function thunkToPromise(fn) {
	    /* jshint validthis:true */
	    var ctx = this;
	    return new exports.Promise(function (resolve, reject) {
	        fn.call(ctx, function (err, res) {
	            if (err) return reject(err);
	            if (arguments.length > 2) res = arrays_1.slice(arguments, 1);
	            resolve(res);
	        });
	    });
	}
	exports.thunkToPromise = thunkToPromise;
	/**
	 * Convert an array of "yieldables" to a promise.
	 * Uses `Promise.all()` internally.
	 *
	 * @param {Array} obj
	 * @return {Promise}
	 * @api private
	 */
	function arrayToPromise(obj) {
	    return exports.Promise.all(obj.map(toPromise, this));
	}
	exports.arrayToPromise = arrayToPromise;
	/**
	 * Convert an object of "yieldables" to a promise.
	 * Uses `Promise.all()` internally.
	 *
	 * @param {Object} obj
	 * @return {Promise}
	 * @api private
	 */
	function objectToPromise(obj) {
	    var results = new obj.constructor();
	    var keys = Object.keys(obj);
	    var promises = [];
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var promise = toPromise.call(this, obj[key]);
	        if (promise && isPromise(promise)) defer(promise, key);else results[key] = obj[key];
	    }
	    return exports.Promise.all(promises).then(function () {
	        return results;
	    });
	    function defer(promise, key) {
	        // predefine the key in the result
	        results[key] = undefined;
	        promises.push(promise.then(function (res) {
	            results[key] = res;
	        }));
	    }
	}
	exports.objectToPromise = objectToPromise;
	function deferred() {
	    var ret = {};
	    ret.promise = new exports.Promise(function (resolve, reject) {
	        ret.resolve = resolve;
	        ret.reject = reject;
	        ret.done = function (err, result) {
	            if (err) return reject(err);else resolve(result);
	        };
	    });
	    return ret;
	}
	exports.deferred = deferred;
	;
	function callback(promise, callback, ctx) {
	    promise.then(function (result) {
	        callback.call(ctx, null, result);
	    }).catch(function (err) {
	        callback.call(ctx, err);
	    });
	}
	exports.callback = callback;
	function delay(timeout) {
	    var defer = deferred();
	    timeout == null ? utils_1.nextTick(defer.resolve) : setTimeout(defer.resolve, timeout);
	    return defer.promise;
	}
	exports.delay = delay;
	;
	function eachAsync(array, iterator, context) {
	    var accumulate = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	    return mapAsync(array, iterator, context, accumulate).then(function () {
	        return void 0;
	    });
	}
	exports.eachAsync = eachAsync;
	function mapAsync(array, iterator, context) {
	    var accumulate = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	    return new exports.Promise(function (resolve, reject) {
	        var i = 0,
	            len = array.length,
	            errors = [],
	            results = [];
	        function next(err, result) {
	            if (err && !accumulate) return reject(err);
	            if (err) errors.push(err);
	            if (i === len) return errors.length ? reject(arrays_1.flatten(errors)) : resolve(results);
	            var ret = iterator.call(context, array[i++]);
	            if (isPromise(ret)) {
	                ret.then(function (r) {
	                    results.push(r);next(null, r);
	                }, next);
	            } else if (ret instanceof Error) {
	                next(ret);
	            } else {
	                next(null);
	            }
	        }
	        next(null);
	    });
	}
	exports.mapAsync = mapAsync;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var self = typeof window === 'undefined' ? global : window;
	var iterable = 'Symbol' in self && 'iterator' in Symbol;
	// Build a destructive iterator for the value list
	function iteratorFor(items) {
	    var iterator = {
	        next: function next() {
	            var value = items.shift();
	            return { done: value === undefined, value: value };
	        }
	    };
	    if (iterable) {
	        iterator[Symbol.iterator] = function () {
	            return iterator;
	        };
	    }
	    return iterator;
	}

	var KeyValuePair = function KeyValuePair(key, value) {
	    _classCallCheck(this, KeyValuePair);

	    this.key = key;
	    this.value = value;
	};

	var MapShim = function () {
	    // ---------------------------------------------
	    function MapShim() {
	        _classCallCheck(this, MapShim);

	        this.keyAndValues = [];
	    }
	    // --- Public Methods ---


	    _createClass(MapShim, [{
	        key: 'getKeysOfValue',
	        value: function getKeysOfValue(value) {
	            var keysToReturn = [];
	            var valueToFind = value;
	            this.keyAndValues.forEach(function (value, index, array) {
	                if (value.value === valueToFind) {
	                    keysToReturn.push(value.key);
	                }
	            });
	            return keysToReturn;
	        }
	        // Standard:

	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.keyAndValues = [];
	        }
	    }, {
	        key: 'delete',
	        value: function _delete(key) {
	            var found = false;
	            this.keyAndValues.forEach(function (value, index, array) {
	                if (found) return;
	                if (key === value.key) {
	                    array = array.slice(0, index).concat(array.slice(index + 1));
	                    found = true;
	                }
	            });
	            return found;
	        }
	    }, {
	        key: 'forEach',
	        value: function forEach(callbackfn, thisArg) {
	            this.keyAndValues.forEach(function (value, index, array) {
	                callbackfn.apply(thisArg, [value.value, value.key, this]);
	            }, this);
	        }
	    }, {
	        key: 'get',
	        value: function get(key) {
	            var valueToReturn = undefined;
	            this.keyAndValues.forEach(function (value, index, array) {
	                if (valueToReturn !== undefined) return;
	                if (key === value.key) {
	                    valueToReturn = value.value;
	                }
	            });
	            return valueToReturn;
	        }
	    }, {
	        key: 'has',
	        value: function has(key) {
	            var found = false;
	            this.keyAndValues.forEach(function (value, index, array) {
	                if (found) return;
	                if (key === value.key) {
	                    found = true;
	                }
	            });
	            return found;
	        }
	    }, {
	        key: 'set',
	        value: function set(key, value) {
	            var found = false;
	            var valueToSet = value;
	            this.keyAndValues.forEach(function (value, index, array) {
	                if (found) return;
	                if (key === value.key) {
	                    found = true;
	                    value.value = valueToSet;
	                }
	            });
	            if (!found) {
	                this.keyAndValues.push(new KeyValuePair(key, valueToSet));
	            }
	            return this;
	        }
	    }, {
	        key: 'keys',
	        value: function keys() {
	            var items = [];
	            this.forEach(function (value, name) {
	                items.push(name);
	            });
	            return iteratorFor(items);
	        }
	    }, {
	        key: 'values',
	        value: function values() {
	            var items = [];
	            this.forEach(function (value) {
	                items.push(value);
	            });
	            return iteratorFor(items);
	        }
	    }, {
	        key: 'entries',
	        value: function entries() {
	            var items = [];
	            this.forEach(function (value, name) {
	                items.push([name, value]);
	            });
	            return iteratorFor(items);
	        }
	        // ----------------------
	        // Getters:
	        // Standard:

	    }, {
	        key: Symbol.iterator,
	        value: function value() {
	            return this.entries();
	        }
	    }, {
	        key: 'size',
	        get: function get() {
	            return this.keyAndValues.length;
	        }
	    }]);

	    return MapShim;
	}();

	if (!self.Map) {
	    self.Map = MapShim;
	}
	exports.Map = self.Map;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var object_1 = __webpack_require__(4);
	var orange_1 = __webpack_require__(6);
	function isModel(a) {
	    if (a == null)
	        return false;
	    return (a instanceof Model) || a.__classType === 'Model' || a.__classType === 'RestModel';
	}
	exports.isModel = isModel;
	var Model = (function (_super) {
	    __extends(Model, _super);
	    function Model(attributes, options) {
	        if (attributes === void 0) { attributes = {}; }
	        if (options === void 0) { options = {}; }
	        _super.call(this);
	        options = options || {};
	        this._attributes = {};
	        this.options = options;
	        if (options.parse)
	            attributes = this.parse(attributes);
	        this.set(attributes, { silent: true, array: false });
	        this.uid = orange_1.uniqueId('uid');
	        this._changed = {};
	        this.collection = options.collection;
	        this.idAttribute = options.idAttribute || this.idAttribute || 'id';
	    }
	    Object.defineProperty(Model.prototype, "__classType", {
	        get: function () { return 'Model'; },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    Object.defineProperty(Model.prototype, "id", {
	        get: function () {
	            if (this.idAttribute in this._attributes)
	                return this._attributes[this.idAttribute];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Model.prototype, "isNew", {
	        get: function () {
	            return this.id == null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Model.prototype, "isDirty", {
	        get: function () {
	            return this.hasChanged();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Model.prototype.set = function (key, val, options) {
	        if (options === void 0) { options = {}; }
	        var attr, attrs = {}, unset, changes, silent, changing, prev, current;
	        if (key == null)
	            return this;
	        if (typeof key === 'object') {
	            attrs = key;
	            options = val;
	        }
	        else {
	            attrs[key] = val;
	        }
	        options || (options = {});
	        unset = options.unset;
	        silent = options.silent;
	        changes = [];
	        changing = this._changing;
	        this._changing = true;
	        if (!changing) {
	            this._previousAttributes = orange_1.extend(Object.create(null), this._attributes);
	            this._changed = {};
	        }
	        current = this._attributes, prev = this._previousAttributes;
	        for (attr in attrs) {
	            val = attrs[attr];
	            if (!orange_1.equal(current[attr], val))
	                changes.push(attr);
	            if (!orange_1.equal(prev[attr], val)) {
	                this._changed[attr] = val;
	            }
	            else {
	                delete this._changed[attr];
	            }
	            unset ? delete current[attr] : current[attr] = val;
	        }
	        if (!silent) {
	            if (changes.length)
	                this._pending = !!options;
	            for (var i = 0, l = changes.length; i < l; i++) {
	                this.trigger('change:' + changes[i], this, current[changes[i]], options);
	            }
	        }
	        if (changing)
	            return this;
	        if (!silent) {
	            while (this._pending) {
	                options = this._pending;
	                this._pending = false;
	                this.trigger('change', this, options);
	            }
	        }
	        this._pending = false;
	        this._changing = false;
	        return this;
	    };
	    Model.prototype.get = function (key) {
	        return this._attributes[key];
	    };
	    Model.prototype.unset = function (key, options) {
	        this.set(key, void 0, orange_1.extend({}, options, { unset: true }));
	    };
	    Model.prototype.has = function (attr) {
	        return this.get(attr) != null;
	    };
	    Model.prototype.hasChanged = function (attr) {
	        if (attr == null)
	            return !!Object.keys(this.changed).length;
	        return orange_1.has(this.changed, attr);
	    };
	    Model.prototype.clear = function (options) {
	        var attrs = {};
	        for (var key in this._attributes)
	            attrs[key] = void 0;
	        return this.set(attrs, orange_1.extend({}, options, { unset: true }));
	    };
	    Object.defineProperty(Model.prototype, "changed", {
	        get: function () {
	            return orange_1.extend({}, this._changed);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Model.prototype.changedAttributes = function (diff) {
	        if (!diff)
	            return this.hasChanged() ? orange_1.extend(Object.create(null), this.changed) : false;
	        var val, changed = {};
	        var old = this._changing ? this._previousAttributes : this._attributes;
	        for (var attr in diff) {
	            if (orange_1.equal(old[attr], (val = diff[attr])))
	                continue;
	            (changed || (changed = {}))[attr] = val;
	        }
	        return changed;
	    };
	    Model.prototype.previous = function (attr) {
	        if (attr == null || !this._previousAttributes)
	            return null;
	        return this._previousAttributes[attr];
	    };
	    Model.prototype.previousAttributes = function () {
	        return orange_1.extend(Object.create(null), this._previousAttributes);
	    };
	    Model.prototype.toJSON = function () {
	        return JSON.parse(JSON.stringify(this._attributes));
	    };
	    Model.prototype.clone = function () {
	        return new (this.constructor)(this._attributes, this.options);
	    };
	    Model.prototype.parse = function (attr, options) {
	        return attr;
	    };
	    Model.prototype.remove = function (options) {
	        this.trigger('remove', this, this.collection, options);
	    };
	    Model.prototype.pick = function (attr) {
	        var attrs = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            attrs[_i - 1] = arguments[_i];
	        }
	        if (arguments.length === 1) {
	            if (!Array.isArray(attr)) {
	                attrs = [attr];
	            }
	            else {
	                attrs = attr;
	            }
	        }
	        else {
	            attrs = [attr].concat(attrs);
	        }
	        var out = {};
	        for (var i = 0, ii = attrs.length; i < ii; i++) {
	            if (this.has(attrs[i]))
	                out[attrs[i]] = this.get(attrs[i]);
	        }
	        return out;
	    };
	    return Model;
	}(object_1.BaseObject));
	exports.Model = Model;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var orange_1 = __webpack_require__(6);
	var model_1 = __webpack_require__(14);
	function objToPaths(obj, separator, array) {
	    if (separator === void 0) { separator = "."; }
	    if (array === void 0) { array = true; }
	    var ret = {};
	    if (!obj)
	        return obj;
	    for (var key in obj) {
	        var val = obj[key];
	        if (val && (val.constructor === Object || (array && val.constructor === Array)) && !orange_1.isEmpty(val)) {
	            var obj2 = objToPaths(val);
	            for (var key2 in obj2) {
	                var val2 = obj2[key2];
	                ret[key + separator + key2] = val2;
	            }
	        }
	        else {
	            ret[key] = val;
	        }
	    }
	    return ret;
	}
	exports.objToPaths = objToPaths;
	function isOnNestedModel(obj, path, separator) {
	    if (separator === void 0) { separator = "."; }
	    var fields = path ? path.split(separator) : [];
	    if (!obj)
	        return false;
	    var result = obj;
	    for (var i = 0, n = fields.length; i < n; i++) {
	        if (model_1.isModel(result))
	            return true;
	        if (!result)
	            return false;
	        result = result[fields[i]];
	    }
	    return false;
	}
	function getNested(obj, path, return_exists, separator) {
	    if (separator === void 0) { separator = "."; }
	    if (!obj)
	        return null;
	    var fields = path ? path.split(separator) : [];
	    var result = obj;
	    return_exists || (return_exists === false);
	    for (var i = 0, n = fields.length; i < n; i++) {
	        if (return_exists && !orange_1.has(result, fields[i])) {
	            return false;
	        }
	        result = model_1.isModel(result) ? result.get(fields[i]) : result[fields[i]];
	        if (result == null && i < n - 1) {
	            result = {};
	        }
	        if (typeof result === 'undefined') {
	            if (return_exists) {
	                return true;
	            }
	            return result;
	        }
	    }
	    if (return_exists) {
	        return true;
	    }
	    return result;
	}
	exports.getNested = getNested;
	function setNested(obj, path, val, options) {
	    options = options || {};
	    if (!obj)
	        return null;
	    var separator = options.separator || ".";
	    var fields = path ? path.split(separator) : [];
	    var result = obj;
	    for (var i = 0, n = fields.length; i < n && result !== undefined; i++) {
	        var field = fields[i];
	        if (i === n - 1) {
	            options.unset ? delete result[field] : result[field] = val;
	        }
	        else {
	            if (typeof result[field] === 'undefined' || !orange_1.isObject(result[field])) {
	                if (options.unset) {
	                    delete result[field];
	                    return;
	                }
	                var nextField = fields[i + 1];
	                result[field] = /^\d+$/.test(nextField) ? [] : {};
	            }
	            result = result[field];
	            if (model_1.isModel(result)) {
	                var rest = fields.slice(i + 1);
	                return result.set(rest.join('.'), val, options);
	            }
	        }
	    }
	}
	function deleteNested(obj, path) {
	    setNested(obj, path, null, {
	        unset: true
	    });
	}
	var NestedModel = (function (_super) {
	    __extends(NestedModel, _super);
	    function NestedModel() {
	        _super.apply(this, arguments);
	    }
	    NestedModel.prototype.get = function (attr) {
	        return getNested(this._attributes, attr);
	    };
	    NestedModel.prototype.set = function (key, val, options) {
	        var _this = this;
	        var attr, attrs, unset, changes, silent, changing, prev, current;
	        if (key == null)
	            return this;
	        if (typeof key === 'object') {
	            attrs = key;
	            options = val || {};
	        }
	        else {
	            (attrs = {})[key] = val;
	        }
	        options || (options = {});
	        unset = options.unset;
	        silent = options.silent;
	        changes = [];
	        changing = this._changing;
	        this._changing = true;
	        if (!changing) {
	            this._previousAttributes = orange_1.extend({}, this._attributes);
	            this._changed = {};
	        }
	        current = this._attributes, prev = this._previousAttributes;
	        var separator = NestedModel.keyPathSeparator;
	        attrs = objToPaths(attrs, separator, options.array);
	        var alreadyTriggered = {};
	        if (!this._nestedListener)
	            this._nestedListener = {};
	        for (attr in attrs) {
	            val = attrs[attr];
	            var curVal = getNested(current, attr);
	            if (!orange_1.equal(curVal, val)) {
	                changes.push(attr);
	                this._changed[attr] = val;
	            }
	            if (!orange_1.equal(getNested(prev, attr), val)) {
	                setNested(this.changed, attr, val, options);
	            }
	            else {
	                deleteNested(this.changed, attr);
	            }
	            if (model_1.isModel(curVal)) {
	                var fn = this._nestedListener[attr];
	                if (fn) {
	                    curVal.off('change', fn);
	                    delete this._nestedListener[attr];
	                }
	            }
	            if (unset) {
	                deleteNested(current, attr);
	            }
	            else {
	                if (!isOnNestedModel(current, attr, separator)) {
	                    if (model_1.isModel(val)) {
	                        var fn = function (model) {
	                            if (model.changed == undefined || orange_1.isEmpty(model.changed))
	                                return;
	                            for (var key_1 in model.changed) {
	                                _this._changed[attr + separator + key_1] = model.changed[key_1];
	                                _this.trigger('change:' + attr + separator + key_1, model.changed[key_1]);
	                            }
	                            _this.trigger('change', _this, options);
	                        };
	                        this._nestedListener[attr] = fn;
	                        val.on('change', fn);
	                    }
	                }
	                else {
	                    alreadyTriggered[attr] = true;
	                }
	                setNested(current, attr, val, options);
	            }
	        }
	        if (!silent) {
	            if (changes.length)
	                this._pending = true;
	            for (var i = 0, l = changes.length; i < l; i++) {
	                var key_2 = changes[i];
	                if (!alreadyTriggered.hasOwnProperty(key_2) || !alreadyTriggered[key_2]) {
	                    alreadyTriggered[key_2] = true;
	                    this.trigger('change:' + key_2, this, getNested(current, key_2), options);
	                }
	                var fields = key_2.split(separator);
	                for (var n = fields.length - 1; n > 0; n--) {
	                    var parentKey = fields.slice(0, n).join(separator), wildcardKey = parentKey + separator + '*';
	                    if (!alreadyTriggered.hasOwnProperty(wildcardKey) || !alreadyTriggered[wildcardKey]) {
	                        alreadyTriggered[wildcardKey] = true;
	                        this.trigger('change:' + wildcardKey, this, getNested(current, parentKey), options);
	                    }
	                    if (!alreadyTriggered.hasOwnProperty(parentKey) || !alreadyTriggered[parentKey]) {
	                        alreadyTriggered[parentKey] = true;
	                        this.trigger('change:' + parentKey, this, getNested(current, parentKey), options);
	                    }
	                }
	            }
	        }
	        if (changing)
	            return this;
	        if (!silent) {
	            while (this._pending) {
	                this._pending = false;
	                this.trigger('change', this, options);
	            }
	        }
	        this._pending = false;
	        this._changing = false;
	        return this;
	    };
	    NestedModel.prototype.clear = function (options) {
	        var attrs = {};
	        var shallowAttributes = objToPaths(this._attributes);
	        for (var key in shallowAttributes)
	            attrs[key] = void 0;
	        return this.set(attrs, orange_1.extend({}, options, {
	            unset: true
	        }));
	    };
	    NestedModel.prototype.hasChanged = function (attr) {
	        if (attr == null) {
	            return !Object.keys(this.changed).length;
	        }
	        return getNested(this.changed, attr) !== undefined;
	    };
	    NestedModel.prototype.changedAttributes = function (diff) {
	        if (!diff)
	            return this.hasChanged() ? objToPaths(this.changed) : false;
	        var old = this._changing ? this._previousAttributes : this._attributes;
	        diff = objToPaths(diff);
	        old = objToPaths(old);
	        var val, changed = false;
	        for (var attr in diff) {
	            if (orange_1.equal(old[attr], (val = diff[attr])))
	                continue;
	            (changed || (changed = {}))[attr] = val;
	        }
	        return changed;
	    };
	    NestedModel.prototype.previous = function (attr) {
	        if (attr == null || !this._previousAttributes) {
	            return null;
	        }
	        return getNested(this._previousAttributes, attr);
	    };
	    NestedModel.prototype.previousAttributes = function () {
	        return orange_1.extend({}, this._previousAttributes);
	    };
	    NestedModel.prototype.pick = function (attr) {
	        var attrs = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            attrs[_i - 1] = arguments[_i];
	        }
	        if (arguments.length === 1) {
	            attr = !Array.isArray(attr) ? [attr] : attr;
	        }
	        else {
	            attrs = [attr].concat(attrs);
	        }
	        var out = {};
	        for (var i = 0, ii = attrs.length; i < ii; i++) {
	            if (this.has(attrs[i])) {
	                setNested(out, attrs[i], this.get(attrs[i]));
	            }
	        }
	        return out;
	    };
	    NestedModel.prototype.destroy = function () {
	        for (var key in this._nestedListener) {
	            var fn = this._nestedListener[key];
	            if (fn) {
	                var m = this.get(key);
	                if (m)
	                    m.off(key, fn);
	            }
	        }
	        _super.prototype.destroy.call(this);
	    };
	    NestedModel.keyPathSeparator = '.';
	    return NestedModel;
	}(model_1.Model));
	exports.NestedModel = NestedModel;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var orange_1 = __webpack_require__(6);
	var collection_1 = __webpack_require__(3);
	var rest_model_1 = __webpack_require__(17);
	var persistence_1 = __webpack_require__(18);
	function isRestCollection(a) {
	    if (a == null)
	        return false;
	    return (a instanceof RestCollection) || a.__classType == 'RestCollection';
	}
	exports.isRestCollection = isRestCollection;
	var RestCollection = (function (_super) {
	    __extends(RestCollection, _super);
	    function RestCollection(models, options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this, models, options);
	        this.Model = rest_model_1.RestModel;
	        if (options.url)
	            this.url = options.url;
	        this.options.queryParameter = this.options.queryParameter || 'q';
	    }
	    Object.defineProperty(RestCollection.prototype, "__classType", {
	        get: function () { return 'RestCollection'; },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    RestCollection.prototype.getURL = function () {
	        return typeof this.url === 'function' ? this.url() : this.url;
	    };
	    RestCollection.prototype.fetch = function (options) {
	        var _this = this;
	        options = options ? orange_1.extend({}, options) : {};
	        var url = this.getURL();
	        if (url == null)
	            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
	        options.url = url;
	        this.trigger('before:fetch');
	        return this.sync(persistence_1.RestMethod.Read, this, options)
	            .then(function (results) {
	            _this[options.reset ? 'reset' : 'set'](results.content, options);
	            _this.trigger('fetch');
	            return _this;
	        }).catch(function (e) {
	            _this.trigger('error', e);
	            throw e;
	        });
	    };
	    RestCollection.prototype.create = function (value, options) {
	        var _this = this;
	        options = options ? orange_1.extend({}, options) : {};
	        var model;
	        var url = this.getURL();
	        if (url == null)
	            throw new Error('Url or rootURL no specified');
	        options.url = url;
	        if (rest_model_1.isRestModel(value)) {
	            model = value;
	        }
	        else {
	            model = new this.Model(value, { parse: true, url: this.getURL() });
	        }
	        if (options.wait === void 0)
	            options.wait = true;
	        if (!options.wait)
	            this.add(model, options);
	        this.trigger('before:create', this, model, value, options);
	        model.save().then(function () {
	            if (!options.wait)
	                _this.add(model, options);
	            _this.trigger('create', _this, model, value, options);
	            if (options.complete)
	                options.complete(null, model);
	        }).catch(function (e) {
	            _this.trigger('error', e);
	            if (options.complete)
	                options.complete(e, null);
	        });
	        return model;
	    };
	    RestCollection.prototype.query = function (term, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        var params = (_a = {}, _a[this.options.queryParameter] = term, _a);
	        var url = this.getURL();
	        if (url == null)
	            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
	        options.url = url;
	        if (!options.params)
	            options.params = {};
	        orange_1.extend(options.params, params);
	        this.trigger('before:query');
	        return this.sync(persistence_1.RestMethod.Read, this, options)
	            .then(function (results) {
	            _this.reset(results.content, options);
	            _this.trigger('query');
	            return _this.models;
	        }).catch(function (e) {
	            _this.trigger('error', e);
	            throw e;
	        });
	        var _a;
	    };
	    RestCollection.prototype.sync = function (method, model, options) {
	        return persistence_1.sync(method, model, options);
	    };
	    return RestCollection;
	}(collection_1.Collection));
	exports.RestCollection = RestCollection;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var orange_1 = __webpack_require__(6);
	var model_1 = __webpack_require__(14);
	var nested_model_1 = __webpack_require__(15);
	var persistence_1 = __webpack_require__(18);
	function isRestModel(a) {
	    if (a == null)
	        return false;
	    return (a instanceof model_1.Model) || a.__classType === 'RestModel';
	}
	exports.isRestModel = isRestModel;
	function normalize_path(url, id) {
	    var i, p = "";
	    if ((i = url.indexOf('?')) >= 0) {
	        p = url.substr(i);
	        url = url.substr(0, i);
	    }
	    if (url[url.length - 1] !== '/')
	        url += '/';
	    return url + id + p;
	}
	exports.normalize_path = normalize_path;
	var RestModel = (function (_super) {
	    __extends(RestModel, _super);
	    function RestModel(attr, options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this, attr, options);
	        this.idAttribute = 'id';
	        if (options.url) {
	            this.rootURL = options.url;
	        }
	    }
	    Object.defineProperty(RestModel.prototype, "__classType", {
	        get: function () { return 'RestModel'; },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    RestModel.prototype.getURL = function (id) {
	        var url = this.rootURL;
	        if (this.collection && this.collection.getURL()) {
	            url = this.collection.getURL();
	        }
	        id = id || this.id;
	        if (id && url) {
	            url = normalize_path(url, this.id);
	        }
	        return url;
	    };
	    RestModel.prototype.fetch = function (options) {
	        var _this = this;
	        options = options ? orange_1.extend({}, options) : {};
	        var url = this.getURL();
	        if (url == null)
	            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
	        options.url = url;
	        this.trigger('before:fetch', this, options);
	        return this.sync(persistence_1.RestMethod.Read, this, options)
	            .then(function (result) {
	            if (result)
	                _this.set(_this.parse(result.content, options), options);
	            _this.trigger('fetch', _this, result, options);
	            return _this;
	        }).catch(function (e) {
	            _this.trigger('error', _this, e);
	            if (e) {
	                throw e;
	            }
	            return _this;
	        });
	    };
	    RestModel.prototype.save = function (options) {
	        var _this = this;
	        options = options ? orange_1.extend({}, options) : {};
	        this.trigger('before:save', this, options);
	        var method = persistence_1.RestMethod[this.isNew ? 'Create' : options.changed ? 'Patch' : "Update"];
	        var url = this.getURL(this.id);
	        if (url == null)
	            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
	        options.url = url;
	        return this.sync(method, this, options)
	            .then(function (result) {
	            _this.set(result.content, options);
	            _this.trigger('save', _this, result, options);
	            return _this;
	        }).catch(function (e) {
	            _this.trigger('error', _this, e);
	            throw e;
	        });
	    };
	    RestModel.prototype.remove = function (options) {
	        var _this = this;
	        options = options ? orange_1.extend({}, options) : {};
	        if (this.isNew) {
	            _super.prototype.remove.call(this, options);
	            return orange_1.Promise.resolve(this);
	        }
	        var url = this.getURL(this.id);
	        if (url == null)
	            return orange_1.Promise.reject(new Error('Url or rootURL no specified'));
	        this.trigger('before:remove', this, options);
	        if (!options.wait)
	            _super.prototype.remove.call(this, options);
	        options.url = url;
	        return this.sync(persistence_1.RestMethod.Delete, this, options)
	            .then(function (result) {
	            if (options.wait)
	                _super.prototype.remove.call(_this, options);
	            return _this;
	        }).catch(function (e) {
	            _this.trigger('error', _this, e);
	            throw e;
	        });
	    };
	    RestModel.prototype.sync = function (method, model, options) {
	        return persistence_1.sync(method, model, options);
	    };
	    return RestModel;
	}(nested_model_1.NestedModel));
	exports.RestModel = RestModel;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var orange_1 = __webpack_require__(6);
	var orange_request_1 = __webpack_require__(19);
	var HttpError = (function (_super) {
	    __extends(HttpError, _super);
	    function HttpError(status, message, body) {
	        _super.call(this, message);
	        this.message = message;
	        this.status = status;
	        this.body = body;
	    }
	    return HttpError;
	}(Error));
	exports.HttpError = HttpError;
	(function (RestMethod) {
	    RestMethod[RestMethod["Create"] = 0] = "Create";
	    RestMethod[RestMethod["Update"] = 1] = "Update";
	    RestMethod[RestMethod["Read"] = 2] = "Read";
	    RestMethod[RestMethod["Patch"] = 3] = "Patch";
	    RestMethod[RestMethod["Delete"] = 4] = "Delete";
	})(exports.RestMethod || (exports.RestMethod = {}));
	var RestMethod = exports.RestMethod;
	;
	var xmlRe = /^(?:application|text)\/xml/;
	var jsonRe = /^application\/json/;
	var getData = function (accepts, xhr) {
	    if (accepts == null)
	        accepts = xhr.getResponseHeader('content-type');
	    if (xmlRe.test(accepts)) {
	        return xhr.responseXML;
	    }
	    else if (jsonRe.test(accepts) && xhr.responseText !== '') {
	        return JSON.parse(xhr.responseText);
	    }
	    else {
	        return xhr.responseText;
	    }
	};
	var isValid = function (xhr) {
	    return (xhr.status >= 200 && xhr.status < 300) ||
	        (xhr.status === 304) ||
	        (xhr.status === 0 && window.location.protocol === 'file:');
	};
	function sync(method, model, options) {
	    var http;
	    switch (method) {
	        case RestMethod.Create:
	            http = orange_request_1.HttpMethod.POST;
	            break;
	        case RestMethod.Update:
	            http = orange_request_1.HttpMethod.PUT;
	            break;
	        case RestMethod.Patch:
	            http = orange_request_1.HttpMethod.PATCH;
	            break;
	        case RestMethod.Delete:
	            http = orange_request_1.HttpMethod.DELETE;
	            break;
	        case RestMethod.Read:
	            http = orange_request_1.HttpMethod.GET;
	            break;
	        default:
	            return orange_1.Promise.reject(new Error("Sync: does not recognise method: " + method));
	    }
	    var request = new orange_request_1.HttpRequest(http, options.url);
	    if (options.params)
	        request.params(options.params);
	    if (options.headers)
	        request.header(options.headers);
	    request.header('Content-Type', 'application/json');
	    if (!(options.headers && options.headers['Accept'])) {
	        request.header('Accept', 'application/json');
	    }
	    if (options.beforeSend)
	        options.beforeSend(request);
	    var data = undefined;
	    if (http == orange_request_1.HttpMethod.PATCH || http === orange_request_1.HttpMethod.PUT || http === orange_request_1.HttpMethod.POST) {
	        data = JSON.stringify(model.toJSON());
	    }
	    return request.end(data)
	        .then(function (res) {
	        if (!res.isValid) {
	            return res.text().then(function (t) { throw new HttpError(res.status, res.statusText, t); });
	        }
	        return res.json()
	            .then(function (json) {
	            return {
	                method: method,
	                status: res.status,
	                content: json,
	                headers: new orange_request_1.Headers(res.headers)
	            };
	        });
	    });
	}
	exports.sync = sync;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	var base_http_request_1 = __webpack_require__(20);
	var browser_fetch_1 = __webpack_require__(24);

	var HttpRequest = function (_base_http_request_1$) {
	    _inherits(HttpRequest, _base_http_request_1$);

	    function HttpRequest() {
	        _classCallCheck(this, HttpRequest);

	        return _possibleConstructorReturn(this, (HttpRequest.__proto__ || Object.getPrototypeOf(HttpRequest)).apply(this, arguments));
	    }

	    _createClass(HttpRequest, [{
	        key: '_fetch',
	        value: function _fetch(url, request) {
	            return browser_fetch_1.fetch(url, request);
	        }
	    }]);

	    return HttpRequest;
	}(base_http_request_1.BaseHttpRequest);

	exports.HttpRequest = HttpRequest;
	var utils_1 = __webpack_require__(21);
	exports.queryStringToParams = utils_1.queryStringToParams;
	exports.isValid = utils_1.isValid;
	exports.isNode = utils_1.isNode;
	exports.queryParam = utils_1.queryParam;
	__export(__webpack_require__(25));
	__export(__webpack_require__(22));
	__export(__webpack_require__(27));
	var base_http_request_2 = __webpack_require__(20);
	exports.HttpMethod = base_http_request_2.HttpMethod;
	exports.HttpError = base_http_request_2.HttpError;
	var base_http_request_3 = __webpack_require__(20);
	function get(url) {
	    return new HttpRequest(base_http_request_3.HttpMethod.GET, url);
	}
	exports.get = get;
	function post(url) {
	    return new HttpRequest(base_http_request_3.HttpMethod.POST, url);
	}
	exports.post = post;
	function put(url) {
	    return new HttpRequest(base_http_request_3.HttpMethod.PUT, url);
	}
	exports.put = put;
	function del(url) {
	    return new HttpRequest(base_http_request_3.HttpMethod.DELETE, url);
	}
	exports.del = del;
	function patch(url) {
	    return new HttpRequest(base_http_request_3.HttpMethod.PATCH, url);
	}
	exports.patch = patch;
	function head(url) {
	    return new HttpRequest(base_http_request_3.HttpMethod.HEAD, url);
	}
	exports.head = head;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var orange_1 = __webpack_require__(6);
	var utils_1 = __webpack_require__(21);
	var header_1 = __webpack_require__(22);
	(function (HttpMethod) {
	    HttpMethod[HttpMethod["GET"] = 0] = "GET";
	    HttpMethod[HttpMethod["PUT"] = 1] = "PUT";
	    HttpMethod[HttpMethod["POST"] = 2] = "POST";
	    HttpMethod[HttpMethod["DELETE"] = 3] = "DELETE";
	    HttpMethod[HttpMethod["HEAD"] = 4] = "HEAD";
	    HttpMethod[HttpMethod["PATCH"] = 5] = "PATCH";
	})(exports.HttpMethod || (exports.HttpMethod = {}));
	var HttpMethod = exports.HttpMethod;

	var HttpError = function (_Error) {
	    _inherits(HttpError, _Error);

	    function HttpError(response) {
	        _classCallCheck(this, HttpError);

	        var _this = _possibleConstructorReturn(this, (HttpError.__proto__ || Object.getPrototypeOf(HttpError)).call(this));

	        _this.response = response;
	        _this.status = response.status;
	        _this.statusText = response.statusText;
	        return _this;
	    }

	    return HttpError;
	}(Error);

	exports.HttpError = HttpError;

	var BaseHttpRequest = function () {
	    function BaseHttpRequest(_method, _url) {
	        _classCallCheck(this, BaseHttpRequest);

	        this._method = _method;
	        this._url = _url;
	        this._params = {};
	        this._headers = new header_1.Headers();
	        //private _body: any;
	        this._request = {};
	        if (!utils_1.isNode) {
	            this._headers.append('X-Requested-With', 'XMLHttpRequest');
	        }
	        this._request.method = HttpMethod[this._method];
	    }

	    _createClass(BaseHttpRequest, [{
	        key: 'uploadProgress',
	        value: function uploadProgress(fn) {
	            this._request.uploadProgress = fn;
	            return this;
	        }
	    }, {
	        key: 'downloadProgress',
	        value: function downloadProgress(fn) {
	            this._request.downloadProgress = fn;
	            return this;
	        }
	    }, {
	        key: 'header',
	        value: function header(field, value) {
	            if (orange_1.isString(field) && orange_1.isString(value)) {
	                this._headers.append(field, value);
	            } else if (orange_1.isObject(field)) {
	                for (var key in field) {
	                    this._headers.append(key, field[key]);
	                }
	            }
	            return this;
	        }
	    }, {
	        key: 'params',
	        value: function params(key, value) {
	            if (arguments.length === 1 && orange_1.isObject(key)) {
	                orange_1.extend(this._params, key);
	            } else if (arguments.length === 2) {
	                this._params[key] = value;
	            }
	            return this;
	        }
	    }, {
	        key: 'credentials',
	        value: function credentials(ret) {
	            this._request.credentials = ret;
	            return this;
	        }
	    }, {
	        key: 'json',
	        value: function json(data) {
	            var throwOnInvalid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            this.header('content-type', 'application/json; charset=utf-8');
	            if (!orange_1.isString(data)) {
	                data = JSON.stringify(data);
	            }
	            return this.end(data, throwOnInvalid).then(function (res) {
	                return res.json();
	            });
	        }
	    }, {
	        key: 'text',
	        value: function text(data) {
	            var throwOnInvalid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            return this.end(data, throwOnInvalid).then(function (r) {
	                return r.text();
	            });
	        }
	    }, {
	        key: 'end',
	        value: function end(data) {
	            var throwOnInvalid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            var url = this._url;
	            if (data && data === Object(data) && this._method == HttpMethod.GET /* && check for content-type */) {
	                    var sep = url.indexOf('?') === -1 ? '?' : '&';
	                    var d = sep + utils_1.queryParam(data);
	                    url += d;
	                    data = null;
	                } else {
	                this._request.body = data;
	            }
	            url = this._apply_params(url);
	            this._request.headers = this._headers;
	            return this._fetch(url, this._request).then(function (res) {
	                if (!res.isValid && throwOnInvalid) {
	                    throw new HttpError(res);
	                }
	                return res;
	            });
	        }
	    }, {
	        key: 'then',
	        value: function then(onFulfilled, onRejected) {
	            return this.end().then(onFulfilled, onRejected);
	        }
	    }, {
	        key: 'catch',
	        value: function _catch(onRejected) {
	            return this.end().catch(onRejected);
	        }
	    }, {
	        key: '_apply_params',
	        value: function _apply_params(url) {
	            var params = {};
	            var idx = url.indexOf('?');
	            if (idx > -1) {
	                params = orange_1.extend(params, utils_1.queryStringToParams(url.substr(idx + 1)));
	                url = url.substr(0, idx);
	            }
	            orange_1.extend(params, this._params);
	            if (!orange_1.isEmpty(params)) {
	                var sep = url.indexOf('?') === -1 ? '?' : '&';
	                url += sep + utils_1.queryParam(params);
	            }
	            return url;
	        }
	    }]);

	    return BaseHttpRequest;
	}();

	exports.BaseHttpRequest = BaseHttpRequest;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	exports.isNode = !new Function("try {return this===window;}catch(e){ return false;}")();
	function queryStringToParams(qs) {
	    var kvp,
	        k,
	        v,
	        ls,
	        params = {},
	        decode = decodeURIComponent;
	    var kvps = qs.split('&');
	    for (var i = 0, l = kvps.length; i < l; i++) {
	        var param = kvps[i];
	        kvp = param.split('='), k = kvp[0], v = kvp[1];
	        if (v == null) v = true;
	        k = decode(k), v = decode(v), ls = params[k];
	        if (Array.isArray(ls)) ls.push(v);else if (ls) params[k] = [ls, v];else params[k] = v;
	    }
	    return params;
	}
	exports.queryStringToParams = queryStringToParams;
	function queryParam(obj) {
	    return Object.keys(obj).reduce(function (a, k) {
	        a.push(k + '=' + encodeURIComponent(obj[k]));return a;
	    }, []).join('&');
	}
	exports.queryParam = queryParam;
	/*const fileProto = /^file:/;
	export function isValid(xhr, url) {
	    return (xhr.status >= 200 && xhr.status < 300) ||
	        (xhr.status === 304) ||
	        (xhr.status === 0 && fileProto.test(url)) ||
	        (xhr.status === 0 && window.location.protocol === 'file:')
	};*/
	function isValid(status) {
	    return status >= 200 && status < 300 || status === 304;
	}
	exports.isValid = isValid;
	;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var support_1 = __webpack_require__(23);
	function normalizeName(name) {
	    if (typeof name !== 'string') {
	        name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	}
	function normalizeValue(value) {
	    if (typeof value !== 'string') {
	        value = String(value);
	    }
	    return value;
	}
	// Build a destructive iterator for the value list
	function iteratorFor(items) {
	    var iterator = {
	        next: function next() {
	            var value = items.shift();
	            return { done: value === undefined, value: value };
	        }
	    };
	    if (support_1.default.iterable) {
	        iterator[Symbol.iterator] = function () {
	            return iterator;
	        };
	    }
	    return iterator;
	}

	var Headers = function () {
	    function Headers(headers) {
	        var _this = this;

	        _classCallCheck(this, Headers);

	        this.map = {};
	        if (headers instanceof Headers) {
	            var _loop = function _loop(key) {
	                headers.map[key].forEach(function (v) {
	                    return _this.append(key, v);
	                });
	            };

	            for (var key in headers.map) {
	                _loop(key);
	            }
	        } else if (headers) {
	            var names = Object.getOwnPropertyNames(headers);
	            for (var i = 0, ii = names.length; i < ii; i++) {
	                this.append(names[i], headers[names[i]]);
	            }
	        }
	    }

	    _createClass(Headers, [{
	        key: Symbol.iterator,
	        value: function value() {
	            return this.entries();
	        }
	    }, {
	        key: 'append',
	        value: function append(name, value) {
	            name = normalizeName(name);
	            value = normalizeValue(value);
	            var list = this.map[name];
	            if (!list) {
	                list = [];
	                this.map[name] = list;
	            }
	            list.push(value);
	        }
	    }, {
	        key: 'delete',
	        value: function _delete(name) {
	            delete this.map[normalizeName(name)];
	        }
	    }, {
	        key: 'get',
	        value: function get(name) {
	            var values = this.map[normalizeName(name)];
	            return values ? values[0] : null;
	        }
	    }, {
	        key: 'getAll',
	        value: function getAll(name) {
	            return this.map[normalizeName(name)] || [];
	        }
	    }, {
	        key: 'has',
	        value: function has(name) {
	            return this.map.hasOwnProperty(normalizeName(name));
	        }
	    }, {
	        key: 'set',
	        value: function set(name, value) {
	            this.map[normalizeName(name)] = [normalizeValue(value)];
	        }
	    }, {
	        key: 'forEach',
	        value: function forEach(callback, thisArg) {
	            Object.getOwnPropertyNames(this.map).forEach(function (name) {
	                this.map[name].forEach(function (value) {
	                    callback.call(thisArg, value, name, this);
	                }, this);
	            }, this);
	        }
	    }, {
	        key: 'keys',
	        value: function keys() {
	            var items = [];
	            this.forEach(function (value, name) {
	                items.push(name);
	            });
	            return iteratorFor(items);
	        }
	    }, {
	        key: 'values',
	        value: function values() {
	            var items = [];
	            this.forEach(function (value) {
	                items.push(value);
	            });
	            return iteratorFor(items);
	        }
	    }, {
	        key: 'entries',
	        value: function entries() {
	            var items = [];
	            this.forEach(function (value, name) {
	                items.push([name, value]);
	            });
	            return iteratorFor(items);
	        }
	    }]);

	    return Headers;
	}();

	exports.Headers = Headers;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var utils_1 = __webpack_require__(21);
	var self = utils_1.isNode ? global : window;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && function () {
	        try {
	            new Blob();
	            return true;
	        } catch (e) {
	            return false;
	        }
	    }(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var orange_1 = __webpack_require__(6);
	var header_1 = __webpack_require__(22);
	var request_1 = __webpack_require__(25);
	var base_response_1 = __webpack_require__(26);
	var support_1 = __webpack_require__(23);
	function headers(xhr) {
	    var head = new header_1.Headers();
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n');
	    for (var i = 0, ii = pairs.length; i < ii; i++) {
	        var split = pairs[i].trim().split(':');
	        var key = split.shift().trim();
	        var value = split.join(':').trim();
	        head.append(key, value);
	    }
	    return head;
	}

	var BrowserResponse = function (_base_response_1$Base) {
	    _inherits(BrowserResponse, _base_response_1$Base);

	    function BrowserResponse() {
	        _classCallCheck(this, BrowserResponse);

	        return _possibleConstructorReturn(this, (BrowserResponse.__proto__ || Object.getPrototypeOf(BrowserResponse)).apply(this, arguments));
	    }

	    _createClass(BrowserResponse, [{
	        key: 'clone',
	        value: function clone() {
	            return new BrowserResponse(this._body, {
	                status: this.status,
	                statusText: this.statusText,
	                headers: new header_1.Headers(this.headers),
	                url: this.url
	            });
	        }
	    }]);

	    return BrowserResponse;
	}(base_response_1.BaseResponse);

	function fetch(input, init) {
	    return new orange_1.Promise(function (resolve, reject) {
	        var request;
	        if (request_1.isRequest(input) && !init) {
	            request = input;
	        } else {
	            request = new request_1.Request(input, init);
	        }
	        init = init || {};
	        var xhr = orange_1.xmlHttpRequest();
	        function responseURL() {
	            if ('responseURL' in xhr) {
	                return xhr.responseURL;
	            }
	            // Avoid security warnings on getResponseHeader when not allowed by CORS
	            if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	                return xhr.getResponseHeader('X-Request-URL');
	            }
	            return;
	        }
	        xhr.onload = function () {
	            var options = {
	                status: xhr.status,
	                statusText: xhr.statusText,
	                headers: headers(xhr),
	                url: responseURL()
	            };
	            var body = 'response' in xhr ? xhr.response : xhr.responseText;
	            resolve(new BrowserResponse(body, options));
	        };
	        xhr.onerror = function () {
	            reject(new TypeError('Network request failed'));
	        };
	        xhr.ontimeout = function () {
	            reject(new TypeError('Network request failed: timeout'));
	        };
	        xhr.open(request.method, request.url, true);
	        if (request.credentials === 'include') {
	            xhr.withCredentials = true;
	        }
	        if ('responseType' in xhr && support_1.default.blob) {
	            xhr.responseType = 'blob';
	        }
	        request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value);
	        });
	        if (init.downloadProgress) {
	            xhr.onprogress = init.downloadProgress;
	        }
	        if (init.uploadProgress || xhr.upload) {
	            xhr.upload.onprogress = init.uploadProgress;
	        }
	        xhr.send(typeof request.body === 'undefined' ? null : request.body);
	    });
	}
	exports.fetch = fetch;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var header_1 = __webpack_require__(22);
	// HTTP methods whose capitalization should be normalized
	var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
	function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	}
	function isRequest(a) {
	    return Request.prototype.isPrototypeOf(a) || a instanceof Request;
	}
	exports.isRequest = isRequest;

	var Request = function () {
	    function Request(input) {
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        _classCallCheck(this, Request);

	        options = options || {};
	        var body = options.body;
	        if (isRequest(input)) {
	            this.url = input.url;
	            this.credentials = input.credentials;
	            if (!options.headers) {
	                this.headers = new header_1.Headers(options.headers);
	            }
	            this.method = input.method;
	            this.mode = input.mode;
	        } else {
	            this.url = input;
	        }
	        this.credentials = options.credentials || this.credentials || 'omit';
	        if (options.headers || !this.headers) {
	            this.headers = new header_1.Headers(options.headers);
	        }
	        this.method = normalizeMethod(options.method || this.method || 'GET');
	        this.mode = options.mode || this.mode || null;
	        this.referrer = null;
	        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	            throw new TypeError('Body not allowed for GET or HEAD requests');
	        }
	        this.body = body;
	    }

	    _createClass(Request, [{
	        key: 'clone',
	        value: function clone() {
	            return new Request(this);
	        }
	    }]);

	    return Request;
	}();

	exports.Request = Request;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var header_1 = __webpack_require__(22);
	var support_1 = __webpack_require__(23);
	var orange_1 = __webpack_require__(6);
	var utils_1 = __webpack_require__(21);
	var types_1 = __webpack_require__(27);
	function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	        if (bytes) {
	            var split = bytes.split('=');
	            var name = split.shift().replace(/\+/g, ' ');
	            var value = split.join('=').replace(/\+/g, ' ');
	            form.append(decodeURIComponent(name), decodeURIComponent(value));
	        }
	    });
	    return form;
	}
	function consumed(body) {
	    if (body.bodyUsed) {
	        return orange_1.Promise.reject(new TypeError('Already read'));
	    }
	    body._bodyUsed = true;
	}
	exports.consumed = consumed;
	function fileReaderReady(reader) {
	    return new orange_1.Promise(function (resolve, reject) {
	        reader.onload = function () {
	            resolve(reader.result);
	        };
	        reader.onerror = function () {
	            reject(reader.error);
	        };
	    });
	}
	function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    return fileReaderReady(reader);
	}
	function readBlobAsText(blob) {
	    var reader = new FileReader();
	    reader.readAsText(blob);
	    return fileReaderReady(reader);
	}
	//var redirectStatuses = [301, 302, 303, 307, 308]

	var BaseResponse = function () {
	    function BaseResponse(body, options) {
	        _classCallCheck(this, BaseResponse);

	        this._bodyUsed = false;
	        this._bodyType = types_1.BodyType.None;
	        options = options || {};
	        this.type = 'default';
	        this.status = options.status;
	        this.ok = this.status >= 200 && this.status < 300;
	        this.statusText = options.statusText;
	        this.headers = options.headers instanceof header_1.Headers ? options.headers : new header_1.Headers(options.headers);
	        this.url = options.url || '';
	        this._initBody(body);
	    }

	    _createClass(BaseResponse, [{
	        key: '_initBody',
	        value: function _initBody(body) {
	            if (typeof body === 'string' || support_1.default.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	                this._bodyType = types_1.BodyType.Text;
	            } else if (support_1.default.blob && Blob.prototype.isPrototypeOf(body)) {
	                this._bodyType = types_1.BodyType.Blob;
	            } else if (support_1.default.formData && FormData.prototype.isPrototypeOf(body)) {
	                this._bodyType = types_1.BodyType.FormData;
	            } else if (!body) {
	                this._bodyType = types_1.BodyType.None;
	            } else if (support_1.default.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {} else if (utils_1.isNode) {
	                this._bodyType = types_1.BodyType.Stream;
	            } else {
	                throw new Error('unsupported BodyType type');
	            }
	            this._body = body ? body : "";
	            if (!this.headers.get('content-type')) {
	                if (this._bodyType == types_1.BodyType.Text) {
	                    this.headers.set('content-type', 'text/plain; charset=UTF-8');
	                } else if (this._bodyType == types_1.BodyType.Blob && this._body.type) {
	                    this.headers.set('content-type', this._body.type);
	                } else if (support_1.default.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	                    this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	                }
	            }
	        }
	    }, {
	        key: 'text',
	        value: function text() {
	            if (this._bodyType == types_1.BodyType.Stream) {
	                return this.blob().then(function (n) {
	                    return n.toString();
	                });
	            }
	            var rejected = consumed(this);
	            if (rejected) return rejected;
	            if (this._bodyType == types_1.BodyType.Blob) {
	                return readBlobAsText(this._body);
	            } else if (this._bodyType == types_1.BodyType.FormData) {
	                throw new Error('could not read FormData body as text');
	            } else {
	                return orange_1.Promise.resolve(this._body);
	            }
	        }
	    }, {
	        key: 'arrayBuffer',
	        value: function arrayBuffer() {
	            return this.blob().then(readBlobAsArrayBuffer);
	        }
	    }, {
	        key: 'stream',
	        value: function stream() {
	            return this.blob();
	        }
	    }, {
	        key: 'blob',
	        value: function blob() {
	            if (!support_1.default.blob && !utils_1.isNode) {
	                return orange_1.Promise.reject(new Error("blob not supported"));
	            }
	            var rejected = consumed(this);
	            if (rejected) {
	                return rejected;
	            }
	            if (this._bodyType == types_1.BodyType.Blob) {
	                return orange_1.Promise.resolve(this._body);
	            } else if (this._bodyType == types_1.BodyType.FormData) {
	                orange_1.Promise.reject(new Error('could not read FormData body as blob'));
	            } else {
	                return orange_1.Promise.resolve(new Blob([this._body]));
	            }
	        }
	    }, {
	        key: 'formData',
	        value: function formData() {
	            if (!support_1.default.formData) {
	                return orange_1.Promise.reject(new Error("form data not supported"));
	            }
	            return this.text().then(decode);
	        }
	    }, {
	        key: 'json',
	        value: function json() {
	            return this.text().then(JSON.parse);
	        }
	    }, {
	        key: 'bodyUsed',
	        get: function get() {
	            return this._bodyUsed;
	        }
	    }, {
	        key: 'bodyType',
	        get: function get() {
	            return this._bodyType;
	        }
	    }, {
	        key: 'isValid',
	        get: function get() {
	            return utils_1.isValid(this.status);
	        }
	    }]);

	    return BaseResponse;
	}();

	exports.BaseResponse = BaseResponse;

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	(function (BodyType) {
	    BodyType[BodyType["Blob"] = 0] = "Blob";
	    BodyType[BodyType["Text"] = 1] = "Text";
	    BodyType[BodyType["FormData"] = 2] = "FormData";
	    BodyType[BodyType["Stream"] = 3] = "Stream";
	    BodyType[BodyType["None"] = 4] = "None";
	})(exports.BodyType || (exports.BodyType = {}));
	var BodyType = exports.BodyType;
	;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var collection_1 = __webpack_require__(3);
	var rest_collection_1 = __webpack_require__(16);
	var orange_1 = __webpack_require__(6);
	var persistence_1 = __webpack_require__(18);
	var orange_request_1 = __webpack_require__(19);
	var PARAM_TRIM_RE = /[\s'"]/g;
	var URL_TRIM_RE = /[<>\s'"]/g;
	function queryStringToParams(qs) {
	    var kvp, k, v, ls, params = {}, decode = decodeURIComponent;
	    var kvps = qs.split('&');
	    for (var i = 0, l = kvps.length; i < l; i++) {
	        var param = kvps[i];
	        kvp = param.split('='), k = kvp[0], v = kvp[1];
	        if (v == null)
	            v = true;
	        k = decode(k), v = decode(v), ls = params[k];
	        if (Array.isArray(ls))
	            ls.push(v);
	        else if (ls)
	            params[k] = [ls, v];
	        else
	            params[k] = v;
	    }
	    return params;
	}
	var PaginatedCollection = (function (_super) {
	    __extends(PaginatedCollection, _super);
	    function PaginatedCollection(models, options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this, models, options);
	        this._state = { first: 1, last: -1, current: 1, size: 10 };
	        this._link = {};
	        this.queryParams = {
	            page: 'page',
	            size: 'pageSize'
	        };
	        if (options.queryParams) {
	            orange_1.extend(this.queryParams, options.queryParams);
	        }
	        if (options.firstPage)
	            this._state.first = options.firstPage;
	        if (options.pageSize)
	            this._state.size = options.pageSize;
	        this._state.current = this._state.first;
	        this._page = new collection_1.Collection();
	        this._page.Model = this.Model;
	    }
	    Object.defineProperty(PaginatedCollection.prototype, "page", {
	        get: function () {
	            return this._page;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PaginatedCollection.prototype.hasNext = function () {
	        return this.hasPage(this._state.current + 1);
	    };
	    PaginatedCollection.prototype.hasPrevious = function () {
	        return this.hasPage(this._state.current - 1);
	    };
	    PaginatedCollection.prototype.hasPage = function (page) {
	        if (this._state.last > -1) {
	            return page <= this._state.last;
	        }
	        return false;
	    };
	    PaginatedCollection.prototype.getPreviousPage = function (options) {
	        options = options ? orange_1.extend({}, options) : {};
	        options.page = this._state.current - 1;
	        return this.getPage(options);
	    };
	    PaginatedCollection.prototype.getNextPage = function (options) {
	        options = options ? orange_1.extend({}, options) : {};
	        options.page = this._state.current + 1;
	        return this.getPage(options);
	    };
	    PaginatedCollection.prototype.getPage = function (options) {
	        options = options ? orange_1.extend({}, options) : {};
	        if (options.page === void 0)
	            return orange_1.Promise.reject(new Error("No page"));
	        if (this._state.last < options.page && this._state.last != -1) {
	            options.page = this._state.last;
	        }
	        else if (options.page < this._state.first) {
	            options.page = this._state.first;
	        }
	        return this.fetch(options);
	    };
	    PaginatedCollection.prototype.fetch = function (options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        options = options ? orange_1.extend({}, options) : {};
	        var url;
	        if (!orange_1.has(options, 'page')) {
	            options.page = this._state.current;
	        }
	        var params = options.params ? orange_1.extend({}, options.params) : {};
	        if (orange_1.has(params, this.queryParams.page))
	            delete params[this.queryParams.page];
	        url = this._link[options.page];
	        if (!url) {
	            url = this.getURL();
	        }
	        if (!url)
	            return orange_1.Promise.reject(new Error("no url specified"));
	        var idx = url.indexOf('?');
	        if (idx > -1) {
	            params = orange_1.extend(params, queryStringToParams(url.substr(idx + 1)));
	            url = url.substr(0, idx);
	        }
	        if (!orange_1.has(params, this.queryParams.page)) {
	            params[this.queryParams.page] = options.page;
	        }
	        options.params = params;
	        options.url = url;
	        this.trigger('before:fetch', this, options);
	        params[this.queryParams.size] = this._state.size;
	        if (!this._link[options.page + '']) {
	            this._link[options.page] = url + '?' + orange_request_1.queryParam({ page: options.page });
	        }
	        return this.sync(persistence_1.RestMethod.Read, this, options)
	            .then(function (resp) {
	            _this._processResponse(resp, options);
	            _this.trigger('fetch', _this, resp, options);
	            return _this;
	        }).catch(function (e) {
	            _this.trigger('error', e);
	            throw e;
	        });
	    };
	    PaginatedCollection.prototype._processResponse = function (resp, options) {
	        var currentPage = options.page;
	        var links = this._parseLinkHeaders(resp);
	        if (links.first)
	            this._link[this._state.first] = links.first;
	        if (links.prev)
	            this._link[currentPage - 1] = links.prev;
	        if (links.next)
	            this._link[currentPage + 1] = links.next;
	        if (links.last) {
	            var last = links.last;
	            var idx = last.indexOf('?');
	            if (idx > -1) {
	                var params = queryStringToParams(last.substr(idx + 1));
	                if (orange_1.has(params, this.queryParams.page)) {
	                    this._link[params[this.queryParams.page]] = last;
	                    this._state.last = parseInt(params[this.queryParams.page]);
	                }
	            }
	        }
	        this._state.current = currentPage;
	        var data = resp.content;
	        if (data && !Array.isArray(data))
	            data = [data];
	        if (!data)
	            return this;
	        data = this.parse(data);
	        for (var i = 0, ii = data.length; i < ii; i++) {
	            data[i] = this._prepareModel(data[i]);
	        }
	        this.add(data);
	        return this;
	    };
	    PaginatedCollection.prototype._parseLinkHeaders = function (resp) {
	        var link = {};
	        var linkHeader = resp.headers.get('Link');
	        if (!linkHeader)
	            return link;
	        linkHeader = linkHeader.split(',');
	        var relations = ['first', 'prev', 'next', 'last'];
	        for (var i = 0, ii = linkHeader.length; i < ii; i++) {
	            var linkParts = linkHeader[i].split(';'), url = linkParts[0].replace(URL_TRIM_RE, ''), params = linkParts.slice(1);
	            for (var x = 0, xx = params.length; x < xx; x++) {
	                var paramParts = params[x].split('='), key = paramParts[0].replace(PARAM_TRIM_RE, ''), value = paramParts[1].replace(PARAM_TRIM_RE, '');
	                if (key == 'rel' && !!~relations.indexOf(value))
	                    link[value] = url;
	            }
	        }
	        return link;
	    };
	    PaginatedCollection.prototype._reset = function () {
	        _super.prototype._reset.call(this);
	        this._state = { first: 1, last: -1, current: 1, size: this._state.size };
	        this._link = {};
	    };
	    return PaginatedCollection;
	}(rest_collection_1.RestCollection));
	exports.PaginatedCollection = PaginatedCollection;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var torsten_1 = __webpack_require__(30);

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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(31));
	__export(__webpack_require__(32));
	__export(__webpack_require__(39));
	var utils_1 = __webpack_require__(33);
	exports.readBlobAsText = utils_1.readBlobAsText;
	exports.readBlobAsArrayBuffer = utils_1.readBlobAsArrayBuffer;
	exports.readBlobAsDataURL = utils_1.readBlobAsDataURL;
	exports.path = utils_1.path;
	__export(__webpack_require__(38));

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var types_1 = __webpack_require__(32);
	var orange_1 = __webpack_require__(6);
	var utils_1 = __webpack_require__(33);
	var file_info_1 = __webpack_require__(38);
	var error_1 = __webpack_require__(39);
	var request = __webpack_require__(40);
	var orange_request_1 = __webpack_require__(19);
	function validateConfig(options) {
	    if (options == null) throw error_1.createError(0, "options");
	    if (options.endpoint == null) throw error_1.createError(0, "needs endpoint");
	}

	var TorstenClient = function () {
	    function TorstenClient(options) {
	        _classCallCheck(this, TorstenClient);

	        validateConfig(options);
	        this._options = options;
	        if (options.token) this.token = options.token;
	    }

	    _createClass(TorstenClient, [{
	        key: "create",
	        value: function create(path, data) {
	            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	            this._check_token();
	            if (data == null) return Promise.reject(error_1.createError(error_1.ErrorCode.NullData, "no data"));
	            var req = orange_1.extend({}, options, {
	                token: this.token,
	                data: data
	            });
	            if (options.mode) {
	                (req.params = req.params || {}).mode = options.mode;
	            }
	            if (options.meta) {
	                (req.params = req.params || {}).meta = JSON.stringify(options.meta);
	            }
	            return request.request(orange_request_1.HttpMethod.POST, this._toUrl(path), req).then(getResponse).then(function (res) {
	                return res.json();
	            }).then(function (json) {
	                if (json.message != types_1.constants.MessageOK) {
	                    throw error_1.createError(error_1.ErrorCode.Unknown, "invalid response: " + json.message);
	                }
	                return new file_info_1.FileInfo(json.data);
	            });
	        }
	    }, {
	        key: "stat",
	        value: function stat(path) {
	            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	            this._check_token();
	            var url = this._toUrl(path);
	            return request.request(orange_request_1.HttpMethod.GET, url, {
	                progress: options.progress,
	                params: { stat: true },
	                token: this._token
	            }).then(getResponse).then(function (res) {
	                return res.json();
	            }).then(function (i) {
	                return new file_info_1.FileInfo(i.data);
	            });
	        }
	    }, {
	        key: "statById",
	        value: function statById(id) {
	            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	            this._check_token();
	            return request.request(orange_request_1.HttpMethod.GET, this._toUrl('/'), {
	                progress: options.progress,
	                params: { stat: true, id: id },
	                token: this._token
	            }).then(getResponse).then(function (res) {
	                return res.json();
	            }).then(function (i) {
	                return new file_info_1.FileInfo(i.data);
	            });
	        }
	    }, {
	        key: "list",
	        value: function list(path) {
	            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	            this._check_token();
	            var req = request.request(orange_request_1.HttpMethod.GET, this._toUrl(path), orange_1.extend({}, options, {
	                token: this._token
	            }));
	            return req.then(getResponse).then(function (res) {
	                return res.json();
	            }).then(function (infos) {
	                if (infos.message != 'ok') return [];
	                return infos.data.map(function (i) {
	                    return new file_info_1.FileInfo(i);
	                });
	            });
	        }
	    }, {
	        key: "open",
	        value: function open(path) {
	            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	            this._check_token();
	            var r = {
	                progress: options.progress,
	                token: this.token
	            };
	            if (options.thumbnail) {
	                r.params = r.params || {};
	                r.params.thumbnail = true;
	            }
	            var p = void 0;
	            if (path instanceof file_info_1.FileInfo) {
	                p = path.fullPath;
	            } else {
	                p = path;
	            }
	            return request.request(orange_request_1.HttpMethod.GET, this._toUrl(p), r).then(function (r) {
	                return utils_1.isNode ? r.stream() : r.blob();
	            });
	        }
	    }, {
	        key: "remove",
	        value: function remove(path) {
	            this._check_token();
	            var url = this._toUrl(path);
	            return request.request(orange_request_1.HttpMethod.DELETE, url, {
	                token: this.token
	            }).then(getResponse).then(function (res) {
	                return res.json();
	            });
	        }
	    }, {
	        key: "_toUrl",
	        value: function _toUrl(path) {
	            if (path == null) {
	                throw new Error('no path');
	            }
	            if (path.substr(0, 1) != "/") {
	                path = "/" + path;
	            }
	            path = "/v1" + path;
	            return this._options.endpoint + path;
	        }
	    }, {
	        key: "_check_token",
	        value: function _check_token() {
	            if (!this.token) throw error_1.createError(0, "no token");
	        }
	    }, {
	        key: "token",
	        set: function set(token) {
	            this._token = token;
	        },
	        get: function get() {
	            return this._token;
	        }
	    }, {
	        key: "endpoint",
	        get: function get() {
	            return this._options.endpoint;
	        }
	    }]);

	    return TorstenClient;
	}();

	exports.TorstenClient = TorstenClient;
	function getResponse(res) {
	    if (!res.isValid) {
	        switch (res.status) {
	            case error_1.ErrorCode.NotFound:
	                return Promise.reject(error_1.createError(error_1.ErrorCode.NotFound, "Not Found"));
	            case error_1.ErrorCode.AlreadyExists:
	                return Promise.reject(error_1.createError(error_1.ErrorCode.AlreadyExists, "Already Exists"));
	            case error_1.ErrorCode.Unauthorized:
	                return Promise.reject(error_1.createError(error_1.ErrorCode.Unauthorized, "Unauthorized"));
	        }
	        if (/text\/plain/.test(res.headers.get('Content-Type'))) {
	            return res.text().then(function (t) {
	                return Promise.reject(error_1.createError(error_1.ErrorCode.Unknown, t));
	            });
	        } else if (/application\/json/.test(res.headers.get('Content-Type'))) {
	            return res.json().then(function (json) {
	                return Promise.reject(new error_1.TorstenJSONError(error_1.ErrorCode.Unknown, "Unknown JSON Response", json));
	            });
	        }
	    }
	    return Promise.resolve(res);
	}

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";

	var FileMode;
	(function (FileMode) {
	    FileMode[FileMode["UserRead"] = 256] = "UserRead";
	    FileMode[FileMode["UserWrite"] = 128] = "UserWrite";
	    FileMode[FileMode["UserDelete"] = 64] = "UserDelete";
	    FileMode[FileMode["GroupRead"] = 32] = "GroupRead";
	    FileMode[FileMode["GroupWrite"] = 16] = "GroupWrite";
	    FileMode[FileMode["GroupDelete"] = 8] = "GroupDelete";
	    FileMode[FileMode["OtherRead"] = 4] = "OtherRead";
	    FileMode[FileMode["OtherWriter"] = 2] = "OtherWriter";
	    FileMode[FileMode["OtherDelete"] = 0] = "OtherDelete";
	})(FileMode = exports.FileMode || (exports.FileMode = {}));
	;
	var constants;
	(function (constants) {
	    constants.MessageOK = "ok";
	})(constants = exports.constants || (exports.constants = {}));

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var orange_1 = __webpack_require__(6);
	exports.isNode = !new Function("try {return this===window;}catch(e){ return false;}")();
	var orange_2 = __webpack_require__(6);
	exports.isObject = orange_2.isObject;
	exports.isString = orange_2.isString;
	exports.isFunction = orange_2.isFunction;
	function isBuffer(a) {
	    if (exports.isNode) Buffer.isBuffer(a);
	    return false;
	}
	exports.isBuffer = isBuffer;
	function isFormData(a) {
	    if (exports.isNode) return false;
	    return a instanceof FormData;
	}
	exports.isFormData = isFormData;
	function isReadableStream(a) {
	    if (typeof a.read === 'function' && typeof a.pipe === 'function') {
	        return true;
	    }
	    return false;
	}
	exports.isReadableStream = isReadableStream;
	function isFile(a) {
	    if (exports.isNode) return false;
	    if (a instanceof File) return true;
	    return false;
	}
	exports.isFile = isFile;
	function fileReaderReady(reader) {
	    return new orange_1.Promise(function (resolve, reject) {
	        reader.onload = function () {
	            resolve(reader.result);
	        };
	        reader.onerror = function () {
	            reject(reader.error);
	        };
	    });
	}
	exports.fileReaderReady = fileReaderReady;
	function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    return fileReaderReady(reader);
	}
	exports.readBlobAsArrayBuffer = readBlobAsArrayBuffer;
	function readBlobAsText(blob) {
	    var reader = new FileReader();
	    reader.readAsText(blob);
	    return fileReaderReady(reader);
	}
	exports.readBlobAsText = readBlobAsText;
	function readBlobAsDataURL(blob) {
	    var reader = new FileReader();
	    reader.readAsDataURL(blob);
	    return fileReaderReady(reader);
	}
	exports.readBlobAsDataURL = readBlobAsDataURL;
	var path;
	(function (path_1) {
	    path_1.DELIMITER = "/";
	    function join() {
	        var out = [];

	        for (var _len = arguments.length, parts = Array(_len), _key = 0; _key < _len; _key++) {
	            parts[_key] = arguments[_key];
	        }

	        for (var i = 0, ii = parts.length; i < ii; i++) {
	            var s = 0,
	                e = parts[i].length;
	            if (parts[i] === path_1.DELIMITER || parts[i] === '') continue;
	            if (parts[i][0] === path_1.DELIMITER) s = 1;
	            if (parts[i][e - 1] === path_1.DELIMITER) e--;
	            out.push(parts[i].substring(s, e));
	        }
	        return path_1.DELIMITER + out.join(path_1.DELIMITER);
	    }
	    path_1.join = join;
	    function base(path) {
	        if (!path) return "";
	        var split = path.split(path_1.DELIMITER);
	        return split[split.length - 1];
	    }
	    path_1.base = base;
	    function dir(path) {
	        if (!path) return "";
	        var split = path.split(path_1.DELIMITER);
	        split.pop();
	        return join.apply(undefined, _toConsumableArray(split));
	    }
	    path_1.dir = dir;
	})(path = exports.path || (exports.path = {}));
	var filemode;
	(function (filemode) {
	    function toString(m) {
	        var str = "dalTLDpSugct";
	        var buf = new Array(32);
	        //var buf [32]byte // Mode is uint32.
	        var w = 0;
	        for (var i = 0, ii = str.length; i < ii; i++) {
	            var c = str[i];
	            if ((m & 1 << 32 - 1 - i) != 0) {
	                buf[w] = c;
	                w++;
	            }
	        }
	        if (w == 0) {
	            buf[w] = '-';
	            w++;
	        }
	        var rwx = "rwxrwxrwx";
	        for (var _i = 0, _ii = rwx.length; _i < _ii; _i++) {
	            var _c = str[_i];
	            if ((m & 1 << 9 - 1 - _i) != 0) {
	                buf[w] = _c;
	            } else {
	                buf[w] = '-';
	            }
	            w++;
	        }
	        return buf.slice(0, w).join('');
	    }
	    filemode.toString = toString;
	})(filemode = exports.filemode || (exports.filemode = {}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34).Buffer))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(35)
	var ieee754 = __webpack_require__(36)
	var isArray = __webpack_require__(37)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr(len * 3 / 4 - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ },
/* 36 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 37 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var orange_1 = __webpack_require__(6);
	var props = ['name', 'mime', 'size', 'ctime', 'mtime', 'mode', 'gid', 'uid', 'meta', 'path', 'is_dir', 'hidden', 'id'];

	var FileInfo = function () {
	    _createClass(FileInfo, [{
	        key: "fullPath",
	        get: function get() {
	            return this.path + this.name;
	        }
	    }]);

	    function FileInfo() {
	        var _this = this;

	        var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, FileInfo);

	        props.forEach(function (m) {
	            if (orange_1.has(attr, m)) {
	                _this[m] = attr[m];
	            } else {
	                if (m == 'meta') {
	                    _this.meta = {};
	                } else {
	                    throw new Error("property: " + m + " does not exists");
	                }
	            }
	        });
	        if (!(this.ctime instanceof Date)) {
	            this.ctime = new Date(this.ctime);
	        }
	        if (!(this.mtime instanceof Date)) {
	            this.mtime = new Date(this.mtime);
	        }
	    }

	    _createClass(FileInfo, [{
	        key: "toString",
	        value: function toString() {
	            return "FileInfo(name=" + this.name + ", mime=" + this.mime + ")";
	        }
	    }]);

	    return FileInfo;
	}();

	exports.FileInfo = FileInfo;

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ErrorCode;
	(function (ErrorCode) {
	    ErrorCode[ErrorCode["AlreadyExists"] = 409] = "AlreadyExists";
	    ErrorCode[ErrorCode["NotFound"] = 404] = "NotFound";
	    ErrorCode[ErrorCode["Unauthorized"] = 401] = "Unauthorized";
	    ErrorCode[ErrorCode["Unknown"] = 500] = "Unknown";
	    ErrorCode[ErrorCode["NullData"] = 600] = "NullData";
	})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));

	var TorstenClientError = function (_Error) {
	    _inherits(TorstenClientError, _Error);

	    function TorstenClientError(code, message) {
	        _classCallCheck(this, TorstenClientError);

	        var _this = _possibleConstructorReturn(this, (TorstenClientError.__proto__ || Object.getPrototypeOf(TorstenClientError)).call(this, message));

	        _this.code = code;
	        _this.message = message;
	        return _this;
	    }

	    _createClass(TorstenClientError, [{
	        key: "toJSON",
	        value: function toJSON() {
	            return {
	                message: this.message,
	                code: this.code
	            };
	        }
	    }]);

	    return TorstenClientError;
	}(Error);

	exports.TorstenClientError = TorstenClientError;

	var TorstenJSONError = function (_TorstenClientError) {
	    _inherits(TorstenJSONError, _TorstenClientError);

	    function TorstenJSONError(code, message, json) {
	        _classCallCheck(this, TorstenJSONError);

	        var _this2 = _possibleConstructorReturn(this, (TorstenJSONError.__proto__ || Object.getPrototypeOf(TorstenJSONError)).call(this, code, message));

	        _this2.json = json;
	        return _this2;
	    }

	    _createClass(TorstenJSONError, [{
	        key: "toJSON",
	        value: function toJSON() {
	            return {
	                code: this.code,
	                message: this.message,
	                data: this.json
	            };
	        }
	    }]);

	    return TorstenJSONError;
	}(TorstenClientError);

	exports.TorstenJSONError = TorstenJSONError;
	function createError(code, msg) {
	    return new TorstenClientError(code, msg);
	}
	exports.createError = createError;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var orange_request_1 = __webpack_require__(19);
	var utils_1 = __webpack_require__(33);
	function request(method, url, r) {
	    var req = new orange_request_1.HttpRequest(method, url);
	    if (r.params) req.params(r.params);
	    if (r.headers) req.header(r.headers);
	    if (utils_1.isNode) {
	        req.header("User-Agent", "torsten-client/0.0.1");
	    }
	    req.header("Authorization", "Bearer " + r.token);
	    if (method === orange_request_1.HttpMethod.POST || method === orange_request_1.HttpMethod.PUT) {
	        req.uploadProgress(r.progress);
	        return _upload(req, r);
	    }
	    return req.downloadProgress(r.progress).end(r.data).then(function (res) {
	        return res;
	    });
	}
	exports.request = request;
	function _upload(req, options) {
	    var mimeType = void 0,
	        length = void 0,
	        data = options.data;
	    if (utils_1.isString(data)) {
	        length = data.length;
	        mimeType = options.mime || "text/plain";
	    } else if (utils_1.isBuffer(data)) {
	        length = data.length;
	        mimeType = options.mime || "text/plain";
	    } else if (utils_1.isObject(data) && !utils_1.isFile(data) && !utils_1.isFormData(data) && !utils_1.isReadableStream(data)) {
	        try {
	            data = JSON.stringify(data);
	            length = data.length;
	            mimeType = "application/json";
	        } catch (e) {
	            return Promise.reject(e);
	        }
	    }
	    if (length) {
	        req.header('Content-Length', "" + length);
	    }
	    if (utils_1.isFile(data)) {
	        var form = new FormData();
	        form.append('file', data);
	        data = form;
	    }
	    if (mimeType && !utils_1.isFormData(data)) {
	        req.header('Content-Type', mimeType);
	    }
	    return req.end(data);
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var eventsjs_1 = __webpack_require__(5);
	var orange_1 = __webpack_require__(6);
	var Debug = __webpack_require__(42);
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(44);
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
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window && typeof window.process !== 'undefined' && window.process.type === 'renderer') {
	    return true;
	  }

	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && document && 'WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (typeof window !== 'undefined' && window && window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
	    // double check webkit in userAgent just in case we are in a worker
	    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return;

	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit')

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
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
	  try {
	    return exports.storage.debug;
	  } catch(e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (typeof process !== 'undefined' && 'env' in process) {
	    return process.env.DEBUG;
	  }
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

	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)))

/***/ },
/* 43 */
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = createDebug.debug = createDebug.default = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(45);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */

	exports.formatters = {};

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */

	function selectColor(namespace) {
	  var hash = 0, i;

	  for (i in namespace) {
	    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
	    hash |= 0; // Convert to 32bit integer
	  }

	  return exports.colors[Math.abs(hash) % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function createDebug(namespace) {

	  function debug() {
	    // disabled?
	    if (!debug.enabled) return;

	    var self = debug;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // turn the `arguments` into a proper Array
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %O
	      args.unshift('%O');
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
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

	    // apply env-specific formatting (colors, etc.)
	    exports.formatArgs.call(self, args);

	    var logFn = debug.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }

	  debug.namespace = namespace;
	  debug.enabled = exports.enabled(namespace);
	  debug.useColors = exports.useColors();
	  debug.color = selectColor(namespace);

	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
	    exports.init(debug);
	  }

	  return debug;
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
	    namespaces = split[i].replace(/\*/g, '.*?');
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
/* 45 */
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(47));
	__export(__webpack_require__(62));
	__export(__webpack_require__(66));

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var views_1 = __webpack_require__(48);
	var orange_dom_1 = __webpack_require__(51);
	var orange_1 = __webpack_require__(6);
	var list_item_1 = __webpack_require__(62);
	var circular_progress_1 = __webpack_require__(66);
	exports.FileListEmptyView = views_1.View.extend({
	    className: 'file-list-empty-view',
	    template: 'No files uploaded yet.'
	});
	var FileListView = function (_views_1$CollectionVi) {
	    _inherits(FileListView, _views_1$CollectionVi);

	    function FileListView(options) {
	        _classCallCheck(this, FileListView);

	        var _this = _possibleConstructorReturn(this, (FileListView.__proto__ || Object.getPrototypeOf(FileListView)).call(this, options));

	        _this.filter = function () {
	            return true;
	        };
	        _this.options = options || { client: null };
	        _this.sort = false;
	        _this._onSroll = throttle(orange_1.bind(_this._onSroll, _this), 0);
	        orange_1.extend(_this, orange_1.pick(options, ['filter', 'only']));
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
	        key: "renderChildView",
	        value: function renderChildView(view, index) {
	            var model = view.model;
	            if (this.only) {
	                var valid = false;
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = this.only[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var o = _step.value;

	                        if (new RegExp(o).test(model.get('mime'))) {
	                            valid = true;
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }

	                if (valid == false) return;
	            }
	            if (this.filter(model)) {
	                return _get(FileListView.prototype.__proto__ || Object.getPrototypeOf(FileListView.prototype), "renderChildView", this).call(this, view, index);
	            }
	        }
	    }, {
	        key: "onRenderCollection",
	        value: function onRenderCollection() {
	            this.loadImages();
	        }
	    }, {
	        key: "filterChildren",
	        value: function filterChildren() {
	            if (typeof this.filter !== 'function') return;
	            for (var i = 0, ii = this.children.length; i < ii; i++) {
	                this.children[i].el.style.display = this.filter(this.children[i].model) ? 'block' : 'none';
	            }
	        }
	    }, {
	        key: "onRenderChild",
	        value: function onRenderChild(view, index) {
	            if (view.model.get('is_dir') && !this.options.showDirectories) {
	                view.el.style.display = 'none';
	            } else {
	                view.el.style.display = 'block';
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
	                orange_dom_1.addClass(img, 'loading');
	                img.onload = function () {
	                    orange_dom_1.removeClass(parent, 'loading');
	                    orange_dom_1.addClass(parent, 'loaded');
	                    orange_dom_1.addClass(img, 'loaded');
	                    orange_dom_1.removeClass(img, 'loading');
	                };
	                img.onerror = function () {
	                    orange_dom_1.removeClass(parent, 'loading');
	                    orange_dom_1.addClass(parent, 'load-error');
	                    orange_dom_1.removeClass(img, 'loading');
	                    orange_dom_1.addClass(img, 'load-error');
	                };
	                img.src = _this4.options.client.endpoint + "/v1" + img.getAttribute('data-src') + '?token=' + _this4.options.client.token + "&thumbnail=true";
	            };
	            var images = this.el.querySelectorAll('img:not(.loaded):not(.loading):not(.load-error)');
	            console.log(images.length);
	            for (var i = 0, ii = Math.min(50, images.length); i < ii; i++) {
	                var img = images[i];
	                if (orange_dom_1.hasClass(img.parentElement, "loading") || orange_dom_1.hasClass(img.parentElement, "load-error")) {
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var baseview_1 = __webpack_require__(49);
	__export(__webpack_require__(50));
	__export(__webpack_require__(49));
	__export(__webpack_require__(56));
	__export(__webpack_require__(57));
	__export(__webpack_require__(58));
	__export(__webpack_require__(59));
	__export(__webpack_require__(60));
	__export(__webpack_require__(61));
	exports.Version = '0.3.4';
	function debug(debug) {
	    if (window.localStorage) {
	        window.localStorage['debug'] = debug ? "views:*" : '';
	    }
	}
	exports.debug = debug;
	//export {Collection, ICollection,IModel,Model} from 'collection'
	function isView(a) {
	    return a instanceof baseview_1.BaseView;
	}
	exports.isView = isView;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Debug = __webpack_require__(42);
	var debug = Debug('views:baseview');
	var object_1 = __webpack_require__(50);
	var orange_1 = __webpack_require__(6);
	var orange_dom_1 = __webpack_require__(51);
	var util_1 = __webpack_require__(55);
	var paddedLt = /^\s*</;
	var unbubblebles = 'focus blur change'.split(' ');
	var viewOptions = ['el', 'id', 'attributes', 'className', 'tagName', 'events', 'triggers', 'ui'];
	var BaseView = (function (_super) {
	    __extends(BaseView, _super);
	    /**
	     * BaseView
	     * @param {BaseViewOptions} options
	     * @extends BaseObject
	     */
	    function BaseView(options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this);
	        this._cid = orange_1.uniqueId('view');
	        orange_1.extend(this, orange_1.pick(options, viewOptions));
	        this._domEvents = [];
	        if (this.el == null) {
	            this._ensureElement();
	        }
	    }
	    BaseView.find = function (selector, context) {
	        return context.querySelectorAll(selector);
	    };
	    Object.defineProperty(BaseView.prototype, "cid", {
	        get: function () {
	            return this._cid;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Delegate events
	     * @param {EventsMap} events
	     */
	    BaseView.prototype.delegateEvents = function (events) {
	        var _this = this;
	        this._bindUIElements();
	        events = events || orange_1.result(this, 'events');
	        events = util_1.normalizeUIKeys(events, this._ui);
	        var triggers = this._configureTriggers();
	        events = orange_1.extend({}, events, triggers);
	        debug('%s delegate events %j', this, events);
	        if (!events)
	            return this;
	        //if (!(events || (events = result(this, 'events')))) return this;
	        //this.undelegateEvents();
	        var dels = [];
	        for (var key in events) {
	            var method = events[key];
	            if (typeof method !== 'function')
	                method = this[method];
	            var match = key.match(/^(\S+)\s*(.*)$/);
	            // Set delegates immediately and defer event on this.el
	            var boundFn = orange_1.bind(method, this);
	            if (match[2]) {
	                this.delegate(match[1], match[2], boundFn);
	            }
	            else {
	                dels.push([match[1], boundFn]);
	            }
	        }
	        dels.forEach(function (d) { _this.delegate(d[0], d[1]); });
	        return this;
	    };
	    /**
	     * Undelegate events
	     */
	    BaseView.prototype.undelegateEvents = function () {
	        this._unbindUIElements();
	        debug('%s undelegate events', this);
	        if (this.el) {
	            for (var i = 0, len = this._domEvents.length; i < len; i++) {
	                var item = this._domEvents[i];
	                orange_dom_1.removeEventListener(this.el, item.eventName, item.handler);
	            }
	            this._domEvents.length = 0;
	        }
	        return this;
	    };
	    BaseView.prototype.delegate = function (eventName, selector, listener) {
	        if (typeof selector === 'function') {
	            listener = selector;
	            selector = null;
	        }
	        var root = this.el;
	        var handler = selector ? function (e) {
	            var node = e.target || e.srcElement;
	            // Already handled
	            if (e.delegateTarget)
	                return;
	            for (; node && node != root; node = node.parentNode) {
	                if (orange_dom_1.matches(node, selector)) {
	                    e.delegateTarget = node;
	                    listener(e);
	                }
	            }
	        } : function (e) {
	            if (e.delegateTarget)
	                return;
	            listener(e);
	        };
	        /*jshint bitwise: false*/
	        var useCap = !!~unbubblebles.indexOf(eventName) && selector != null;
	        debug('%s delegate event %s ', this, eventName);
	        orange_dom_1.addEventListener(this.el, eventName, handler, useCap);
	        this._domEvents.push({ eventName: eventName, handler: handler, listener: listener, selector: selector });
	        return handler;
	    };
	    BaseView.prototype.undelegate = function (eventName, selector, listener) {
	        if (typeof selector === 'function') {
	            listener = selector;
	            selector = null;
	        }
	        if (this.el) {
	            var handlers = this._domEvents.slice();
	            for (var i = 0, len = handlers.length; i < len; i++) {
	                var item = handlers[i];
	                var match = item.eventName === eventName &&
	                    (listener ? item.listener === listener : true) &&
	                    (selector ? item.selector === selector : true);
	                if (!match)
	                    continue;
	                orange_dom_1.removeEventListener(this.el, item.eventName, item.handler);
	                this._domEvents.splice(orange_1.indexOf(handlers, item), 1);
	            }
	        }
	        return this;
	    };
	    BaseView.prototype.render = function (options) {
	        this.undelegateEvents();
	        this.delegateEvents();
	        return this;
	    };
	    /**
	     * Append the view to a HTMLElement
	     * @param {HTMLElement|string} elm A html element or a selector string
	     * @return {this} for chaining
	     */
	    BaseView.prototype.appendTo = function (elm) {
	        if (elm instanceof HTMLElement) {
	            elm.appendChild(this.el);
	        }
	        else {
	            var el = document.querySelector(elm);
	            el ? el.appendChild(this.el) : void 0;
	        }
	        return this;
	    };
	    /**
	     * Append a element the view
	     * @param {HTMLElement} elm
	     * @param {String} toSelector
	     * @return {this} for chaining
	     */
	    BaseView.prototype.append = function (elm, toSelector) {
	        if (toSelector != null) {
	            var ret = this.$(toSelector);
	            if (ret instanceof NodeList && ret.length > 0) {
	                ret[0].appendChild(elm);
	            }
	            else if (ret instanceof HTMLElement) {
	                ret.appendChild(elm);
	            }
	        }
	        else {
	            this.el.appendChild(elm);
	        }
	        return this;
	    };
	    /**
	     * Convience for view.el.querySelectorAll()
	     * @param {string|HTMLElement} selector
	     */
	    BaseView.prototype.$ = function (selector) {
	        if (selector instanceof HTMLElement) {
	            return selector;
	        }
	        else {
	            return BaseView.find(selector, this.el);
	        }
	    };
	    BaseView.prototype.setElement = function (elm, trigger) {
	        if (trigger === void 0) { trigger = true; }
	        this.triggerMethod('before:set:element');
	        if (trigger)
	            this.undelegateEvents();
	        this._setElement(elm);
	        if (trigger)
	            this.delegateEvents();
	        this.triggerMethod('set:element');
	    };
	    BaseView.prototype.remove = function () {
	        this._removeElement();
	        return this;
	    };
	    BaseView.prototype.destroy = function () {
	        if (this.isDestroyed)
	            return;
	        this.remove();
	        _super.prototype.destroy.call(this);
	        return this;
	    };
	    // PRIVATES
	    /**
	     * Bind ui elements
	     * @private
	     */
	    BaseView.prototype._bindUIElements = function () {
	        var _this = this;
	        var ui = this.getOption('ui'); //this.options.ui||this.ui
	        if (!ui)
	            return;
	        if (!this._ui) {
	            this._ui = ui;
	        }
	        ui = orange_1.result(this, '_ui');
	        this.ui = {};
	        Object.keys(ui).forEach(function (k) {
	            var elm = _this.$(ui[k]);
	            if (elm && elm.length) {
	                // unwrap if it's a nodelist.
	                if (elm instanceof NodeList) {
	                    elm = elm[0];
	                }
	                debug('%s added ui element %s %s', _this, k, ui[k]);
	                _this.ui[k] = elm;
	            }
	            else {
	                debug('%s ui element not found ', _this, k, ui[k]);
	            }
	        });
	    };
	    /**
	     * Unbind ui elements
	     * @private
	     */
	    BaseView.prototype._unbindUIElements = function () {
	    };
	    /**
	     * Configure triggers
	     * @return {Object} events object
	     * @private
	     */
	    BaseView.prototype._configureTriggers = function () {
	        var triggers = this.getOption('triggers') || {};
	        if (typeof triggers === 'function') {
	            triggers = triggers.call(this);
	        }
	        // Allow `triggers` to be configured as a function
	        triggers = util_1.normalizeUIKeys(triggers, this._ui);
	        // Configure the triggers, prevent default
	        // action and stop propagation of DOM events
	        var events = {}, val, key;
	        for (key in triggers) {
	            val = triggers[key];
	            debug('%s added trigger %s %s', this, key, val);
	            events[key] = this._buildViewTrigger(val);
	        }
	        return events;
	    };
	    /**
	     * builder trigger function
	     * @param  {Object|String} triggerDef Trigger definition
	     * @return {Function}
	     * @private
	     */
	    BaseView.prototype._buildViewTrigger = function (triggerDef) {
	        if (typeof triggerDef === 'string')
	            triggerDef = { event: triggerDef };
	        var options = orange_1.extend({
	            preventDefault: true,
	            stopPropagation: true
	        }, triggerDef);
	        return function (e) {
	            if (e) {
	                if (e.preventDefault && options.preventDefault) {
	                    e.preventDefault();
	                }
	                if (e.stopPropagation && options.stopPropagation) {
	                    e.stopPropagation();
	                }
	            }
	            this.triggerMethod(options.event, {
	                view: this,
	                model: this.model,
	                collection: this.collection
	            });
	        };
	    };
	    BaseView.prototype._createElement = function (tagName) {
	        return document.createElement(tagName);
	    };
	    BaseView.prototype._ensureElement = function () {
	        if (!this.el) {
	            var attrs = orange_1.extend({}, orange_1.result(this, 'attributes'));
	            if (this.id)
	                attrs.id = orange_1.result(this, 'id');
	            if (this.className)
	                attrs['class'] = orange_1.result(this, 'className');
	            debug('%s created element: %s', this, orange_1.result(this, 'tagName') || 'div');
	            this.setElement(this._createElement(orange_1.result(this, 'tagName') || 'div'), false);
	            this._setAttributes(attrs);
	        }
	        else {
	            this.setElement(orange_1.result(this, 'el'), false);
	        }
	    };
	    BaseView.prototype._removeElement = function () {
	        this.undelegateEvents();
	        if (this.el.parentNode)
	            this.el.parentNode.removeChild(this.el);
	    };
	    BaseView.prototype._setElement = function (element) {
	        if (typeof element === 'string') {
	            if (paddedLt.test(element)) {
	                var el = document.createElement('div');
	                el.innerHTML = element;
	                this.el = el.firstElementChild;
	            }
	            else {
	                this.el = document.querySelector(element);
	            }
	        }
	        else {
	            this.el = element;
	        }
	    };
	    BaseView.prototype._setAttributes = function (attrs) {
	        for (var attr in attrs) {
	            attr in this.el ? this.el[attr] = attrs[attr] : this.el.setAttribute(attr, attrs[attr]);
	        }
	    };
	    BaseView.prototype.toString = function () {
	        return "[" + (this.name || 'View') + ": " + this.cid + "]";
	    };
	    return BaseView;
	}(object_1.BaseObject));
	exports.BaseView = BaseView;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Debug = __webpack_require__(42);
	var debug = Debug('views:object');
	var eventsjs_1 = __webpack_require__(5);
	var orange_1 = __webpack_require__(6);
	/** Base object */
	var BaseObject = (function (_super) {
	    __extends(BaseObject, _super);
	    /**
	     * Object
	     * @extends EventEmitter
	     */
	    function BaseObject(args) {
	        _super.call(this);
	        this._isDestroyed = false;
	    }
	    Object.defineProperty(BaseObject.prototype, "isDestroyed", {
	        /**
	         * Whether the object is "destroyed" or not
	         * @type boolean
	         */
	        get: function () {
	            return this._isDestroyed;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BaseObject.prototype.destroy = function () {
	        if (this.isDestroyed)
	            return this;
	        this.triggerMethod('before:destroy');
	        this.stopListening();
	        this.off();
	        this._isDestroyed = true;
	        this.triggerMethod('destroy');
	        debug("%s destroy", this);
	        if (typeof Object.freeze) {
	        }
	        return this;
	    };
	    BaseObject.prototype.triggerMethod = function (eventName) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        orange_1.triggerMethodOn(this, eventName, args);
	        return this;
	    };
	    BaseObject.prototype.getOption = function (prop) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        if (this.options) {
	            args.push(this.options);
	        }
	        if (this._options) {
	            args.push(this._options);
	        }
	        args.push(this);
	        return orange_1.getOption(prop, args);
	    };
	    BaseObject.extend = function (proto, stat) {
	        return orange_1.inherits(this, proto, stat);
	    };
	    return BaseObject;
	}(eventsjs_1.EventEmitter));
	exports.BaseObject = BaseObject;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(52));
	__export(__webpack_require__(53));
	__export(__webpack_require__(54));

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// TODO: CreateHTML

	var orange_1 = __webpack_require__(6);
	var ElementProto = typeof Element !== 'undefined' && Element.prototype || {};
	var matchesSelector = ElementProto.matches || ElementProto.webkitMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.msMatchesSelector || ElementProto.oMatchesSelector || function (selector) {
	    var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
	    return !!~orange_1.indexOf(nodeList, this);
	};
	var elementAddEventListener = ElementProto.addEventListener || function (eventName, listener) {
	    return this.attachEvent('on' + eventName, listener);
	};
	var elementRemoveEventListener = ElementProto.removeEventListener || function (eventName, listener) {
	    return this.detachEvent('on' + eventName, listener);
	};
	var transitionEndEvent = function transitionEnd() {
	    var el = document.createElement('bootstrap');
	    var transEndEventNames = {
	        'WebkitTransition': 'webkitTransitionEnd',
	        'MozTransition': 'transitionend',
	        'OTransition': 'oTransitionEnd otransitionend',
	        'transition': 'transitionend'
	    };
	    for (var name in transEndEventNames) {
	        if (el.style[name] !== undefined) {
	            return transEndEventNames[name];
	        }
	    }
	    return null;
	};
	var animationEndEvent = function animationEnd() {
	    var el = document.createElement('bootstrap');
	    var transEndEventNames = {
	        'WebkitAnimation': 'webkitAnimationEnd',
	        'MozAnimation': 'animationend',
	        'OAnimation': 'oAnimationEnd oanimationend',
	        'animation': 'animationend'
	    };
	    for (var name in transEndEventNames) {
	        if (el.style[name] !== undefined) {
	            return transEndEventNames[name];
	        }
	    }
	    return null;
	};
	function matches(elm, selector) {
	    return matchesSelector.call(elm, selector);
	}
	exports.matches = matches;
	function addEventListener(elm, eventName, listener) {
	    var useCap = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	    elementAddEventListener.call(elm, eventName, listener, useCap);
	}
	exports.addEventListener = addEventListener;
	function removeEventListener(elm, eventName, listener) {
	    elementRemoveEventListener.call(elm, eventName, listener);
	}
	exports.removeEventListener = removeEventListener;
	var unbubblebles = 'focus blur change load error'.split(' ');
	var domEvents = [];
	function delegate(elm, selector, eventName, callback, ctx) {
	    var root = elm;
	    var handler = function handler(e) {
	        var node = e.target || e.srcElement;
	        // Already handled
	        if (e.delegateTarget) return;
	        for (; node && node != root; node = node.parentNode) {
	            if (matches(node, selector)) {
	                e.delegateTarget = node;
	                callback(e);
	            }
	        }
	    };
	    var useCap = !!~unbubblebles.indexOf(eventName);
	    addEventListener(elm, eventName, handler, useCap);
	    domEvents.push({ eventName: eventName, handler: handler, listener: callback, selector: selector });
	    return handler;
	}
	exports.delegate = delegate;
	function undelegate(elm, selector, eventName, callback) {
	    /*if (typeof selector === 'function') {
	        listener = <Function>selector;
	        selector = null;
	      }*/
	    var handlers = domEvents.slice();
	    for (var i = 0, len = handlers.length; i < len; i++) {
	        var item = handlers[i];
	        var match = item.eventName === eventName && (callback ? item.listener === callback : true) && (selector ? item.selector === selector : true);
	        if (!match) continue;
	        removeEventListener(elm, item.eventName, item.handler);
	        domEvents.splice(orange_1.indexOf(handlers, item), 1);
	    }
	}
	exports.undelegate = undelegate;
	function addClass(elm, className) {
	    if (elm.classList) {
	        var split = className.split(' ');
	        for (var i = 0, ii = split.length; i < ii; i++) {
	            if (elm.classList.contains(split[i].trim())) continue;
	            elm.classList.add(split[i].trim());
	        }
	    } else {
	        elm.className = orange_1.unique(elm.className.split(' ').concat(className.split(' '))).join(' ');
	    }
	}
	exports.addClass = addClass;
	function removeClass(elm, className) {
	    if (elm.classList) {
	        var split = className.split(' ');
	        for (var i = 0, ii = split.length; i < ii; i++) {
	            elm.classList.remove(split[i].trim());
	        }
	    } else {
	        var _split = elm.className.split(' '),
	            classNames = className.split(' '),
	            tmp = _split,
	            index = void 0;
	        for (var _i = 0, _ii = classNames.length; _i < _ii; _i++) {
	            index = _split.indexOf(classNames[_i]);
	            if (!!~index) _split = _split.splice(index, 1);
	        }
	    }
	}
	exports.removeClass = removeClass;
	function hasClass(elm, className) {
	    if (elm.classList) {
	        return elm.classList.contains(className);
	    }
	    var reg = new RegExp('\b' + className);
	    return reg.test(elm.className);
	}
	exports.hasClass = hasClass;
	function selectionStart(elm) {
	    if ('selectionStart' in elm) {
	        // Standard-compliant browsers
	        return elm.selectionStart;
	    } else if (document.selection) {
	        // IE
	        elm.focus();
	        var sel = document.selection.createRange();
	        var selLen = document.selection.createRange().text.length;
	        sel.moveStart('character', -elm.value.length);
	        return sel.text.length - selLen;
	    }
	}
	exports.selectionStart = selectionStart;
	var _events = {
	    animationEnd: null,
	    transitionEnd: null
	};
	function transitionEnd(elm, fn, ctx, duration) {
	    var event = _events.transitionEnd || (_events.transitionEnd = transitionEndEvent());
	    var callback = function callback(e) {
	        removeEventListener(elm, event, callback);
	        fn.call(ctx, e);
	    };
	    addEventListener(elm, event, callback);
	}
	exports.transitionEnd = transitionEnd;
	function animationEnd(elm, fn, ctx, duration) {
	    var event = _events.animationEnd || (_events.animationEnd = animationEndEvent());
	    var callback = function callback(e) {
	        removeEventListener(elm, event, callback);
	        fn.call(ctx, e);
	    };
	    addEventListener(elm, event, callback);
	}
	exports.animationEnd = animationEnd;
	exports.domReady = function () {
	    var fns = [],
	        _listener,
	        doc = document,
	        hack = doc.documentElement.doScroll,
	        domContentLoaded = 'DOMContentLoaded',
	        loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);
	    if (!loaded) {
	        doc.addEventListener(domContentLoaded, _listener = function listener() {
	            doc.removeEventListener(domContentLoaded, _listener);
	            loaded = true;
	            while (_listener = fns.shift()) {
	                _listener();
	            }
	        });
	    }
	    return function (fn) {
	        loaded ? setTimeout(fn, 0) : fns.push(fn);
	    };
	}();
	function createElement(tag, attr) {
	    var elm = document.createElement(tag);
	    if (attr) {
	        for (var key in attr) {
	            elm.setAttribute(key, attr[key]);
	        }
	    }
	    return elm;
	}
	exports.createElement = createElement;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var orange_1 = __webpack_require__(6);
	var dom = __webpack_require__(52);
	var domEvents;
	var singleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
	function parseHTML(html) {
	    var parsed = singleTag.exec(html);
	    if (parsed) {
	        return document.createElement(parsed[0]);
	    }
	    var div = document.createElement('div');
	    div.innerHTML = html;
	    var element = div.firstChild;
	    return element;
	}

	var Html = function () {
	    function Html(el) {
	        _classCallCheck(this, Html);

	        if (!Array.isArray(el)) el = [el];
	        this._elements = el || [];
	    }

	    _createClass(Html, [{
	        key: 'get',
	        value: function get(n) {
	            n = n === undefined ? 0 : n;
	            return n >= this.length ? undefined : this._elements[n];
	        }
	    }, {
	        key: 'addClass',
	        value: function addClass(str) {
	            return this.forEach(function (e) {
	                dom.addClass(e, str);
	            });
	        }
	    }, {
	        key: 'removeClass',
	        value: function removeClass(str) {
	            return this.forEach(function (e) {
	                dom.removeClass(e, str);
	            });
	        }
	    }, {
	        key: 'hasClass',
	        value: function hasClass(str) {
	            return this._elements.reduce(function (p, c) {
	                return dom.hasClass(c, str);
	            }, false);
	        }
	    }, {
	        key: 'attr',
	        value: function attr(key, value) {
	            var attr = void 0;
	            if (typeof key === 'string' && value) {
	                attr = _defineProperty({}, key, value);
	            } else if (typeof key == 'string') {
	                if (this.length) return this.get(0).getAttribute(key);
	            } else if (orange_1.isObject(key)) {
	                attr = key;
	            }
	            return this.forEach(function (e) {
	                for (var k in attr) {
	                    e.setAttribute(k, attr[k]);
	                }
	            });
	        }
	    }, {
	        key: 'text',
	        value: function text(str) {
	            if (arguments.length === 0) {
	                return this.length > 0 ? this.get(0).textContent : null;
	            }
	            return this.forEach(function (e) {
	                return e.textContent = str;
	            });
	        }
	    }, {
	        key: 'html',
	        value: function html(_html) {
	            if (arguments.length === 0) {
	                return this.length > 0 ? this.get(0).innerHTML : null;
	            }
	            return this.forEach(function (e) {
	                return e.innerHTML = _html;
	            });
	        }
	    }, {
	        key: 'css',
	        value: function css(attr, value) {
	            if (arguments.length === 2) {
	                return this.forEach(function (e) {
	                    if (attr in e.style) e.style[attr] = String(value);
	                });
	            } else {
	                return this.forEach(function (e) {
	                    for (var k in attr) {
	                        if (k in e.style) e.style[k] = String(attr[k]);
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'parent',
	        value: function parent() {
	            var out = [];
	            this.forEach(function (e) {
	                if (e.parentElement) {
	                    out.push(e.parentElement);
	                }
	            });
	            return new Html(out);
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {
	            return this.forEach(function (e) {
	                if (e.parentElement) e.parentElement.removeChild(e);
	            });
	        }
	    }, {
	        key: 'clone',
	        value: function clone() {
	            return new Html(this.map(function (m) {
	                return m.cloneNode();
	            }));
	        }
	    }, {
	        key: 'find',
	        value: function find(str) {
	            var out = [];
	            this.forEach(function (e) {
	                out = out.concat(orange_1.slice(e.querySelectorAll(str)));
	            });
	            return new Html(out);
	        }
	    }, {
	        key: 'map',
	        value: function map(fn) {
	            var out = new Array(this.length);
	            this.forEach(function (e, i) {
	                out[i] = fn(e, i);
	            });
	            return out;
	        }
	    }, {
	        key: 'forEach',
	        value: function forEach(fn) {
	            this._elements.forEach(fn);
	            return this;
	        }
	    }, {
	        key: 'length',
	        get: function get() {
	            return this._elements.length;
	        }
	    }], [{
	        key: 'query',
	        value: function query(_query, context) {
	            if (typeof context === 'string') {
	                context = document.querySelectorAll(context);
	            }
	            var html = void 0;
	            var els = void 0;
	            if (typeof _query === 'string') {
	                if (_query.length > 0 && _query[0] === '<' && _query[_query.length - 1] === ">" && _query.length >= 3) {
	                    return new Html([parseHTML(_query)]);
	                }
	                if (context) {
	                    if (context instanceof HTMLElement) {
	                        els = orange_1.slice(context.querySelectorAll(_query));
	                    } else {
	                        html = new Html(orange_1.slice(context));
	                        return html.find(_query);
	                    }
	                } else {
	                    els = orange_1.slice(document.querySelectorAll(_query));
	                }
	            } else if (_query && _query instanceof Element) {
	                els = [_query];
	            } else if (_query && _query instanceof NodeList) {
	                els = orange_1.slice(_query);
	            }
	            return new Html(els);
	        }
	    }]);

	    return Html;
	}();

	exports.Html = Html;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var orange_1 = __webpack_require__(6);
	var dom_1 = __webpack_require__(52);

	var LoadedImage = function () {
	    function LoadedImage(img) {
	        var timeout = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
	        var retries = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];

	        _classCallCheck(this, LoadedImage);

	        this.img = img;
	        this.timeout = timeout;
	        this.retries = retries;
	        this.__resolved = false;
	    }

	    _createClass(LoadedImage, [{
	        key: 'check',
	        value: function check(fn) {
	            var _this = this;

	            this.fn = fn;
	            var isComplete = this.getIsImageComplete();
	            if (isComplete) {
	                // report based on naturalWidth
	                this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
	                return;
	            }
	            var retries = this.retries;
	            var retry = function retry() {
	                setTimeout(function () {
	                    if (_this.__resolved) return;
	                    if (_this.img.naturalWidth > 0) {
	                        _this.__resolved = true;
	                        return _this.onload(null);
	                    } else if (retries > 0) {
	                        retries--;
	                        retry();
	                    }
	                }, _this.timeout);
	            };
	            retry();
	            dom_1.addEventListener(this.img, 'load', this);
	            dom_1.addEventListener(this.img, 'error', this);
	        }
	    }, {
	        key: 'confirm',
	        value: function confirm(loaded, msg, err) {
	            this.__resolved = true;
	            this.isLoaded = loaded;
	            if (this.fn) this.fn(err);
	        }
	    }, {
	        key: 'getIsImageComplete',
	        value: function getIsImageComplete() {
	            return this.img.complete && this.img.naturalWidth !== undefined && this.img.naturalWidth !== 0;
	        }
	    }, {
	        key: 'handleEvent',
	        value: function handleEvent(e) {
	            var method = 'on' + event.type;
	            if (this[method]) {
	                this[method](event);
	            }
	        }
	    }, {
	        key: 'onload',
	        value: function onload(e) {
	            this.confirm(true, 'onload');
	            this.unbindEvents();
	        }
	    }, {
	        key: 'onerror',
	        value: function onerror(e) {
	            this.confirm(false, 'onerror', new Error(e.error));
	            this.unbindEvents();
	        }
	    }, {
	        key: 'unbindEvents',
	        value: function unbindEvents() {
	            dom_1.removeEventListener(this.img, 'load', this);
	            dom_1.removeEventListener(this.img, 'error', this);
	            this.fn = void 0;
	        }
	    }]);

	    return LoadedImage;
	}();

	function imageLoaded(img, timeout, retries) {
	    return new orange_1.Promise(function (resolve, reject) {
	        var i = new LoadedImage(img, timeout, retries);
	        i.check(function (err) {
	            if (err) return reject(err);
	            resolve(i.isLoaded);
	        });
	    });
	}
	exports.imageLoaded = imageLoaded;

/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";
	var kUIRegExp = /@ui.([a-zA-Z_\-\$#]+)/i;
	function normalizeUIKeys(obj, uimap) {
	    /*jshint -W030 */
	    var o = {}, k, v, ms, sel, ui;
	    for (k in obj) {
	        v = obj[k];
	        if ((ms = kUIRegExp.exec(k)) !== null) {
	            ui = ms[1], sel = uimap[ui];
	            if (sel != null) {
	                k = k.replace(ms[0], sel);
	            }
	        }
	        o[k] = v;
	    }
	    return o;
	}
	exports.normalizeUIKeys = normalizeUIKeys;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Debug = __webpack_require__(42);
	var debug = Debug('views:region');
	var object_1 = __webpack_require__(50);
	var orange_1 = __webpack_require__(6);
	/** Region  */
	var Region = (function (_super) {
	    __extends(Region, _super);
	    /**
	     * Regions manage a view
	     * @param {Object} options
	     * @param {HTMLElement} options.el  A Html element
	     * @constructor Region
	     * @extends BaseObject
	     * @inheritdoc
	     */
	    function Region(options) {
	        _super.call(this);
	        this.options = options;
	        this._el = this.getOption('el');
	    }
	    Object.defineProperty(Region.prototype, "view", {
	        get: function () {
	            return this._view;
	        },
	        set: function (view) {
	            this.show(view);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Region.prototype, "el", {
	        get: function () {
	            return this._el;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Build region from a definition
	     * @param {Object|String|Region} def The description of the region
	     * @return {Region}
	     */
	    Region.buildRegion = function (def, context) {
	        if (context === void 0) { context = null; }
	        if (def instanceof Region) {
	            return def;
	        }
	        else if (typeof def === 'string') {
	            return buildBySelector(def, Region, context);
	        }
	        else {
	            return buildByObject(def, context);
	        }
	    };
	    /**
	   * Show a view in the region.
	   * This will destroy or remove any existing views.
	   * @param  {View} view    The view to Show
	   * @return {Region}       this for chaining.
	   */
	    Region.prototype.show = function (view, options) {
	        var diff = view !== this._view;
	        if (diff) {
	            // Remove any containing views
	            this.empty();
	            // If the view is destroyed be others
	            view.once('destroy', this.empty, this);
	            debug('%s render view %s', this, view);
	            view.render();
	            orange_1.triggerMethodOn(view, 'before:show');
	            debug('%s attaching view: %s', this, view);
	            this._attachHtml(view);
	            orange_1.triggerMethodOn(view, 'show');
	            this._view = view;
	        }
	        return this;
	    };
	    /**
	     * Destroy the region, this will remove any views, but not the containing element
	     * @return {Region} this for chaining
	     */
	    Region.prototype.destroy = function () {
	        this.empty();
	        _super.prototype.destroy.call(this);
	    };
	    /**
	     * Empty the region. This will destroy any existing view.
	     * @return {Region} this for chaining;
	     */
	    Region.prototype.empty = function () {
	        if (!this._view)
	            return;
	        var view = this._view;
	        view.off('destroy', this.empty, this);
	        this.trigger('before:empty', view);
	        this._destroyView();
	        this.trigger('empty', view);
	        delete this._view;
	        return this;
	    };
	    /**
	     * Attach the view element to the regions element
	     * @param {View} view
	     * @private
	     *
	     */
	    Region.prototype._attachHtml = function (view) {
	        this._el.innerHTML = '';
	        this._el.appendChild(view.el);
	    };
	    Region.prototype._destroyView = function () {
	        var view = this._view;
	        if ((view.destroy && typeof view.destroy === 'function') && !view.isDestroyed) {
	            view.destroy();
	        }
	        else if (view.remove && typeof view.remove === 'function') {
	            view.remove();
	        }
	        this._el.innerHTML = '';
	    };
	    return Region;
	}(object_1.BaseObject));
	exports.Region = Region;
	function buildByObject(object, context) {
	    if (object === void 0) { object = {}; }
	    if (!object.selector)
	        throw new Error('No selector specified: ' + object);
	    return buildBySelector(object.selector, object.regionClass || Region, context);
	}
	function buildBySelector(selector, Klass, context) {
	    if (Klass === void 0) { Klass = Region; }
	    context = context || document;
	    var el = context.querySelector(selector);
	    if (!el)
	        throw new Error('selector must exist in the dom');
	    return new Klass({
	        el: el
	    });
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* global BaseClass, __has */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var object_1 = __webpack_require__(50);
	var region_1 = __webpack_require__(56);
	var utils = __webpack_require__(6);
	var RegionManager = (function (_super) {
	    __extends(RegionManager, _super);
	    /** Region manager
	     * @extends BaseObject
	     */
	    function RegionManager() {
	        _super.call(this);
	        this._regions = {};
	    }
	    Object.defineProperty(RegionManager.prototype, "regions", {
	        /**
	         * Regions
	         * @type {string:Region}
	         */
	        get: function () {
	            return this._regions;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	      * Add one or more regions to the region manager
	      * @param {Object} regions
	      */
	    RegionManager.prototype.addRegions = function (regions) {
	        var def, out = {}, keys = Object.keys(regions);
	        keys.forEach(function (k) {
	            def = regions[k];
	            out[k] = this.addRegion(k, def);
	        }, this);
	        return out;
	    };
	    /**
	     * Add a region to the RegionManager
	     * @param {String} name   The name of the regions
	     * @param {String|Object|Region|HTMLElement} def The region to associate with the name and the RegionManager
	     */
	    RegionManager.prototype.addRegion = function (name, def) {
	        var region = region_1.Region.buildRegion(def);
	        this._setRegion(name, region);
	        return region;
	    };
	    /**
	     * Remove one or more regions from the manager
	     * @param {...name} name A array of region names
	     */
	    RegionManager.prototype.removeRegion = function (names) {
	        if (typeof names === 'string') {
	            names = [names];
	        }
	        names.forEach(function (name) {
	            if (utils.has(this.regions, name)) {
	                var region = this.regions[name];
	                region.destroy();
	                this._unsetRegion(name);
	            }
	        }, this);
	    };
	    /**
	     * Destroy the regionmanager
	     */
	    RegionManager.prototype.destroy = function () {
	        this.removeRegions();
	        _super.prototype.destroy.call(this);
	    };
	    /**
	     * Remove all regions from the manager
	     */
	    RegionManager.prototype.removeRegions = function () {
	        utils.callFunc(this.removeRegion, this, Object.keys(this._regions));
	    };
	    /**
	     * @private
	     */
	    RegionManager.prototype._setRegion = function (name, region) {
	        if (this._regions[name]) {
	            this._regions[name].destroy();
	        }
	        this._regions[name] = region;
	    };
	    /**
	     * @private
	     */
	    RegionManager.prototype._unsetRegion = function (name) {
	        delete this._regions[name];
	    };
	    return RegionManager;
	}(object_1.BaseObject));
	exports.RegionManager = RegionManager;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/*global View, RegionManager, Region*/
	var view_1 = __webpack_require__(59);
	var region_manager_1 = __webpack_require__(57);
	var orange_1 = __webpack_require__(6);
	var region_1 = __webpack_require__(56);
	var LayoutView = (function (_super) {
	    __extends(LayoutView, _super);
	    /**
	     * LayoutView
	     * @param {Object} options options
	     * @constructor LayoutView
	     * @extends TemplateView
	     */
	    function LayoutView(options) {
	        _super.call(this, options);
	        // Set region manager
	        this._regionManager = new region_manager_1.RegionManager();
	        orange_1.proxy(this, this._regionManager, ['removeRegion', 'removeRegions']);
	        this._regions = this.getOption('regions', options || {});
	    }
	    Object.defineProperty(LayoutView.prototype, "regions", {
	        get: function () {
	            return this._regionManager.regions;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    LayoutView.prototype.render = function (options) {
	        this.triggerMethod('before:render');
	        _super.prototype.render.call(this, { silent: true });
	        this.addRegion(this._regions || {});
	        this.triggerMethod('render');
	        return this;
	    };
	    /**
	     * Add one or more regions to the view
	     * @param {string|RegionMap} name
	     * @param {Object|string|HTMLElement} def
	     */
	    LayoutView.prototype.addRegion = function (name, def) {
	        var regions = {};
	        if (typeof name === 'string') {
	            if (def == null)
	                throw new Error('add region');
	            regions[name] = def;
	        }
	        else {
	            regions = name;
	        }
	        for (var k in regions) {
	            var region = region_1.Region.buildRegion(regions[k], this.el);
	            this._regionManager.addRegion(k, region);
	        }
	    };
	    /**
	     * Delete one or more regions from the the layoutview
	     * @param {string|Array<string>} name
	     */
	    LayoutView.prototype.removeRegion = function (name) {
	        this._regionManager.removeRegion(name);
	    };
	    LayoutView.prototype.destroy = function () {
	        _super.prototype.destroy.call(this);
	        this._regionManager.destroy();
	    };
	    return LayoutView;
	}(view_1.View));
	exports.LayoutView = LayoutView;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Debug = __webpack_require__(42);
	var debug = Debug('views:view');
	var baseview_1 = __webpack_require__(49);
	var orange_1 = __webpack_require__(6);
	var View = (function (_super) {
	    __extends(View, _super);
	    /**
	     * DataView
	     * @param {DataViewOptions} options
	     * @extends TemplateView
	     */
	    function View(options) {
	        if (options === void 0) { options = {}; }
	        _super.call(this, options);
	        orange_1.extend(this, orange_1.pick(options, ['model', 'collection', 'template']));
	    }
	    Object.defineProperty(View.prototype, "model", {
	        get: function () { return this._model; },
	        set: function (model) {
	            this.setModel(model);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "collection", {
	        get: function () { return this._collection; },
	        set: function (collection) {
	            this.setCollection(collection);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    View.prototype.setModel = function (model) {
	        if (this._model === model)
	            return this;
	        this.triggerMethod('before:model', this._model, model);
	        if (this.model) {
	            debug('stop listening on model uid: %s', this.model.uid);
	            this.stopListening(this._model);
	        }
	        if (model != null) {
	            debug('%s set model uid: %s', this, model.uid);
	        }
	        this._model = model;
	        this.triggerMethod('model', model);
	        return this;
	    };
	    View.prototype.setCollection = function (collection) {
	        if (this._collection === collection)
	            return this;
	        this.triggerMethod('before:collection', this._collection, collection);
	        if (this._collection) {
	            debug('%s stop listening on collection', this);
	            this.stopListening(this._collection);
	        }
	        this._collection = collection;
	        this.triggerMethod('collection', collection);
	        return this;
	    };
	    View.prototype.getTemplateData = function () {
	        return this.model ?
	            typeof this.model.toJSON === 'function' ?
	                this.model.toJSON() : this.model : {};
	    };
	    View.prototype.render = function (options) {
	        if (options === void 0) { options = {}; }
	        debug('%s render', this);
	        if (!options.silent)
	            this.triggerMethod('before:render');
	        this.undelegateEvents();
	        this.renderTemplate(this.getTemplateData());
	        this.delegateEvents();
	        if (!options.silent)
	            this.triggerMethod('render');
	        return this;
	    };
	    View.prototype.delegateEvents = function (events) {
	        events = events || orange_1.result(this, 'events');
	        var _a = this._filterEvents(events), c = _a.c, e = _a.e, m = _a.m;
	        _super.prototype.delegateEvents.call(this, e);
	        this._delegateDataEvents(m, c);
	        return this;
	    };
	    View.prototype.undelegateEvents = function () {
	        this._undelegateDataEvents();
	        _super.prototype.undelegateEvents.call(this);
	        return this;
	    };
	    View.prototype.renderTemplate = function (data) {
	        var template = this.getOption('template');
	        if (typeof template === 'function') {
	            debug('%s render template function', this);
	            template = template.call(this, data);
	        }
	        if (template && typeof template === 'string') {
	            debug('%s attach template: %s', this, template);
	            this.attachTemplate(template);
	        }
	    };
	    View.prototype.attachTemplate = function (template) {
	        //this.undelegateEvents();
	        this.el.innerHTML = template;
	        //this.delegateEvents();
	    };
	    View.prototype._delegateDataEvents = function (model, collection) {
	        var _this = this;
	        this._dataEvents = {};
	        var fn = function (item, ev) {
	            if (!_this[item])
	                return {};
	            var out = {}, k, f;
	            for (k in ev) {
	                f = orange_1.bind(ev[k], _this);
	                _this[item].on(k, f);
	                out[item + ":" + k] = f;
	            }
	            return out;
	        };
	        orange_1.extend(this._dataEvents, fn('model', model), fn('collection', collection));
	    };
	    View.prototype._undelegateDataEvents = function () {
	        if (!this._dataEvents)
	            return;
	        var k, v;
	        for (k in this._dataEvents) {
	            v = this._dataEvents[k];
	            var _a = k.split(':'), item = _a[0], ev = _a[1];
	            if (!this[item])
	                continue;
	            this[item].off(ev, v);
	        }
	        delete this._dataEvents;
	    };
	    View.prototype._filterEvents = function (obj) {
	        /*jshint -W030 */
	        var c = {}, m = {}, e = {}, k, v;
	        for (k in obj) {
	            var _a = k.split(' '), ev = _a[0], t = _a[1];
	            ev = ev.trim(), t = t ? t.trim() : "", v = obj[k];
	            if (t === 'collection') {
	                c[ev] = v;
	            }
	            else if (t === 'model') {
	                m[ev] = v;
	            }
	            else {
	                e[k] = v;
	            }
	        }
	        return { c: c, m: m, e: e };
	    };
	    return View;
	}(baseview_1.BaseView));
	exports.View = View;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Debug = __webpack_require__(42);
	var debug = Debug('views:collectionview');
	var view_1 = __webpack_require__(59);
	var orange_1 = __webpack_require__(6);
	var eventsjs_1 = __webpack_require__(5);
	var Buffer = (function () {
	    function Buffer() {
	        this.children = [];
	        this.buffer = document.createDocumentFragment();
	    }
	    Buffer.prototype.append = function (view) {
	        this.children.push(view);
	        this.buffer.appendChild(view.el);
	    };
	    return Buffer;
	}());
	var CollectionView = (function (_super) {
	    __extends(CollectionView, _super);
	    /** CollectionView
	   * @extends DataView
	   * @param {DataViewOptions} options
	   */
	    function CollectionView(options) {
	        _super.call(this, options);
	        this._options = options || {};
	        this.children = [];
	        this.sort = (options && options.sort != null) ? options.sort : true;
	        if (typeof this.initialize === 'function') {
	            orange_1.callFunc(this.initialize, this, orange_1.slice(arguments));
	        }
	    }
	    /**
	   * Render the collection view and alle of the children
	   * @return {CollectionView}
	   *
	   */
	    CollectionView.prototype.render = function (options) {
	        this.destroyChildren();
	        this._destroyContainer();
	        _super.prototype.render.call(this, options);
	        this._initContainer();
	        if (this.collection && this.collection.length) {
	            this.renderCollection();
	        }
	        else {
	            this.showEmptyView();
	        }
	        return this;
	    };
	    /**
	     * @protected
	     */
	    CollectionView.prototype.setCollection = function (collection) {
	        _super.prototype.setCollection.call(this, collection);
	        this._delegateCollectionEvents();
	        return this;
	    };
	    CollectionView.prototype.renderCollection = function () {
	        this.destroyChildren();
	        if (this.collection.length !== 0) {
	            this.hideEmptyView();
	            this._startBuffering();
	            this._renderCollection();
	            this._stopBuffering();
	        }
	        else {
	            this.showEmptyView();
	        }
	    };
	    /**
	   * Returns a new instance of this.childView with attached model.
	   *
	   * @param {IModel} model
	   * @protected
	   */
	    CollectionView.prototype.getChildView = function (model) {
	        var ViewClass = this.getOption('childView') || view_1.View, options = this.getOption('childViewOptions') || {};
	        return new ViewClass(orange_1.extend({
	            model: model
	        }, options));
	    };
	    CollectionView.prototype.renderChildView = function (view, index) {
	        this.triggerMethod('before:render:child', view);
	        debug('%s render child: %s', this, view);
	        view.render();
	        this._attachHTML(view, index);
	        this.triggerMethod('render:child', view);
	    };
	    CollectionView.prototype.showEmptyView = function () {
	        var EmptyView = this.getOption('emptyView');
	        if (EmptyView == null)
	            return;
	        var view = new EmptyView();
	        this._emptyView = view;
	        this._container.appendChild(view.render().el);
	    };
	    CollectionView.prototype.hideEmptyView = function () {
	        if (!this._emptyView)
	            return;
	        this._emptyView.destroy();
	        this._emptyView.remove();
	        this._emptyView = void 0;
	    };
	    CollectionView.prototype.destroyChildren = function () {
	        if (this._container) {
	            this._container.innerHTML = '';
	        }
	        if (this.children.length === 0)
	            return;
	        this.children.forEach(this.removeChildView, this);
	        this.children = [];
	    };
	    CollectionView.prototype.removeChildView = function (view) {
	        if (!view)
	            return;
	        if (typeof view.destroy === 'function') {
	            debug('%s destroy child view: %s', this, view);
	            view.destroy();
	        }
	        else if (typeof view.remove === 'function') {
	            debug('%s remove child view: %s', this, view);
	            view.remove();
	        }
	        this.stopListening(view);
	        this.children.splice(this.children.indexOf(view), 1);
	        if (this.children.length === 0) {
	            this.showEmptyView();
	        }
	        this._updateIndexes(view, false);
	    };
	    /**
	   * Destroy the collection view and all of it's children
	   * @see JaffaMVC.View
	   * @return {JaffaMVC.View}
	   */
	    CollectionView.prototype.destroy = function () {
	        this.triggerMethod('before:destroy:children');
	        this.destroyChildren();
	        this.triggerMethod('destroy:children');
	        this.hideEmptyView();
	        //if (this._emptyView) this.hideEmptyView();
	        return _super.prototype.destroy.call(this);
	    };
	    CollectionView.prototype._renderCollection = function () {
	        var _this = this;
	        this.triggerMethod('before:render:collection');
	        this.collection.forEach(function (model, index) {
	            var view = _this.getChildView(model);
	            _this._appendChild(view, index);
	        });
	        this.triggerMethod('render:collection');
	    };
	    /**
	   * Append childview to the container
	   * @private
	   * @param {IDataView} view
	   * @param {Number} index
	   */
	    CollectionView.prototype._appendChild = function (view, index) {
	        this._updateIndexes(view, true, index);
	        this._proxyChildViewEvents(view);
	        debug('%s append child %s at index: %s', this, view, index);
	        this.children.push(view);
	        this.hideEmptyView();
	        this.renderChildView(view, index);
	        this.triggerMethod('add:child', view);
	    };
	    /**
	   * Attach the childview's element to the CollectionView.
	   * When in buffer mode, the view is added to a documentfragment to optimize performance
	   * @param {View} view  A view
	   * @param {Number} index The index in which to insert the view
	   * @private
	   */
	    CollectionView.prototype._attachHTML = function (view, index) {
	        if (this._buffer) {
	            debug("%s attach to buffer: %s", this, view);
	            this._buffer.append(view);
	        }
	        else {
	            //if (this._isShown) {
	            //  utils.triggerMethodOn(view, 'before:show');
	            //}
	            if (!this._insertBefore(view, index)) {
	                this._insertAfter(view);
	            }
	        }
	    };
	    /**
	   * Proxy event froms childview to the collectionview
	   * @param {IView} view
	   * @private
	   */
	    CollectionView.prototype._proxyChildViewEvents = function (view) {
	        var prefix = this.getOption('prefix') || 'childview';
	        this.listenTo(view, 'all', function () {
	            var args = orange_1.slice(arguments);
	            args[0] = prefix + ':' + args[0];
	            args.splice(1, 0, view);
	            orange_1.callFunc(this.triggerMethod, this, args);
	        });
	    };
	    CollectionView.prototype._updateIndexes = function (view, increment, index) {
	        if (!this.sort)
	            return;
	        if (increment)
	            view._index = index;
	        this.children.forEach(function (lView) {
	            if (lView._index >= view._index) {
	                increment ? lView._index++ : lView._index--;
	            }
	        });
	    };
	    CollectionView.prototype._startBuffering = function () {
	        debug("%s initializing buffer", this);
	        this._buffer = new Buffer();
	    };
	    CollectionView.prototype._stopBuffering = function () {
	        debug('%s appending buffer to container', this);
	        this._container.appendChild(this._buffer.buffer);
	        delete this._buffer;
	    };
	    CollectionView.prototype._initContainer = function () {
	        debug("%s init container", this);
	        var container = this.getOption('childViewContainer');
	        if (container) {
	            container = this.$(container)[0];
	        }
	        else {
	            container = this.el;
	        }
	        this._container = container;
	    };
	    CollectionView.prototype._destroyContainer = function () {
	        if (this._container)
	            delete this._container;
	    };
	    /**
	     * Internal method. Check whether we need to insert the view into
	   * the correct position.
	     * @param  {IView} childView [description]
	     * @param  {number} index     [description]
	     * @return {boolean}           [description]
	     */
	    CollectionView.prototype._insertBefore = function (childView, index) {
	        var currentView;
	        var findPosition = this.sort && (index < this.children.length - 1);
	        if (findPosition) {
	            // Find the view after this one
	            currentView = orange_1.find(this.children, function (view) {
	                return view._index === index + 1;
	            });
	        }
	        if (currentView) {
	            debug('%s insert child %s before: %s', this, childView, currentView);
	            this._container.insertBefore(childView.el, currentView.el);
	            return true;
	        }
	        return false;
	    };
	    /**
	     * Internal method. Append a view to the end of the $el
	     * @private
	     */
	    CollectionView.prototype._insertAfter = function (childView) {
	        debug('%s insert child %s ', this, childView);
	        this._container.appendChild(childView.el);
	    };
	    /**
	     * Delegate collection events
	     * @private
	     */
	    CollectionView.prototype._delegateCollectionEvents = function () {
	        if (this.collection && eventsjs_1.isEventEmitter(this.collection)) {
	            this.listenTo(this.collection, 'add', this._onCollectionAdd);
	            this.listenTo(this.collection, 'remove', this._onCollectionRemove);
	            this.listenTo(this.collection, 'reset', this.render);
	            if (this.sort)
	                this.listenTo(this.collection, 'sort', this._onCollectionSort);
	        }
	    };
	    // Event handlers
	    /**
	     * Called when a model is add to the collection
	     * @param {JaffaMVC.Model|Backbone.model} model Model
	     * @private
	     */
	    CollectionView.prototype._onCollectionAdd = function (model) {
	        debug('%s received add event from collection %s', this, this.collection);
	        var view = this.getChildView(model);
	        var index = this.collection.indexOf(model);
	        this._appendChild(view, index);
	    };
	    /**
	     * Called when a model is removed from the collection
	     * @param {JaffaMVC.Model|Backbone.model} model Model
	     * @private
	     */
	    CollectionView.prototype._onCollectionRemove = function (model) {
	        debug('%s received remove event from collection %s', this, this.collection);
	        var view = orange_1.find(this.children, function (view) {
	            return view.model === model;
	        });
	        this.removeChildView(view);
	    };
	    /**
	     * Called when the collection is sorted
	     * @private
	     */
	    CollectionView.prototype._onCollectionSort = function () {
	        var _this = this;
	        debug('%s received sort event from collection %s', this, this.collection);
	        var orderChanged = this.collection.find(function (model, index) {
	            var view = orange_1.find(_this.children, function (view) {
	                return view.model === model;
	            });
	            return !view || view._index !== index;
	        });
	        if (orderChanged)
	            this.render();
	    };
	    return CollectionView;
	}(view_1.View));
	exports.CollectionView = CollectionView;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var orange_1 = __webpack_require__(6);
	function attributes(attrs) {
	    return function (target) {
	        orange_1.extend(target.prototype, attrs);
	    };
	}
	exports.attributes = attributes;
	function events(events) {
	    return function (target) {
	        target.prototype.events = events;
	    };
	}
	exports.events = events;
	function triggers(triggers) {
	    return function (target) {
	        target.prototype.triggers = triggers;
	    };
	}
	exports.triggers = triggers;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var views_1 = __webpack_require__(48);
	var orange_1 = __webpack_require__(6);
	var orange_dom_1 = __webpack_require__(51);
	var index_1 = __webpack_require__(63);
	var mimetypes_1 = __webpack_require__(64);
	var utils_1 = __webpack_require__(65);
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
/* 63 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    "crop-editor": "<div class=\"modal-container\"></div>\n<div class=\"crop-container\">\n</div>\n<!--<label class=\"btn btn-sm btn-default\">  <span>Upload</span>  <input style=\"display:none;\" type=\"file\" class=\"upload-btn\" name=\"upload-button\" />  </label>-->\n<button class=\"gallery-btn btn btn-sm btn-default\" title=\"Vælg fra galleri\">Vælg</button>\n<label class=\"btn btn-sm btn-default\">  <span>Upload</span>  <input style=\"display:none;\" type=\"file\" class=\"upload-btn\" name=\"upload-button\" />  </label>\n<button class=\"crop-btn btn btn-sm btn-default pull-right\">Beskær</button>",
	    "file-info": "<div class=\"preview-region\">  <div class=\"preview\"></div>\n</div>\n<div class=\"info-region\">  <table class=\"info\">  <tr>  <td>Name</td>  <td class=\"name\"></td>  </tr>  <tr>  <td>Mime</td>  <td class=\"mimetype\"></td>  </tr>  <tr>  <td>Size</td>  <td class=\"size\"></td>  </tr>  <tr>  <td>Download</td>  <td class=\"download\">  </td>  </tr>  </table>\n</div>",
	    "gallery": "<div class=\"gallery-area\">  <div class=\"gallery-list\">  </div>  <div class=\"gallery-info\"></div>  </div>\n<div class=\"upload-progress-container\">  <div class=\"upload-progress\"></div>\n</div>\n",
	    "list-item": "<a class=\"close-button\"></a>\n<div class=\"thumbnail-container\">  <i class=\"mime mimetype mime-unknown\"></i>\n</div>\n<div class=\"name\"></div>\n",
	    "list": "<div class=\"file-list-item-container\">\n</div>\n<div class=\"file-list-download-progress progress\"></div>\n",
	    "modal-gallery": "<div class=\"views-modal-dialog\">  <div class=\"views-modal-content\">  <div class=\"views-modal-header\">  </div>  <div class=\"views-modal-body\">  </div>  <div class=\"views-modal-footer\">  <div class=\"left\">  <div class=\"files-total\">  <p>Total: </p>  </div>  <div class=\"search-container\">  <label>Search</label>  <input class=\"input-search\" type=\"search\" />  </div>  </div>  <button type=\"button\" class=\"btn btn-close\">Close</button>  <button type=\"button\" class=\"btn btn-primary btn-select\">Select</button>  </div>  </div>\n</div>"
	};

/***/ },
/* 64 */
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var orange_1 = __webpack_require__(6);
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
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var views_1 = __webpack_require__(48);
	var orange_1 = __webpack_require__(6);
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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(68));
	__export(__webpack_require__(73));

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var views_1 = __webpack_require__(48);
	var orange_1 = __webpack_require__(6);
	var index_1 = __webpack_require__(46);
	var index_2 = __webpack_require__(69);
	var index_3 = __webpack_require__(63);
	var collection_1 = __webpack_require__(1);
	var dropzone_1 = __webpack_require__(71);
	var uploader_1 = __webpack_require__(72);
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
	            client: _this.client,
	            only: _this.options.only,
	            filter: _this.options.filter
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
	            view.el.style.opacity = 0.5;
	            this.client.remove(model.fullPath).then(function (res) {
	                if (res.message === 'ok') {
	                    model.remove();
	                }
	            }).catch(function (e) {
	                view.el.style.opacity = 1.0;
	            });
	        }
	    }, {
	        key: "_setCollection",
	        value: function _setCollection(collection) {
	            this.list.collection = collection;
	        }
	    }, {
	        key: "_onFileDrop",
	        value: function _onFileDrop(event) {
	            var file = event.dataTransfer.files.item(0);
	            if (!file) return null;
	            var collection = this.collections[this.collections.length - 1];
	            this.uploader.upload(collection.path, file, {
	                progress: function progress(e) {
	                    if (!e.lengthComputable) return;
	                }
	            }).then(function (model) {
	                return collection.add(model);
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
	            if (this._root === path) return;
	            this._root = path;
	            for (var i = 0, ii = this.collections.length; i < ii; i++) {
	                this.stopListening(this.collections[i]);
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
	                    show_hidden: this.options.showHidden || false
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(70));

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var views_1 = __webpack_require__(48);
	var index_1 = __webpack_require__(63);
	var orange_1 = __webpack_require__(6);
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
	                var img = document.createElement('img');
	                img.src = model.url + '?token=' + this.client.token; // `${this.client.endpoint}/v1/${model.fullPath}?token=${this.client.token}`
	                ui.preview.appendChild(img);
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var views_1 = __webpack_require__(48);
	var orange_dom_1 = __webpack_require__(51);
	var orange_1 = __webpack_require__(6);
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var eventsjs_1 = __webpack_require__(5);
	var torsten_1 = __webpack_require__(30);
	var orange_1 = __webpack_require__(6);
	var collection_1 = __webpack_require__(1);
	var error_1 = __webpack_require__(29);
	var Debug = __webpack_require__(42);
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

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var index_1 = __webpack_require__(74);
	var gallery_1 = __webpack_require__(68);
	var views_1 = __webpack_require__(48);
	var index_2 = __webpack_require__(63);
	var orange_dom_1 = __webpack_require__(51);
	var orange_1 = __webpack_require__(6);
	var GalleryModal = function (_index_1$Modal) {
	    _inherits(GalleryModal, _index_1$Modal);

	    function GalleryModal(options) {
	        _classCallCheck(this, GalleryModal);

	        var _this = _possibleConstructorReturn(this, (GalleryModal.__proto__ || Object.getPrototypeOf(GalleryModal)).call(this, options));

	        delete options.el;
	        options.filter = function (model) {
	            if (!_this._search) return true;
	            return _this._search.test(model.get('name'));
	        };
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
	            var tel = _this.el.querySelector('.files-total p');
	            tel.innerHTML = "<b>Total: </b> " + total;
	            _this.gallery.list.loadImages();
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
	            console.log(this);
	        }
	    }, {
	        key: "_onSelect",
	        value: function _onSelect(e) {
	            e.preventDefault();
	            if (this.selected) this.trigger('selected', this.selected);
	            this.close();
	        }
	    }, {
	        key: "_onSearch",
	        value: function _onSearch(e) {
	            var el = e.delegateTarget;
	            var val = el.value;
	            if (val == "") {
	                this._search = null;
	            } else {
	                var reg = new RegExp(val, 'i');
	                if (this._search && this._search.source == reg.source) {
	                    return;
	                }
	                this._search = reg;
	            }
	            this.gallery.list.filterChildren();
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
	        },
	        set: function set(model) {
	            this.gallery.selected = model;
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
	        'click .btn-select': '_onSelect',
	        'keyup .input-search': '_onSearch'
	    }
	}), __metadata("design:paramtypes", [Object])], GalleryModal);
	exports.GalleryModal = GalleryModal;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(75));

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var views_1 = __webpack_require__(48);
	var orange_dom_1 = __webpack_require__(51);
	var orange_1 = __webpack_require__(6);
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

	            var body = document.body;
	            if (orange_dom_1.hasClass(body, "views-modal-open")) {
	                return;
	            }
	            this.triggerMethod('before:open');
	            requestAnimationFrame(function () {
	                orange_dom_1.addClass(_this2.el, 'views-modal-show');
	                orange_dom_1.addClass(body, 'views-modal-open');
	            });
	            orange_dom_1.transitionEnd(this.el, function () {
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
	            orange_dom_1.transitionEnd(this.el, function () {
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(77));
	__export(__webpack_require__(79));
	__export(__webpack_require__(78));

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var views_1 = __webpack_require__(48);
	var types_1 = __webpack_require__(78);
	var utils_1 = __webpack_require__(65);
	var orange_dom_1 = __webpack_require__(51);

	var CropPreview = function () {
	    _createClass(CropPreview, [{
	        key: "cropping",
	        set: function set(cropping) {
	            this._cropping = cropping;
	            this.update();
	        },
	        get: function get() {
	            return this._cropping;
	        }
	    }]);

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
/* 78 */
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var views_1 = __webpack_require__(48);
	var cropperjs_1 = __webpack_require__(80);
	var types_1 = __webpack_require__(78);
	var collection_1 = __webpack_require__(1);
	var utils_1 = __webpack_require__(65);
	var orange_1 = __webpack_require__(6);
	var orange_dom_1 = __webpack_require__(51);
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
/* 80 */
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(82));

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var dropzone_1 = __webpack_require__(71);
	var index_1 = __webpack_require__(76);
	var views_form_1 = __webpack_require__(83);
	var views_1 = __webpack_require__(48);
	var index_2 = __webpack_require__(67);
	var orange_dom_1 = __webpack_require__(51);
	var orange_1 = __webpack_require__(6);
	var index_3 = __webpack_require__(63);
	var circular_progress_1 = __webpack_require__(66);
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
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(84));
	var define_1 = __webpack_require__(91);
	exports.editor = define_1.editor;
	var editor_1 = __webpack_require__(86);
	exports.BaseEditor = editor_1.BaseEditor;
	exports.BaseLayoutEditor = editor_1.BaseLayoutEditor;
	var field_1 = __webpack_require__(85);
	exports.Field = field_1.Field;
	__export(__webpack_require__(88));
	__webpack_require__(92);

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var views_1 = __webpack_require__(48);
	var field_1 = __webpack_require__(85);
	var orange_1 = __webpack_require__(6);
	var Debug = __webpack_require__(42);
	var debug = Debug('views:form');
	var Form = function (_views_1$View) {
	    _inherits(Form, _views_1$View);

	    function Form(options) {
	        _classCallCheck(this, Form);

	        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, options));

	        _this._fields = [];
	        _this._isRendered = false;
	        options = options || {};
	        _this._options = orange_1.extend({}, {
	            createHelpAreas: false,
	            validateOnChange: true,
	            fields: {},
	            fieldSelector: '.field'
	        }, options);
	        return _this;
	    }

	    _createClass(Form, [{
	        key: "getFieldByName",
	        value: function getFieldByName(name) {
	            for (var i = 0, ii = this.fields.length; i < ii; i++) {
	                if (this.fields[i].name === name) return this.fields[i];
	            }
	            return null;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	            this._isRendered = false;
	            if (!options.silent) this.triggerMethod('before:render');
	            this.undelegateEvents();
	            this.renderTemplate(this.getTemplateData());
	            this._renderFields();
	            this.delegateEvents();
	            this._isRendered = true;
	            if (!options.silent) this.triggerMethod('render');
	            this._setValue(this.model);
	            return this;
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            if (this.model == null) return this;
	            this._model.set(this.value);
	            return this;
	        }
	    }, {
	        key: "setModel",
	        value: function setModel(model) {
	            if (model === this.model) return;
	            _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), "setModel", this).call(this, model);
	            this._setValue(model);
	            if (model != null) this.listenTo(model, 'change', this._onModelValueChange);
	            return this;
	        }
	    }, {
	        key: "validate",
	        value: function validate() {
	            return this.fields.map(function (m) {
	                return m.validate();
	            }).filter(function (m) {
	                return m != null;
	            });
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            if (!this._fields) return this;
	            this._fields.forEach(function (f) {
	                return f.clear();
	            });
	        }
	    }, {
	        key: "_setValue",
	        value: function _setValue(model) {
	            var _this2 = this;

	            if (!this._isRendered) {
	                //this.once('render', () => this._setValue(model))
	                return;
	            }
	            this.clear();
	            if (model != null) {
	                this.fields.forEach(function (m) {
	                    if (model.get(m.name) !== undefined) {
	                        m.editor.value = model.get(m.name);
	                    } else {
	                        _this2.model.set(m.name, m.editor.value, { silent: true });
	                    }
	                });
	            }
	        }
	    }, {
	        key: "_renderFields",
	        value: function _renderFields() {
	            var _this3 = this;

	            this.triggerMethod('before:render:fields');
	            this._fields.forEach(function (f) {
	                _this3.stopListening(f);
	                f.destroy();
	            });
	            this._fields = [];
	            var fields = this.el.querySelectorAll(this.options.fieldSelector);
	            debug('found %i fields', fields.length);
	            var errors = [],
	                field;
	            for (var i = 0, ii = fields.length; i < ii; i++) {
	                try {
	                    var e = fields[i].querySelector('[name]');
	                    var name = "";
	                    if (e) name = e.getAttribute('name');
	                    var o = orange_1.extend({
	                        createHelpArea: this.options.createHelpAreas || false
	                    }, this.options.fields[name] || {}, {
	                        form: this
	                    });
	                    debug('create field: %s', name);
	                    field = field_1.Field.createField(fields[i], o);
	                    this._fields.push(field);
	                    //this.listenTo(field, 'all', this._onFieldEventTriggered);
	                    this.listenTo(field, 'change', this._onFieldValueChanged);
	                } catch (e) {
	                    errors.push(e);
	                }
	            }
	            this._fields.forEach(function (m) {
	                m.render();
	            });
	            if (errors.length) {
	                this.triggerMethod('render:fields:error', errors);
	            }
	            this.triggerMethod('render:fields');
	        }
	    }, {
	        key: "_onModelValueChange",
	        value: function _onModelValueChange(model) {
	            for (var key in model.changed) {
	                var field = this.getFieldByName(key);
	                if (field == null) continue;
	                field.editor.value = model.get(key);
	            }
	        }
	    }, {
	        key: "_onFieldValueChanged",
	        value: function _onFieldValueChanged(field) {
	            this.trigger('change');
	            if (this.options.validateOnChange) {
	                if (field.validate()) {
	                    return;
	                }
	                ;
	            }
	            if (this.model) this.model.set(field.name, field.editor.value);
	        }
	    }, {
	        key: "_onFieldEventTriggered",
	        value: function _onFieldEventTriggered(event, field) {
	            console.log(event);
	            if (event === "change") {
	                this.trigger('change');
	                if (this.options.validateOnChange) {
	                    if (field.validate()) {
	                        return;
	                    }
	                    ;
	                }
	                if (this.model) this.model.set(field.name, field.editor.value);
	            }

	            for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	                args[_key - 2] = arguments[_key];
	            }

	            this.triggerMethod.apply(this, ['field:' + event, field].concat(args));
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this._fields.forEach(function (f) {
	                return f.destroy();
	            });
	            this._fields = [];
	            return _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), "destroy", this).call(this);
	        }
	    }, {
	        key: "options",
	        get: function get() {
	            return this._options;
	        }
	    }, {
	        key: "fields",
	        get: function get() {
	            return [].concat(this._fields);
	        }
	    }, {
	        key: "value",
	        get: function get() {
	            var out = {};
	            this.fields.forEach(function (f) {
	                out[f.name] = f.value;
	            });
	            return out;
	        },
	        set: function set(value) {
	            if (value == null) {
	                this.fields.forEach(function (m) {
	                    return m.editor.clear();
	                });
	            } else {
	                this.fields.forEach(function (m) {
	                    if (value[m.name] !== undefined) {
	                        m.editor.value = value[m.name];
	                    }
	                });
	            }
	        }
	    }]);

	    return Form;
	}(views_1.View);
	Form = __decorate([views_1.attributes({
	    tagName: 'form',
	    events: {}
	}), __metadata("design:paramtypes", [Object])], Form);
	exports.Form = Form;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var views_1 = __webpack_require__(48);
	var orange_1 = __webpack_require__(6);
	var orange_dom_1 = __webpack_require__(51);
	var editor_1 = __webpack_require__(86);
	var define_1 = __webpack_require__(91);
	var Debug = __webpack_require__(42);
	var debug = Debug('views:form:field');
	var Field = Field_1 = function (_views_1$View) {
	    _inherits(Field, _views_1$View);

	    function Field(options) {
	        _classCallCheck(this, Field);

	        if (options == null) throw new Error('field options required');
	        if (options.form == null) throw new Error('form required');

	        var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, options));

	        _this._options = options;
	        _this._form = options.form;
	        return _this;
	    }

	    _createClass(Field, [{
	        key: "clear",
	        value: function clear() {
	            if (this.editor) this.editor.clear();
	            orange_dom_1.removeClass(this.el, 'has-success has-error');
	            orange_dom_1.Html.query('.form-field-helparea').html('');
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	            if (!options.silent) this.triggerMethod('before:render');
	            this.undelegateEvents();
	            this.renderTemplate(this.getTemplateData());
	            if (!this._editor) {
	                var el = this.el.querySelector('[name]');
	                if (!el) {
	                    throw new Error('no editor or no input with name attribute');
	                }
	                var editorType = el.getAttribute('form-editor');
	                var o = orange_1.extend({
	                    label: this.label
	                }, this._options || {}, {
	                    el: el
	                });
	                var name = el.getAttribute('name');
	                if (editorType) {
	                    var editor = define_1.getEditor(editorType, o);
	                    if (editor) {
	                        debug('%s: found custom editor type: %s', name, editorType);
	                        this.editor = editor;
	                    }
	                }
	                if (this.editor == null) {
	                    var _editor = define_1.getEditor(el.nodeName.toLowerCase(), o);
	                    if (_editor) {
	                        debug('%s: found custom editor type from tag: %s', name, el.nodeName.toLowerCase());
	                        this.editor = _editor;
	                    } else {
	                        this.editor = new editor_1.Editor(o);
	                    }
	                }
	            }
	            if (this._options.createHelpArea) this.createHelpArea();
	            this.editor.render();
	            this.delegateEvents();
	            if (!options.silent) this.triggerMethod('render');
	            return this;
	        }
	    }, {
	        key: "createHelpArea",
	        value: function createHelpArea() {
	            var helpArea = this.el.querySelector('.form-field-helparea');
	            if (helpArea) {
	                return;
	            }
	            debug('%s: creating help area', this.name);
	            this.triggerMethod('before:helparea');
	            helpArea = orange_dom_1.createElement("div", {
	                class: "form-field-helparea"
	            });
	            /*if (this.editor) {
	                this.el.insertBefore(helpArea, this.editor.el);
	            } else {*/
	            this.el.appendChild(helpArea);
	            //}
	        }
	    }, {
	        key: "validate",
	        value: function validate() {
	            if (!this.editor) return null;
	            var el = orange_dom_1.Html.query(this.el);
	            var e = this.editor.validate(this._form);
	            var helpArea = this.el.querySelector('.form-field-helparea');
	            if (e == null) {
	                el.addClass('has-success').removeClass('has-error');
	                if (helpArea) helpArea.innerHTML = '';
	                return;
	            }
	            el.addClass('has-error').removeClass('has-success');
	            if (helpArea) {
	                var html = void 0;
	                if (e.errors.length === 1) {
	                    html = "<span>" + e.errors[0].message + "</span>";
	                } else {
	                    var m = e.errors.map(function (m) {
	                        return "<li>" + m.message + "</li>";
	                    }).join('');
	                    html = "<ul>" + m + "</ul>";
	                }
	                helpArea.innerHTML = html;
	            }
	            return e;
	        }
	    }, {
	        key: "_onEditorChange",
	        value: function _onEditorChange() {
	            this.triggerMethod('change', this);
	        }
	    }, {
	        key: "name",
	        get: function get() {
	            if (this._editor) return this._editor.name;
	            return "";
	        }
	    }, {
	        key: "label",
	        get: function get() {
	            if (!this._label) {
	                var label = this._editor ? this._editor.label : null;
	                if (!label) {
	                    var el = this.el.querySelector('form-field-label');
	                    if (!el) {
	                        el = this.el.querySelector('label');
	                    }
	                    if (el) label = el.textContent;
	                }
	                this._label = label || this.name;
	            }
	            return this._label;
	        }
	    }, {
	        key: "value",
	        get: function get() {
	            if (this.editor) return this.editor.value;
	            return null;
	        },
	        set: function set(value) {
	            if (this.editor) this.editor.value = value;
	        }
	    }, {
	        key: "editor",
	        set: function set(editor) {
	            if (this._editor) {
	                this.stopListening(this._editor);
	                this._editor.destroy();
	            }
	            this._editor = editor;
	            if (editor == null) {
	                return;
	            }
	            this.listenTo(editor, 'change', this._onEditorChange);
	            /*this.listenTo(editor, 'all', (event:string, ...args:any[]) => {
	                if (event == 'change') return;
	                args = (args || []);
	                args.unshift(this);
	                this.triggerMethod(event, ...args);
	            })*/
	        },
	        get: function get() {
	            return this._editor;
	        }
	    }], [{
	        key: "createField",
	        value: function createField(el, options) {
	            var elm = el.querySelector('[name]');
	            if (elm == null) throw new Error("field doest not contain an element");
	            var o = orange_1.extend({}, options || {}, {
	                el: el
	            });
	            return new Field_1(o);
	        }
	    }]);

	    return Field;
	}(views_1.View);
	Field = Field_1 = __decorate([views_1.attributes({
	    tagName: 'div',
	    className: 'form-field'
	}), __metadata("design:paramtypes", [Object])], Field);
	exports.Field = Field;
	var Field_1;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var views_1 = __webpack_require__(48);
	var utils_1 = __webpack_require__(87);
	var validator_1 = __webpack_require__(88);
	var orange_1 = __webpack_require__(6);

	var BaseEditor = function (_views_1$View) {
	    _inherits(BaseEditor, _views_1$View);

	    function BaseEditor() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, BaseEditor);

	        var _this = _possibleConstructorReturn(this, (BaseEditor.__proto__ || Object.getPrototypeOf(BaseEditor)).call(this, options));

	        _this.options = options;
	        if (options.label) _this._label = options.label;
	        if (options.name) _this._name = options.name;
	        return _this;
	    }

	    _createClass(BaseEditor, [{
	        key: "clear",
	        value: function clear() {
	            this.triggerMethod('before:clear');
	            this.setValue(this.options.defaultValue ? this.options.defaultValue : null);
	            this.triggerMethod('clear');
	        }
	    }, {
	        key: "validate",
	        value: function validate(form) {
	            return validator_1.validate(form, this, this.value);
	        }
	    }, {
	        key: "name",
	        get: function get() {
	            if (!this._name) {
	                this._name = this.el.getAttribute('name');
	            }
	            return this._name;
	        }
	    }, {
	        key: "value",
	        get: function get() {
	            return this.getValue();
	        },
	        set: function set(value) {
	            if (orange_1.equal(value, this.getValue())) return;
	            this.setValue(value);
	        }
	    }, {
	        key: "label",
	        get: function get() {
	            if (!this._label && this.el) {
	                this._label = this.el.getAttribute('editor-label');
	            }
	            return this._label;
	        },
	        set: function set(label) {
	            this._label = label;
	        }
	    }]);

	    return BaseEditor;
	}(views_1.View);

	exports.BaseEditor = BaseEditor;

	var BaseLayoutEditor = function (_views_1$View2) {
	    _inherits(BaseLayoutEditor, _views_1$View2);

	    function BaseLayoutEditor(options) {
	        _classCallCheck(this, BaseLayoutEditor);

	        var _this2 = _possibleConstructorReturn(this, (BaseLayoutEditor.__proto__ || Object.getPrototypeOf(BaseLayoutEditor)).call(this, options));

	        _this2.options = options;
	        return _this2;
	    }

	    _createClass(BaseLayoutEditor, [{
	        key: "clear",
	        value: function clear() {
	            this.triggerMethod('before:clear');
	            this.setValue(this.options.defaultValue ? this.options.defaultValue : null);
	            this.triggerMethod('clear');
	        }
	    }, {
	        key: "validate",
	        value: function validate(form) {
	            return validator_1.validate(form, this, this.value);
	        }
	    }, {
	        key: "name",
	        get: function get() {
	            return this.el.getAttribute('name');
	        }
	    }, {
	        key: "value",
	        get: function get() {
	            return this.getValue();
	        },
	        set: function set(value) {
	            if (orange_1.equal(value, this.getValue())) return;
	            this.triggerMethod('before:set:value', value);
	            this.setValue(value);
	            this.triggerMethod('set:value', value);
	        }
	    }, {
	        key: "label",
	        get: function get() {
	            return this._label;
	        },
	        set: function set(label) {
	            this._label = label;
	        }
	    }]);

	    return BaseLayoutEditor;
	}(views_1.View);

	exports.BaseLayoutEditor = BaseLayoutEditor;
	var Editor = function (_BaseEditor) {
	    _inherits(Editor, _BaseEditor);

	    function Editor() {
	        _classCallCheck(this, Editor);

	        return _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).apply(this, arguments));
	    }

	    _createClass(Editor, [{
	        key: "setValue",
	        value: function setValue(value) {
	            utils_1.setValue(this.el, value);
	        }
	    }, {
	        key: "getValue",
	        value: function getValue() {
	            return utils_1.getValue(this.el);
	        }
	    }, {
	        key: "_onKeyPress",
	        value: function _onKeyPress(e) {
	            this._prev = this.getValue();
	            this.triggerMethod('change');
	        }
	    }, {
	        key: "_onChange",
	        value: function _onChange(e) {
	            if (orange_1.equal(this._prev, this.getValue())) return;
	            this._prev = this.getValue();
	            this.triggerMethod('change');
	        }
	    }, {
	        key: "name",
	        get: function get() {
	            return this.el.getAttribute('name');
	        }
	    }]);

	    return Editor;
	}(BaseEditor);
	Editor = __decorate([views_1.attributes({
	    tagName: 'input',
	    events: {
	        keyup: '_onKeyPress',
	        change: '_onChange'
	    }
	}), __metadata("design:paramtypes", [])], Editor);
	exports.Editor = Editor;

/***/ },
/* 87 */
/***/ function(module, exports) {

	"use strict";

	var start = "<%",
	    end = "%>",
	    path = "[a-z0-9_$][\\.a-z0-9_]*",
	    // e.g. config.person.name
	pattern = new RegExp(start + "\\s*(" + path + ")\\s*" + end, "gi"),
	    undef = undefined;
	function template(template, data) {
	    var throwOnNotFound = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	    return template.replace(pattern, function (tag, token) {
	        var path = token.split("."),
	            len = path.length,
	            lookup = data,
	            i = 0;
	        for (; i < len; i++) {
	            lookup = lookup[path[i]];
	            // Property not found
	            if (lookup === undef) {
	                if (throwOnNotFound) {
	                    throw new Error("templ: '" + path[i] + "' not found in " + tag);
	                } else {
	                    lookup = "";
	                }
	            }
	            // Return the required value
	            if (i === len - 1) {
	                return lookup;
	            }
	        }
	        return lookup;
	    });
	}
	exports.template = template;
	function getValue(el, value) {
	    var node = el;
	    var isCheckbox = /checkbox/.test(node.type);
	    var isRadio = /radio/.test(node.type);
	    var isRadioOrCheckbox = isCheckbox || isRadio;
	    var hasValue = Object.prototype.hasOwnProperty.call(node, "value");
	    var isInput = hasValue || /input|textarea|checkbox/.test(node.nodeName.toLowerCase());
	    var isSelect = /select/i.test(node.nodeName);
	    if (arguments.length === 1) {
	        if (isCheckbox) {
	            return Boolean(node.checked);
	        } else if (isSelect) {
	            return node.value || "";
	        } else if (isInput) {
	            var _value = node.value || "";
	            if (node.type && node.type.toLowerCase() === 'number') {
	                _value = parseInt(_value);
	                _value = isNaN(_value) ? 0 : _value;
	            }
	            return _value;
	        } else {
	            return node.innerHTML || "";
	        }
	    }
	    if (value == null) {
	        value = "";
	    }
	    if (isRadioOrCheckbox) {
	        if (isRadio) {
	            if (String(value) === String(node.value)) {
	                node.checked = true;
	            }
	        } else {
	            node.checked = value;
	        }
	    } else if (String(value) !== getValue(el)) {
	        if (isInput || isSelect) {
	            node.value = value;
	        } else {
	            node.innerHTML = value;
	        }
	    }
	}
	exports.getValue = getValue;
	function setValue(el, value) {
	    getValue(el, value);
	}
	exports.setValue = setValue;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var utils_1 = __webpack_require__(87);
	var orange_1 = __webpack_require__(6);
	var Debug = __webpack_require__(42);
	var debug = Debug('views:form:validator');
	var validURL = __webpack_require__(89);
	function get_validations(el) {
	    var required;
	    var v = Object.keys(validators).map(function (e) {
	        // The required validator is getting handled elsewhere
	        if (e === 'required') return null;
	        var i = el.getAttribute('validate-' + e);
	        if (i == null) el.getAttribute(e);
	        if (i != null) return [validators[e], i, messages[e] || "invalid", e];
	        return null;
	    }).filter(function (e) {
	        return e !== null;
	    });
	    return v;
	}
	function validate(form, editor, value) {
	    var vals = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

	    var el = editor.el;
	    var v = get_validations(el),
	        name = editor.name,
	        //el.getAttribute('name'),
	    errors = [];
	    var required = el.getAttribute('required');
	    if (required == null) required = el.getAttribute('validate-required');
	    v = orange_1.unique(v.concat(vals));
	    if (required != null) {
	        debug("running 'required' validator on %s", name);
	        if (!validators.required(name, form, value, null)) {
	            debug("'required' validator failed on %s", name);
	            return new ValidateErrors([new ValidateError(utils_1.template(messages.required, {
	                name: name,
	                label: editor.label,
	                value: value,
	                arg: null
	            }))]);
	        }
	    } else if (value === null || value === "" || value === undefined) {
	        // Do not run validations, when the value is empty
	        return null;
	    }
	    for (var i = 0, ii = v.length; i < ii; i++) {
	        debug("running '%s' validator on %s", v[i][3], name);
	        if (!v[i][0](name, form, value, v[i][1])) {
	            debug("'%s' validator failed on %s", v[i][3], name);
	            var e = new ValidateError(utils_1.template(v[i][2], {
	                name: name,
	                value: value,
	                label: editor.label,
	                arg: v[i][1]
	            }));
	            errors.push(e);
	        }
	    }
	    if (errors.length) {
	        return new ValidateErrors(errors);
	    }
	    return null;
	}
	exports.validate = validate;
	var messages;
	(function (messages) {
	    messages.required = "<b><% label %></b> is required";
	    messages.min = "<b><% label %></b> must be at least <% arg %>";
	    messages.max = "<b><% label %></b> must be a maximum of <% arg %>";
	    messages.email = "<b><% label %></b> is not an email";
	    messages.url = "<b><% label %></b> is not an url";
	    messages.match = "<b><% label %></b> does not match: <b><%arg%></b>";
	})(messages || (messages = {}));
	var validators;
	(function (validators) {
	    function required(name, form, value, arg) {
	        return !(value === "" || value === null || value === undefined);
	    }
	    validators.required = required;
	    function min(name, form, value, arg) {
	        var min = parseInt(arg);
	        // TODO: check in init
	        if (isNaN(min)) return;
	        if (typeof value === 'string') {
	            return value.length >= min;
	        } else if (Array.isArray(value)) {
	            return value.length >= min;
	        } else {
	            return parseInt(value) >= min;
	        }
	    }
	    validators.min = min;
	    function max(name, form, value, arg) {
	        var max = parseInt(arg);
	        // TODO: check in init
	        if (isNaN(max)) return;
	        if (typeof value === 'string') {
	            return value.length <= max;
	        } else if (Array.isArray(value)) {
	            return value.length <= max;
	        } else {
	            return parseInt(value) <= max;
	        }
	    }
	    validators.max = max;
	    function match(name, form, value, arg) {
	        var field = form.getFieldByName(arg);
	        if (!field) {
	            throw new Error("field: " + arg + " does not exists");
	        }
	        var oval = field.editor.value;
	        return orange_1.equal(value, oval);
	    }
	    validators.match = match;
	    function url(name, form, value, arg) {
	        return validURL.isUri(value);
	    }
	    validators.url = url;
	    var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
	    function email(name, form, value, arg) {
	        return validate_email(value);
	        // Thanks to:
	        // http://fightingforalostcause.net/misc/2006/compare-email-regex.php
	        // http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
	        // http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378
	        function validate_email(email) {
	            if (!email) return false;
	            if (email.length > 254) return false;
	            var valid = tester.test(email);
	            if (!valid) return false;
	            // Further checking of some things regex can't handle
	            var parts = email.split("@");
	            if (parts[0].length > 64) return false;
	            var domainParts = parts[1].split(".");
	            if (domainParts.some(function (part) {
	                return part.length > 63;
	            })) return false;
	            return true;
	        }
	    }
	    validators.email = email;
	})(validators = exports.validators || (exports.validators = {}));
	function setMessage(validator, message) {
	    messages[validator] = message;
	}
	exports.setMessage = setMessage;
	function registerValidator(name, fn, message) {
	    validators[name] = fn;
	    if (message) {
	        messages[name] = message;
	    }
	}
	exports.registerValidator = registerValidator;

	var ValidateError = function (_Error) {
	    _inherits(ValidateError, _Error);

	    function ValidateError(message) {
	        _classCallCheck(this, ValidateError);

	        var _this = _possibleConstructorReturn(this, (ValidateError.__proto__ || Object.getPrototypeOf(ValidateError)).call(this, message));

	        _this.message = message;
	        return _this;
	    }

	    return ValidateError;
	}(Error);

	exports.ValidateError = ValidateError;

	var ValidateErrors = function (_Error2) {
	    _inherits(ValidateErrors, _Error2);

	    _createClass(ValidateErrors, [{
	        key: "length",
	        get: function get() {
	            return this.errors.length;
	        }
	    }]);

	    function ValidateErrors() {
	        var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	        _classCallCheck(this, ValidateErrors);

	        var _this2 = _possibleConstructorReturn(this, (ValidateErrors.__proto__ || Object.getPrototypeOf(ValidateErrors)).call(this));

	        _this2.errors = errors;
	        return _this2;
	    }

	    return ValidateErrors;
	}(Error);

	exports.ValidateErrors = ValidateErrors;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {(function(module) {
	    'use strict';

	    module.exports.is_uri = is_iri;
	    module.exports.is_http_uri = is_http_iri;
	    module.exports.is_https_uri = is_https_iri;
	    module.exports.is_web_uri = is_web_iri;
	    // Create aliases
	    module.exports.isUri = is_iri;
	    module.exports.isHttpUri = is_http_iri;
	    module.exports.isHttpsUri = is_https_iri;
	    module.exports.isWebUri = is_web_iri;


	    // private function
	    // internal URI spitter method - direct from RFC 3986
	    var splitUri = function(uri) {
	        var splitted = uri.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
	        return splitted;
	    };

	    function is_iri(value) {
	        if (!value) {
	            return;
	        }

	        // check for illegal characters
	        if (/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(value)) return;

	        // check for hex escapes that aren't complete
	        if (/%[^0-9a-f]/i.test(value)) return;
	        if (/%[0-9a-f](:?[^0-9a-f]|$)/i.test(value)) return;

	        var splitted = [];
	        var scheme = '';
	        var authority = '';
	        var path = '';
	        var query = '';
	        var fragment = '';
	        var out = '';

	        // from RFC 3986
	        splitted = splitUri(value);
	        scheme = splitted[1]; 
	        authority = splitted[2];
	        path = splitted[3];
	        query = splitted[4];
	        fragment = splitted[5];

	        // scheme and path are required, though the path can be empty
	        if (!(scheme && scheme.length && path.length >= 0)) return;

	        // if authority is present, the path must be empty or begin with a /
	        if (authority && authority.length) {
	            if (!(path.length === 0 || /^\//.test(path))) return;
	        } else {
	            // if authority is not present, the path must not start with //
	            if (/^\/\//.test(path)) return;
	        }

	        // scheme must begin with a letter, then consist of letters, digits, +, ., or -
	        if (!/^[a-z][a-z0-9\+\-\.]*$/.test(scheme.toLowerCase()))  return;

	        // re-assemble the URL per section 5.3 in RFC 3986
	        out += scheme + ':';
	        if (authority && authority.length) {
	            out += '//' + authority;
	        }

	        out += path;

	        if (query && query.length) {
	            out += '?' + query;
	        }

	        if (fragment && fragment.length) {
	            out += '#' + fragment;
	        }

	        return out;
	    }

	    function is_http_iri(value, allowHttps) {
	        if (!is_iri(value)) {
	            return;
	        }

	        var splitted = [];
	        var scheme = '';
	        var authority = '';
	        var path = '';
	        var port = '';
	        var query = '';
	        var fragment = '';
	        var out = '';

	        // from RFC 3986
	        splitted = splitUri(value);
	        scheme = splitted[1]; 
	        authority = splitted[2];
	        path = splitted[3];
	        query = splitted[4];
	        fragment = splitted[5];

	        if (!scheme)  return;

	        if(allowHttps) {
	            if (scheme.toLowerCase() != 'https') return;
	        } else {
	            if (scheme.toLowerCase() != 'http') return;
	        }

	        // fully-qualified URIs must have an authority section that is
	        // a valid host
	        if (!authority) {
	            return;
	        }

	        // enable port component
	        if (/:(\d+)$/.test(authority)) {
	            port = authority.match(/:(\d+)$/)[0];
	            authority = authority.replace(/:\d+$/, '');
	        }

	        out += scheme + ':';
	        out += '//' + authority;
	        
	        if (port) {
	            out += port;
	        }
	        
	        out += path;
	        
	        if(query && query.length){
	            out += '?' + query;
	        }

	        if(fragment && fragment.length){
	            out += '#' + fragment;
	        }
	        
	        return out;
	    }

	    function is_https_iri(value) {
	        return is_http_iri(value, true);
	    }

	    function is_web_iri(value) {
	        return (is_http_iri(value) || is_https_iri(value));
	    }

	})(module);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(90)(module)))

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Debug = __webpack_require__(42);
	var debug = Debug('views:form');
	var _editors = {};
	function editor(name) {
	    return function (target) {
	        debug('register editor: %s', name);
	        _editors[name] = target;
	    };
	}
	exports.editor = editor;
	function getEditor(name, options) {
	    if (_editors[name]) {
	        return new _editors[name](options);
	    }
	    return null;
	}
	exports.getEditor = getEditor;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	var orange_1 = __webpack_require__(6);
	var orange_dom_1 = __webpack_require__(51);
	var editor_1 = __webpack_require__(86);
	var define_1 = __webpack_require__(91);
	var views_1 = __webpack_require__(48);
	/**
	 * Autosize a textarea on input
	 */

	var AutoSizer = function () {
	    function AutoSizer(el) {
	        _classCallCheck(this, AutoSizer);

	        this.el = el;
	        this._onChange = orange_1.bind(this._onChange, this);
	        this._onPageResize = orange_1.bind(this._onPageResize, this);
	        this._initInitialSize();
	    }

	    _createClass(AutoSizer, [{
	        key: "_onPageResize",
	        value: function _onPageResize() {
	            if (this.el.clientWidth !== this._state.clientWidth) {
	                this._updateSize();
	            }
	        }
	    }, {
	        key: "_onChange",
	        value: function _onChange() {
	            this._updateSize();
	        }
	    }, {
	        key: "_initInitialSize",
	        value: function _initInitialSize() {
	            var style = window.getComputedStyle(this.el, null);
	            var heightOffset = void 0;
	            if (style.resize === 'vertical') {
	                this.el.style.resize = 'none';
	            } else if (style.resize === 'both') {
	                this.el.style.resize = 'horizontal';
	            }
	            if (style.boxSizing === 'content-box') {
	                heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
	            } else {
	                heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
	            }
	            // Fix when a textarea is not on document body and heightOffset is Not a Number
	            if (isNaN(heightOffset)) {
	                heightOffset = 0;
	            }
	            this._state = {
	                overflowY: style.overflowY,
	                heightOffset: heightOffset,
	                clientWidth: this.el.clientWidth
	            };
	            orange_dom_1.addEventListener(this.el, 'keyup', this._onChange);
	            orange_dom_1.addEventListener(this.el, 'input', this._onChange);
	            orange_dom_1.addEventListener(window, 'resize', this._onPageResize);
	            this._updateSize();
	        }
	    }, {
	        key: "_changeOverflow",
	        value: function _changeOverflow(value) {
	            {
	                // Chrome/Safari-specific fix:
	                // When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
	                // made available by removing the scrollbar. The following forces the necessary text reflow.
	                var width = this.el.style.width;
	                this.el.style.width = '0px';
	                // Force reflow:
	                /* jshint ignore:start */
	                this.el.offsetWidth;
	                /* jshint ignore:end */
	                this.el.style.width = width;
	            }
	            this._state.overflowY = value;
	            ///*if (setOverflowY) {
	            this.el.style.overflowY = value;
	            //}*/
	            this._resize();
	        }
	    }, {
	        key: "_resize",
	        value: function _resize() {
	            var htmlTop = window.pageYOffset;
	            var bodyTop = document.body.scrollTop;
	            var originalHeight = this.el.style.height;
	            this.el.style.height = 'auto';
	            var endHeight = this.el.scrollHeight + this._state.heightOffset;
	            if (this.el.scrollHeight === 0) {
	                // If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
	                this.el.style.height = originalHeight;
	                return;
	            }
	            this.el.style.height = endHeight + 'px';
	            // used to check if an update is actually necessary on window.resize
	            this._state.clientWidth = this.el.clientWidth;
	            // prevents scroll-position jumping
	            document.documentElement.scrollTop = htmlTop;
	            document.body.scrollTop = bodyTop;
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            this._updateSize();
	        }
	    }, {
	        key: "_updateSize",
	        value: function _updateSize() {
	            var startHeight = this.el.style.height;
	            this._resize();
	            var style = window.getComputedStyle(this.el, null);
	            if (style.height !== this.el.style.height) {
	                if (this._state.overflowY !== 'visible') {
	                    this._changeOverflow('visible');
	                }
	            } else {
	                if (this._state.overflowY !== 'hidden') {
	                    this._changeOverflow('hidden');
	                }
	            }
	            if (startHeight !== this.el.style.height) {}
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            orange_dom_1.removeEventListener(this.el, 'keyup', this._onChange);
	            orange_dom_1.removeEventListener(this.el, 'input', this._onChange);
	            orange_dom_1.removeEventListener(window, 'resize', this._onPageResize);
	        }
	    }]);

	    return AutoSizer;
	}();

	exports.AutoSizer = AutoSizer;
	var TextArea = function (_editor_1$BaseEditor) {
	    _inherits(TextArea, _editor_1$BaseEditor);

	    function TextArea() {
	        _classCallCheck(this, TextArea);

	        return _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).apply(this, arguments));
	    }

	    _createClass(TextArea, [{
	        key: "render",
	        value: function render(o) {
	            _get(TextArea.prototype.__proto__ || Object.getPrototypeOf(TextArea.prototype), "render", this).call(this, o);
	            var autoSize = this.el.getAttribute('autosize');
	            if (autoSize != null) {
	                if (this._autoSizer == null) {
	                    this._autoSizer = new AutoSizer(this.el);
	                    this.el.style.overflowX = 'hidden';
	                    this.el.style.wordWrap = 'break-word';
	                    this.el.rows = 1;
	                }
	            } else {
	                if (this._autoSizer) {
	                    this._autoSizer.destroy();
	                    this._autoSizer = void 0;
	                }
	            }
	            return this;
	        }
	    }, {
	        key: "setValue",
	        value: function setValue(value) {
	            this.el.value = value;
	            if (this._autoSizer) this._autoSizer.update();
	        }
	    }, {
	        key: "getValue",
	        value: function getValue() {
	            return this.el.value;
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            if (this._autoSizer) {
	                this._autoSizer.destroy();
	                this._autoSizer = void 0;
	            }
	        }
	    }]);

	    return TextArea;
	}(editor_1.BaseEditor);
	TextArea = __decorate([define_1.editor('textarea'), views_1.attributes({
	    events: {
	        keyup: function keyup() {
	            this._prev = this.getValue();
	            this.triggerMethod('change');
	        },
	        change: function change() {
	            if (this._prev !== this.getValue()) {
	                this._prev = this.getValue();
	                this.triggerMethod('change');
	            }
	        }
	    }
	}), __metadata("design:paramtypes", [])], TextArea);

/***/ }
/******/ ])
});
;