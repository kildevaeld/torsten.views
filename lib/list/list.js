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
var orange_dom_1 = require("orange.dom");
var orange_1 = require("orange");
var list_item_1 = require("./list-item");
var circular_progress_1 = require("./circular-progress");
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