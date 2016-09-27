import { View, ViewOptions } from 'views';
import { IProgress } from '../types';
export declare enum ProgressMode {
    Indeterminate = 0,
    Determinate = 1,
}
export interface ProgressOptions extends ViewOptions {
    size?: number;
    lineWidth?: number;
    rotate?: number;
    background?: string;
    foreground?: string;
    mode?: ProgressMode;
}
export declare class Progress extends View<HTMLDivElement> implements IProgress {
    options: ProgressOptions;
    _percent: number;
    _timer: NodeJS.Timer;
    _mode: ProgressMode;
    _isRendered: boolean;
    ctx: CanvasRenderingContext2D;
    constructor(options?: ProgressOptions);
    mode: ProgressMode;
    setPercent(percent: number): void;
    private _drawCircle(ctx, color, lineWidth, percent);
    show(): void;
    hide(): void;
    render(): this;
}
