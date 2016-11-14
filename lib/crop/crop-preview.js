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
var views_1 = require("views");
var types_1 = require("./types");
var utils_1 = require("../utils");
var orange_dom_1 = require("orange.dom");

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