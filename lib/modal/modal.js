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
var orange_dom_1 = require('orange.dom');
var orange_1 = require('orange');
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
}), __metadata('design:paramtypes', [Object])], Modal);
exports.Modal = Modal;