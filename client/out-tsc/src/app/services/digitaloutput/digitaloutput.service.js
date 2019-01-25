import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert2';
var DigitaloutputService = /** @class */ (function () {
    function DigitaloutputService(http, router) {
        this.http = http;
        this.router = router;
        this.cargarStorage();
    }
    //CARGAR STORAGE
    DigitaloutputService.prototype.cargarStorage = function () {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
        }
        else {
            this.token = '';
            this.usuario = null;
        }
    };
    //CREAR ITEM
    DigitaloutputService.prototype.registraItem = function (item) {
        var url = URL_SERVICIOS + 'api/registra-digitaloutput';
        url += '?token=' + this.token;
        return this.http.post(url, item)
            .pipe(map(function (resp) {
            // swal( 'Item '+ item.name+' creado','', 'success');
            return resp.item;
        }), catchError(function (err) {
            // swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //ACTUALIZAR ITEM
    DigitaloutputService.prototype.actualizarItem = function (item) {
        var url = URL_SERVICIOS + 'api/actualiza-digitaloutput/' + item._id;
        url += '?token=' + this.token;
        return this.http.put(url, item)
            .pipe(map(function (resp) {
            // swal( 'Item '+ tag+' actualizado','Asignado a: '+destino, 'success');
            return resp.user;
        }), catchError(function (err) {
            // swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //TRAE TODOS LOS ITEMS
    DigitaloutputService.prototype.itemsTodos = function () {
        var url = URL_SERVICIOS + 'api/digitaloutput-todos';
        url += '?token=' + this.token;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            swal(err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //BORRA ITEM
    DigitaloutputService.prototype.borraItem = function (id) {
        var url = URL_SERVICIOS + 'api/borra-digitaloutput/' + id;
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
    DigitaloutputService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Router])
    ], DigitaloutputService);
    return DigitaloutputService;
}());
export { DigitaloutputService };
//# sourceMappingURL=digitaloutput.service.js.map