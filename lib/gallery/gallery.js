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
const index_1 = require('../list/index');
const index_2 = require('../info/index');
const index_3 = require('../templates/index');
const collection_1 = require('../collection');
const dropzone_1 = require('./dropzone');
const uploader_1 = require('../uploader');
let GalleryView = class GalleryView extends views_1.LayoutView {
    constructor(options) {
        super(orange_1.extend({}, options, {
            regions: {
                list: '.gallery-list',
                info: '.gallery-info'
            }
        }));
        this.options = options;
        this.collections = [];
        this.client = options.client;
        this.list = new index_1.FileListView({
            showDirectories: options.showDirectories || false,
            client: this.client
        });
        this.info = new index_2.FileInfoView({
            client: this.client
        });
        this.drop = new dropzone_1.DropZone({
            el: this.el
        });
        this.uploader = options.uploader;
        if (!this.uploader) {
            this.uploader = new uploader_1.Uploader({
                client: this.client,
                maxSize: options.maxSize,
                accept: options.accept || ['*'],
                mode: options.mode
            });
            this._const_upload = true;
        }
        if (options.accept)
            this.uploader.accept = options.accept;
        if (options.maxSize > 0)
            this.uploader.maxSize = options.maxSize;
        this.listenTo(this.list, 'selected', this._onFileInfoSelected);
        this.listenTo(this.list, 'remove', this._onFileInfoRemoved);
        this.listenTo(this.list, 'dblclick', () => {
            this.trigger('dblclick');
        });
        this.listenTo(this.drop, 'drop', this._onFileDrop);
        this.listenTo(this.uploader, 'done', (file) => {
            for (let i = 0, ii = this.collections.length; i < ii; i++) {
                if (this.collections[i].path == file.get('path')) {
                    this.collections[i].add(file);
                }
            }
        });
        if (this.options.root) {
            this.root = this.options.root;
        }
    }
    get collection() {
        if (this.collections.length == 0)
            return null;
        return this.collections[this.collections.length - 1];
    }
    set root(path) {
        if (this._root == path)
            return;
        this._root = path;
        for (let i = 0, ii = this.collections.length; i < ii; i++) {
            this.collections[i].destroy();
        }
        this.collections = [new collection_1.FileCollection(null, {
                client: this.client,
                path: this._root,
                limit: 100
            })];
        this._setCollection(this.collections[0]);
        this.collections[0].fetch({
            params: {
                show_hidden: this.options.showHidden
            }
        });
    }
    get root() { return this._root; }
    get selected() {
        return this._selected;
    }
    set selected(model) {
        this._selected = model;
        if (model) {
            this.info.model = model.get('is_dir') ? null : model;
        }
        else {
            this.info.model = null;
        }
    }
    _onFileInfoSelected(view, model) {
        this.selected = model;
    }
    _onFileInfoRemoved(view, model) {
        this.client.remove(model.fullPath)
            .then(res => {
            if (res.message === 'ok') {
                model.remove();
            }
            console.log(res);
        });
    }
    _setCollection(collection) {
        this.list.collection = collection;
    }
    _onFileDrop(file) {
        let collection = this.collections[this.collections.length - 1];
        this.uploader.upload(collection.path, file, {
            progress: (e) => {
                if (!e.lengthComputable)
                    return;
            }
        });
    }
    onRender() {
        this.regions['list'].show(this.list);
        this.regions['info'].show(this.info);
        this.drop.render();
    }
    destroy() {
        this.list.destroy();
        this.info.destroy();
        this.drop.destroy();
        if (this._const_upload) {
            this.uploader.destroy();
        }
        super.destroy();
        return this;
    }
};
GalleryView = __decorate([
    views_1.attributes({
        template: () => index_3.default['gallery'],
        className: 'torsten-gallery gallery'
    }), 
    __metadata('design:paramtypes', [Object])
], GalleryView);
exports.GalleryView = GalleryView;
