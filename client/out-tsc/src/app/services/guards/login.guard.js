import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
var LoginGuard = /** @class */ (function () {
    function LoginGuard(_usuarioService) {
        this._usuarioService = _usuarioService;
    }
    LoginGuard.prototype.canActivate = function () {
        if (this._usuarioService.estaLogueado()) {
            return true;
        }
        else {
            this._usuarioService.logout();
            return false;
        }
    };
    LoginGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [UsuarioService])
    ], LoginGuard);
    return LoginGuard;
}());
export { LoginGuard };
//# sourceMappingURL=login.guard.js.map