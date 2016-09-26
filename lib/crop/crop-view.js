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
const Cropper = require('cropperjs');
const types_1 = require('./types');
const collection_1 = require('../collection');
const utils_1 = require('../utils');
const orange_1 = require('orange');
const orange_dom_1 = require('orange.dom');
function isFunction(a) {
    return (typeof a === 'function');
}
let CropView = class CropView extends views_1.View {
    constructor(options = { resize: false }) {
        super(options);
        this.options = options;
    }
    get cropper() {
        if (this._cropper != null)
            return this._cropper;
        if (this.ui['image'] == null)
            return null;
        return this.activate()._cropper;
    }
    get cropping() {
        return this._cropping;
    }
    set cropping(cropping) {
        this._cropping = cropping;
        if (this.options.previewView)
            this.options.previewView.cropping = cropping;
    }
    setModel(model) {
        if (model && !collection_1.isFileInfo(model)) {
            throw new Error("not a file info model");
        }
        if (this.ui['image'] == null)
            return this;
        this.deactivate();
        let image = this.ui['image'];
        if (image.src) {
            window.URL.revokeObjectURL(image.src);
        }
        image.src = utils_1.emptyImage;
        // image.style.display = 'none';
        if (model == null) {
            if (this.model)
                this.stopListening(this.model);
            this._model = model;
            return;
        }
        super.setModel(model);
        this._updateImage()
            .then((loaded) => {
            if (loaded && this.options.aspectRatio != null) {
                utils_1.getImageSize(image).then(size => {
                    this.cropping = types_1.getCropping(size, this.options.aspectRatio);
                    //this.triggerMethod('crop', cropping);
                }).catch(e => {
                    this.trigger('error', e);
                });
            }
        });
        return this;
    }
    activate() {
        if (this._cropper != null) {
            return this;
        }
        let o = this.options;
        let opts = {
            crop: e => {
                this._cropping = e.detail;
                this.triggerMethod('crop', e.detail);
                if (isFunction(o.crop))
                    o.crop(e);
            },
            data: this.cropping,
            built: () => {
                this.triggerMethod('built');
                if (isFunction(o.built))
                    o.built();
            },
            cropstart: e => {
                this.triggerMethod('cropstart');
                if (isFunction(o.cropstart))
                    o.cropstart(e);
            },
            cropmove: e => {
                this.triggerMethod('cropmove', e);
                if (isFunction(o.cropmove))
                    o.cropmove(e);
            },
            cropend: e => {
                this.triggerMethod('cropend', e);
                if (isFunction(o.cropend))
                    o.cropend(e);
            }
        };
        opts = orange_1.extend({}, this.options, opts);
        this._cropper = new Cropper(this.ui['image'], opts);
        return this;
    }
    deactivate() {
        if (this._cropper) {
            this._cropper.destroy();
            this._cropper = void 0;
        }
        return this;
    }
    toggle() {
        return this._cropper != null ? this.deactivate() : this.activate();
    }
    onCrop(cropping) {
        if (this.options.previewView) {
            this.options.previewView.cropping = cropping;
        }
    }
    render() {
        this.triggerMethod('before:render');
        this.undelegateEvents();
        let image = this.el.querySelector('img');
        if (image == null) {
            image = document.createElement('img');
            this.el.appendChild(image);
        }
        this.delegateEvents();
        this.triggerMethod('render');
        return this;
    }
    _updateImage() {
        let img = this.el.querySelector('img');
        orange_dom_1.removeClass(img, 'loaded');
        if (this.model === null) {
            img.src = utils_1.emptyImage;
            return Promise.resolve(false);
        }
        /*let progress = new Progress({
            size: 52,
            lineWidth: 5
        });

        addClass(progress.el, 'loader')
        this.el.appendChild(progress.render().el)*/
        let progress = this.options.progress;
        if (progress) {
            progress.show();
        }
        return this.model.open({
            progress: (e) => {
                let pc = 100 / e.total * e.loaded;
                if (progress)
                    progress.setPercent(pc);
            }
        }).then(blob => {
            var fn = (e) => {
                if (progress)
                    progress.hide();
                img.removeEventListener('load', fn);
            };
            img.addEventListener('load', fn);
            img.src = URL.createObjectURL(blob);
            this.triggerMethod('image', true);
            //if (progress) progress.hide();
            //progress.remove().destroy();
            return true;
        }).then(() => {
            orange_dom_1.addClass(img, 'loaded');
            return true;
        });
    }
    destroy() {
        this.deactivate();
        super.destroy();
    }
};
CropView = __decorate([
    views_1.attributes({
        className: 'torsten cropping-view',
        ui: {
            image: 'img'
        }
    }), 
    __metadata('design:paramtypes', [Object])
], CropView);
exports.CropView = CropView;
