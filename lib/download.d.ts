import { EventEmitter } from 'eventsjs';
import { IClient, OpenOptions } from 'torsten';
import { IPromise } from 'orange';
export declare class CancelError extends Error {
}
export declare class Downloader extends EventEmitter {
    private static _instance;
    static instance: Downloader;
    private _queue;
    private _downloading;
    size: number;
    constructor();
    download(client: IClient, path: string, options: OpenOptions): IPromise<Blob>;
    static download(client: IClient, path: string, options: OpenOptions): IPromise<Blob>;
    static cancel(path: string): void;
    private _cancel(path);
    private _download(client, path, options);
    private _onReady();
}
