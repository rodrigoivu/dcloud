import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';
var ImagenPipe = /** @class */ (function () {
    function ImagenPipe() {
    }
    ImagenPipe.prototype.transform = function (img) {
        var url = URL_SERVICIOS + 'api/get-image-user/';
        img ? url += img : url += 'xxx';
        return url;
    };
    ImagenPipe = tslib_1.__decorate([
        Pipe({
            name: 'imagen'
        })
    ], ImagenPipe);
    return ImagenPipe;
}());
export { ImagenPipe };
//# sourceMappingURL=imagen.pipe.js.map