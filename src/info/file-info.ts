
import { View, attributes, ViewOptions } from 'views';
import templates from '../templates/index';
import { FileInfoModel } from '../collection';
import { IClient } from 'torsten'
import { humanFileSize } from 'orange';


export interface FileInfoViewOptions extends ViewOptions {
    client: IClient;
}

@attributes({
    className: 'file-info',
    template: () => templates['file-info'],
    ui: {
        name: '.name',
        mime: '.mimetype',
        size: '.size',
        download: '.download',
        preview: '.preview'
    },
    events: {
        'click @ui.download': '_onDownload'
    }
})
export class FileInfoView extends View<HTMLDivElement> {
    private __rendered: boolean;
    model: FileInfoModel;
    client: IClient;
    constructor(public options: FileInfoViewOptions) {
        super(options);
        this.client = options.client;
    }

    onModel(model: FileInfoModel) {
        this.clear();
        if (model == null) {
            return;
        }
        this._update_ui(model);
    }

    onRender() {
        this.__rendered = true;
        if (this.model) this._update_ui(this.model);
    }

    clear() {
        if (!this.__rendered) return this;
        let ui = <any>this.ui;
        ui.name.textContent = '';
        ui.mime.textContent = '';
        ui.size.textContent = '';
        ui.download.textContent = '';

        let img = ui.preview.querySelector('img');
        if (img) {
            URL.revokeObjectURL(img.src);
        }
        ui.preview.innerHTML = '';
        this.el.style.opacity = "0";

        return this;
    }

    _update_ui(model: FileInfoModel) {
        if (!this.__rendered) return this;
        let ui = <any>this.ui;

        ui.name.textContent = model.get('name');
        ui.mime.textContent = model.get('mime');
        ui.size.textContent = humanFileSize(model.get('size'));
        ui.download.textContent = model.get('name');

        if (/image\/.*/.test(model.get('mime'))) {
            let img = document.createElement('img');
            img.src = model.url + '?token=' + this.client.token; // `${this.client.endpoint}/v1/${model.fullPath}?token=${this.client.token}`
            ui.preview.appendChild(img);
        }

        this.el.style.opacity = "1";

    }

    protected _onDownload(e) {
        e.preventDefault();

        this.model.open()
            .then(blob => {
                let a = document.createElement('a');
                let url = URL.createObjectURL(blob);
                a.href = url
                a.download = this.model.get('name');
                document.body.appendChild(a);
                a.click()

                setTimeout(() => {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 100)

            }).catch(e => {
                console.log(e)
            })
    }

    destroy() {
        this.clear();
        super.destroy();
    }

}