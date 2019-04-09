import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { MESSAGES } from './mock-messages';
var MailService = /** @class */ (function () {
    function MailService() {
    }
    MailService.prototype.getMessages = function () {
        return Promise.resolve(MESSAGES);
    };
    MailService = tslib_1.__decorate([
        Injectable()
    ], MailService);
    return MailService;
}());
export { MailService };
//# sourceMappingURL=mail.service.js.map