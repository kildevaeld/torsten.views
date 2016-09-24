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
const index_1 = require('../modal/index');
const gallery_1 = require('./gallery');
const views_1 = require('views');
const index_2 = require('../templates/index');
const orange_dom_1 = require('orange.dom');
let GalleryModal = class GalleryModal extends index_1.Modal {
    constructor(options) {
        super(options);
        delete options.el;
        this._gallery = new gallery_1.GalleryView(options);
        this.listenTo(this._gallery, 'dblclick', () => {
            this.trigger('selected', this.selected);
            this.close();
        });
    }
    get gallery() {
        return this._gallery;
    }
    get selected() {
        return this.gallery.selected;
    }
    set root(root) {
        this._gallery.root = root;
    }
    onOpen() {
        this.gallery.list.loadImages();
    }
    onRender() {
        this._gallery.render();
        this.ui['content'].appendChild(this._gallery.el);
        orange_dom_1.addClass(this.el, 'gallery-modal');
    }
    _onSelect(e) {
        e.preventDefault();
        console.log('on select');
    }
};
GalleryModal = __decorate([
    views_1.attributes({
        template: () => index_2.default['modal-gallery'],
        ui: {
            content: '.torsten-modal-content'
        },
        events: {
            'click .btn-close': function () { this.close(); },
            'click .btn-select': '_onSelect'
        }
    }), 
    __metadata('design:paramtypes', [Object])
], GalleryModal);
exports.GalleryModal = GalleryModal;
