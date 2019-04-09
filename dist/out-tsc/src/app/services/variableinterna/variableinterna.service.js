import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert2';
var VariableinternaService = /** @class */ (function () {
    function VariableinternaService(
    // public _usuarioService:UsuarioService,
    http, router) {
        this.http = http;
        this.router = router;
        this.cargarStorage();
    }
    //CARGAR STORAGE
    VariableinternaService.prototype.cargarStorage = function () {
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
    VariableinternaService.prototype.itemsTodos = function () {
        var url = URL_SERVICIOS + 'api/variableinterna-todos';
        url += '?token=' + this.token;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            //swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //TRAE RANGO TIEMPO REAL
    VariableinternaService.prototype.itemsRangoTiempoReal = function () {
        var items = 400;
        var url = URL_SERVICIOS + 'api/variableinterna-rango-tiempo-real';
        url += '?token=' + this.token + '&items=' + items;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            // swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //TRAE RANGO FECHAS
    VariableinternaService.prototype.itemsRangoFechas = function (desde, hasta) {
        var desdeD = new Date(desde);
        var hastaD = new Date(hasta);
        hastaD.setHours(24);
        var url = URL_SERVICIOS + 'api/variableinterna-rango-fechas';
        url += '?token=' + this.token + '&desde=' + desdeD + '&hasta=' + hastaD;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            // swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //TRAE RANGO TIEMPO REAL
    VariableinternaService.prototype.itemUno = function () {
        var items = 1;
        var url = URL_SERVICIOS + 'api/variableinterna-rango-tiempo-real';
        url += '?token=' + this.token + '&items=' + items;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            // swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //BORRA ITEM
    VariableinternaService.prototype.borraItem = function (id) {
        var url = URL_SERVICIOS + 'api/borra-variableinterna/' + id;
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
    VariableinternaService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Router])
    ], VariableinternaService);
    return VariableinternaService;
}());
export { VariableinternaService };
//# sourceMappingURL=variableinterna.service.js.map