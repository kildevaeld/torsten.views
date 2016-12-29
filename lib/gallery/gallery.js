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
var views_1 = require("views");
var orange_1 = require("orange");
var index_1 = require("../list/index");
var index_2 = require("../info/index");
var index_3 = require("../templates/index");
var collection_1 = require("../collection");
var dropzone_1 = require("./dropzone");
var uploader_1 = require("../uploader");
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