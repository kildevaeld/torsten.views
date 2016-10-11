
/*import {CropView, AssetsModel, CropViewOptions, CropPreView,
    ICropping, AssetsClient, FileUploader, createClient} from 'assets.gallery';*/
import { DropZone } from '../gallery/dropzone'
import { IClient, FileMode } from 'torsten';
import { CropViewOptions, CropView, CropPreView, Cropping } from '../crop/index';
import { FileInfoModel } from '../collection';
import { BaseEditor, Form, validate, editor, IEditorOptions } from 'views.form';
import { attributes } from 'views';
import { GalleryModal, GalleryViewOptions } from '../gallery/index';

import { addClass, removeClass, Html } from 'orange.dom';
import { omit, extend , equal} from 'orange';
import templates from '../templates/index';
import { Progress } from '../list/circular-progress';
import {UploadErrorEvent, UploadProgressEvent, UploadEvent} from '../uploader';

export interface CropResult {
    file: FileInfoModel;
    cropping: Cropping;
}

export interface CropEditorOptions extends GalleryViewOptions, CropViewOptions, IEditorOptions {
    cropping?: boolean;
    root?: string;
    mode?: FileMode
};

@attributes({
    template: () => templates['crop-editor'],
    ui: {
        modal: '.modal-container',
        crop: '.crop-container'
    },
    events: {
        /*drop: '_onDrop',
        dragenter: '_cancel',
        dragover: '_cancel',
        dragleave: '_cancel',*/
        'click .gallery-btn': function (e) {
            e.preventDefault();
            this.modal.toggle();
        },
        'click .crop-btn': '_onToggleCropper',
    },
})
@editor('torsten.crop')
export class CropEditor extends BaseEditor<HTMLDivElement, CropResult> {
    model: FileInfoModel;
    modal: GalleryModal;
    crop: CropView
    drop: DropZone;
    progress: Progress;
    preview: CropPreView
    //uploader: FileUploader;
    options: CropEditorOptions
    _toggled: boolean;
    getValue(): CropResult {
        if (!this.model) return null;
        return {
            file: this.model,
            cropping: this.crop.cropping
        };
    }

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

    constructor(options: CropEditorOptions) {
        super(options);

        this.options = options = this._getOptions(extend({}, options));
        options.root = options.root||'/';

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

        this.listenTo(up, 'progress', (e:UploadProgressEvent) => {
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

        this.listenTo(up, 'error', (e:UploadErrorEvent) => {
            this.progress.hide();
            this._showError(e);
            setTimeout(() => { this._showDropIndicator() }, 2000)  
        })

        this.progress.hide();

    }

    onModel(model: FileInfoModel) {
        if (model) this._removeDropIndicator();
        this._toggled = false;
        Html.query('.crop-btn').removeClass('active');
        this.crop.model = model;

    }

    onSetElement() {
        this.options = this._getOptions(this.options);
    }

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

    onRender() {

        this.ui['modal'].appendChild(this.modal.render().el);
        if (this.crop) {
            this.ui['crop'].appendChild(this.crop.render().el)

            addClass(this.crop.el, 'crop-preview cropping-preview')
            addClass(this.crop.ui['image'], 'content');

            /*if (this.crop.options.previewView) {
                this.crop.options.previewView.destroy();
            }*/
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

    clear() {
        this.model = null;
        this._showDropIndicator();
    }

    private _showDropIndicator() {
        this._removeError();
        let preview = this.el.querySelector('.crop-preview');
        if (!preview) return;
        let i = preview.querySelector('.drop-indicator');
        if (i) return;
        i = document.createElement('div');
        let $i = Html.query(<any>i);
        $i.addClass('drop-indicator')
            .css({
                position: 'absolute',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                left: '50%'
            })
        $i.text('Drop Here');


        preview.appendChild(i);

    }

    private _removeDropIndicator() {
        let i = this.el.querySelector('.drop-indicator')
        if (i && i.parentElement) i.parentElement.removeChild(i);
    }
    private _showError(e) {
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
    }

    private _onToggleCropper(e: MouseEvent) {
        e.preventDefault();
        if (this.model == null) return;
        this.crop.toggle();
        this._toggled = !this._toggled
        if (this._toggled) {
            addClass(<any>e.target, 'active');
        } else {
            removeClass(<any>e.target, 'active');
            //this.model.set('meta.cropping', this.crop.cropping);
            this.triggerMethod('change');
        }
    }



    private _onFileSelected(model) {
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
        this.drop.destroy();
        this.progress.destroy();

    }

}
