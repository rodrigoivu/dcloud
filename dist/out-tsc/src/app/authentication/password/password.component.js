import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/service.index';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
var newPassword = new FormControl('', Validators.required);
var confirmNewPassword = new FormControl('', CustomValidators.equalTo(newPassword));
var PasswordComponent = /** @class */ (function () {
    function PasswordComponent(_usuarioService, fb, router, activatedroute) {
        this._usuarioService = _usuarioService;
        this.fb = fb;
        this.router = router;
        this.activatedroute = activatedroute;
        this.id = this.activatedroute.snapshot.paramMap.get('id');
        this.buscarUsuario(this.id);
    }
    PasswordComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword,
        });
    };
    PasswordComponent.prototype.buscarUsuario = function (id) {
        var _this = this;
        this._usuarioService.buscaPorId(id)
            .subscribe(function (resp) {
            _this.usuario = resp.user;
            _this.nombre = _this.usuario.name;
        });
    };
    PasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.form.valid) {
            this.usuario.password = this.form.value.newPassword;
            this._usuarioService.actualizarUsuarioPassword(this.usuario)
                .subscribe(function (resp) { return _this.router.navigate(['/authentication/login']); });
        }
    };
    PasswordComponent = tslib_1.__decorate([
        Component({
            selector: 'app-password',
            templateUrl: './password.component.html',
            styles: []
        }),
        tslib_1.__metadata("design:paramtypes", [UsuarioService,
            FormBuilder,
            Router,
            ActivatedRoute])
    ], PasswordComponent);
    return PasswordComponent;
}());
export { PasswordComponent };
//# sourceMappingURL=password.component.js.map