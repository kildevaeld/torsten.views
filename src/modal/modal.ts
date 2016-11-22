
import { View, attributes, ViewOptions } from 'views';
import {
    createElement, hasClass, addClass, removeClass, animationEnd,
    removeEventListener
} from 'orange.dom'
import { bind } from 'orange';
export interface ModalOptions extends ViewOptions {

}

@attributes({
    tagName: 'div',
    className: 'views-modal',
    events: {
        'click': '_onClose'
    }
})
export class Modal extends View<HTMLDivElement> {
    private __rendered: boolean = false;
    constructor(options?: ModalOptions) {
        super(options);
        if (options.el) {
            addClass(this.el, this.className);
        }
        this._onClose = bind(this._onClose, this);
    }

    render() {
        super.render()
        this.__rendered = true;

        let overlay = <HTMLElement>document.body.querySelector('.views-modal-overlay');
        if (!overlay) {
            overlay = createElement('div', {})
            addClass(overlay, 'views-modal-overlay')
            document.body.appendChild(overlay);
        }

        return this;
    }

    open() {
        console.log('open tadad')
        let body = document.body
        if (hasClass(body, "views-modal-open")) {
            return;
        }
        this.triggerMethod('before:open')


        requestAnimationFrame(() => {
            addClass(this.el, 'views-modal-show');
            addClass(body, 'views-modal-open')
        })

        animationEnd(this.el, () => {
            this.triggerMethod('open');
        })

        return this;
    }

    _onClose(e) {
        if (hasClass(e.target, 'views-modal')) {
            this.close();
        }
    }

    close() {
        let body = document.body
        if (!hasClass(this.el, "views-modal-show")) {
            return;
        }
        this.triggerMethod('before:close')
        let overlay = body.querySelector('.views-modal-overlay');
        removeEventListener(overlay, 'click', this.close)

        removeClass(this.el, 'views-modal-show')
        removeClass(body, 'views-modal-open')

        animationEnd(this.el, () => {
            this.triggerMethod('close');
        })

        return this;

    }

    toggle() {
        if (!hasClass(this.el, "views-modal-show")) {
            this.open();
        } else {
            this.close();
        }
        return this;
    }

    onDestroy() {
        this.close().remove();
    }

    remove() {
        super.remove();
        let overlay = document.body.querySelector('.views-modal-overlay');
        if (overlay) {
            document.body.removeChild(overlay);
        }
        return this;
    }

}