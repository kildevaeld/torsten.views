import { TorstenClientError } from 'torsten';
export declare class TorstenGuiError extends TorstenClientError {
    constructor(message: string);
}
export declare class TorstenValidateError extends TorstenClientError {
    constructor(message: string);
}
