import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { URL_SERVICIOS } from '../../config/config';
var WebsocketService = /** @class */ (function () {
    function WebsocketService() {
        this.socket = io(URL_SERVICIOS);
    }
    WebsocketService.prototype.sendMessage = function (data) {
        this.socket.emit('recibeOrden', data);
    };
    WebsocketService.prototype.entradaPLCReceived = function () {
        var _this = this;
        var observable = new Observable(function (observer) {
            _this.socket.on('Entradas PLC', function (data) {
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    WebsocketService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], WebsocketService);
    return WebsocketService;
}());
export { WebsocketService };
//# sourceMappingURL=websocket.service.js.map