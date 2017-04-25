"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var orange_1 = require("orange");

var Queue = function () {
    function Queue() {
        var backlog = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;

        _classCallCheck(this, Queue);

        this.backlog = backlog;
        this._queue = {};
        this._ids = [];
        this._running = 0;
    }

    _createClass(Queue, [{
        key: "enqueue",
        value: function enqueue(item) {
            var id = orange_1.uniqueId("q");
            this._queue[id] = item;
            this._ids.push(id);
            if (this._running < this.backlog) {
                this._onReady();
                //this._run(this._ids.pop());
            }
            return id;
        }
    }, {
        key: "dequeue",
        value: function dequeue(id) {
            if (!this._queue[id]) return null;
            this._ids.splice(this._ids.indexOf(id), 1);
            var item = this._queue[id];
            delete this._queue[id];
            return item;
        }
    }, {
        key: "_run",
        value: function _run(id) {
            var _this = this;

            var item = this._queue[id];
            delete this._queue[id];
            if (!item) {
                console.warn('item does not exists in queue', id, this);
                return;
            }
            this._running++;
            var done = function done() {
                _this._running--;
                _this._onReady();
            };
            item().then(done, done);
            this._onReady();
        }
    }, {
        key: "_onReady",
        value: function _onReady() {
            /*setTimeout(() => {
                //console.log(this._running, this.backlog, this._ids.length);
                
            });*/
            if (this._running > this.backlog || !this._ids.length) return;
            var id = this._ids.pop();
            this._run(id);
        }
    }]);

    return Queue;
}();

exports.Queue = Queue;