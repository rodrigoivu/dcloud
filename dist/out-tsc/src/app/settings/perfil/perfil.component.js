import * as tslib_1 from "tslib";
import { Component, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
var PerfilComponent = /** @class */ (function () {
    function PerfilComponent(_usuarioService, fb, cd) {
        this._usuarioService = _usuarioService;
        this.fb = fb;
        this.cd = cd;
    }
    PerfilComponent.prototype.ngOnInit = function () {
        this.usuario = this._usuarioService.usuario; // Recupera datos para ser mostrados
        //FORMULARIO DATOS
        this.formDatos = this.fb.group({
            nombre: [
                this.usuario.name,
                Validators.compose([Validators.required])
            ]
        });
        //FORMULARIO IMAGEN
        this.formImagen = this.fb.group({
            file: [
                null,
                Validators.compose([Validators.required])
            ]
        });
    };
    PerfilComponent.prototype.onSubmit = function () {
        var usuarioModificado = {
            name: this.formDatos.value.nombre,
            email: this.usuario.email,
            _id: this.usuario._id
        };
        this.usuario.name = this.formDatos.value.nombre;
        this._usuarioService.actualizarUsuario(usuarioModificado)
            .subscribe();
    };
    PerfilComponent.prototype.seleccionImage = function (archivo) {
        var _this = this;
        if (!archivo) {
            this.imagenSubir = null;
            return;
        }
        if (archivo.type.indexOf('image') < 0) {
            swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
            this.imagenSubir = null;
            return;
        }
        this.imagenSubir = archivo;
        var reader = new FileReader();
        var urlImagenTemp = reader.readAsDataURL(archivo);
        // reader.onloadend =() => this.imagenTemp = reader.result;
        reader.onload = function () {
            _this.formImagen.patchValue({
                file: reader.result
            });
            _this.imagenTemp = reader.result;
            _this.cd.markForCheck();
        };
    };
    PerfilComponent.prototype.cambiarImagen = function () {
        if (this.imagenSubir) {
            this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
        }
    };
    PerfilComponent = tslib_1.__decorate([
        Component({
            selector: 'app-perfil',
            templateUrl: './perfil.component.html',
            styles: []
        }),
        tslib_1.__metadata("design:paramtypes", [UsuarioService,
            FormBuilder,
            ChangeDetectorRef])
    ], PerfilComponent);
    return PerfilComponent;
}());
export { PerfilComponent };
//# sourceMappingURL=perfil.component.js.map