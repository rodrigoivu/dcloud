import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert2';
var TagobjetoService = /** @class */ (function () {
    function TagobjetoService(http, router) {
        this.http = http;
        this.router = router;
        this.cargarStorage();
    }
    //CARGAR STORAGE
    TagobjetoService.prototype.cargarStorage = function () {
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
    TagobjetoService.prototype.registraItem = function (item) {
        var url = URL_SERVICIOS + 'api/registra-tagobjeto';
        url += '?token=' + this.token;
        return this.http.post(url, item)
            .pipe(map(function (resp) {
            swal('Objeto creado', 'Tag: ' + item.tag, 'success');
            return resp.item;
        }), catchError(function (err) {
            swal(err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //ACTUALIZAR ITEM
    TagobjetoService.prototype.actualizarItem = function (item, tag) {
        var url = URL_SERVICIOS + 'api/actualiza-tagobjeto/' + item._id;
        url += '?token=' + this.token;
        return this.http.put(url, item)
            .pipe(map(function (resp) {
            swal('Objeto actualizado', 'Tag: ' + tag, 'success');
            return resp.user;
        }), catchError(function (err) {
            swal(err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //TRAE TODOS LOS ITEMS
    TagobjetoService.prototype.itemsTodos = function () {
        var url = URL_SERVICIOS + 'api/tagobjeto-todos' + '?token=' + this.token;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            swal(err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    TagobjetoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Router])
    ], TagobjetoService);
    return TagobjetoService;
}());
export { TagobjetoService };
//# sourceMappingURL=tagobjeto.service.js.map