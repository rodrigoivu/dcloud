import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
var AdminGuard = /** @class */ (function () {
    function AdminGuard(_usuarioService) {
        this._usuarioService = _usuarioService;
    }
    AdminGuard.prototype.canActivate = function () {
        if (this._usuarioService.usuario.role === 'ADMIN_ROLE' || this._usuarioService.usuario.role === 'ADMIN_DESIMAT') {
            return true;
        }
        else {
            this._usuarioService.noAutorizado();
            return false;
        }
    };
    AdminGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [UsuarioService])
    ], AdminGuard);
    return AdminGuard;
}());
export { AdminGuard };
//# sourceMappingURL=admin.guard.js.map