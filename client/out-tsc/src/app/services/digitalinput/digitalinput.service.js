import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert2';
var DigitalinputService = /** @class */ (function () {
    function DigitalinputService(http, router) {
        this.http = http;
        this.router = router;
        this.cargarStorage();
    }
    //CARGAR STORAGE
    DigitalinputService.prototype.cargarStorage = function () {
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
    DigitalinputService.prototype.itemsTodos = function () {
        var url = URL_SERVICIOS + 'api/digitalinput-todos';
        url += '?token=' + this.token;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            swal(err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //TRAE RANGO FECHAS
    DigitalinputService.prototype.itemsRangoFechas = function (desde, hasta) {
        var desdeD = new Date(desde);
        var hastaD = new Date(hasta);
        hastaD.setHours(24);
        var url = URL_SERVICIOS + 'api/digitalinput-rango-fechas';
        url += '?token=' + this.token + '&desde=' + desdeD + '&hasta=' + hastaD;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            // swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //TRAE el ultimo
    DigitalinputService.prototype.itemUltimo = function () {
        var url = URL_SERVICIOS + 'api/digitalinput-ultimo';
        url += '?token=' + this.token;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            // swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //BORRA ITEM
    DigitalinputService.prototype.borraItem = function (id) {
        var url = URL_SERVICIOS + 'api/borra-digitalinput/' + id;
        url += '?token=' + this.token;
        return this.http.delete(url)
            .pipe(map(function (resp) {
            // if(verMsj){
            //   swal( 'Item borrado','Tag: ' + resp.item.tag, 'success');
            // }
            return resp.item;
        }), catchError(function (err) {
            swal(err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    DigitalinputService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Router])
    ], DigitalinputService);
    return DigitalinputService;
}());
export { DigitalinputService };
//# sourceMappingURL=digitalinput.service.js.map