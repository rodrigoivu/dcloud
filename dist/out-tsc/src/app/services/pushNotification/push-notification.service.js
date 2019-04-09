import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
var PushNotificationService = /** @class */ (function () {
    function PushNotificationService(http) {
        this.http = http;
    }
    PushNotificationService.prototype.sendSubscriptionToTheServer = function (subscription) {
        var url = URL_SERVICIOS + 'push/subscription';
        console.log(url);
        return this.http.post(url, subscription);
    };
    PushNotificationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], PushNotificationService);
    return PushNotificationService;
}());
export { PushNotificationService };
//# sourceMappingURL=push-notification.service.js.map