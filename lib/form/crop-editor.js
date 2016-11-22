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
var dropzone_1 = require("../gallery/dropzone");
var index_1 = require("../crop/index");
var views_form_1 = require("views.form");
var views_1 = require("views");
var index_2 = require("../gallery/index");
var orange_dom_1 = require("orange.dom");
var orange_1 = require("orange");
var index_3 = require("../templates/index");
var circular_progress_1 = require("../list/circular-progress");
;
/**
 *
 *
 * @export
 * @class CropEditor
 * @extends {BaseEditor<HTMLDivElement, CropResult>}
 */
var CropEditor = function (_views_form_1$BaseEdi) {
    _inherits(CropEditor, _views_form_1$BaseEdi);

    /**
     * Creates an instance of CropEditor.
     *
     * @param {CropEditorOptions} options
     *
     * @memberOf CropEditor
     */
    function CropEditor(options) {
        _classCallCheck(this, CropEditor);

        var _this = _possibleConstructorReturn(this, (CropEditor.__proto__ || Object.getPrototypeOf(CropEditor)).call(this, options));

        _this.options = options = _this._getOptions(orange_1.extend({}, options));
        options.root = options.root || '/';
        var client = options.client;
        if (client == null) {
            throw new Error("no client");
        }
        console.log(options);
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
            _this.crop.showMessage(e.message);
            setTimeout(function () {
                _this._showDropIndicator();
            }, 4000);
        });
        _this.listenTo(_this.crop, 'error', function () {
            setTimeout(function () {
                return _this._showDropIndicator();
            }, 4000);
        });
        _this.listenTo(_this.drop, 'before:drop', function () {
            _this.model = null;
            _this.crop.hideMessage();
        });
        _this.progress.hide();
        return _this;
    }
    /**
     *
     *
     * @returns {CropResult}
     *
     * @memberOf CropEditor
     */


    _createClass(CropEditor, [{
        key: "getValue",
        value: function getValue() {
            if (!this.model) return null;
            return {
                file: this.model,
                cropping: this.crop.cropping
            };
        }
        /**
         *
         *
         * @param {CropResult} result
         * @returns
         *
         * @memberOf CropEditor
         */

    }, {
        key: "setValue",
        value: function setValue(result) {
            if (result == null) {
                this.model = null;
                return;
            }
            //console.log('set value', this.crop.cropping, result.cropping);
            if (result.file !== this.model) {
                this.model = result.file;
            }
            if (!orange_1.equal(result.cropping, this.crop.cropping)) {
                this.crop.cropping = result.cropping;
            }
        }
        /**
         *
         *
         * @param {FileInfoModel} model
         *
         * @memberOf CropEditor
         */

    }, {
        key: "onModel",
        value: function onModel(model) {
            if (model) this._removeDropIndicator();
            this._toggled = false;
            orange_dom_1.Html.query('.crop-btn').removeClass('active');
            this.crop.model = model;
        }
        /**
         *
         *
         *
         * @memberOf CropEditor
         */

    }, {
        key: "onSetElement",
        value: function onSetElement() {
            this.options = this._getOptions(this.options);
        }
        /**
         * Parse options options and the element
         *
         * @private
         * @param {CropEditorOptions} options
         * @returns {CropEditorOptions}
         *
         * @memberOf CropEditor
         */

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
            this.preview.render();
            this.drop.render();
            this.crop.el.appendChild(this.progress.render().el);
        }
        /**
         *
         *
         *
         * @memberOf CropEditor
         */

    }, {
        key: "clear",
        value: function clear() {
            this.model = null;
            this.crop.showMessage("Drag'n'Drop image here");
        }
    }, {
        key: "_showDropIndicator",
        value: function _showDropIndicator() {
            this.crop.showMessage("Drag'n'Drop image here");
        }
    }, {
        key: "_removeDropIndicator",
        value: function _removeDropIndicator() {
            this.crop.hideMessage();
        }
        /*private _showError(e) {
            this._removeDropIndicator();
            let i = <HTMLDivElement>this.crop.el.querySelector('.error');
            if (!i) {
                i = document.createElement('div')
                addClass(i, "error");
                this.crop.el.appendChild(i);
            }
             i.innerHTML = `
                <h3>Could not upload image!</h3>
                <p>${e.message}</p>
            `;
        }
         private _removeError() {
            let i = <HTMLDivElement>this.crop.el.querySelector('.error')
            if (i && i.parentElement) {
                this.crop.el.removeChild(i);
            }
        }*/

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
                this.triggerMethod('change');
            }
        }
        /**
         * Called when a file is selected in the gallery modal
         * @memberOf CropEditor
         */

    }, {
        key: "_onFileSelected",
        value: function _onFileSelected(model) {
            this.model = model;
            this.trigger('change');
        }
    }, {
        key: "_onUploadBtnChanged",
        value: function _onUploadBtnChanged(e) {
            var target = e.target;
            var uploader = this._getUploader();
            var file = target.files.item(0);
            if (!file) return;
            uploader.upload(this.options.root, file, {
                mode: this.options.mode
            });
        }
    }, {
        key: "_getUploader",
        value: function _getUploader() {
            return this.options.uploader || this.modal.gallery.uploader;
        }
        /**
         *
         *
         * @memberOf CropEditor
         */

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
        'click .gallery-btn': function clickGalleryBtn(e) {
            e.preventDefault();
            this.modal.toggle();
        },
        'change input.upload-btn': '_onUploadBtnChanged',
        'click .crop-btn': '_onToggleCropper'
    }
}), views_form_1.editor('torsten.crop'), __metadata("design:paramtypes", [Object])], CropEditor);
exports.CropEditor = CropEditor;