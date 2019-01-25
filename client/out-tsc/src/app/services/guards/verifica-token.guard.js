import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';
var VerificaTokenGuard = /** @class */ (function () {
    function VerificaTokenGuard(_usuarioService, router) {
        this._usuarioService = _usuarioService;
        this.router = router;
    }
    VerificaTokenGuard.prototype.canActivate = function () {
        //console.log('Token Guard');
        var token = this._usuarioService.token;
        var payload = JSON.parse(atob(token.split('.')[1]));
        var expirado = this.expirado(payload.exp);
        if (expirado) {
            this.router.navigate(['/authentication/login']);
            return false;
        }
        return this.verificaRenueva(payload.exp);
    };
    VerificaTokenGuard.prototype.verificaRenueva = function (fechaExp) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var tokenExp = new Date(fechaExp * 1000); //el payload.exp esta en seg, y Date se guarda en milisegundos
            var ahora = new Date();
            ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000)); // el 15 o primer numero son las horas // esto es ahora mas 15 horas
            if (tokenExp.getTime() > ahora.getTime()) {
                resolve(true);
            }
            else {
                _this._usuarioService.renuevaToken()
                    .subscribe(function () {
                    resolve(true);
                }, function () {
                    reject(false);
                    _this.router.navigate(['/authentication/login']);
                });
            }
        });
    };
    VerificaTokenGuard.prototype.expirado = function (fechaExp) {
        var ahora = new Date().getTime() / 1000;
        if (fechaExp < ahora) {
            return true;
        }
        else {
            return false;
        }
    };
    VerificaTokenGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [UsuarioService,
            Router])
    ], VerificaTokenGuard);
    return VerificaTokenGuard;
}());
export { VerificaTokenGuard };
//# sourceMappingURL=verifica-token.guard.js.map