
import { DropZone } from '../gallery/dropzone'
import { FileMode } from 'torsten';
import { CropViewOptions, CropView, CropPreView, Cropping } from '../crop/index';
import { FileInfoModel } from '../collection';
import { BaseEditor, editor, IEditorOptions } from 'views.form';
import { attributes } from 'views';
import { GalleryModal, GalleryViewOptions } from '../gallery/index';

import { addClass, removeClass, Html } from 'orange.dom';
import { omit, extend, equal } from 'orange';
import templates from '../templates/index';
import { Progress } from '../list/circular-progress';
import { UploadErrorEvent, UploadProgressEvent } from '../uploader';

/**
 * 
 * 
 * @export
 * @interface CropResult
 */
export interface CropResult {
    /**
     * 
     * 
     * @type {FileInfoModel}
     * @memberOf CropResult
     */
    file: FileInfoModel;
    /**
     * 
     * 
     * @type {Cropping}
     * @memberOf CropResult
     */
    cropping: Cropping;
}

/**
 * 
 * 
 * @export
 * @interface CropEditorOptions
 * @extends {GalleryViewOptions}
 * @extends {CropViewOptions}
 * @extends {IEditorOptions}
 */
export interface CropEditorOptions extends GalleryViewOptions, CropViewOptions, IEditorOptions {
    /**
     * 
     * 
     * @type {boolean}
     * @memberOf CropEditorOptions
     */
    cropping?: boolean;
    /**
     * 
     * 
     * @type {string}
     * @memberOf CropEditorOptions
     */
    root?: string;
    /**
     * 
     * 
     * @type {FileMode}
     * @memberOf CropEditorOptions
     */
    mode?: FileMode
};

/**
 * 
 * 
 * @export
 * @class CropEditor
 * @extends {BaseEditor<HTMLDivElement, CropResult>}
 */
@attributes({
    template: () => templates['crop-editor'],
    ui: {
        modal: '.modal-container',
        crop: '.crop-container'
    },
    events: {
        'click .gallery-btn': function (e) {
            e.preventDefault();
            this.modal.toggle();
        },
        'change input.upload-btn': '_onUploadBtnChanged',
        'click .crop-btn': '_onToggleCropper',
    },
})
@editor('torsten.crop')
export class CropEditor extends BaseEditor<HTMLDivElement, CropResult> {
    /**
     * 
     * 
     * @type {FileInfoModel}
     * @memberOf CropEditor
     */
    model: FileInfoModel;
    /**
     * 
     * 
     * @type {GalleryModal}
     * @memberOf CropEditor
     */
    modal: GalleryModal;
    /**
     * 
     * 
     * @type {CropView}
     * @memberOf CropEditor
     */
    crop: CropView
    /**
     * 
     * 
     * @type {DropZone}
     * @memberOf CropEditor
     */
    drop: DropZone;
    /**
     * 
     * 
     * @type {Progress}
     * @memberOf CropEditor
     */
    progress: Progress;
    /**
     * 
     * 
     * @type {CropPreView}
     * @memberOf CropEditor
     */
    preview: CropPreView
    /**
     * 
     * 
     * @type {CropEditorOptions}
     * @memberOf CropEditor
     */
    options: CropEditorOptions
    /**
     * 
     * 
     * @type {boolean}
     * @memberOf CropEditor
     */
    private _toggled: boolean;
    /**
     * 
     * 
     * @returns {CropResult}
     * 
     * @memberOf CropEditor
     */
    getValue(): CropResult {
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
    setValue(result: CropResult) {
        if (result == null) {
            this.model = null;
            return;
        }

        if (result.file !== this.model) {
            this.model = result.file;
        }

        if (!equal(result.cropping, this.crop.cropping)) {
            this.crop.cropping = result.cropping;
        }

    }

    /**
     * Creates an instance of CropEditor.
     * 
     * @param {CropEditorOptions} options
     * 
     * @memberOf CropEditor
     */
    constructor(options: CropEditorOptions) {
        super(options);

        this.options = options = this._getOptions(extend({}, options));
        options.root = options.root || '/';

        let client = options.client;
        if (client == null) {
            throw new Error("no client");
        }

        this.modal = new GalleryModal({
            client: client,
            showDirectories: false,
            accept: ["image/*"],
            mode: this.options.mode,
            maxSize: this.options.maxSize,
            uploader: this.options.uploader,
            root: this.options.root
        });

        this.drop = new DropZone({
            el: this.el,
            uploader: this.modal.gallery.uploader,
            path: options.root,
            mode: this.options.mode
        });

        this.progress = new Progress({
            size: 100,
            lineWidth: 5
        });


        let o = extend({
            zoomable: false,
            scalable: false,
            autoCropArea: 0.6,
            resize: true,
            progress: this.progress

        }, omit(this.options, ['el']));

        this.crop = new CropView(o);

        this.preview = new CropPreView({
            el: this.crop.el,

        });

        this.crop.options.previewView = this.preview

        this.listenTo(this.modal, 'selected', this._onFileSelected);

        let up = this.modal.gallery.uploader;



        this.listenTo(up, 'started', (e) => {
            this.clear();
            this._removeDropIndicator();
            this.progress.setPercent(0);
            this.progress.show();

        });

        this.listenTo(up, 'progress', (e: UploadProgressEvent) => {
            let pc = 100 / e.total * e.loaded;
            this.progress.setPercent(pc);
        });

        this.listenTo(up, 'done', (file: FileInfoModel) => {
            this.progress.hide();
            this.value = {
                file: file,
                cropping: null
            };
        });

        this.listenTo(up, 'error', (e: UploadErrorEvent) => {
            this.progress.hide();
            this.crop.showMessage(e.message);
            setTimeout(() => { this._showDropIndicator() }, 4000)
        });

        this.listenTo(this.crop, 'error', () => {
            setTimeout(() => this._showDropIndicator(), 4000);
        });

        this.listenTo(this.drop, 'before:drop', () => {
            this.model = null;
            this.crop.hideMessage();
        });

        this.progress.hide();

    }

    /**
     * 
     * 
     * @param {FileInfoModel} model
     * 
     * @memberOf CropEditor
     */
    onModel(model: FileInfoModel) {
        if (model) this._removeDropIndicator();
        this._toggled = false;
        Html.query('.crop-btn').removeClass('active');
        this.crop.model = model;

    }

    /**
     * 
     * 
     * 
     * @memberOf CropEditor
     */
    protected onSetElement() {
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
    private _getOptions(options: CropEditorOptions): CropEditorOptions {
        ['host', 'maxSize', 'mimeType', 'ratio', 'cropping']
            .forEach(m => {
                let l = m.toLowerCase();
                let attr: any = this.el.getAttribute(l) // || this.el.getAttribute('o-' + l);
                if (attr == null) {
                    return;
                } else if (attr == "") attr = true;
                if (m == 'ratio') {
                    m = 'aspectRatio'
                    attr = parseFloat(attr)
                } else if (m == 'maxSize') {
                    attr = parseInt(attr);
                }
                options[m] = attr;
            });
        return options;
    }


    protected onRender() {

        this.ui['modal'].appendChild(this.modal.render().el);
        if (this.crop) {
            this.ui['crop'].appendChild(this.crop.render().el)

            addClass(this.crop.el, 'crop-preview cropping-preview')
            addClass(this.crop.ui['image'], 'content');


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
    clear() {
        this.model = null;
        this.crop.showMessage("Drag'n'Drop image here")
    }

    private _showDropIndicator() {
        this.crop.showMessage("Drag'n'Drop image here");

    }

    private _removeDropIndicator() {
        this.crop.hideMessage();
    }



    protected _onToggleCropper(e: MouseEvent) {
        e.preventDefault();
        if (this.model == null) return;
        this.crop.toggle();
        this._toggled = !this._toggled
        if (this._toggled) {
            addClass(<any>e.target, 'active');
        } else {
            removeClass(<any>e.target, 'active');
            this.triggerMethod('change');
        }
    }

    /**
     * Called when a file is selected in the gallery modal
     * @memberOf CropEditor
     */
    private _onFileSelected(model) {
        this.model = model;
        this.trigger('change');
    }


    protected _onUploadBtnChanged(e: Event) {
        let target = e.target as HTMLInputElement;

        let uploader = this._getUploader();

        let file = target.files.item(0);
        if (!file) return;

        uploader.upload(this.options.root, file, {
            mode: this.options.mode
        });

    }


    private _getUploader() {
        return this.options.uploader || this.modal.gallery.uploader;
    }

    /**
     * 
     * 
     * @memberOf CropEditor
     */
    destroy() {
        if (this.crop.options.previewView) {
            this.crop.options.previewView.destroy();
        }
        this.crop.destroy();
        this.modal.destroy();
        this.drop.destroy();
        this.progress.destroy();

    }

}
