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
var orange_dom_1 = require('orange.dom');
var orange_1 = require('orange');
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
}), __metadata('design:paramtypes', [Object])], DropZone);
exports.DropZone = DropZone;