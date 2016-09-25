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
export interface UploadEvent {
    name: string;
    size: number;
    mime: string;
    path: string;
    id: string;
}
export interface UploadProgressEvent extends UploadEvent {
    originalEvent: ProgressEvent;
    loaded: number;
    total: number;
}
export interface UploadErrorEvent extends UploadEvent {
    message: string;
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
    private _upload(item);
    private _onReady();
}
