import { View, ViewOptions } from 'views';
import { Cropping } from './types';
import { IPromise } from 'orange';
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
