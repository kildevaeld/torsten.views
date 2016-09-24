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
        this._onClose = orange_1.bind(this._onClose, this);
    }
    onRender() {
        this.__rendered = true;
    }
    open() {
        let body = document.body;
        if (orange_dom_1.hasClass(body, "torsten-modal-open")) {
            return;
        }
        let overlay = orange_dom_1.createElement('div', {});
        orange_dom_1.addClass(overlay, 'torsten-modal-overlay');
        body.appendChild(overlay);
        requestAnimationFrame(() => {
            orange_dom_1.addClass(body, 'torsten-modal-open');
        });
        orange_dom_1.addEventListener(overlay, 'click', this._onClose);
    }
    _onClose() {
        console.log('close');
        this.close();
    }
    close() {
        let body = document.body;
        if (!orange_dom_1.hasClass(body, "torsten-modal-open")) {
            return;
        }
        let overlay = body.querySelector('.torsten-modal-overlay');
        orange_dom_1.removeEventListener(overlay, 'click', this._onClose);
        orange_dom_1.removeClass(body, 'torsten-modal-open');
        orange_dom_1.transitionEnd(overlay, (e) => {
            body.removeChild(overlay);
        }, null);
    }
    onDestroy() {
        this.remove();
    }
};
Modal = __decorate([
    views_1.attributes({
        tagName: 'div',
        className: 'torsten modal'
    }), 
    __metadata('design:paramtypes', [Object])
], Modal);
exports.Modal = Modal;
