"use strict";
const orange_1 = require('orange');
function getImageSize(image) {
    const load = () => {
        return new orange_1.Promise((resolve, reject) => {
            let i = new Image();
            i.onload = () => {
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
    }
    else if (image.naturalHeight === 0) {
        return new orange_1.Promise((resolve, reject) => {
            var time = setTimeout(() => {
                time = null;
                load().then(resolve, reject);
            }, 200);
            image.onload = () => {
                if (time !== null) {
                    clearTimeout(time);
                }
                resolve({
                    width: image.naturalWidth,
                    height: image.naturalHeight
                });
            };
        });
    }
    else {
        return orange_1.Promise.resolve({
            width: image.naturalWidth,
            height: image.naturalHeight
        });
    }
}
exports.getImageSize = getImageSize;
exports.emptyImage = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
