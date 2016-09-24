
import {EventEmitter} from 'eventsjs';
import {IClient, CreateOptions, path} from 'torsten';
import {Deferred, deferred, IPromise, nextTick, extend} from 'orange';
import {FileInfoModel} from './collection';
import {TorstenValidateError} from './error'
import * as Debug from 'debug';
const Path = path;
const debug = Debug('torsten:uploader');

export interface UploaderOptions {
    client?: IClient;
    accept?: string[];
    maxSize?: number;
    queueSize?: number;
}

export class Uploader extends EventEmitter {
        _client: IClient;
        private _queue: [string, File, Deferred<any>, CreateOptions][] = []
        private _uploading: number = 0;
        
        accept: string[] = ["*"];
        maxSize: number = 2048;
        queueSize: number = 10;
        set client(client: IClient) {
            if (this._client == null && this._queue.length > 0) {
                nextTick( () => this._onReady())
            }
            this._client = client;
        }

        constructor(options:UploaderOptions = {}) {
            super();
            extend(this, options);
        }

        private _validateFile(file:File) {
            if (file.size > this.maxSize) {
                return new TorstenValidateError("file to large")
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

        upload(path: string, file: File, options?: CreateOptions): IPromise<FileInfoModel> {
            
            try {
                this._validateFile(file);
            } catch (e) {
                return Promise.reject<FileInfoModel>(e)
            }
            
            
            if (this._uploading > this.queueSize || this._client == null) {
                let defer = deferred<any>()
                debug("enqueue %i : %s", this._queue.length, path)
                this._queue.push([path, file, defer, options])
                this.trigger('queue', file.name);
                return defer.promise;
            }
            return this._upload(path, file, options);
        }

        private _upload(path: string, file: File, options: CreateOptions = {}): IPromise<FileInfoModel> {
            const emit = () => {
                this._uploading--;
                debug('upload ready %s', path)
                this.trigger('ready', file.name)
                this._onReady();
            }

            path = Path.join(path, file.name);

            let o = extend({}, options, {
                progress: (e) => {
                    this.trigger('progress', file, e);
                    if (options.progress) {
                        options.progress(e);
                    }
                }
            })

            this.trigger('started', file);
            this._uploading++;
            return this._client.create(path, file, o)
                .then(info => {
                    emit();
                    return new FileInfoModel(info, { client: this._client });
                })
                .catch(e => {
                    emit()
                    return Promise.reject<FileInfoModel>(e)
                });
        }

        private _onReady() {
            if (!this._queue.length || this._uploading > this.queueSize) {
                return;
            }
            let [path, file, defer, options] = this._queue.shift()
            this._upload(path, file, options)
                .then(defer.resolve).catch(defer.reject);
        }
    }