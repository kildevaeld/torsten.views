import { View, ViewOptions, attributes } from 'views';
import Cropper from 'cropperjs';
import { ICropper, Cropping, getCropping } from './types';
import { FileInfoModel, isFileInfo } from '../collection';
import { CropPreView } from './crop-preview';
import { getImageSize, emptyImage } from '../utils';
import { extend } from 'orange';
import { addClass, removeClass, Html } from 'orange.dom'
import { IClient } from 'torsten'
import { Progress } from '../list/circular-progress'

function isFunction(a: any): a is Function {
    return (typeof a === 'function');
}

/**
 * 
 * 
 * @export
 * @interface CropViewOptions
 * @extends {ViewOptions}
 * @extends {cropperjs.CropperOptions}
 */
export interface CropViewOptions extends ViewOptions, cropperjs.CropperOptions {
    /**
     * 
     * 
     * @type {boolean}
     * @memberOf CropViewOptions
     */
    resize?: boolean;
    /**
     * 
     * 
     * @type {CropPreView}
     * @memberOf CropViewOptions
     */
    previewView?: CropPreView;
    /**
     * 
     * 
     * @type {Progress}
     * @memberOf CropViewOptions
     */
    progress?: Progress;
    /**
     * 
     * 
     * @type {IClient}
     * @memberOf CropViewOptions
     */
    client: IClient;

}

/**
 * 
 * 
 * @export
 * @class CropView
 * @extends {View<HTMLDivElement>}
 */
@attributes({
    className: 'torsten cropping-view',
    ui: {
        image: 'img'
    }
})
export class CropView extends View<HTMLDivElement> {
    /**
     * 
     * 
     * @type {FileInfoModel}
     * @memberOf CropView
     */
    model: FileInfoModel;
    /**
     * 
     * 
     * @type {IClient}
     * @memberOf CropView
     */
    client: IClient;
    private _cropper: ICropper;
    /**
     * 
     * 
     * @protected
     * @type {Cropping}
     * @memberOf CropView
     */
    protected _cropping: Cropping;
    private _message: Html;
    /**
     * 
     * 
     * @type {CropViewOptions}
     * @memberOf CropView
     */
    options: CropViewOptions;

    /**
     * 
     * 
     * @readonly
     * 
     * @memberOf CropView
     */
    get cropper() {
        if (this._cropper != null) return this._cropper;
        if (this.ui['image'] == null) return null;

        return this.activate()._cropper;
    }

    /**
     * 
     * 
     * 
     * @memberOf CropView
     */
    get cropping() {
        return this._cropping;
    }

    /**
     * 
     * 
     * 
     * @memberOf CropView
     */
    set cropping(cropping: Cropping) {
        this._cropping = cropping
        if (this.options.previewView) this.options.previewView.cropping = cropping;
    }

    /**
     * 
     * 
     * @param {any} model
     * @returns
     * 
     * @memberOf CropView
     */
    setModel(model) {



        if (model && !isFileInfo(model)) {
            throw new Error("not a file info model");
        }

        if (model && !/^image\/.*/.test(model.get('mime'))) {
            this.showMessage("The file is not an image", true);
        }

        if (this.ui['image'] == null) return this;

        this.deactivate();

        let image = <HTMLImageElement>this.ui['image'];

        if (image.src) {
            window.URL.revokeObjectURL(image.src);
        }
        image.src = emptyImage;

        // image.style.display = 'none';
        if (model == null) {
            if (this.model) this.stopListening(this.model);
            this._model = model;
            return;
        }

        super.setModel(model);



        this._updateImage()
            .then((loaded) => {
                if (loaded && this.options.aspectRatio != null) {

                    getImageSize(image).then(size => {
                        this.cropping = getCropping(size, this.options.aspectRatio);
                    }).catch(e => {
                        this.trigger('error', e);
                    });
                }

            });


        return this;
    }

    /**
     * Creates an instance of CropView.
     * 
     * @param {CropViewOptions} options
     * 
     * @memberOf CropView
     */
    constructor(options: CropViewOptions) {
        if (options == null || options.client == null) throw new Error('No options and no client')
        super(options);
        this.options = options;
        this.client = options.client;
    }

    /**
     * Activate cropper
     * 
     * @returns
     * 
     * @memberOf CropView
     */
    activate() {

        if (this.model == null) return;

        if (this._cropper != null) {
            return this;
        }

        let o = this.options;

        let opts: cropperjs.CropperOptions = {
            crop: e => {
                this._cropping = e.detail;
                this.triggerMethod('crop', e.detail)
                if (isFunction(o.crop)) o.crop(e);
            },
            data: this.cropping,
            built: () => {
                this.triggerMethod('built');
                if (isFunction(o.built)) o.built();
            },
            cropstart: e => {
                this.triggerMethod('cropstart');
                if (isFunction(o.cropstart)) o.cropstart(e);
            },
            cropmove: e => {
                this.triggerMethod('cropmove', e);
                if (isFunction(o.cropmove)) o.cropmove(e);
            },
            cropend: e => {
                this.triggerMethod('cropend', e);
                if (isFunction(o.cropend)) o.cropend(e);
            }
        };

        opts = extend({}, this.options, opts);

        this._cropper = new Cropper(<HTMLImageElement>this.ui['image'], opts);

        return this;
    }

    /**
     * Deactivate cropper
     * 
     * @returns
     * 
     * @memberOf CropView
     */
    deactivate() {
        if (this._cropper) {
            this._cropper.destroy();
            this._cropper = void 0;
        }
        return this;
    }

    /**
     * Toggle cropper
     * 
     * @returns
     * 
     * @memberOf CropView
     */
    toggle() {
        return this._cropper != null ? this.deactivate() : this.activate();
    }


    protected onCrop(cropping: cropperjs.Data) {

        if (this.options.previewView) {
            this.options.previewView.cropping = cropping;
        }
    }

    /**
     * 
     * 
     * @returns
     * 
     * @memberOf CropView
     */
    render() {

        this.triggerMethod('before:render');

        this.undelegateEvents();

        let image = this.el.querySelector('img');

        if (image == null) {
            image = document.createElement('img');
            this.el.appendChild(image);
        }

        let $i = Html.query(document.createElement('div'));
        $i.addClass('message');

        this._message = $i
        this.el.appendChild($i.get(0));

        this.delegateEvents();
        this.triggerMethod('render');

        return this;

    }


    /**
     * 
     * 
     * @param {string} str
     * @param {boolean} [error=false]
     * @param {number} [timeout]
     * @returns
     * 
     * @memberOf CropView
     */
    showMessage(str: string, error: boolean = false, timeout?: number) {
        this._message.html(str)
            .addClass('shown')
        if (error) this._message.addClass('error')
        else this._message.removeClass('error');
        if (timeout) {
            setTimeout(() => this.hideMessage(), timeout);
        }
        return this;
    }

    /**
     * 
     * 
     * @returns
     * 
     * @memberOf CropView
     */
    hideMessage() {
        this._message.removeClass('shown');
        return this;
    }

    private _updateImage(): Promise<any> {
        let img = <HTMLImageElement>this.el.querySelector('img');

        removeClass(img, 'loaded');
        if (this.model === null) {
            img.src = emptyImage;
            return Promise.resolve(false);
        }

        this.hideMessage();

        let progress = this.options.progress;
        if (progress) {
            progress.show();
        }

        return <any>this.model.open({
            progress: (e) => {
                if (e.total == 0) return;
                if (progress) progress.setPercent((100 / e.total) * e.loaded);
            }
        }, this.client).then(blob => {

            var fn = (e) => {
                if (progress) progress.hide()
                img.removeEventListener('load', fn);
            }

            if (!/image\/.*/.test(blob.type)) {
                //this.triggerMethod('image', false);
                throw new Error('The file is not an image');
            }

            img.addEventListener('load', fn);
            img.src = URL.createObjectURL(blob)
            this.triggerMethod('image', true)
            return true
        }).then(() => {
            addClass(img, 'loaded');
            return true
        }).catch(e => {
            if (progress) progress.hide();
            this.trigger('error', e)
            this.showMessage(e.message, true);
        })
    }

    /**
     * 
     * 
     * 
     * @memberOf CropView
     */
    destroy() {
        this.deactivate();
        super.destroy();

    }

}