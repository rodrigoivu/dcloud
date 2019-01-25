import * as tslib_1 from "tslib";
import { Directive, HostBinding, Inject, Input } from '@angular/core';
import { AccordionDirective } from './accordion.directive';
var AccordionLinkDirective = /** @class */ (function () {
    function AccordionLinkDirective(nav) {
        this.nav = nav;
    }
    Object.defineProperty(AccordionLinkDirective.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            if (value) {
                this.nav.closeOtherLinks(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    AccordionLinkDirective.prototype.ngOnInit = function () {
        this.nav.addLink(this);
    };
    AccordionLinkDirective.prototype.ngOnDestroy = function () {
        this.nav.removeGroup(this);
    };
    AccordionLinkDirective.prototype.toggle = function () {
        this.selected = !this.selected;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AccordionLinkDirective.prototype, "group", void 0);
    tslib_1.__decorate([
        HostBinding('class.selected'),
        Input(),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], AccordionLinkDirective.prototype, "selected", null);
    AccordionLinkDirective = tslib_1.__decorate([
        Directive({
            selector: '[appAccordionLink]'
        }),
        tslib_1.__param(0, Inject(AccordionDirective)),
        tslib_1.__metadata("design:paramtypes", [AccordionDirective])
    ], AccordionLinkDirective);
    return AccordionLinkDirective;
}());
export { AccordionLinkDirective };
//# sourceMappingURL=accordionlink.directive.js.map