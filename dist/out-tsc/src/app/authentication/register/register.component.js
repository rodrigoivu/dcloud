import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
var password = new FormControl('', Validators.required);
var confirmPassword = new FormControl('', CustomValidators.equalTo(password));
//const confirmaTerminos = new FormControl('', CustomValidators.equalTo('true'));
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(_usuarioService, fb, router) {
        this._usuarioService = _usuarioService;
        this.fb = fb;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            email: [
                null,
                Validators.compose([Validators.required, CustomValidators.email])
            ],
            password: password,
            confirmPassword: confirmPassword,
            terminos: [false, Validators.compose([Validators.pattern('true')])
            ]
        });
    };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        var usuario = new Usuario('Editar Nombre', this.form.value.email, this.form.value.password);
        if (this.form.valid) {
            this._usuarioService.registraUsuario(usuario)
                .subscribe(function (resp) { return _this.router.navigate(['/authentication/login']); });
        }
        // this.router.navigate(['/']);
    };
    RegisterComponent = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [UsuarioService,
            FormBuilder,
            Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map