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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../modal/index");
var gallery_1 = require("./gallery");
var views_1 = require("views");
var index_2 = require("../templates/index");
var orange_dom_1 = require("orange.dom");
var orange_1 = require("orange");
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