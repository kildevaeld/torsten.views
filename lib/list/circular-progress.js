"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const views_1 = require('views');
const orange_1 = require('orange');
(function (ProgressMode) {
    ProgressMode[ProgressMode["Indeterminate"] = 0] = "Indeterminate";
    ProgressMode[ProgressMode["Determinate"] = 1] = "Determinate";
})(exports.ProgressMode || (exports.ProgressMode = {}));
var ProgressMode = exports.ProgressMode;
let Progress = class Progress extends views_1.View {
    constructor(options = {}) {
        super(options);
        this.options = orange_1.extend({}, {
            size: 220,
            lineWidth: 15,
            rotate: 0,
            background: '#efefef',
            foreground: '#555555',
            mode: ProgressMode.Determinate
        }, options);
        this._percent = 0;
        this._mode = this.options.mode;
    }
    set mode(mode) {
        if (!this._isRendered) {
            this.once('render', () => {
                setTimeout(() => this.mode = mode, 200);
            });
        }
        if (this._timer)
            clearInterval(this._timer);
        if (mode === ProgressMode.Indeterminate) {
            let last = 0;
            this.setPercent(0);
            this._timer = setInterval(() => {
                last = last == 100 ? 0 : last + 1;
                this.setPercent(last);
            }, 100);
        }
        this._mode = mode;
    }
    get mode() { return this._mode; }
    setPercent(percent) {
        let newPercent = percent;
        let diff = Math.abs(percent - this._percent);
        requestAnimationFrame(() => {
            this.ctx.clearRect(0, 0, this.options.size, this.options.size);
            this._drawCircle(this.ctx, this.options.background, this.options.lineWidth, 100 / 100);
            this._drawCircle(this.ctx, this.options.foreground, this.options.lineWidth, percent / 100);
            let text = this.el.querySelector('span');
            if (this.mode == ProgressMode.Determinate) {
                text.textContent = Math.floor(percent) + '%';
            }
            else {
                text.textContent = '';
            }
        });
    }
    _drawCircle(ctx, color, lineWidth, percent) {
        var radius = (this.options.size - this.options.lineWidth) / 2;
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = 'round'; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
    show() {
        this.el.style.display = 'block';
    }
    hide() {
        this.el.style.display = 'none';
    }
    render() {
        super.render();
        this.el.innerHTML = "";
        //let percent = parseInt(this.el.getAttribute('data-percent')||<any>0);
        var options = this.options;
        var canvas = document.createElement('canvas');
        var span = document.createElement('span');
        //span.textContent = Math.round(percent) + '%';
        if (typeof (G_vmlCanvasManager) !== 'undefined') {
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
        if (this.mode == ProgressMode.Determinate) {
            this.setPercent(0);
        }
        this._isRendered = true;
        return this;
    }
};
Progress = __decorate([
    views_1.attributes({
        className: "progress"
    }), 
    __metadata('design:paramtypes', [Object])
], Progress);
exports.Progress = Progress;
