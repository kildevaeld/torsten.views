import { EventEmitter } from 'eventsjs';
import { IClient, CreateOptions } from 'torsten';
import { IPromise } from 'orange';
import { FileInfoModel } from './collection';
export interface UploaderOptions {
    client?: IClient;
    accept?: string[];
    maxSize?: number;
    queueSize?: number;
}
export declare class Uploader extends EventEmitter {
    _client: IClient;
    private _queue;
    private _uploading;
    accept: string[];
    maxSize: number;
    queueSize: number;
    client: IClient;
    constructor(options?: UploaderOptions);
    private _validateFile(file);
    upload(path: string, file: File, options?: CreateOptions): IPromise<FileInfoModel>;
    private _upload(path, file, options?);
    private _onReady();
}
