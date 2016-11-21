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