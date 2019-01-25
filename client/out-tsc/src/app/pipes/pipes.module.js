import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { PdfPipe } from './pdf.pipe';
import { ImgobjetoPipe } from './imgobjeto.pipe';
import { ImagenPlantaPipe } from './imagen-planta.pipe';
var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = tslib_1.__decorate([
        NgModule({
            imports: [],
            declarations: [
                ImagenPipe,
                PdfPipe,
                ImgobjetoPipe,
                ImagenPlantaPipe
            ],
            exports: [
                ImagenPipe,
                PdfPipe,
                ImgobjetoPipe,
                ImagenPlantaPipe
            ]
        })
    ], PipesModule);
    return PipesModule;
}());
export { PipesModule };
//# sourceMappingURL=pipes.module.js.map