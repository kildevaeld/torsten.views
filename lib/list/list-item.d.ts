import { View } from 'views';
import { FileInfoModel } from '../collection';
export declare class FileListItemView extends View<HTMLDivElement> {
    model: FileInfoModel;
    onRender(): void;
    protected _onClick(e: Event): void;
    protected _onDblClick(e: any): void;
    downloadImage(): void;
}
