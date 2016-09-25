import { CollectionView, CollectionViewOptions } from 'views';
import { FileListItemView } from './list-item';
import { FileCollection } from '../collection';
import { IClient } from 'torsten';
export interface FileListOptions extends CollectionViewOptions {
    deleteable?: boolean;
    showDirectories?: boolean;
    client: IClient;
}
export declare const FileListEmptyView: {};
export declare class FileListView extends CollectionView<HTMLDivElement> {
    private _current;
    private _timer;
    private _progress;
    private index;
    options: FileListOptions;
    collection: FileCollection;
    constructor(options?: FileListOptions);
    onCollection(model: any): void;
    private _initEvents();
    onRenderCollection(): void;
    onRenderChild(view: FileListItemView, index: number): void;
    private _showLoaderView();
    private _hideLoaderView();
    private _onSroll(e);
    loadImages(): void;
    private _initHeight();
    onShow(): void;
}
