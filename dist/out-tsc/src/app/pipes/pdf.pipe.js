import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';
var PdfPipe = /** @class */ (function () {
    function PdfPipe() {
    }
    PdfPipe.prototype.transform = function (pdf) {
        var url = URL_SERVICIOS + 'api/get-pdf-paciente/';
        if (!pdf) {
            return url + 'xxx';
        }
        else {
            url += pdf;
        }
        return url;
    };
    PdfPipe = tslib_1.__decorate([
        Pipe({
            name: 'pdf'
        })
    ], PdfPipe);
    return PdfPipe;
}());
export { PdfPipe };
//# sourceMappingURL=pdf.pipe.js.map