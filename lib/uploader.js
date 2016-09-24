"use strict";
const eventsjs_1 = require('eventsjs');
const torsten_1 = require('torsten');
const orange_1 = require('orange');
const collection_1 = require('./collection');
const error_1 = require('./error');
const Debug = require('debug');
const Path = torsten_1.path;
const debug = Debug('torsten:uploader');
class Uploader extends eventsjs_1.EventEmitter {
    constructor(options = {}) {
        super();
        this._queue = [];
        this._uploading = 0;
        this.accept = ["*"];
        this.maxSize = 2048;
        this.queueSize = 10;
        orange_1.extend(this, options);
    }
    set client(client) {
        if (this._client == null && this._queue.length > 0) {
            orange_1.nextTick(() => this._onReady());
        }
        this._client = client;
    }
    _validateFile(file) {
        if (file.size > this.maxSize) {
            return new error_1.TorstenValidateError("file to large");
        }
        var mimeValid = false;
        for (let i = 0, ii = this.accept.length; i < ii; i++) {
            let r = new RegExp(this.accept[i]);
            if (r.test(file.type)) {
                mimeValid = true;
                break;
            }
        }
        if (!mimeValid)
            throw new error_1.TorstenValidateError("file wrong type");
    }
    upload(path, file, options) {
        try {
            this._validateFile(file);
        }
        catch (e) {
            return Promise.reject(e);
        }
        if (this._uploading > this.queueSize || this._client == null) {
            let defer = orange_1.deferred();
            debug("enqueue %i : %s", this._queue.length, path);
            this._queue.push([path, file, defer, options]);
            this.trigger('queue', file.name);
            return defer.promise;
        }
        return this._upload(path, file, options);
    }
    _upload(path, file, options = {}) {
        const emit = () => {
            this._uploading--;
            debug('upload ready %s', path);
            this.trigger('ready', file.name);
            this._onReady();
        };
        path = Path.join(path, file.name);
        let o = orange_1.extend({}, options, {
            progress: (e) => {
                this.trigger('progress', file, e);
                if (options.progress) {
                    options.progress(e);
                }
            }
        });
        this.trigger('started', file);
        this._uploading++;
        return this._client.create(path, file, o)
            .then(info => {
            emit();
            return new collection_1.FileInfoModel(info, { client: this._client });
        })
            .catch(e => {
            emit();
            return Promise.reject(e);
        });
    }
    _onReady() {
        if (!this._queue.length || this._uploading > this.queueSize) {
            return;
        }
        let [path, file, defer, options] = this._queue.shift();
        this._upload(path, file, options)
            .then(defer.resolve).catch(defer.reject);
    }
}
exports.Uploader = Uploader;
