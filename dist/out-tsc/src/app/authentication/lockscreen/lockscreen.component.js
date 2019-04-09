import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
var LockscreenComponent = /** @class */ (function () {
    function LockscreenComponent(fb, router) {
        this.fb = fb;
        this.router = router;
    }
    LockscreenComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            uname: [null, Validators.compose([Validators.required])]
        });
    };
    LockscreenComponent.prototype.onSubmit = function () {
        this.router.navigate(['/']);
    };
    LockscreenComponent = tslib_1.__decorate([
        Component({
            selector: 'app-lockscreen',
            templateUrl: './lockscreen.component.html',
            styleUrls: ['./lockscreen.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, Router])
    ], LockscreenComponent);
    return LockscreenComponent;
}());
export { LockscreenComponent };
//# sourceMappingURL=lockscreen.component.js.map