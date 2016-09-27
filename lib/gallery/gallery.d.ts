import { LayoutView, ViewOptions } from 'views';
import { IClient, FileMode } from 'torsten';
import { FileListView } from '../list/index';
import { FileInfoView } from '../info/index';
import { FileInfoModel, FileCollection } from '../collection';
import { DropZone } from './dropzone';
import { Uploader, UploaderOptions } from '../uploader';
export interface GalleryViewOptions extends ViewOptions, UploaderOptions {
    client: IClient;
    showDirectories?: boolean;
    showHidden?: boolean;
    root?: string;
    uploader?: Uploader;
    mode?: FileMode;
}
export declare class GalleryView extends LayoutView<HTMLDivElement> {
    options: GalleryViewOptions;
    info: FileInfoView;
    list: FileListView;
    drop: DropZone;
    uploader: Uploader;
    _const_upload: boolean;
    client: IClient;
    collections: FileCollection[];
    collection: FileCollection;
    private _root;
    root: string;
    private _selected;
    selected: FileInfoModel;
    constructor(options: GalleryViewOptions);
    private _onFileInfoSelected(view, model);
    private _onFileInfoRemoved(view, model);
    private _setCollection(collection);
    private _onFileDrop(file);
    onRender(): void;
    destroy(): this;
}
