import { View, ViewOptions } from 'views';
import { Uploader } from '../uploader';
export interface DropZoneOptions extends ViewOptions {
    uploader?: Uploader;
    path?: string;
}
export declare class DropZone extends View<HTMLDivElement> {
    private uploader;
    path: string;
    constructor(options?: DropZoneOptions);
    private _onDragEnter(e);
    private _onDragEnd(e);
    private _onDrop(e);
}
