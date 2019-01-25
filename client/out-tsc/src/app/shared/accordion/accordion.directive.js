import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
var AccordionDirective = /** @class */ (function () {
    function AccordionDirective(router) {
        var _this = this;
        this.router = router;
        this.navlinks = [];
        setTimeout(function () { return _this.checkOpenLinks(); });
    }
    AccordionDirective.prototype.closeOtherLinks = function (selectedLink) {
        this.navlinks.forEach(function (link) {
            if (link !== selectedLink) {
                link.selected = false;
            }
        });
    };
    AccordionDirective.prototype.addLink = function (link) {
        this.navlinks.push(link);
    };
    AccordionDirective.prototype.removeGroup = function (link) {
        var index = this.navlinks.indexOf(link);
        if (index !== -1) {
            this.navlinks.splice(index, 1);
        }
    };
    AccordionDirective.prototype.checkOpenLinks = function () {
        var _this = this;
        this.navlinks.forEach(function (link) {
            if (link.group) {
                var routeUrl = _this.router.url;
                var currentUrl = routeUrl.split('/');
                if (currentUrl.indexOf(link.group) > 0) {
                    link.selected = true;
                    _this.closeOtherLinks(link);
                }
            }
        });
    };
    AccordionDirective.prototype.ngAfterContentChecked = function () {
        var _this = this;
        this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (e) { return _this.checkOpenLinks(); });
    };
    AccordionDirective = tslib_1.__decorate([
        Directive({
            selector: '[appAccordion]'
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], AccordionDirective);
    return AccordionDirective;
}());
export { AccordionDirective };
//# sourceMappingURL=accordion.directive.js.map