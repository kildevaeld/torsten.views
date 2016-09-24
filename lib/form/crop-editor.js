/*import {CropView, AssetsModel, CropViewOptions, CropPreView,
    ICropping, AssetsClient, FileUploader, createClient} from 'assets.gallery';*/
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
const index_1 = require('../crop/index');
const views_form_1 = require('views.form');
const views_1 = require('views');
const index_2 = require('../gallery/index');
const orange_dom_1 = require('orange.dom');
const orange_1 = require('orange');
const template = `
  <div class="modal-container"></div>
  <div class="crop-container">
  </div>
  <!--<label class="btn btn-sm btn-default">
    <span>Upload</span>
    <input style="display:none;" type="file" class="upload-btn" name="upload-button" />
  </label>-->
  <button class="gallery-btn btn btn-sm btn-default" title="Vælg fra galleri">Vælg</button>
  <button class="crop-btn btn btn-sm btn-default pull-right">Beskær</button>
`;
let CropEditor = class CropEditor extends views_form_1.BaseEditor {
    constructor(options) {
        super(options);
        this.options = options = this._getOptions(orange_1.extend({}, options));
        let client = options.client;
        if (client == null) {
            /*if (options.host == null) throw new Error('client or host expected');
            client = createClient({
                endpoint: options.host,
            });*/
            throw new Error("no client");
        }
        this.modal = new index_2.GalleryModal({
            client: client,
            showDirectories: false,
            accept: ["image/*"],
            maxSize: this.options.maxSize,
            uploader: this.options.uploader
        });
        this.modal.root = this.options.root;
        if (this.options.cropping != null) {
            let o = orange_1.extend({
                zoomable: false,
                scalable: false,
                autoCropArea: 0.6,
                resize: true,
            }, orange_1.omit(this.options, ['el']));
            this.crop = new index_1.CropView(o);
        }
        /*this.uploader = new FileUploader({
            url: client.url,
            maxSize: this.options.maxSize,
            mimeType: this.options.mimeType
        });*/
        this.listenTo(this.modal, 'selected', this.onAssetSelected);
        //this.listenTo('crop', '')
    }
    getValue() {
        return this.model;
    }
    setValue(model) {
        if (this.model === model)
            return;
        this.model = model;
    }
    onModel(model) {
        if (model)
            this._removeDropIndicator();
        if (this.crop) {
            this._toggled = false;
            orange_dom_1.Html.query('.crop-btn').removeClass('active');
            this.crop.model = model;
        }
    }
    onSetElement() {
        this.options = this._getOptions(this.options);
    }
    _getOptions(options) {
        ['host', 'maxSize', 'mimeType', 'ratio', 'cropping']
            .forEach(m => {
            let l = m.toLowerCase();
            let attr = this.el.getAttribute(l); // || this.el.getAttribute('o-' + l);
            if (attr == null) {
                return;
            }
            else if (attr == "")
                attr = true;
            if (m == 'ratio') {
                m = 'aspectRatio';
                attr = parseFloat(attr);
            }
            else if (m == 'maxSize') {
                attr = parseInt(attr);
            }
            options[m] = attr;
        });
        return options;
    }
    onRender() {
        this.ui['modal'].appendChild(this.modal.render().el);
        if (this.crop) {
            this.ui['crop'].appendChild(this.crop.render().el);
            orange_dom_1.addClass(this.crop.el, 'crop-preview cropping-preview');
            orange_dom_1.addClass(this.crop.ui['image'], 'content');
            if (this.crop.options.previewView) {
                this.crop.options.previewView.destroy();
            }
        }
        let preview = new index_1.CropPreView({
            el: this.crop ? this.crop.el : null
        });
        if (!this.crop) {
            preview.el.innerHTML = '<img class="content" />';
            orange_dom_1.addClass(preview.el, 'crop-preview cropping-preview');
            let el = this.el.querySelector('.crop-btn');
            el.parentElement.removeChild(el);
        }
        else {
            this.crop.options.previewView = preview;
        }
        preview.render();
        if (this.crop) {
            let el = orange_dom_1.Html.query(document.createElement('div'))
                .addClass('upload-progress-container')
                .css({ display: 'none' });
            el.html('<div class="upload-progress" style="width:0;"></div>');
            this.crop.el.appendChild(el.get(0));
        }
        else {
            this.ui['crop'].appendChild(preview.el);
        }
        this._showDropIndicator();
    }
    clear() {
        this.model = null;
        this._showDropIndicator();
    }
    _showDropIndicator() {
        let preview = this.el.querySelector('.crop-preview');
        if (!preview)
            return;
        let i = preview.querySelector('.drop-indicator');
        if (i)
            return;
        i = document.createElement('div');
        let $i = orange_dom_1.Html.query(i);
        $i.addClass('drop-indicator')
            .css({
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            left: '50%'
        });
        $i.text('Drop Here');
        preview.appendChild(i);
    }
    _removeDropIndicator() {
        let i = this.el.querySelector('.drop-indicator');
        if (i && i.parentElement)
            i.parentElement.removeChild(i);
    }
    _onToggleCropper(e) {
        e.preventDefault();
        if (this.model == null)
            return;
        this.crop.toggle();
        this._toggled = !this._toggled;
        if (this._toggled) {
            orange_dom_1.addClass(e.target, 'active');
        }
        else {
            orange_dom_1.removeClass(e.target, 'active');
            this.model.set('meta.cropping', this.crop.cropping);
            this.triggerMethod('change');
        }
    }
    _onDrop(e) {
        e.preventDefault();
        let files = e.dataTransfer.files;
        if (!files.length) {
            return;
        }
        let file = files.item(0);
        try {
            this._validateFile(file);
        }
        catch (e) {
            console.log('validate error');
            return;
        }
        let div = this.crop.el.querySelector('.upload-progress');
        console.log('upload file', file);
        /*this.uploader.upload(file, (loaded, total) => {
            let progress = (loaded / total * 100 || 0);
            if (div) div.style.width = progress + '%';
        }).then(b => {
            if (div) div.style.width = '0';
            let model = new this.modal.gallery.collection.Model(b as any)
            this.modal.gallery.collection.add(model);
            this.modal.value = model;
            this.onAssetSelected();
        }).catch(e => {
            console.log(e)
            if (div) div.style.width = '0';
        })*/
    }
    _cancel(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        let el = orange_dom_1.Html.query(this.crop.el);
        //if (!e.dataTransfer.files.length) return false;
        if (e.type == 'dragenter') {
            el.addClass('dragenter');
        }
        else if (e.type == 'dragleave') {
            el.removeClass('dragenter');
        }
        return false;
    }
    _validateFile(file) {
        let maxSize = this.options.maxSize * 1000;
        if (maxSize !== 0 && file.size > maxSize) {
            throw new Error('file to big');
        }
        var type = file.type;
        var mimeTypes;
        if (typeof this.options.mimeType === 'string') {
            mimeTypes = [this.options.mimeType];
        }
        else {
            mimeTypes = this.options.mimeType;
        }
        if (!mimeTypes)
            return;
        for (var i = 0; i < mimeTypes.length; i++) {
            let mime = new RegExp(mimeTypes[i].replace('*', '.*'));
            if (mime.test(type))
                return;
            else
                throw new Error('Wrong mime type');
        }
    }
    onAssetSelected(model) {
        //let value = this.modal.selected;
        this.model = model;
        //(<HTMLImageElement>this.crop.ui['image']).src = value.getURL();
        this.trigger('change');
    }
    /*validate(form: Form) {
        return validate(form, this, this.value);
    }*/
    destroy() {
        if (this.crop.options.previewView) {
            this.crop.options.previewView.destroy();
        }
        this.crop.destroy();
        this.modal.destroy();
    }
};
CropEditor = __decorate([
    views_1.attributes({
        template: () => template,
        ui: {
            modal: '.modal-container',
            crop: '.crop-container'
        },
        events: {
            drop: '_onDrop',
            dragenter: '_cancel',
            dragover: '_cancel',
            dragleave: '_cancel',
            'click .gallery-btn': function (e) {
                e.preventDefault();
                this.modal.toggle();
            },
            'click .crop-btn': '_onToggleCropper',
        },
    }),
    views_form_1.editor('torsten.crop'), 
    __metadata('design:paramtypes', [Object])
], CropEditor);
exports.CropEditor = CropEditor;
