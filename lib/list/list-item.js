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
var views_1 = require('views');
var orange_1 = require('orange');
var orange_dom_1 = require('orange.dom');
var index_1 = require('../templates/index');
var mimetypes_1 = require('../gallery/mimetypes');
var utils_1 = require('../utils');
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
}), __metadata('design:paramtypes', [])], FileListItemView);
exports.FileListItemView = FileListItemView;