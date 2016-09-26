import { DropZone } from '../gallery/dropzone';
import { CropViewOptions, CropView, CropPreView, Cropping } from '../crop/index';
import { FileInfoModel } from '../collection';
import { BaseEditor, IEditorOptions } from 'views.form';
import { GalleryModal, GalleryViewOptions } from '../gallery/index';
import { Progress } from '../list/circular-progress';
export interface CropResult {
    file: FileInfoModel;
    cropping: Cropping;
}
export interface CropEditorOptions extends GalleryViewOptions, CropViewOptions, IEditorOptions {
    cropping?: boolean;
    root?: string;
}
export declare class CropEditor extends BaseEditor<HTMLDivElement, CropResult> {
    model: FileInfoModel;
    modal: GalleryModal;
    crop: CropView;
    drop: DropZone;
    progress: Progress;
    preview: CropPreView;
    options: CropEditorOptions;
    _toggled: boolean;
    getValue(): CropResult;
    setValue(result: CropResult): void;
    constructor(options: CropEditorOptions);
    onModel(model: FileInfoModel): void;
    onSetElement(): void;
    private _getOptions(options);
    onRender(): void;
    clear(): void;
    private _showDropIndicator();
    private _removeDropIndicator();
    private _showError(e);
    private _removeError();
    private _onToggleCropper(e);
    private _onFileSelected(model);
    destroy(): void;
}
