import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/service.index';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
var ForgotComponent = /** @class */ (function () {
    function ForgotComponent(_usuarioService, fb, router) {
        this._usuarioService = _usuarioService;
        this.fb = fb;
        this.router = router;
    }
    ForgotComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            email: [
                null,
                Validators.compose([Validators.required, CustomValidators.email])
            ]
        });
    };
    ForgotComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.form.valid) {
            this._usuarioService.buscaPorMail(this.form.value.email)
                .subscribe(function (resp) {
                _this.sendMail(resp);
            });
        }
    };
    ForgotComponent.prototype.sendMail = function (resp) {
        var _this = this;
        var usuario = resp.user;
        this._usuarioService.sendMail(usuario)
            .subscribe(function (resp) {
            _this.router.navigate(['/authentication/login']);
        });
    };
    ForgotComponent = tslib_1.__decorate([
        Component({
            selector: 'app-forgot',
            templateUrl: './forgot.component.html',
            styleUrls: ['./forgot.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [UsuarioService,
            FormBuilder,
            Router])
    ], ForgotComponent);
    return ForgotComponent;
}());
export { ForgotComponent };
//# sourceMappingURL=forgot.component.js.map