
import {View, attributes, ViewOptions} from 'views';
import {createElement, hasClass, addClass, removeClass, animationEnd,addEventListener,removeEventListener, transitionEnd} from 'orange.dom'
import {bind} from 'orange';
export interface ModalOptions extends ViewOptions {
    
}

@attributes({
    tagName: 'div',
    className: 'views-modal'
})
export class Modal extends View<HTMLDivElement> {
    private __rendered: boolean = false;
    constructor(options?:ModalOptions) {
        super(options);
        if (options.el) {
            addClass(this.el,this.className);
        }
        this.close = bind(this.close, this);
    }

    render() {
        super.render()
        this.__rendered = true;
        let overlay = createElement('div', {})
        addClass(overlay, 'views-modal-overlay')
        document.body.appendChild(overlay);
        return this;
    }

    open() {
        console.log('open')
        let body = document.body
        if (hasClass(body, "views-modal-open")) {
            return;
        }
        this.triggerMethod('before:open')
        
        
        requestAnimationFrame(() => {
            addClass(this.el, 'views-modal-show');
            addClass(body, 'views-modal-open')
        })
        let overlay = document.body.querySelector('.views-modal-overlay');
        addEventListener(overlay, 'click', this.close);

        animationEnd(this.el, () => {
            this.triggerMethod('open');
        })
        
    }

    _onClose () {
        this.close();
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

    }

    toggle () {
        let body = document.body
        if (!hasClass(this.el, "views-modal-show")) {
            this.open();
        } else {
            this.close();
        }
    }

    onDestroy() {
        this.remove();
    }

}