"use strict";

var orange_1 = require('orange');
function getImageSize(image) {
    var load = function load() {
        return new orange_1.Promise(function (resolve, reject) {
            var i = new Image();
            i.onload = function () {
                resolve({
                    width: i.naturalWidth || i.width,
                    height: i.naturalHeight || i.height
                });
            };
            i.onerror = reject;
            i.src = image.src;
        });
    };
    if (image.naturalHeight === undefined) {
        return load();
    } else if (image.naturalHeight === 0) {
        return new orange_1.Promise(function (resolve, reject) {
            var time = setTimeout(function () {
                time = null;
                load().then(resolve, reject);
            }, 200);
            image.onload = function () {
                if (time !== null) {
                    clearTimeout(time);
                }
                resolve({
                    width: image.naturalWidth,
                    height: image.naturalHeight
                });
            };
        });
    } else {
        return orange_1.Promise.resolve({
            width: image.naturalWidth,
            height: image.naturalHeight
        });
    }
}
exports.getImageSize = getImageSize;
exports.emptyImage = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";