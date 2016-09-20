export interface Size {
    width: number;
    height: number;
}
export interface Point {
    x: number;
    y: number;
}
export interface Cropping extends Size, Point {
    rotate: number;
    scaleX: number;
    scaleY: number;
}
export interface ICropper {
    getCroppedCanvas(o?: any): any;
    getCanvasData(): any;
    getContainerData(): any;
    destroy(): any;
}
export declare function getCropping(size: Size, ratio: number): {
    x: number;
    y: number;
    width: number;
    height: number;
    rotate: number;
    scaleX: number;
    scaleY: number;
};
