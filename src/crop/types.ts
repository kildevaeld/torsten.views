
export interface Size {
    width: number;
    height: number;
}

export interface Point {
    x: number;
    y: number;
}

export interface Cropping extends Size, Point {
    rotate: number;
    scaleX: number;
    scaleY: number;
}

export interface ICropper {
    getCroppedCanvas(o?): any;
    getCanvasData(): any;
    getContainerData(): any;
    destroy();
}


export function getCropping(size: Size, ratio: number) {

    let width = size.width,
        height = size.height;

    let nh = height, nw = width;
    if (width > height) {
        nh = width / ratio;
    } else {
        nw = height * ratio;
    }
    if (nw == width && nh > height) {
        nw = height * ratio
        nh = nw / ratio;
    }


    return {
        x: 0,
        y: 0,
        width: nw,
        height: nh,
        rotate: 0,
        scaleX: 1,
        scaleY: 1
    };
}