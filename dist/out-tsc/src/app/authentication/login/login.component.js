import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_usuarioService, fb, router) {
        this._usuarioService = _usuarioService;
        this.fb = fb;
        this.router = router;
        this.recuerdame = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.email = localStorage.getItem('email') || ''; //si tiene la opcion de recuerdame y está guardado el email en el local storage
        if (this.email.length > 1) {
            this.recuerdame = true;
        }
        this.form = this.fb.group({
            email: [
                this.email,
                Validators.compose([Validators.required, CustomValidators.email])
            ],
            password: [null, Validators.compose([Validators.required])],
            recuerdame: [this.recuerdame]
        });
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        var gethash = true; //determina si se pide el Token o no
        var usuario = new Usuario(null, this.form.value.email, this.form.value.password);
        if (this.form.valid) {
            this._usuarioService.login(usuario, this.form.value.recuerdame, gethash)
                .subscribe(function (resp) { return _this.router.navigate(['/dashboards/dashboard2']); });
        }
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [UsuarioService,
            FormBuilder,
            Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map