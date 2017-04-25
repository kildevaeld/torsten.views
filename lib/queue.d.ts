export interface QueueItem {
    (): Promise<void>;
}
export declare type QueueItemId = string;
export declare class Queue {
    backlog: number;
    _queue: {
        [key: string]: QueueItem;
    };
    _ids: QueueItemId[];
    _running: number;
    constructor(backlog?: number);
    enqueue(item: QueueItem): QueueItemId;
    dequeue(id: QueueItemId): QueueItem;
    private _run(id);
    private _onReady();
}
