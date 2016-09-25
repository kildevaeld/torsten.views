
import {View, ViewOptions, events} from 'views';
import {addClass, removeClass} from 'orange.dom';
import {mapAsync, slice} from 'orange'
import {Uploader} from '../uploader';
export interface DropZoneOptions extends ViewOptions {
    uploader?: Uploader;
    path?:string;
}

@events({
    dragenter: '_onDragEnter',
    dragleave: '_onDragEnd',
    dragstart: '_onDragEnter',
    drop: '_onDrop',
    drag: '_onDragEnter',
    dragover: '_onDragEnter'
})
export class DropZone extends View<HTMLDivElement> {
    private uploader: Uploader;
    path: string;
    constructor(options: DropZoneOptions = {}) {
        super(options);
        this.uploader = options.uploader;
        this.path = options.path||"/";
    }

   private _onDragEnter (e:DragEvent) {
       addClass(this.el, 'drag-enter')
       e.preventDefault()
       e.stopPropagation();
   }

   private _onDragEnd (e:DragEvent) {
       removeClass(this.el, 'drag-enter')
       e.preventDefault();
       e.stopPropagation();
   }

   private _onDrop(e:DragEvent) {
       removeClass(this.el, 'drag-enter')
       
       e.preventDefault();
       e.stopPropagation();
       
       if (this.uploader) {
        let files = <File[]>slice(e.dataTransfer.files);
        mapAsync(files, (file) => {
            return this.uploader.upload(this.path, file)
        }, this, true)
       }

       this.triggerMethod('drop', e);

       
   }

}