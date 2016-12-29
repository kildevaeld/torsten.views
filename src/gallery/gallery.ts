
import { LayoutView, attributes, ViewOptions } from 'views';
import { extend } from 'orange';
import { IClient, FileMode } from 'torsten'

import { FileListView } from '../list/index';
import { FileInfoView } from '../info/index'
import templates from '../templates/index';
import { FileInfoModel, FileCollection } from '../collection';
import { DropZone } from './dropzone';
import { Uploader, UploaderOptions } from '../uploader';

export interface GalleryViewOptions extends ViewOptions, UploaderOptions {
    client: IClient;
    showDirectories?: boolean;
    showHidden?: boolean;
    root?: string;
    uploader?: Uploader;
    mode?: FileMode
    only?: string[];
}

@attributes({
    template: () => templates['gallery'],
    className: 'torsten-gallery gallery'
})
export class GalleryView extends LayoutView<HTMLDivElement> {
    readonly info: FileInfoView;
    list: FileListView;
    drop: DropZone;
    uploader: Uploader;

    private _const_upload: boolean;

    client: IClient;
    collections: FileCollection[] = [];

    get collection() {
        if (this.collections.length == 0) return null;
        return this.collections[this.collections.length - 1];
    }

    private _root: string;
    set root(path: string) {

        if (this._root === path) return;
        this._root = path;

        for (let i = 0, ii = this.collections.length; i < ii; i++) {
            this.stopListening(this.collections[i]);
            this.collections[i].destroy();
        }

        this.collections = [new FileCollection(null, {
            client: this.client,
            path: this._root,
            limit: 100
        })];

        this._setCollection(this.collections[0]);
        this.collections[0].fetch({
            params: {
                show_hidden: this.options.showHidden || false
            }
        });
    }

    get root() { return this._root; }

    private _selected: FileInfoModel;
    get selected() { return this._selected; }

    set selected(model: FileInfoModel) {
        this._selected = model;
        if (model) {
            this.info.model = model.get('is_dir') ? null : model;
        } else {
            this.info.model = null;
        }

    }

    constructor(public options: GalleryViewOptions) {

        super(extend({}, options, {
            regions: {
                list: '.gallery-list',
                info: '.gallery-info'
            }
        }));

        this.client = options.client;

        this.list = new FileListView({
            showDirectories: options.showDirectories || false,
            client: this.client,
            only: this.options.only
        });

        this.info = new FileInfoView({
            client: this.client
        });

        this.drop = new DropZone({
            el: this.el
        });

        this.uploader = options.uploader

        if (!this.uploader) {
            this.uploader = new Uploader({
                client: this.client,
                maxSize: options.maxSize,
                accept: options.accept || ['*'],
                mode: options.mode
            });
            this._const_upload = true;
        }

        if (options.accept) this.uploader.accept = options.accept;
        if (options.maxSize > 0) this.uploader.maxSize = options.maxSize;

        this.listenTo(this.list, 'selected', this._onFileInfoSelected);
        this.listenTo(this.list, 'remove', this._onFileInfoRemoved);
        this.listenTo(this.list, 'dblclick', () => {
            this.trigger('dblclick');
        });

        this.listenTo(this.drop, 'drop', this._onFileDrop);

        this.listenTo(this.uploader, 'done', (file: FileInfoModel) => {
            for (let i = 0, ii = this.collections.length; i < ii; i++) {
                if (this.collections[i].path + '/' == file.get('path')) {
                    this.collections[i].add(file);
                }
            }
        })

        if (this.options.root) {
            this.root = this.options.root;
        }


    }

    private _onFileInfoSelected(view, model: FileInfoModel) {
        this.selected = model;
    }

    private _onFileInfoRemoved(view, model: FileInfoModel) {

        this.client.remove(model.fullPath)
            .then(res => {
                if (res.message === 'ok') {
                    model.remove();
                }
            });
    }

    private _setCollection(collection: FileCollection) {
        this.list.collection = collection;
    }

    private _onFileDrop(file: File) {

        let collection = this.collections[this.collections.length - 1];

        this.uploader.upload(collection.path, file, {
            progress: (e) => {
                if (!e.lengthComputable) return;

            }
        })
    }

    onRender() {
        this.regions['list'].show(this.list);
        this.regions['info'].show(this.info);
        this.drop.render();
    }

    destroy() {
        this.drop.destroy();
        if (this._const_upload) {
            this.uploader.destroy();
        }
        super.destroy();
        return this;
    }
}
