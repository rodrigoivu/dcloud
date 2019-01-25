import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AccordionAnchorDirective,
                AccordionLinkDirective,
                AccordionDirective
            ],
            exports: [
                AccordionAnchorDirective,
                AccordionLinkDirective,
                AccordionDirective
            ],
            providers: [MenuItems]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared.module.js.map