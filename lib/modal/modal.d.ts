import { View, ViewOptions } from 'views';
export interface ModalOptions extends ViewOptions {
    template: string;
}
export declare class Modal extends View<HTMLDivElement> {
    private __rendered;
    constructor(options?: ModalOptions);
    onRender(): void;
    open(): void;
    _onClose(): void;
    close(): void;
    onDestroy(): void;
}
