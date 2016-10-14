import { View, ViewOptions } from 'views';
import { ICropper, Cropping } from './types';
import { FileInfoModel } from '../collection';
import { CropPreView } from './crop-preview';
import { IClient } from 'torsten';
import { Progress } from '../list/circular-progress';
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
export declare class CropView extends View<HTMLDivElement> {
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
    private _cropper;
    /**
     *
     *
     * @protected
     * @type {Cropping}
     * @memberOf CropView
     */
    protected _cropping: Cropping;
    private _message;
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
    readonly cropper: ICropper;
    /**
     *
     *
     *
     * @memberOf CropView
     */
    /**
     *
     *
     *
     * @memberOf CropView
     */
    cropping: Cropping;
    /**
     *
     *
     * @param {any} model
     * @returns
     *
     * @memberOf CropView
     */
    setModel(model: any): this;
    /**
     * Creates an instance of CropView.
     *
     * @param {CropViewOptions} options
     *
     * @memberOf CropView
     */
    constructor(options: CropViewOptions);
    /**
     * Activate cropper
     *
     * @returns
     *
     * @memberOf CropView
     */
    activate(): this;
    /**
     * Deactivate cropper
     *
     * @returns
     *
     * @memberOf CropView
     */
    deactivate(): this;
    /**
     * Toggle cropper
     *
     * @returns
     *
     * @memberOf CropView
     */
    toggle(): this;
    protected onCrop(cropping: cropperjs.Data): void;
    /**
     *
     *
     * @returns
     *
     * @memberOf CropView
     */
    render(): this;
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
    showMessage(str: string, error?: boolean, timeout?: number): this;
    /**
     *
     *
     * @returns
     *
     * @memberOf CropView
     */
    hideMessage(): this;
    private _updateImage();
    /**
     *
     *
     *
     * @memberOf CropView
     */
    destroy(): void;
}
