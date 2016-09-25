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
const orange_dom_1 = require('orange.dom');
const orange_1 = require('orange');
let Modal = class Modal extends views_1.View {
    constructor(options) {
        super(options);
        this.__rendered = false;
        if (options.el) {
            orange_dom_1.addClass(this.el, this.className);
        }
        this.close = orange_1.bind(this.close, this);
    }
    render() {
        super.render();
        this.__rendered = true;
        let overlay = orange_dom_1.createElement('div', {});
        orange_dom_1.addClass(overlay, 'views-modal-overlay');
        document.body.appendChild(overlay);
        return this;
    }
    open() {
        console.log('open');
        let body = document.body;
        if (orange_dom_1.hasClass(body, "views-modal-open")) {
            return;
        }
        this.triggerMethod('before:open');
        requestAnimationFrame(() => {
            orange_dom_1.addClass(this.el, 'views-modal-show');
            orange_dom_1.addClass(body, 'views-modal-open');
        });
        let overlay = document.body.querySelector('.views-modal-overlay');
        orange_dom_1.addEventListener(overlay, 'click', this.close);
        orange_dom_1.animationEnd(this.el, () => {
            this.triggerMethod('open');
        });
    }
    _onClose() {
        this.close();
    }
    close() {
        let body = document.body;
        if (!orange_dom_1.hasClass(this.el, "views-modal-show")) {
            return;
        }
        this.triggerMethod('before:close');
        let overlay = body.querySelector('.views-modal-overlay');
        orange_dom_1.removeEventListener(overlay, 'click', this.close);
        orange_dom_1.removeClass(this.el, 'views-modal-show');
        orange_dom_1.removeClass(body, 'views-modal-open');
        orange_dom_1.animationEnd(this.el, () => {
            this.triggerMethod('close');
        });
    }
    toggle() {
        let body = document.body;
        if (!orange_dom_1.hasClass(this.el, "views-modal-show")) {
            this.open();
        }
        else {
            this.close();
        }
    }
    onDestroy() {
        this.remove();
    }
};
Modal = __decorate([
    views_1.attributes({
        tagName: 'div',
        className: 'views-modal'
    }), 
    __metadata('design:paramtypes', [Object])
], Modal);
exports.Modal = Modal;
