import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { URL_SERVICIOS } from '../../config/config';
var socket = io(URL_SERVICIOS, {
    secure: true,
    rejectUnauthorized: false,
    path: '/evento/socket.io'
});
var WebsocketService = /** @class */ (function () {
    // private socket = io(URL_SERVICIOS);
    function WebsocketService() {
        //tambien funciona de esta forma
        // socket.on('evento', (data) => {
        //     //console.log('socket evento:' + data);
        //   });
    }
    WebsocketService.prototype.sendMessage = function (data) {
        socket.emit('recibeOrden', data);
    };
    WebsocketService.prototype.entradaPLCReceived = function () {
        var observable = new Observable(function (observer) {
            socket.on('evento', function (data) {
                observer.next(data);
            });
            return function () {
                socket.disconnect();
            };
        });
        return observable;
    };
    WebsocketService.prototype.recibeTag = function () {
        var observable = new Observable(function (observer) {
            socket.on('Tag', function (data) {
                observer.next(data);
            });
            return function () {
                socket.disconnect();
            };
        });
        return observable;
    };
    WebsocketService.prototype.recibeAI = function () {
        var observable = new Observable(function (observer) {
            socket.on('AI', function (data) {
                observer.next(data);
            });
            return function () {
                socket.disconnect();
            };
        });
        return observable;
    };
    WebsocketService.prototype.recibeDI = function () {
        var observable = new Observable(function (observer) {
            socket.on('DI', function (data) {
                observer.next(data);
            });
            return function () {
                socket.disconnect();
            };
        });
        return observable;
    };
    WebsocketService.prototype.recibeDO = function () {
        var observable = new Observable(function (observer) {
            socket.on('DO', function (data) {
                observer.next(data);
            });
            return function () {
                socket.disconnect();
            };
        });
        return observable;
    };
    WebsocketService.prototype.recibeAO1 = function () {
        var observable = new Observable(function (observer) {
            socket.on('AO1', function (data) {
                observer.next(data);
            });
            return function () {
                socket.disconnect();
            };
        });
        return observable;
    };
    WebsocketService.prototype.recibeAO2 = function () {
        var observable = new Observable(function (observer) {
            socket.on('AO2', function (data) {
                observer.next(data);
            });
            return function () {
                socket.disconnect();
            };
        });
        return observable;
    };
    WebsocketService.prototype.recibeAO3 = function () {
        var observable = new Observable(function (observer) {
            socket.on('AO3', function (data) {
                observer.next(data);
            });
            return function () {
                socket.disconnect();
            };
        });
        return observable;
    };
    WebsocketService.prototype.recibeVI = function () {
        var observable = new Observable(function (observer) {
            socket.on('VI', function (data) {
                observer.next(data);
            });
            return function () {
                socket.disconnect();
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