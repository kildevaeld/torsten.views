import { CollectionView, CollectionViewOptions, View, attributes } from 'views';
import { removeClass, addClass, hasClass } from 'orange.dom';
import { bind, extend, pick, deferred } from 'orange';
import { FileListItemView } from './list-item';
import { FileCollection, FileInfoModel } from '../collection';
import { Progress } from './circular-progress';
import { IProgress } from '../types';
import { IClient } from 'torsten';
import { Downloader } from '../download';
import {Queue} from '../queue';

function toggleClass(elm, str) {
    const cls = str.split(' ');
    for (let c of cls) {
        if (hasClass(elm, c)) removeClass(elm,c);
        else addClass(elm, c);
    }
    return elm;
}

export interface FileListOptions extends CollectionViewOptions {
    deleteable?: boolean;
    showDirectories?: boolean;
    client: IClient
    filter?: (model: FileInfoModel) => boolean
    only?: string[]
}

export const FileListEmptyView = View.extend({
    className: 'file-list-empty-view',
    template: 'No files uploaded yet.'
})

@attributes({
    className: 'file-list collection-mode',
    childView: FileListItemView,
    emptyView: FileListEmptyView,
    events: {
        scroll: '_onSroll',
    }
})
export class FileListView extends CollectionView<HTMLDivElement> {
    private _timer: NodeJS.Timer;
    private _progress: IProgress;
    private _queue: Queue;
    public options: FileListOptions;
    collection: FileCollection;
    filter?: (model: FileInfoModel) => boolean = () => true
    only?: string[]

    constructor(options?: FileListOptions) {
        super(options);
        this.options = options || { client: null };
        this.sort = false;
        this._queue = new Queue(20);
        this._onSroll = throttle(bind(this._onSroll, this), 0);
        extend(this, pick(options, ['filter', 'only']));
    }

    onCollection(model) {
        if (model) this._initEvents();
        if (model) {
            model.state.limit = 10
        }
    }



    private _initEvents() {
        this.listenTo(this, 'childview:click', function (view, model) {
            if (this._current) removeClass(this._current.el, 'active');
            this._current = view
            addClass(view.el, 'active')
            this.trigger('selected', view, model);
        });

        this.listenTo(this, 'childview:dblclick', function (view, model) {

            if (this._current) removeClass(this._current.el, 'active');
            this._current = view

            addClass(view.el, 'active')
            this.trigger('selected', view, model);
            this.trigger('dblclick', view, model);
        })

        this.listenTo(this, 'childview:remove', function (view, {model}) {
            this.trigger('remove', view, model);
        });


        this.listenTo(this, 'childview:image', function (view) {
            let img = view.$('img')[0]
            if (img.src === img.getAttribute('data-src')) {
                return;
            }
        });

        this.listenTo(this.collection, 'before:fetch', this._showLoaderView);
        this.listenTo(this.collection, 'fetch', this._hideLoaderView);
        this.listenTo(this, 'height', this.loadImages, this);
        this.listenTo(this.collection, 'fetch:progress', (e: ProgressEvent) => {
            if (!e.lengthComputable) return;
            if (this._progress) this._progress.setPercent(100 / e.total * e.loaded)
        })

    }



    renderChildView(view: FileListItemView, index: number) {
        let model = view.model

        if (this.only) {
            var valid = false;
            for (let o of this.only) {
                if (new RegExp(o).test(model.get('mime'))) {
                    valid = true;
                }
            }
            if (valid == false) return;
        }

        if (this.filter(model)) {
            return super.renderChildView(view, index);
        }
    }

    onRenderCollection() {
        this.loadImages()
    }

    filterChildren() {
        if (typeof this.filter !== 'function') return;
        for (let i = 0, ii = this.children.length; i < ii; i++) {
            this.children[i].el.style.display = this.filter(this.children[i].model as FileInfoModel) ? 'block' : 'none';
        }
    }

    onRenderChild(view: FileListItemView, index: number) {

        if (view.model.get('is_dir') && !this.options.showDirectories) {
            view.el.style.display = 'none';
        } else {
            view.el.style.display = 'block';
        }

    }

    private _showLoaderView() {
        if (this._progress) return;

        this._progress = new Progress({
            size: 100,
            lineWidth: 5
        });

        this.el.appendChild(this._progress.render().el);
        addClass(this._progress.el, 'loader');
    }

    private _hideLoaderView() {
        if (!this._progress) return;
        this._progress.remove().destroy();
    }

    private _onSroll(e) {

        let el = this.el;

        if (el.scrollTop < (el.scrollHeight - el.clientHeight) - el.clientHeight || !this.collection.hasNext()) {
            this.loadImages()
        } else if (this.collection.hasNext()) {
            this.collection.getNextPage({
                params: {
                    show_hidden: false
                }
            }).then(() => this.loadImages())
        }
    }

    loadImages() {

        const loadImage = (img: HTMLImageElement) => {
            var parent = img.parentElement
            let defer = deferred<void>();

            img.onload = () => {
                toggleClass(parent, 'loading loaded');
                toggleClass(img, 'loaded loading');
                defer.resolve(void 0);
            }

            img.onerror = (e) => {
                toggleClass(img, 'loading load-error');
                toggleClass(parent, 'loading load-error');
                defer.reject(e.error);
            }

            img.src = this.options.client.endpoint + "/v1" + img.getAttribute('data-src') + '?token=' + this.options.client.token + "&thumbnail=true"

            return defer.promise as Promise<void>;
        }

        const loadImage2 = (img: HTMLImageElement) => {
            var parent = img.parentElement
            addClass(parent, 'loading')
            addClass(img, 'loading')
            return () => loadImage(img);
        } 

    

        let images = this.el.querySelectorAll('img:not(.loaded):not(.load-error)');
         
        for (let i = 0, ii = images.length; /*ii = images.length;*/ i < ii; i++) {
            let img = <HTMLImageElement>images[i];

            if (elementInView(img.parentElement, this.el) /* && !hasClass(img.parentElement, 'loading')*/) {
                let id = img.getAttribute('data-queue');
                if (id) {
                    continue;
                }
                id = this._queue.enqueue(loadImage2(img));
                img.setAttribute('data-queue', id);
            } else if (hasClass(img, 'loading')) {
                this._queue.dequeue(img.getAttribute('data-queue'));
                img.removeAttribute('data-queue');
                removeClass(img, 'loading');
                removeClass(img.parentElement, 'loading');
            }
        }
    }


    private _initHeight() {
        let parent = this.el.parentElement;
        if (!parent || parent.clientHeight === 0) {
            if (!this._timer) {
                this._timer = setInterval(() => this._initHeight(), 200);
            }
            return;
        }

        if (this._timer) {
            clearInterval(this._timer);
            this._timer = void 0;
        }
        this.trigger('height')
    }


    onShow() {
        this._initHeight();
    }

}

function elementInView(ele, container) {

    var viewport = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    };
    viewport.bottom = (container.innerHeight || document.documentElement.clientHeight)// + options.offset;
    viewport.right = (container.innerWidth || document.documentElement.clientWidth)// + options.offset;
    var rect = ele.getBoundingClientRect();

    return (
        // Intersection
        rect.right >= viewport.left
        && rect.bottom >= viewport.top
        && rect.left <= viewport.right
        && rect.top <= viewport.bottom
    ) && !ele.classList.contains('b-error');
}

function throttle(fn, minDelay) {
    var lastCall = 0;

    return function () {
        var now = +new Date();
        if (now - lastCall < minDelay) {
            return;
        }
        lastCall = now;
        fn.apply(this, arguments);
    };
}
