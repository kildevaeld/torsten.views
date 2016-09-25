import { View, ViewOptions } from 'views';
export interface ModalOptions extends ViewOptions {
}
export declare class Modal extends View<HTMLDivElement> {
    private __rendered;
    constructor(options?: ModalOptions);
    render(): this;
    open(): this;
    _onClose(e: any): void;
    close(): this;
    toggle(): this;
    onDestroy(): void;
}
