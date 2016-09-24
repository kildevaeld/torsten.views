"use strict";
const eventsjs_1 = require('eventsjs');
const orange_1 = require('orange');
const Debug = require('debug');
const debug = Debug("torsten:downloader");
class CancelError extends Error {
}
exports.CancelError = CancelError;
class Downloader extends eventsjs_1.EventEmitter {
    constructor() {
        super();
        this._queue = [];
        this._downloading = 0;
        this.size = 20;
        this.listenTo(this, 'ready', this._onReady);
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new Downloader();
        }
        return this._instance;
    }
    download(client, path, options) {
        if (this._downloading > this.size) {
            let defer = orange_1.deferred();
            debug("enqueue %i : %s", this._queue.length, path);
            this._queue.push([path, defer, options, client]);
            return defer.promise;
        }
        return this._download(client, path, options);
    }
    static download(client, path, options) {
        return this.instance.download(client, path, options);
    }
    static cancel(path) {
        return this.instance._cancel(path);
    }
    _cancel(path) {
        let index = -1;
        for (let i = 0, ii = this._queue.length; i < ii; i++) {
            if (this._queue[i][0] === path) {
                index = i;
                break;
            }
        }
        if (index == -1)
            return;
        let item = this._queue[index];
        debug('cancel %s', item[0]);
        item[1].reject(new CancelError("cancel"));
        this._queue.splice(index, 1);
    }
    _download(client, path, options) {
        const emit = () => {
            this._downloading--;
            debug('download ready %s', path);
            this.trigger('ready');
        };
        this._downloading++;
        return client.open(path, options)
            .then(blob => {
            emit();
            return blob;
        })
            .catch(e => {
            emit();
            return orange_1.Promise.reject(e);
        });
    }
    _onReady() {
        if (!this._queue.length || this._downloading > this.size) {
            return;
        }
        let [path, defer, options, client] = this._queue.shift();
        this._download(client, path, options)
            .then(defer.resolve).catch(defer.reject);
    }
}
exports.Downloader = Downloader;
