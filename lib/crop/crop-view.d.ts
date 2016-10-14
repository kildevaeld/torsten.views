import { View, ViewOptions } from 'views';
import { ICropper, Cropping } from './types';
import { FileInfoModel } from '../collection';
import { CropPreView } from './crop-preview';
import { IClient } from 'torsten';
import { Progress } from '../list/circular-progress';
export interface CropViewOptions extends ViewOptions, cropperjs.CropperOptions {
    resize: boolean;
    previewView?: CropPreView;
    progress?: Progress;
    client: IClient;
}
export declare class CropView extends View<HTMLDivElement> {
    model: FileInfoModel;
    client: IClient;
    private _cropper;
    protected _cropping: Cropping;
    private _message;
    options: CropViewOptions;
    cropper: ICropper;
    cropping: Cropping;
    setModel(model: any): this;
    constructor(options: CropViewOptions);
    activate(): this;
    deactivate(): this;
    toggle(): this;
    onCrop(cropping: cropperjs.Data): void;
    render(): this;
    showMessage(str: string, error?: boolean, timeout?: number): this;
    hideMessage(): this;
    private _updateImage();
    destroy(): void;
}
