
import {TorstenClientError, ErrorCode} from 'torsten';

export class TorstenGuiError extends TorstenClientError {
    constructor(message:string) {
        super(ErrorCode.Unknown, message);
    }
}

export class TorstenValidateError extends TorstenClientError {
    constructor(message:string) {
        super(ErrorCode.Unknown, message);
    }
}
