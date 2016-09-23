declare var require: any;

import {CollectionView, CollectionViewOptions, View, attributes} from 'views';
import {removeClass, addClass, hasClass} from 'orange.dom';
import {bind} from 'orange';
import {FileListItemView} from './list-item';
import {FileCollection} from '../collection';
import {Progress} from './circular-progress';
import {IProgress} from '../types';
import templates from '../templates/index';
import {IClient, OpenOptions} from 'torsten';
import {Downloader} from '../download';
//import {AssetsCollection} from '../../models/index';
const Blazy = require('blazy');


export interface FileListOptions extends CollectionViewOptions {
    deleteable?: boolean;
    showDirectories?: boolean;
    client: IClient
}

export const FileListEmptyView = View.extend({
    className: 'file-list-empty-view',
    template: 'No files uploaded yet.'
})

@attributes({
    //template: () => templates.list,
    className: 'file-list collection-mode',
    childView: FileListItemView,
    emptyView: FileListEmptyView,
    //childViewContainer: '.file-list-item-container',
    events: {
        scroll: '_onSroll',
    }
})
export class FileListView extends CollectionView<HTMLDivElement> {
    private _current: View<HTMLDivElement>;
    private _blazy: any;
    private _timer: NodeJS.Timer;
    private _progress: IProgress;
    private index: number;

    public options: FileListOptions;
    collection: FileCollection;

    constructor(options?: FileListOptions) {
        super(options);
        this.options = options || { client: null };
        this.sort = false;

        this._onSroll = throttle(bind(this._onSroll, this), 0);
        //this._initBlazy();

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
            /*if (this.options.deleteable === true) {
                let remove = true;
                if (model.has('deleteable')) {
                    remove = !!model.get('deleteable');
                }
                if (remove) model.remove();
            } else {
                
            }*/
        });


        this.listenTo(this, 'childview:image', function (view) {
            let img = view.$('img')[0]
            if (img.src === img.getAttribute('data-src')) {
                return;
            }
            /*setTimeout(() => {
                if (elementInView(view.el, this.el)) {
                    this._blazy.load(view.$('img')[0]);
                }
            }, 100);*/

        });

        this.listenTo(this.collection, 'before:fetch', this._showLoaderView);
        this.listenTo(this.collection, 'fetch', this._hideLoaderView);
        this.listenTo(this, 'height', this._loadImages, this);
        this.listenTo(this.collection, 'fetch:progress', (e: ProgressEvent) => {
            if (!e.lengthComputable) return;
            if (this._progress) this._progress.setPercent(100 / e.total * e.loaded)
        })

    }

    onRenderCollection() {
        if (this._blazy) {
            this._blazy.revalidate();
        } else {
            //this._initBlazy();
            
        }
        this._loadImages()
    }

    onRenderChild(view: FileListItemView, index: number) {

        if (view.model.get('is_dir') && !this.options.showDirectories) {
            view.el.style.display = 'none';
        } else {
            view.el.style.opacity = 'block';
        }

    }

    private _showLoaderView() {
        if (this._progress) return;

        this._progress = new Progress({
            size: 60,
            lineWidth: 6
        });

        this.el.appendChild(this._progress.render().el);
        addClass(this._progress.el, 'loader');
    }

    private _hideLoaderView() {
        if (!this._progress) return;
        this._progress.remove().destroy();
    }

    private _onSroll(e) {
        let index = this.index ? this.index : (this.index = 0),
            len = this.children.length

        for (let i = index; i < len; i++) {
            let view: View<HTMLDivElement> = <any>this.children[i],
                img = view.$('img')[0]
            if (img == null) continue
            if (img.src === img.getAttribute('data-src')) {
                index = i;
            } else if (elementInView(img, this.el)) {
                index = i
                //this._blazy.load(img, true);
            }
        }
        this.index = index;
        let el = this.el;

        if (el.scrollTop < (el.scrollHeight - el.clientHeight) - el.clientHeight) {
            this._loadImages()
        } else if (this.collection.hasNext()) {

            this.collection.getNextPage({
                params: {
                    show_hidden: true
                }
            });
        }
    }

    private _loadImages() {

        const loadImage = (img: HTMLImageElement) => {
            var parent = img.parentElement
            addClass(parent, 'loading')
        
            Downloader.instance.download(this.options.client, img.getAttribute('data-src'), { thumbnail: true})

            /*this.options.client.open(img.getAttribute('data-src'), {
                thumbnail: true
            })*/
                .then(i => {
                    img.src = URL.createObjectURL(i)
                    addClass(parent, 'loaded')
                    removeClass(parent, 'loading')
                }).catch(e => {
                    removeClass(parent, 'loading loaded')
                    addClass(parent, "load-error")
                })
        }

        let images = this.el.querySelectorAll('img');
        for (let i = 0, ii = images.length; i < ii; i++) {
            let img = <HTMLImageElement>images[i];
            if (hasClass(img.parentElement, "loaded") || hasClass(img.parentElement, "loading")) {
                if (!elementInView(img, this.el) && hasClass(img, 'loading')) {
                    Downloader.cancel(img.getAttribute('data-src'));
                    removeClass(img, 'loading');
                }
                continue;
            }
            if (elementInView(img, this.el))  {
                loadImage(img)
            } 
            
        }
    }

    /*private _initBlazy() {
        this._blazy = new Blazy({
            container: '.assets-list',
            selector: 'img',
            error: function (img) {
                if (!img || !img.parentNode) return;
                let m = img.parentNode.querySelector('.mime');
                if (m) {
                    m.style.display = 'block';
                    img.style.display = 'none';
                }
            }
        });
    }*/

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

        this.el.style.height = parent.clientHeight + 'px';
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
