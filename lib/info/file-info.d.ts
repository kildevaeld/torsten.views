import { View, ViewOptions } from 'views';
import { FileInfoModel } from '../collection';
import { IClient } from 'torsten';
export interface FileInfoViewOptions extends ViewOptions {
    client: IClient;
}
export declare class FileInfoView extends View<HTMLDivElement> {
    options: FileInfoViewOptions;
    private __rendered;
    model: FileInfoModel;
    client: IClient;
    constructor(options: FileInfoViewOptions);
    onModel(model: FileInfoModel): void;
    onRender(): void;
    clear(): this;
    _update_ui(model: FileInfoModel): this;
    protected _onDownload(e: any): void;
    destroy(): void;
}
