"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
/*import {CropView, AssetsModel, CropViewOptions, CropPreView,
    ICropping, AssetsClient, FileUploader, createClient} from 'assets.gallery';*/
var dropzone_1 = require('../gallery/dropzone');
var index_1 = require('../crop/index');
var views_form_1 = require('views.form');
var views_1 = require('views');
var index_2 = require('../gallery/index');
var orange_dom_1 = require('orange.dom');
var orange_1 = require('orange');
var index_3 = require('../templates/index');
var circular_progress_1 = require('../list/circular-progress');
;
var CropEditor = function (_views_form_1$BaseEdi) {
    _inherits(CropEditor, _views_form_1$BaseEdi);

    function CropEditor(options) {
        _classCallCheck(this, CropEditor);

        var _this = _possibleConstructorReturn(this, (CropEditor.__proto__ || Object.getPrototypeOf(CropEditor)).call(this, options));

        _this.options = options = _this._getOptions(orange_1.extend({}, options));
        options.root = options.root || '/';
        var client = options.client;
        if (client == null) {
            throw new Error("no client");
        }
        _this.modal = new index_2.GalleryModal({
            client: client,
            showDirectories: false,
            accept: ["image/*"],
            mode: _this.options.mode,
            maxSize: _this.options.maxSize,
            uploader: _this.options.uploader,
            root: _this.options.root
        });
        _this.drop = new dropzone_1.DropZone({
            el: _this.el,
            uploader: _this.modal.gallery.uploader,
            path: options.root,
            mode: _this.options.mode
        });
        _this.progress = new circular_progress_1.Progress({
            size: 100,
            lineWidth: 5
        });
        var o = orange_1.extend({
            zoomable: false,
            scalable: false,
            autoCropArea: 0.6,
            resize: true,
            progress: _this.progress
        }, orange_1.omit(_this.options, ['el']));
        _this.crop = new index_1.CropView(o);
        _this.preview = new index_1.CropPreView({
            el: _this.crop.el
        });
        _this.crop.options.previewView = _this.preview;
        _this.listenTo(_this.modal, 'selected', _this._onFileSelected);
        var up = _this.modal.gallery.uploader;
        _this.listenTo(up, 'started', function (e) {
            _this.clear();
            _this._removeDropIndicator();
            _this.progress.setPercent(0);
            _this.progress.show();
        });
        _this.listenTo(up, 'progress', function (e) {
            var pc = 100 / e.total * e.loaded;
            _this.progress.setPercent(pc);
        });
        _this.listenTo(up, 'done', function (file) {
            _this.progress.hide();
            _this.value = {
                file: file,
                cropping: null
            };
        });
        _this.listenTo(up, 'error', function (e) {
            _this.progress.hide();
            _this._showError(e);
            setTimeout(function () {
                _this._showDropIndicator();
            }, 2000);
        });
        _this.progress.hide();
        return _this;
    }

    _createClass(CropEditor, [{
        key: "getValue",
        value: function getValue() {
            if (!this.model) return null;
            return {
                file: this.model,
                cropping: this.crop.cropping
            };
        }
    }, {
        key: "setValue",
        value: function setValue(result) {
            if (result == null) {
                this.model = null;
                return;
            }
            if (result.file !== this.model) {
                this.model = result.file;
            }
            if (!orange_1.equal(result.cropping, this.crop.cropping)) {
                this.crop.cropping = result.cropping;
            }
        }
    }, {
        key: "onModel",
        value: function onModel(model) {
            if (model) this._removeDropIndicator();
            this._toggled = false;
            orange_dom_1.Html.query('.crop-btn').removeClass('active');
            this.crop.model = model;
        }
    }, {
        key: "onSetElement",
        value: function onSetElement() {
            this.options = this._getOptions(this.options);
        }
    }, {
        key: "_getOptions",
        value: function _getOptions(options) {
            var _this2 = this;

            ['host', 'maxSize', 'mimeType', 'ratio', 'cropping'].forEach(function (m) {
                var l = m.toLowerCase();
                var attr = _this2.el.getAttribute(l); // || this.el.getAttribute('o-' + l);
                if (attr == null) {
                    return;
                } else if (attr == "") attr = true;
                if (m == 'ratio') {
                    m = 'aspectRatio';
                    attr = parseFloat(attr);
                } else if (m == 'maxSize') {
                    attr = parseInt(attr);
                }
                options[m] = attr;
            });
            return options;
        }
    }, {
        key: "onRender",
        value: function onRender() {
            this.ui['modal'].appendChild(this.modal.render().el);
            if (this.crop) {
                this.ui['crop'].appendChild(this.crop.render().el);
                orange_dom_1.addClass(this.crop.el, 'crop-preview cropping-preview');
                orange_dom_1.addClass(this.crop.ui['image'], 'content');
            }
            /*let preview = new CropPreView({
                el: this.crop ? this.crop.el : null
            });
             if (!this.crop) {
                preview.el.innerHTML = '<img class="content" />';
                addClass(preview.el, 'crop-preview cropping-preview')
                let el = this.el.querySelector('.crop-btn')
                el.parentElement.removeChild(el);
            } else {
                
            }*/
            this.preview.render();
            /*if (this.crop) {
                let el = Html.query(document.createElement('div'))
                    .addClass('upload-progress-container')
                    .css({ display: 'none' });
                el.html('<div class="upload-progress" style="width:0;"></div>');
                this.crop.el.appendChild(el.get(0));
            } else {
                this.ui['crop'].appendChild(preview.el);
            }*/
            this.drop.render();
            this.crop.el.appendChild(this.progress.render().el);
            //this._showDropIndicator();
            //this._showError(new Error('Image already exists'));
        }
    }, {
        key: "clear",
        value: function clear() {
            this.model = null;
            this._showDropIndicator();
        }
    }, {
        key: "_showDropIndicator",
        value: function _showDropIndicator() {
            this._removeError();
            var preview = this.el.querySelector('.crop-preview');
            if (!preview) return;
            var i = preview.querySelector('.drop-indicator');
            if (i) return;
            i = document.createElement('div');
            var $i = orange_dom_1.Html.query(i);
            $i.addClass('drop-indicator').css({
                position: 'absolute',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                left: '50%'
            });
            $i.text('Drop Here');
            preview.appendChild(i);
        }
    }, {
        key: "_removeDropIndicator",
        value: function _removeDropIndicator() {
            var i = this.el.querySelector('.drop-indicator');
            if (i && i.parentElement) i.parentElement.removeChild(i);
        }
    }, {
        key: "_showError",
        value: function _showError(e) {
            this._removeDropIndicator();
            var i = this.crop.el.querySelector('.error');
            if (!i) {
                i = document.createElement('div');
                orange_dom_1.addClass(i, "error");
                this.crop.el.appendChild(i);
            }
            i.innerHTML = "\n            <h3>Could not upload image!</h3>\n            <p>" + e.message + "</p>\n        ";
        }
    }, {
        key: "_removeError",
        value: function _removeError() {
            var i = this.crop.el.querySelector('.error');
            if (i && i.parentElement) {
                this.crop.el.removeChild(i);
            }
        }
    }, {
        key: "_onToggleCropper",
        value: function _onToggleCropper(e) {
            e.preventDefault();
            if (this.model == null) return;
            this.crop.toggle();
            this._toggled = !this._toggled;
            if (this._toggled) {
                orange_dom_1.addClass(e.target, 'active');
            } else {
                orange_dom_1.removeClass(e.target, 'active');
                //this.model.set('meta.cropping', this.crop.cropping);
                this.triggerMethod('change');
            }
        }
    }, {
        key: "_onFileSelected",
        value: function _onFileSelected(model) {
            //let value = this.modal.selected;
            this.model = model;
            //(<HTMLImageElement>this.crop.ui['image']).src = value.getURL();
            this.trigger('change');
        }
        /*validate(form: Form) {
            return validate(form, this, this.value);
        }*/

    }, {
        key: "destroy",
        value: function destroy() {
            if (this.crop.options.previewView) {
                this.crop.options.previewView.destroy();
            }
            this.crop.destroy();
            this.modal.destroy();
            this.drop.destroy();
            this.progress.destroy();
        }
    }]);

    return CropEditor;
}(views_form_1.BaseEditor);
CropEditor = __decorate([views_1.attributes({
    template: function template() {
        return index_3.default['crop-editor'];
    },
    ui: {
        modal: '.modal-container',
        crop: '.crop-container'
    },
    events: {
        /*drop: '_onDrop',
        dragenter: '_cancel',
        dragover: '_cancel',
        dragleave: '_cancel',*/
        'click .gallery-btn': function clickGalleryBtn(e) {
            e.preventDefault();
            this.modal.toggle();
        },
        'click .crop-btn': '_onToggleCropper'
    }
}), views_form_1.editor('torsten.crop'), __metadata('design:paramtypes', [Object])], CropEditor);
exports.CropEditor = CropEditor;