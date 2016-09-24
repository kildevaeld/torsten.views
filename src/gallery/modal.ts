import {Modal, ModalOptions} from '../modal/index';
import {GalleryView, GalleryViewOptions} from './gallery'
import {attributes} from 'views';
import templates from '../templates/index'
import {addClass} from 'orange.dom'
import {FileInfoModel} from '../collection';

export interface GalleryModalOptions extends GalleryViewOptions, ModalOptions {

}

@attributes({
    template: () => templates['modal-gallery'],
    ui: {
        content: '.torsten-modal-content'
    },
    events: {
        'click .btn-close': function () { this.close() },
        'click .btn-select': '_onSelect'
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

    set root (root: string) {
        this._gallery.root = root; 
    }

    constructor(options:GalleryModalOptions) {
        super(options);

        delete options.el;
        this._gallery = new GalleryView(options);

        this.listenTo(this._gallery, 'dblclick', () => {
            this.trigger('selected', this.selected)
            this.close();
        })
    }

    onOpen() {

        this.gallery.list.loadImages()
    }


    onRender() {
        this._gallery.render()
        this.ui['content'].appendChild(this._gallery.el); 
        addClass(this.el, 'gallery-modal')           
    }
    
    private _onSelect (e) {
        e.preventDefault();
        console.log('on select')
    }
}
