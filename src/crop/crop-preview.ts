
import {View, attributes, ViewOptions} from 'views';
import {Cropping,getCropping} from './types';
import {getImageSize} from '../utils';
import {IPromise} from 'orange';
import {addClass} from 'orange.dom';

export class CropPreview {
    protected _cropping: Cropping;
    protected _el: HTMLDivElement;
    protected _opts: CropPreViewOptions

    set cropping(cropping: Cropping) {
        this._cropping = cropping;
        this.update();
    }

    get cropping() {
        return this._cropping;
    }

    constructor(el: HTMLDivElement, options: CropPreViewOptions) {
        this._el = el;
        addClass(el, 'torsten cropping-preview');
    }


    update(): IPromise<any> {
        
        let img = <HTMLImageElement>this._el.querySelector("img")
        
        return getImageSize(img)
            .then(size => {
                
                let el = this._el

                if (this._cropping == null) {
                    if (this._opts.aspectRatio == null) {
                        return this;
                    }
                    
                    this._cropping = getCropping(size, this._opts.aspectRatio);
                   
                }

                let cropping = this._cropping;

                let cw = el.clientWidth,
                    ch = el.clientHeight,
                    rx = cw / cropping.width,
                    ry = ch / cropping.height;
                let width = size.width, height = size.height;

                let e = {
                    width: Math.round(rx * width) + 'px',
                    height: Math.round(ry * height) + 'px',
                    marginLeft: '-' + Math.round(rx * cropping.x) + 'px',
                    marginTop: '-' + Math.round(ry * cropping.y) + 'px'
                }

                for (let key in e) {
                    (<any>img).style[key] = e[key];
                }

            });
    }

}

export interface CropPreViewOptions extends ViewOptions {
    aspectRatio?: number;
}

@attributes({
    className: 'torsten cropping-preview',
    ui: {
        image: 'img'
    }
})
export class CropPreView extends View<HTMLDivElement> {
    protected _cropping: Cropping;
    private size: { width: number; height: number; };
    options: CropPreViewOptions
    set cropping(cropping: Cropping) {
        this._cropping = cropping;
        this.update();
    }

    get cropping() {
        return this._cropping;
    }
    
    constructor(options:CropPreViewOptions = {}) {
        super(options);
        this.options = options;
        
    }

    render() {

        this.triggerMethod('before:render');
        
        this.undelegateEvents();
        
        let image = <HTMLImageElement>this.el.querySelector('img');
        
        if (image == null) {
            image = document.createElement('img');
            this.el.appendChild(image);
        }
        
        this.delegateEvents();
        this.triggerMethod('render');
        
        if (image.src !== '') {
            this.update();
        }

        return this;
    }

    update(): IPromise<any> {
        this.triggerMethod('before:update');
        
        var img = <HTMLImageElement>this.ui['image'];
        
        return getImageSize(img)
            .then(size => {

                if (this.ui['image'] == null) return this;
                
                
                let el = this.el;

                if (this._cropping == null) {
                    if (this.options.aspectRatio == null) {
                        return this;
                    }
                    
                    this._cropping = getCropping(size, this.options.aspectRatio);
                   
                }

                let cropping = this._cropping;

                let cw = el.clientWidth,
                    ch = el.clientHeight,
                    rx = cw / cropping.width,
                    ry = ch / cropping.height;
                let width = size.width, height = size.height;

                let e = {
                    width: Math.round(rx * width) + 'px',
                    height: Math.round(ry * height) + 'px',
                    marginLeft: '-' + Math.round(rx * cropping.x) + 'px',
                    marginTop: '-' + Math.round(ry * cropping.y) + 'px'
                }

                for (let key in e) {
                    (<any>img).style[key] = e[key];
                }

                this.triggerMethod('update');
            });

    }

    

}