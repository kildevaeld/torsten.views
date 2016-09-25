import { View, ViewOptions } from 'views';
export interface ModalOptions extends ViewOptions {
}
export declare class Modal extends View<HTMLDivElement> {
    private __rendered;
    constructor(options?: ModalOptions);
    render(): this;
    open(): void;
    _onClose(): void;
    close(): void;
    toggle(): void;
    onDestroy(): void;
}
