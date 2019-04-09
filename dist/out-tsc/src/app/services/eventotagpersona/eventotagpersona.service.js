import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
//import swal from 'sweetalert2';
var EventotagpersonaService = /** @class */ (function () {
    function EventotagpersonaService(http, router) {
        this.http = http;
        this.router = router;
        this.cargarStorage();
    }
    //CARGAR STORAGE
    EventotagpersonaService.prototype.cargarStorage = function () {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
        }
        else {
            this.token = '';
            this.usuario = null;
        }
    };
    //TRAE TODOS LOS ITEMS
    EventotagpersonaService.prototype.itemsTodos = function () {
        var url = URL_SERVICIOS + 'api/eventotagpersona-todos';
        url += '?token=' + this.token;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            return throwError(err);
        }));
    };
    //TRAE RANGO FECHAS
    EventotagpersonaService.prototype.itemsRangoFechas = function (desde, hasta) {
        var desdeD = new Date(desde);
        var hastaD = new Date(hasta);
        hastaD.setHours(24);
        var url = URL_SERVICIOS + 'api/eventotagpersona-rango-fechas';
        url += '?token=' + this.token + '&desde=' + desdeD + '&hasta=' + hastaD;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            return throwError(err);
        }));
    };
    //TRAE RANGO ULTIMOS
    EventotagpersonaService.prototype.itemsRangoUltimos = function () {
        var items = 1000;
        var url = URL_SERVICIOS + 'api/eventotagpersona-rango-ultimos';
        url += '?token=' + this.token + '&items=' + items;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            return throwError(err);
        }));
    };
    EventotagpersonaService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Router])
    ], EventotagpersonaService);
    return EventotagpersonaService;
}());
export { EventotagpersonaService };
//# sourceMappingURL=eventotagpersona.service.js.map