import { IView } from 'views';
export interface IProgress extends IView {
    setPercent(percent: number): any;
    show(): any;
    hide(): any;
}
export interface Size {
    width: number;
    height: number;
}
export interface Point {
    x: number;
    y: number;
}
