import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert2';
var EventoentradaService = /** @class */ (function () {
    function EventoentradaService(http, router) {
        this.http = http;
        this.router = router;
        this.cargarStorage();
    }
    //CARGAR STORAGE
    EventoentradaService.prototype.cargarStorage = function () {
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
    EventoentradaService.prototype.itemsTodos = function () {
        var url = URL_SERVICIOS + 'api/eventoentrada-todos';
        url += '?token=' + this.token;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            swal(err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //TRAE RANGO FECHAS
    EventoentradaService.prototype.itemsRangoFechas = function (desde, hasta) {
        var desdeD = new Date(desde);
        var hastaD = new Date(hasta);
        hastaD.setHours(24);
        var url = URL_SERVICIOS + 'api/eventoentrada-rango-fechas';
        url += '?token=' + this.token + '&desde=' + desdeD + '&hasta=' + hastaD;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            // swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //TRAE RANGO ULTIMOS
    EventoentradaService.prototype.itemsRangoUltimos = function () {
        var items = 100;
        var url = URL_SERVICIOS + 'api/eventoentrada-rango-ultimos';
        url += '?token=' + this.token + '&items=' + items;
        return this.http.get(url)
            .pipe(
        // map( (resp: any) =>{ 
        //     var timeStamp: Date;
        //     var timeStamp1: Date;
        //     var arr:Eventoentrada[] = resp.items
        //     for (var i = 0; i < arr.length; ++i) {
        //       timeStamp1=new Date(arr[i].timestamp);
        //       timeStamp=new Date(timeStamp1.getFullYear(),timeStamp1.getMonth(),timeStamp1.getDate(),timeStamp1.getHours(),timeStamp1.getMinutes(),timeStamp1.getSeconds());
        //       arr[i].timestamp = timeStamp;
        //     }
        //     return arr;
        //   }),
        catchError(function (err) {
            // swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    EventoentradaService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Router])
    ], EventoentradaService);
    return EventoentradaService;
}());
export { EventoentradaService };
//# sourceMappingURL=eventoentrada.service.js.map