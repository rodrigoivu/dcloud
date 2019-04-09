import * as tslib_1 from "tslib";
import { Component, ChangeDetectorRef } from '@angular/core';
import { ConfiguracionService } from '../../services/service.index';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
var PlataformaComponent = /** @class */ (function () {
    function PlataformaComponent(_configuracionService, fb, cd) {
        this._configuracionService = _configuracionService;
        this.fb = fb;
        this.cd = cd;
        this.isConfig = false;
    }
    PlataformaComponent.prototype.ngOnInit = function () {
        this.inicializaFormImagenLogo();
        this.inicializaFormImagenCorporativa();
        this.cargaConfiguracion();
    };
    PlataformaComponent.prototype.cargaConfiguracion = function () {
        var _this = this;
        this._configuracionService.itemUltimo()
            .subscribe(function (resp) {
            if (resp.item) {
                _this.isConfig = true;
                _this.config = resp.item;
                //this.setFormConfigControlGeneral(this.config);
            }
            else {
                _this.crearConfiguracion();
            }
        });
    };
    PlataformaComponent.prototype.crearConfiguracion = function () {
        var _this = this;
        var nuevaConfig = {
            image: null,
            imagelogo: null,
            imagecorporativa: null,
            titulodash1: null,
            titulodash2: null,
            titulocontrol: null,
            tituloplanta: null,
            titulosalidas: null,
            tituloDO1: null,
            tituloAO1: null,
            tituloAO2: null,
            tituloAO3: null,
            subtitulosalidas: null,
            subtituloDO1: null,
            subtituloAO1: null,
            subtituloAO2: null,
            subtituloAO3: null,
        };
        this._configuracionService.registraItem(nuevaConfig)
            .subscribe(function (resp) {
            _this.isConfig = true;
            _this.config = resp;
            //this.setFormConfigControlGeneral(this.config);
        });
    };
    PlataformaComponent.prototype.inicializaFormImagenLogo = function () {
        //FORMULARIO IMAGEN
        this.formImagenLogo = this.fb.group({
            image: [null, Validators.compose([Validators.required])
            ]
        });
    };
    PlataformaComponent.prototype.inicializaFormImagenCorporativa = function () {
        //FORMULARIO IMAGEN
        this.formImagenCorporativa = this.fb.group({
            image: [null, Validators.compose([Validators.required])
            ]
        });
    };
    //CARGAR IMAGEN LOGO
    PlataformaComponent.prototype.cambiarImagenLogo = function () {
        if (this.imagenSubirLogo) {
            this._configuracionService.guardarImagenLogo(this.imagenSubirLogo, this.config._id);
        }
    };
    //CARGAR IMAGEN CORPORATIVA
    PlataformaComponent.prototype.cambiarImagenCorporativa = function () {
        if (this.imagenSubirCorporativa) {
            this._configuracionService.guardarImagenCorporativa(this.imagenSubirCorporativa, this.config._id);
        }
    };
    //SELECCIONAR IMAGEN PLANTA
    PlataformaComponent.prototype.seleccionImageLogo = function (archivo) {
        var _this = this;
        if (!archivo) {
            this.imagenSubirLogo = null;
            return;
        }
        if (archivo.type.indexOf('image') < 0) {
            swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
            this.imagenSubirLogo = null;
            return;
        }
        this.imagenSubirLogo = archivo;
        var reader = new FileReader();
        var urlImagenTemp = reader.readAsDataURL(archivo);
        reader.onload = function () {
            _this.formImagenLogo.patchValue({
                image: reader.result
            });
            _this.imagenTempLogo = reader.result;
            _this.cd.markForCheck();
        };
    };
    //SELECCIONAR IMAGEN PLANTA
    PlataformaComponent.prototype.seleccionImageCorporativa = function (archivo) {
        var _this = this;
        if (!archivo) {
            this.imagenSubirCorporativa = null;
            return;
        }
        if (archivo.type.indexOf('image') < 0) {
            swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
            this.imagenSubirCorporativa = null;
            return;
        }
        this.imagenSubirCorporativa = archivo;
        var reader = new FileReader();
        var urlImagenTemp = reader.readAsDataURL(archivo);
        reader.onload = function () {
            _this.formImagenCorporativa.patchValue({
                image: reader.result
            });
            _this.imagenTempCorporativo = reader.result;
            _this.cd.markForCheck();
        };
    };
    PlataformaComponent = tslib_1.__decorate([
        Component({
            selector: 'app-plataforma',
            templateUrl: './plataforma.component.html',
            styles: []
        }),
        tslib_1.__metadata("design:paramtypes", [ConfiguracionService,
            FormBuilder,
            ChangeDetectorRef])
    ], PlataformaComponent);
    return PlataformaComponent;
}());
export { PlataformaComponent };
//# sourceMappingURL=plataforma.component.js.map