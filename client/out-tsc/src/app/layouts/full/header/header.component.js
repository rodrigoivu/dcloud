import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UsuarioService, WebsocketService } from '../../../services/service.index';
var AppHeaderComponent = /** @class */ (function () {
    function AppHeaderComponent(_usuarioService, _websocketService) {
        //Recibe mensaje de entradas PLC
        // this._websocketService.entradaPLCReceived().subscribe(data => {
        //   console.log(data);
        //   if(data.tag == 'nuevo tag'){
        //     this.nuevaNotificacion=true;
        //     this.agregarNotificacion(data.topic,data.tag);
        //   }
        // });
        this._usuarioService = _usuarioService;
        this._websocketService = _websocketService;
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
    }
    AppHeaderComponent.prototype.ngOnInit = function () {
        this.usuario = this._usuarioService.usuario;
    };
    AppHeaderComponent.prototype.cancelarNotificacion = function () {
        this.nuevaNotificacion = false;
    };
    AppHeaderComponent.prototype.agregarNotificacion = function (topic, message) {
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
        noti = {
            round: 'round-danger',
            icon: 'ti-tag',
            title: 'Nuevo Tag desde: ' + topic,
            subject: 'Asignar Tag en configuracion...',
            time: hr
        };
        this.notificaciones.push(noti);
    };
    AppHeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: []
        }),
        tslib_1.__metadata("design:paramtypes", [UsuarioService,
            WebsocketService])
    ], AppHeaderComponent);
    return AppHeaderComponent;
}());
export { AppHeaderComponent };
//# sourceMappingURL=header.component.js.map