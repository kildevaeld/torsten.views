import { Modal, ModalOptions } from '../modal/index';
import { GalleryView, GalleryViewOptions } from './gallery';
import { FileInfoModel } from '../collection';
export interface GalleryModalOptions extends GalleryViewOptions, ModalOptions {
}
export declare class GalleryModal extends Modal {
    private _gallery;
    gallery: GalleryView;
    selected: FileInfoModel;
    root: string;
    constructor(options: GalleryModalOptions);
    onBeforeOpen(): void;
    onBeforeClose(): void;
    _setHeight(): void;
    onOpen(): void;
    onRender(): void;
    private _onSelect(e);
    onDestroy(): void;
}
