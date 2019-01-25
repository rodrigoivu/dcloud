import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';
var ImgobjetoPipe = /** @class */ (function () {
    function ImgobjetoPipe() {
    }
    ImgobjetoPipe.prototype.transform = function (img) {
        var url = URL_SERVICIOS + 'api/get-image-objeto/';
        img ? url += img : url += 'xxx';
        return url;
    };
    ImgobjetoPipe = tslib_1.__decorate([
        Pipe({
            name: 'imgobjeto'
        })
    ], ImgobjetoPipe);
    return ImgobjetoPipe;
}());
export { ImgobjetoPipe };
//# sourceMappingURL=imgobjeto.pipe.js.map