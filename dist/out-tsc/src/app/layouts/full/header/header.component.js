import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UsuarioService, WebsocketService, ElementocanvasService, ElementocanvasdiService, VariableinternacanvasService, PushNotificationService } from '../../../services/service.index';
import { SwPush } from '@angular/service-worker';
var VAPID_PUBLIC = 'BFlM7OmepGGDdZP7snr_L0FcFwlj9_24ikRRYUYY5WVxwVT1gpYZhGqPT14iZmXXveWtbfx3TXcGLeOT7sAFc6w';
var AppHeaderComponent = /** @class */ (function () {
    function AppHeaderComponent(_usuarioService, _websocketService, _elementocanvasService, _elementocanvasdiService, _variableinternacanvasService, swPush, pushService) {
        var _this = this;
        this._usuarioService = _usuarioService;
        this._websocketService = _websocketService;
        this._elementocanvasService = _elementocanvasService;
        this._elementocanvasdiService = _elementocanvasdiService;
        this._variableinternacanvasService = _variableinternacanvasService;
        this.title = 'angular-push-notifications';
        this.config = {};
        this.notificaciones = [];
        this.nuevaNotificacion = false;
        // This is for Notifications
        this.notifications = [
            {
                round: 'round-danger',
                icon: 'ti-link',
                title: 'Launch Admin',
                subject: 'Just see the my new admin!',
                time: '9:30 AM'
            },
            {
                round: 'round-success',
                icon: 'ti-calendar',
                title: 'Event today',
                subject: 'Just a reminder that you have event',
                time: '9:10 AM'
            },
            {
                round: 'round-info',
                icon: 'ti-settings',
                title: 'Settings',
                subject: 'You can customize this template as you want',
                time: '9:08 AM'
            },
            {
                round: 'round-primary',
                icon: 'ti-user',
                title: 'Pavan kumar',
                subject: 'Just see the my admin!',
                time: '9:00 AM'
            }
        ];
        //Recibe mensaje de entradas PLC por SOCKET IO
        this._websocketService.entradaPLCReceived().subscribe(function (data) {
            _this.nuevaNotificacion = true;
            _this.analizaNotificacion(data.sensor, data.evento);
            //console.log('observer');
            //console.log(data);
        });
        //Para suscribirse y permitir notificaciones
        if (swPush.isEnabled) {
            swPush
                .requestSubscription({
                serverPublicKey: VAPID_PUBLIC
            })
                .then(function (subscription) {
                //pushService.sendSubscriptionToTheServer(subscription).subscribe();
                pushService.sendSubscriptionToTheServer(subscription).subscribe();
            })
                .catch(console.error);
        }
    }
    AppHeaderComponent.prototype.ngOnInit = function () {
        this.usuario = this._usuarioService.usuario;
        var st1 = 'VI 24';
    };
    AppHeaderComponent.prototype.cancelarNotificacion = function (event, item) {
        this.nuevaNotificacion = false;
        this.notificaciones = [];
        //console.log(item);
    };
    AppHeaderComponent.prototype.analizaNotificacion = function (sensor, evento) {
        //Buscar Nombre
        var idEntrada = parseInt(sensor.slice(2));
        var tipoEntrada = sensor.slice(0, 2);
        if (tipoEntrada == 'AI') {
            this.getDatosElementoCanvas(idEntrada, evento);
        }
        if (tipoEntrada == 'DI') {
            this.getDatosElementoCanvasDi(idEntrada, evento);
        }
        if (tipoEntrada == 'VI') {
            this.getDatosVariableinternaCanvas(idEntrada, evento);
        }
    };
    AppHeaderComponent.prototype.agregaNotificacion = function (tipoEntrada, idEntrada, evento) {
        var noti;
        var my = new Date();
        var dia = my.getDate();
        var mes = my.getMonth() + 1;
        var ano = my.getFullYear();
        var hora;
        var min;
        var seg;
        //let fechaHoy:string =  dia+'-'+  mes + '-'+ ano;
        if (my.getHours() < 10) {
            hora = '0' + my.getHours();
        }
        else {
            hora = '' + my.getHours();
        }
        if (my.getMinutes() < 10) {
            min = '0' + my.getMinutes();
        }
        else {
            min = '' + my.getMinutes();
        }
        if (my.getSeconds() < 10) {
            seg = '0' + my.getSeconds();
        }
        else {
            seg = '' + my.getSeconds();
        }
        var hr = hora + " : " + min + " : " + seg;
        //Buscar Nombre
        var titulo = '';
        if (tipoEntrada == 'AI') {
            if (this.datosElementocanvas.length > 0) {
                titulo = this.datosElementocanvas[idEntrada - 1].name;
            }
            else {
                titulo = tipoEntrada + ' ' + idEntrada;
            }
        }
        if (tipoEntrada == 'DI') {
            if (this.datosElementocanvasDi.length > 0) {
                titulo = this.datosElementocanvasDi[idEntrada - 1].name;
            }
            else {
                titulo = tipoEntrada + ' ' + idEntrada;
            }
        }
        noti = {
            round: 'round-danger',
            //icon: 'ti-tag',
            icon: 'ti-alert',
            title: titulo,
            subject: evento,
            time: hr
        };
        this.notificaciones.unshift(noti);
    };
    AppHeaderComponent.prototype.getDatosElementoCanvas = function (idEntrada, evento) {
        var _this = this;
        var titulo;
        this._elementocanvasService.itemsTodos()
            .subscribe(function (resp) {
            _this.datosElementocanvas = resp.items;
            _this.agregaNotificacion('AI', idEntrada, evento);
        });
    };
    AppHeaderComponent.prototype.getDatosElementoCanvasDi = function (idEntrada, evento) {
        var _this = this;
        var titulo;
        this._elementocanvasdiService.itemsTodos()
            .subscribe(function (resp) {
            _this.datosElementocanvasDi = resp.items;
            _this.agregaNotificacion('DI', idEntrada, evento);
        });
    };
    AppHeaderComponent.prototype.getDatosVariableinternaCanvas = function (idEntrada, evento) {
        var _this = this;
        var titulo;
        this._variableinternacanvasService.itemsTodos()
            .subscribe(function (resp) {
            _this.datosVariableinternacanvas = resp.items;
            _this.agregaNotificacion('VI', idEntrada, evento);
        });
    };
    AppHeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: []
        }),
        tslib_1.__metadata("design:paramtypes", [UsuarioService,
            WebsocketService,
            ElementocanvasService,
            ElementocanvasdiService,
            VariableinternacanvasService,
            SwPush,
            PushNotificationService])
    ], AppHeaderComponent);
    return AppHeaderComponent;
}());
export { AppHeaderComponent };
//# sourceMappingURL=header.component.js.map