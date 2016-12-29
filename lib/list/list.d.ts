import { CollectionView, CollectionViewOptions } from 'views';
import { FileListItemView } from './list-item';
import { FileCollection, FileInfoModel } from '../collection';
import { IClient } from 'torsten';
export interface FileListOptions extends CollectionViewOptions {
    deleteable?: boolean;
    showDirectories?: boolean;
    client: IClient;
    filter?: (model: FileInfoModel) => boolean;
    only?: string[];
}
export declare const FileListEmptyView: {};
export declare class FileListView extends CollectionView<HTMLDivElement> {
    private _timer;
    private _progress;
    options: FileListOptions;
    collection: FileCollection;
    filter?: (model: FileInfoModel) => boolean;
    only?: string[];
    constructor(options?: FileListOptions);
    onCollection(model: any): void;
    private _initEvents();
    renderChildView(view: FileListItemView, index: number): void;
    onRenderCollection(): void;
    filterChildren(): void;
    onRenderChild(view: FileListItemView, index: number): void;
    private _showLoaderView();
    private _hideLoaderView();
    private _onSroll(e);
    loadImages(): void;
    private _initHeight();
    onShow(): void;
}
