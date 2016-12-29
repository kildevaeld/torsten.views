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
var index_1 = require("../templates/index");
var orange_1 = require("orange");
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