import * as tslib_1 from "tslib";
import { Directive, HostListener, Inject } from '@angular/core';
import { AccordionLinkDirective } from './accordionlink.directive';
var AccordionAnchorDirective = /** @class */ (function () {
    function AccordionAnchorDirective(navlink) {
        this.navlink = navlink;
    }
    AccordionAnchorDirective.prototype.onClick = function (e) {
        this.navlink.toggle();
    };
    tslib_1.__decorate([
        HostListener('click', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], AccordionAnchorDirective.prototype, "onClick", null);
    AccordionAnchorDirective = tslib_1.__decorate([
        Directive({
            selector: '[appAccordionToggle]'
        }),
        tslib_1.__param(0, Inject(AccordionLinkDirective)),
        tslib_1.__metadata("design:paramtypes", [AccordionLinkDirective])
    ], AccordionAnchorDirective);
    return AccordionAnchorDirective;
}());
export { AccordionAnchorDirective };
//# sourceMappingURL=accordionanchor.directive.js.map