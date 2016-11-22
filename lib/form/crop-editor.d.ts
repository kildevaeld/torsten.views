import { DropZone } from '../gallery/dropzone';
import { FileMode } from 'torsten';
import { CropViewOptions, CropView, CropPreView, Cropping } from '../crop/index';
import { FileInfoModel } from '../collection';
import { BaseEditor, IEditorOptions } from 'views.form';
import { GalleryModal, GalleryViewOptions } from '../gallery/index';
import { Progress } from '../list/circular-progress';
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
    mode?: FileMode;
}
/**
 *
 *
 * @export
 * @class CropEditor
 * @extends {BaseEditor<HTMLDivElement, CropResult>}
 */
export declare class CropEditor extends BaseEditor<HTMLDivElement, CropResult> {
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
    crop: CropView;
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
    preview: CropPreView;
    /**
     *
     *
     * @type {CropEditorOptions}
     * @memberOf CropEditor
     */
    options: CropEditorOptions;
    /**
     *
     *
     * @type {boolean}
     * @memberOf CropEditor
     */
    private _toggled;
    /**
     *
     *
     * @returns {CropResult}
     *
     * @memberOf CropEditor
     */
    getValue(): CropResult;
    /**
     *
     *
     * @param {CropResult} result
     * @returns
     *
     * @memberOf CropEditor
     */
    setValue(result: CropResult): void;
    /**
     * Creates an instance of CropEditor.
     *
     * @param {CropEditorOptions} options
     *
     * @memberOf CropEditor
     */
    constructor(options: CropEditorOptions);
    /**
     *
     *
     * @param {FileInfoModel} model
     *
     * @memberOf CropEditor
     */
    onModel(model: FileInfoModel): void;
    /**
     *
     *
     *
     * @memberOf CropEditor
     */
    protected onSetElement(): void;
    /**
     * Parse options options and the element
     *
     * @private
     * @param {CropEditorOptions} options
     * @returns {CropEditorOptions}
     *
     * @memberOf CropEditor
     */
    private _getOptions(options);
    protected onRender(): void;
    /**
     *
     *
     *
     * @memberOf CropEditor
     */
    clear(): void;
    private _showDropIndicator();
    private _removeDropIndicator();
    protected _onToggleCropper(e: MouseEvent): void;
    /**
     * Called when a file is selected in the gallery modal
     * @memberOf CropEditor
     */
    private _onFileSelected(model);
    protected _onUploadBtnChanged(e: Event): void;
    private _getUploader();
    /**
     *
     *
     * @memberOf CropEditor
     */
    destroy(): void;
}
