
import { View, ViewOptions, events } from 'views';
import { addClass, removeClass } from 'orange.dom';
import { mapAsync, slice } from 'orange'
import { Uploader } from '../uploader';
import { FileMode, CreateOptions } from 'torsten';

export interface DropZoneOptions extends ViewOptions {
  uploader?: Uploader;
  path?: string;
  mode?: FileMode
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
  mode: FileMode;

  constructor(options: DropZoneOptions = {}) {
    super(options);
    this.uploader = options.uploader;
    this.path = options.path || "/";
    if (options.mode) this.mode = options.mode
  }

  protected _onDragEnter(e: DragEvent) {
    addClass(this.el, 'drag-enter')
    e.preventDefault()
    e.stopPropagation();
  }

  protected _onDragEnd(e: DragEvent) {
    removeClass(this.el, 'drag-enter')
    e.preventDefault();
    e.stopPropagation();
  }

  protected _onDrop(e: DragEvent) {
    removeClass(this.el, 'drag-enter')
    this.triggerMethod('before:drop', e);

    e.preventDefault();
    e.stopPropagation();

    let options: CreateOptions = {};
    if (this.mode) options.mode = this.mode;

    if (this.uploader) {
      let files = <File[]>slice(e.dataTransfer.files);
      mapAsync(files, (file) => {
        return this.uploader.upload(this.path, file, options)
      }, this, true).catch(e => {
        this.trigger('error', e);
      })
    }

    this.triggerMethod('drop', e);

  }

}