import { CropViewOptions, CropView } from '../crop/index';
import { FileInfoModel } from '../collection';
import { BaseEditor, IEditorOptions } from 'views.form';
import { GalleryModal, GalleryViewOptions } from '../gallery/index';
export interface CropEditorOptions extends GalleryViewOptions, CropViewOptions, IEditorOptions {
    cropping?: boolean;
    root?: string;
}
export declare class CropEditor extends BaseEditor<HTMLDivElement, FileInfoModel> {
    model: FileInfoModel;
    modal: GalleryModal;
    crop: CropView;
    options: CropEditorOptions;
    _toggled: boolean;
    getValue(): FileInfoModel;
    setValue(model: FileInfoModel): void;
    constructor(options: CropEditorOptions);
    onModel(model: FileInfoModel): void;
    onSetElement(): void;
    private _getOptions(options);
    onRender(): void;
    clear(): void;
    private _showDropIndicator();
    private _removeDropIndicator();
    private _onToggleCropper(e);
    private _onDrop(e);
    private _cancel(e);
    private _validateFile(file);
    private onAssetSelected(model);
    destroy(): void;
}
