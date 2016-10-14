"use strict";

function getCropping(size, ratio) {
    var width = size.width,
        height = size.height;
    var nh = height,
        nw = width;
    if (width > height) {
        nh = width / ratio;
    } else {
        nw = height * ratio;
    }
    if (nw == width && nh > height) {
        nw = height * ratio;
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
exports.getCropping = getCropping;