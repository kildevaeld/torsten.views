
import { uniqueId } from 'orange';

export interface QueueItem {
    (): Promise<void>
}

export type QueueItemId = string;

export class Queue {

    _queue: { [key: string]: QueueItem } = {};
    _ids: QueueItemId[] = [];
    _running: number = 0;

    constructor(public backlog: number = 50) { }

    enqueue(item: QueueItem): QueueItemId {
        let id = uniqueId("q");

        this._queue[id] = item;
        this._ids.push(id);

        if (this._running < this.backlog) {
            this._onReady();
            //this._run(this._ids.pop());
        }

        return id;
    }

    dequeue(id: QueueItemId): QueueItem {
        if (!this._queue[id]) return null;
        this._ids.splice(this._ids.indexOf(id), 1);
        const item = this._queue[id];
        delete this._queue[id];
       
        return item;
    }

    private _run(id: string) {

        let item = this._queue[id];
        delete this._queue[id];

        if (!item) {
            console.warn('item does not exists in queue', id, this);
            return;
        }

        this._running++;

        const done = () => {
            this._running--;
            this._onReady();
        }

        item().then(done, done);
        this._onReady();
    }

    private _onReady() {
        
        /*setTimeout(() => {
            //console.log(this._running, this.backlog, this._ids.length);
            
        });*/

        if (this._running > this.backlog || !this._ids.length) return;

            let id = this._ids.pop();
            this._run(id);
        

    }

}