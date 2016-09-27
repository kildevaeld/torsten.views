import { View, ViewOptions } from 'views';
import { Uploader } from '../uploader';
import { FileMode } from 'torsten';
export interface DropZoneOptions extends ViewOptions {
    uploader?: Uploader;
    path?: string;
    mode?: FileMode;
}
export declare class DropZone extends View<HTMLDivElement> {
    private uploader;
    path: string;
    mode: FileMode;
    constructor(options?: DropZoneOptions);
    private _onDragEnter(e);
    private _onDragEnd(e);
    private _onDrop(e);
}
