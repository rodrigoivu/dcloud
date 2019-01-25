import * as tslib_1 from "tslib";
import { Component, Input, Inject, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { DOCUMENT } from '@angular/common';
var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent(router, document) {
        var _this = this;
        this.router = router;
        this.document = document;
        this.isSpinnerVisible = true;
        this.backgroundColor = 'rgba(0, 115, 170, 0.69)';
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationStart) {
                _this.isSpinnerVisible = true;
            }
            else if (event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError) {
                _this.isSpinnerVisible = false;
            }
        }, function () {
            _this.isSpinnerVisible = false;
        });
    }
    SpinnerComponent.prototype.ngOnDestroy = function () {
        this.isSpinnerVisible = false;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SpinnerComponent.prototype, "backgroundColor", void 0);
    SpinnerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-spinner',
            template: "<div class=\"preloader\" *ngIf=\"isSpinnerVisible\">\n        <div class=\"spinner\">\n          <div class=\"double-bounce1\"></div>\n          <div class=\"double-bounce2\"></div>\n        </div>\n    </div>",
            encapsulation: ViewEncapsulation.None
        }),
        tslib_1.__param(1, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [Router,
            Document])
    ], SpinnerComponent);
    return SpinnerComponent;
}());
export { SpinnerComponent };
//# sourceMappingURL=spinner.component.js.map