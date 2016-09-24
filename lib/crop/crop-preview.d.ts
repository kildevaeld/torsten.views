import { View, ViewOptions } from 'views';
import { Cropping } from './types';
import { IPromise } from 'orange';
export declare class CropPreview {
    protected _cropping: Cropping;
    protected _el: HTMLDivElement;
    protected _opts: CropPreViewOptions;
    cropping: Cropping;
    constructor(el: HTMLDivElement, options: CropPreViewOptions);
    update(): IPromise<any>;
}
export interface CropPreViewOptions extends ViewOptions {
    aspectRatio?: number;
}
export declare class CropPreView extends View<HTMLDivElement> {
    protected _cropping: Cropping;
    private size;
    options: CropPreViewOptions;
    cropping: Cropping;
    constructor(options?: CropPreViewOptions);
    render(): this;
    update(): IPromise<any>;
}
