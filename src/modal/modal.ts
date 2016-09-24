
import {View, attributes, ViewOptions} from 'views';
import {createElement, hasClass, addClass, removeClass, animationEnd,addEventListener,removeEventListener, transitionEnd} from 'orange.dom'
import {bind} from 'orange';
export interface ModalOptions extends ViewOptions {
    template: string;
}

@attributes({
    tagName: 'div',
    className: 'torsten modal'
})
export class Modal extends View<HTMLDivElement> {
    private __rendered: boolean = false;
    constructor(options?:ModalOptions) {
        super(options);
        if (options.el) {
            addClass(this.el,this.className);
        }
        this._onClose = bind(this._onClose, this);
    }

    onRender() {
        this.__rendered = true;
    }

    open() {
        let body = document.body
        if (hasClass(body, "torsten-modal-open")) {
            return;
        }

        let overlay = createElement('div', {})
        addClass(overlay, 'torsten-modal-overlay')
        body.appendChild(overlay);
        

        requestAnimationFrame(() => {
            addClass(body, 'torsten-modal-open');
        })
        
        addEventListener(overlay, 'click', this._onClose)


    }

    _onClose () {
        console.log('close')
        this.close();
    }

    close() {
        let body = document.body
        if (!hasClass(body, "torsten-modal-open")) {
            return;
        }
        let overlay = body.querySelector('.torsten-modal-overlay');
        removeEventListener(overlay, 'click', this._onClose)
        

        removeClass(body, 'torsten-modal-open')

        transitionEnd(overlay, (e) => {
            body.removeChild(overlay);
        }, null);

        

    }

    onDestroy() {
        this.remove();
    }

}