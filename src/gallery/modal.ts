import { Modal, ModalOptions } from '../modal/index';
import { GalleryView, GalleryViewOptions } from './gallery'
import { attributes } from 'views';
import templates from '../templates/index'
import { addClass, addEventListener, removeEventListener } from 'orange.dom'
import { FileInfoModel } from '../collection';
import { bind } from 'orange';

export interface GalleryModalOptions extends GalleryViewOptions, ModalOptions {

}

@attributes({
    template: () => templates['modal-gallery'],
    ui: {
        content: '.views-modal-body'
    },
    events: {
        'click .btn-close': function () { this.close() },
        'click .btn-select': '_onSelect',

    }
})
export class GalleryModal extends Modal {
    private _gallery: GalleryView;

    get gallery() {
        return this._gallery;
    }

    get selected(): FileInfoModel {
        return this.gallery.selected
    }

    set root(root: string) {
        this._gallery.root = root;
    }

    constructor(options: GalleryModalOptions) {
        super(options);

        delete options.el;
        this._gallery = new GalleryView(options);

        this.listenTo(this._gallery, 'dblclick', () => {
            this.trigger('selected', this.selected);
            this.close();
        });

        this.listenTo(this._gallery, 'selected', () => {
            this.trigger('selected', this.selected);
        })

        this._setHeight = bind(this._setHeight, this);


    }

    onBeforeOpen() {
        this._setHeight();
        addEventListener(<any>window, 'resize', this._setHeight);
    }

    onBeforeClose() {
        removeEventListener(<any>window, 'resize', this._setHeight);
    }

    _setHeight() {
        let height = window.innerHeight;
        let fh = this.el.querySelector('.views-modal-footer').clientHeight;
        let hh = this.el.querySelector('.views-modal-header').clientHeight;
        let rect = this.el.getBoundingClientRect();
        let margin = fh + hh + rect.top + 30 + 30 + 20;
        let gallery = <any>this.el.querySelector('.torsten-gallery');
        gallery.style.height = height - margin + 'px'
    }

    onOpen() {
        this.gallery.list.loadImages()
    }


    onRender() {
        this._gallery.render()
        this.ui['content'].appendChild(this._gallery.el);
        addClass(this.el, 'gallery-modal slidein-bottom')
    }

    protected _onSelect(e) {
        e.preventDefault();
        if (this.selected)
            this.trigger('selected', this.selected);
        this.close();
    }

    onDestroy() {
        this.close();
        this._gallery.destroy();
    }
}
