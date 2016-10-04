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
var views_1 = require('views');
var cropperjs_1 = require('cropperjs');
var types_1 = require('./types');
var collection_1 = require('../collection');
var utils_1 = require('../utils');
var orange_1 = require('orange');
var orange_dom_1 = require('orange.dom');
function isFunction(a) {
    return typeof a === 'function';
}
var CropView = function (_views_1$View) {
    _inherits(CropView, _views_1$View);

    function CropView() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { resize: false };

        _classCallCheck(this, CropView);

        var _this = _possibleConstructorReturn(this, (CropView.__proto__ || Object.getPrototypeOf(CropView)).call(this, options));

        _this.options = options;
        return _this;
    }

    _createClass(CropView, [{
        key: "setModel",
        value: function setModel(model) {
            var _this2 = this;

            if (model && !collection_1.isFileInfo(model)) {
                throw new Error("not a file info model");
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
            this._updateImage().then(function (loaded) {
                if (loaded && _this2.options.aspectRatio != null) {
                    utils_1.getImageSize(image).then(function (size) {
                        _this2.cropping = types_1.getCropping(size, _this2.options.aspectRatio);
                        //this.triggerMethod('crop', cropping);
                    }).catch(function (e) {
                        _this2.trigger('error', e);
                    });
                }
            });
            return this;
        }
    }, {
        key: "activate",
        value: function activate() {
            var _this3 = this;

            if (this._cropper != null) {
                return this;
            }
            var o = this.options;
            var opts = {
                crop: function crop(e) {
                    _this3._cropping = e.detail;
                    _this3.triggerMethod('crop', e.detail);
                    if (isFunction(o.crop)) o.crop(e);
                },
                data: this.cropping,
                built: function built() {
                    _this3.triggerMethod('built');
                    if (isFunction(o.built)) o.built();
                },
                cropstart: function cropstart(e) {
                    _this3.triggerMethod('cropstart');
                    if (isFunction(o.cropstart)) o.cropstart(e);
                },
                cropmove: function cropmove(e) {
                    _this3.triggerMethod('cropmove', e);
                    if (isFunction(o.cropmove)) o.cropmove(e);
                },
                cropend: function cropend(e) {
                    _this3.triggerMethod('cropend', e);
                    if (isFunction(o.cropend)) o.cropend(e);
                }
            };
            console.log(cropperjs_1.default);
            opts = orange_1.extend({}, this.options, opts);
            this._cropper = new cropperjs_1.default(this.ui['image'], opts);
            return this;
        }
    }, {
        key: "deactivate",
        value: function deactivate() {
            if (this._cropper) {
                this._cropper.destroy();
                this._cropper = void 0;
            }
            return this;
        }
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
            this.delegateEvents();
            this.triggerMethod('render');
            return this;
        }
    }, {
        key: "_updateImage",
        value: function _updateImage() {
            var _this4 = this;

            var img = this.el.querySelector('img');
            orange_dom_1.removeClass(img, 'loaded');
            if (this.model === null) {
                img.src = utils_1.emptyImage;
                return Promise.resolve(false);
            }
            /*let progress = new Progress({
                size: 52,
                lineWidth: 5
            });
             addClass(progress.el, 'loader')
            this.el.appendChild(progress.render().el)*/
            var _progress = this.options.progress;
            if (_progress) {
                _progress.show();
            }
            return this.model.open({
                progress: function progress(e) {
                    var pc = 100 / e.total * e.loaded;
                    if (_progress) _progress.setPercent(pc);
                }
            }).then(function (blob) {
                var fn = function fn(e) {
                    if (_progress) _progress.hide();
                    img.removeEventListener('load', fn);
                };
                img.addEventListener('load', fn);
                img.src = URL.createObjectURL(blob);
                _this4.triggerMethod('image', true);
                //if (progress) progress.hide();
                //progress.remove().destroy();
                return true;
            }).then(function () {
                orange_dom_1.addClass(img, 'loaded');
                return true;
            });
        }
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
    }, {
        key: "cropping",
        get: function get() {
            return this._cropping;
        },
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
}), __metadata('design:paramtypes', [Object])], CropView);
exports.CropView = CropView;