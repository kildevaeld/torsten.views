

import { EventEmitter } from 'eventsjs';
import { IClient, OpenOptions } from 'torsten';
import { Deferred, IPromise, deferred, Promise} from 'orange'
import * as Debug from 'debug';

const debug = Debug("torsten:downloader");

export class CancelError extends Error {

}


export class Downloader extends EventEmitter {
    private static _instance: Downloader;
    static get instance() {
        if (!this._instance) {
            this._instance = new Downloader();
        }
        return this._instance;
    }

    private _queue: [string, Deferred<any>, OpenOptions, IClient][] = []
    private _downloading: number = 0
    size: number = 50
    
    constructor() {
        super();

        this.listenTo(this, 'ready', this._onReady);
    }

    download(client: IClient, path: string, options: OpenOptions): IPromise<Blob> {
       
        if (this._downloading > this.size) {
            let defer = deferred<any>()
            debug("enqueue %i : %s", this._queue.length, path)
            this._queue.push([path, defer, options, client])
            return defer.promise;
        }

        return this._download(client, path, options);
       
    }

    static download(client: IClient, path: string, options: OpenOptions): IPromise<Blob> {
        return this.instance.download(client, path, options);
    }

    static cancel(path: string) {
        return this.instance._cancel(path);
    }

    private _cancel(path: string) {
        let index = -1;
        
        for (let i = 0, ii = this._queue.length; i < ii; i++) {
            if (this._queue[i][0] === path) {
                index = i;
                
                break;
            }
        }
        if (index == -1) return;

        let item = this._queue[index]
        debug('cancel %s', item[0]);
        item[1].reject(new CancelError("cancel"));
        this._queue.splice(index, 1)
    }

    private _download(client: IClient, path: string, options:OpenOptions): IPromise<any> {
        const emit = () => {
            this._downloading--;
            debug('download ready %s', path)
            this.trigger('ready');
        }

        this._downloading++;
        return client.open(path, options)
            .then(blob => {
                emit();
                return blob;
            })
            .catch(e => {
                emit()
                return Promise.reject(e)
            })
    }



    private _onReady() {
        if (!this._queue.length || this._downloading > this.size) {
            return;
        }
        let [path, defer, options, client] = this._queue.shift()
        this._download(client, path, options)
        .then(defer.resolve).catch(defer.reject);
    }

}
