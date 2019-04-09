import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { UsuarioService } from '../../../services/service.index';
var AppSidebarComponent = /** @class */ (function () {
    function AppSidebarComponent(_usuarioService, changeDetectorRef, media, menuItems) {
        this._usuarioService = _usuarioService;
        this.menuItems = menuItems;
        this.config = {};
        this.status = false;
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = function () { return changeDetectorRef.detectChanges(); };
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.usuario = this._usuarioService.usuario;
    }
    AppSidebarComponent.prototype.clickEvent = function () {
        this.status = !this.status;
    };
    AppSidebarComponent.prototype.subclickEvent = function () {
        this.status = true;
    };
    AppSidebarComponent.prototype.ngOnDestroy = function () {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    };
    AppSidebarComponent = tslib_1.__decorate([
        Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: []
        }),
        tslib_1.__metadata("design:paramtypes", [UsuarioService,
            ChangeDetectorRef,
            MediaMatcher,
            MenuItems])
    ], AppSidebarComponent);
    return AppSidebarComponent;
}());
export { AppSidebarComponent };
//# sourceMappingURL=sidebar.component.js.map