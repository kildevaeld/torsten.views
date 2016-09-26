"use strict";
const eventsjs_1 = require('eventsjs');
const torsten_1 = require('torsten');
const orange_1 = require('orange');
const collection_1 = require('./collection');
const error_1 = require('./error');
const Debug = require('debug');
const Path = torsten_1.path;
const debug = Debug('torsten:uploader');
function itemToEvent(item) {
    return {
        id: item.id,
        path: item.path,
        name: item.file.name,
        size: item.file.size,
        mime: item.file.type
    };
}
function itemToProgresEvent(item, e) {
    return orange_1.extend(itemToEvent(item), {
        originalEvent: e,
        total: e.total,
        loaded: e.loaded
    });
}
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
    upload(path, file, options = {}) {
        try {
            this._validateFile(file);
        }
        catch (e) {
            return Promise.reject(e);
        }
        let item = {
            id: orange_1.uniqueId(),
            file: file,
            options: options,
            path: path,
            defer: orange_1.deferred()
        };
        debug("enqueue %i : %s", this._queue.length, path);
        this._queue.push(item);
        this.trigger('queue', itemToEvent(item));
        orange_1.nextTick(() => this._onReady());
        return item.defer.promise;
    }
    _upload(item) {
        let { path, file, options, defer } = item, event = itemToEvent(item);
        const emit = (e, file) => {
            this._uploading--;
            debug('upload ready %s', path);
            if (e) {
                this.trigger('error', orange_1.extend(event, { message: e.message, code: e.code }));
            }
            else {
                this.trigger('done', file);
            }
        };
        path = Path.join(path, file.name);
        let o = orange_1.extend({}, options, {
            progress: (e) => {
                this.trigger('progress', itemToProgresEvent(item, e));
                if (options.progress) {
                    options.progress(e);
                }
            }
        });
        this.trigger('started', event);
        this._uploading++;
        return this._client.create(path, file, o)
            .then(info => {
            let model = new collection_1.FileInfoModel(info, { client: this._client });
            ;
            emit(null, model);
            return model;
        })
            .catch(e => {
            emit(e);
            return Promise.reject(e);
        });
    }
    _onReady() {
        if (!this._queue.length || this._uploading > this.queueSize) {
            return;
        }
        while (this._uploading < this.queueSize) {
            let i = this._queue.shift();
            this._upload(i).then(i.defer.resolve).catch(i.defer.reject);
            if (this._queue.length === 0)
                return;
        }
    }
}
exports.Uploader = Uploader;
