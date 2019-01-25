import * as tslib_1 from "tslib";
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
var campoTipoRequerido = new FormControl('', Validators.required);
var campoTipoNoRequerido = new FormControl({ value: null, disabled: false });
var Configdash1Component = /** @class */ (function () {
    function Configdash1Component(fb, cd) {
        this.fb = fb;
        this.cd = cd;
        this.isLoadingResults = true;
        this.isRateLimitReached = false;
    }
    Configdash1Component.prototype.ngOnInit = function () {
        this.inicializaFormPersona();
    };
    Configdash1Component.prototype.inicializaFormPersona = function () {
        //FORMULARIO DATOS PERSONAS
        this.formDatosPersona = this.fb.group({
            rut: new FormControl(null, Validators.required),
            nombre: new FormControl(null, Validators.required),
            tag: new FormControl(null, Validators.required),
            empresa: new FormControl({ value: null, disabled: false }),
            cargo: new FormControl({ value: null, disabled: false }),
            area: new FormControl({ value: null, disabled: false }),
            autorizado: new FormControl({ value: null, disabled: false }),
            fechaincorporacion: new FormControl({ value: null, disabled: false }),
            tipolicenciaconducir: new FormControl({ value: null, disabled: false }),
            mutualidad: new FormControl({ value: null, disabled: false }),
            fechaexamenocupacional: new FormControl({ value: null, disabled: false }),
            fechaexamenalturafisica: new FormControl({ value: null, disabled: false }),
            fechaexamenalturageo: new FormControl({ value: null, disabled: false }),
            fechafincontrato: new FormControl({ value: null, disabled: false }),
            responsablearchivoexamen1: new FormControl({ value: null, disabled: false }),
            responsablearchivoexamen2: new FormControl({ value: null, disabled: false }),
            responsablearchivoexamen3: new FormControl({ value: null, disabled: false }),
            responsablearchivocontrato: new FormControl({ value: null, disabled: false }),
        });
        this.formDatosPersona.controls['tag'].disable();
        //FORMULARIO IMAGEN PERSONAS
        this.formImagenPersona = this.fb.group({
            file: [null, Validators.compose([Validators.required])]
        });
        //FORMULARIO ARCHIVO EXAMEN1 PERSONAS
        this.formExamen1Persona = this.fb.group({
            file: [null, Validators.compose([Validators.required])]
        });
        //FORMULARIO ARCHIVO EXAMEN2 PERSONAS
        this.formExamen2Persona = this.fb.group({
            file: [null, Validators.compose([Validators.required])]
        });
        //FORMULARIO ARCHIVO EXAMEN3 PERSONAS
        this.formExamen3Persona = this.fb.group({
            file: [null, Validators.compose([Validators.required])]
        });
        //FORMULARIO ARCHIVO CONTRATO PERSONAS
        this.formContratoPersona = this.fb.group({
            file: [null, Validators.compose([Validators.required])]
        });
    };
    Configdash1Component.prototype.onSubmit = function () {
    };
    Configdash1Component.prototype.cambiarImagen = function () {
    };
    Configdash1Component.prototype.seleccionImage = function (archivo) {
    };
    Configdash1Component = tslib_1.__decorate([
        Component({
            selector: 'app-configdash1',
            templateUrl: './configdash1.component.html',
            styles: []
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            ChangeDetectorRef])
    ], Configdash1Component);
    return Configdash1Component;
}());
export { Configdash1Component };
//# sourceMappingURL=configdash1.component.js.map