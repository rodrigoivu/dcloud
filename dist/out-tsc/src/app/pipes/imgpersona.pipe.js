import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';
var ImgpersonaPipe = /** @class */ (function () {
    function ImgpersonaPipe() {
    }
    ImgpersonaPipe.prototype.transform = function (img) {
        var url = URL_SERVICIOS + 'api/get-image-persona/';
        img ? url += img : url += 'xxx';
        return url;
    };
    ImgpersonaPipe = tslib_1.__decorate([
        Pipe({
            name: 'imgpersona'
        })
    ], ImgpersonaPipe);
    return ImgpersonaPipe;
}());
export { ImgpersonaPipe };
//# sourceMappingURL=imgpersona.pipe.js.map