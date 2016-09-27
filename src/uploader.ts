
import { EventEmitter } from 'eventsjs';
import { IClient, CreateOptions, path, ErrorCode, TorstenClientError, FileMode} from 'torsten';
import { Deferred, deferred, IPromise, nextTick, extend, uniqueId } from 'orange';
import { FileInfoModel } from './collection';
import { TorstenValidateError } from './error'
import * as Debug from 'debug';
const Path = path;
const debug = Debug('torsten:uploader');

export interface UploaderOptions {
    client?: IClient;
    accept?: string[];
    maxSize?: number;
    queueSize?: number;
    mode?: FileMode
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
    code: ErrorCode;
}

interface QueueItem {
    id: string;
    file: File;
    path: string;
    options: CreateOptions;
    defer: Deferred<FileInfoModel>;
}

function itemToEvent(item: QueueItem): UploadEvent {
    return {
        id: item.id,
        path: item.path,
        name: item.file.name,
        size: item.file.size,
        mime: item.file.type
    };
}

function itemToProgresEvent(item: QueueItem, e:ProgressEvent): UploadProgressEvent {
    return extend(itemToEvent(item), {
        originalEvent: e,
        total: e.total,
        loaded: e.loaded
    });
}

export class Uploader extends EventEmitter {
    _client: IClient;
    private _queue: QueueItem[] = []
    private _uploading: number = 0;

    accept: string[] = ["*"];
    maxSize: number = 2048;
    queueSize: number = 10;
    mode: FileMode = 500;

    set client(client: IClient) {
        if (this._client == null && this._queue.length > 0) {
            nextTick(() => this._onReady())
        }
        this._client = client;
    }

    constructor(options: UploaderOptions = {}) {
        super();
        extend(this, options);
    }

    private _validateFile(file: File) {
        if (file.size > this.maxSize) {
            throw new TorstenValidateError("file to large")
        }
        var mimeValid = false;
        for (let i = 0, ii = this.accept.length; i < ii; i++) {
            let r = new RegExp(this.accept[i]);
            if (r.test(file.type)) {
                mimeValid = true;
                break;
            }
        }
        if (!mimeValid) throw new TorstenValidateError("file wrong type");
    }

    upload(path: string, file: File, options: CreateOptions={}): IPromise<FileInfoModel> {

        try {
            this._validateFile(file);
        } catch (e) {
            return Promise.reject<FileInfoModel>(e)
        }

        let item = {
            id: uniqueId(),
            file: file,
            options: options,
            path: path,
            defer: deferred()
        }

        debug("enqueue %i : %s", this._queue.length, path)

        this._queue.push(item)
        this.trigger('queue', itemToEvent(item));

        nextTick(() => this._onReady());

        return item.defer.promise;
    }

    private _upload(item: QueueItem): IPromise<FileInfoModel> {

        let {path, file, options, defer} = item,
            event = itemToEvent(item);

        const emit = (e?:TorstenClientError, file?:FileInfoModel) => {
            this._uploading--;
            debug('upload ready %s', path)
            if (e) {
                this.trigger('error', extend(event, {message: e.message, code: e.code}))
            } else {
                this.trigger('done', file);
            }
        };

        path = Path.join(path, file.name);

        let o: CreateOptions = extend({}, options, {
            progress: (e) => {
                this.trigger('progress', itemToProgresEvent(item, e));
                if (options.progress) {
                    options.progress(e);
                }
            }
        });

        if (!o.mode) o.mode = this.mode;
        
        this.trigger('started', event);
        this._uploading++;
        return this._client.create(path, file, o)
            .then(info => {
                let model = new FileInfoModel(info, { client: this._client });;
                emit(null, model);
                return model;
            })
            .catch(e => {
                emit(e)
                return Promise.reject<FileInfoModel>(e)
            });
    }

    private _onReady() {
        if (!this._queue.length || this._uploading > this.queueSize) {
            return;
        }

        while (this._uploading < this.queueSize) {
            let i = this._queue.shift()
            this._upload(i).then(i.defer.resolve).catch(i.defer.reject);
            if (this._queue.length === 0) return;
        }

    }
}