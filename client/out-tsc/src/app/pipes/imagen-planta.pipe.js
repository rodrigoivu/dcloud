import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';
var ImagenPlantaPipe = /** @class */ (function () {
    function ImagenPlantaPipe() {
    }
    ImagenPlantaPipe.prototype.transform = function (img) {
        var url = URL_SERVICIOS + 'api/get-image-configuracion/';
        img ? url += img : url += 'xxx';
        return url;
    };
    ImagenPlantaPipe = tslib_1.__decorate([
        Pipe({
            name: 'imagenPlanta'
        })
    ], ImagenPlantaPipe);
    return ImagenPlantaPipe;
}());
export { ImagenPlantaPipe };
//# sourceMappingURL=imagen-planta.pipe.js.map