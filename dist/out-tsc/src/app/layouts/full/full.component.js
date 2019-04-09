import * as tslib_1 from "tslib";
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { UsuarioService } from './../../services/service.index';
/** @title Responsive sidenav */
var FullComponent = /** @class */ (function () {
    function FullComponent(_usuarioService, changeDetectorRef, media, menuItems) {
        this._usuarioService = _usuarioService;
        this.menuItems = menuItems;
        this.imagenlogo = 'imgLogo.png';
        this.dir = 'ltr';
        this.config = {};
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = function () { return changeDetectorRef.detectChanges(); };
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    FullComponent.prototype.ngOnDestroy = function () {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    };
    FullComponent.prototype.ngAfterViewInit = function () {
        // This is for the topbar search
        // (<any>$('.srh-btn, .cl-srh-btn')).on('click', function() {
        //   (<any>$('.app-search')).toggle(200);
        // });
        // This is for the megamenu
    };
    FullComponent = tslib_1.__decorate([
        Component({
            selector: 'app-full-layout',
            templateUrl: 'full.component.html',
            styleUrls: []
        }),
        tslib_1.__metadata("design:paramtypes", [UsuarioService,
            ChangeDetectorRef,
            MediaMatcher,
            MenuItems])
    ], FullComponent);
    return FullComponent;
}());
export { FullComponent };
//# sourceMappingURL=full.component.js.map