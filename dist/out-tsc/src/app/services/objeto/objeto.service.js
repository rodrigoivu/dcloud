import * as tslib_1 from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
//import swal from 'sweetalert2';
var ObjetoService = /** @class */ (function () {
    //imagenObjetoSubida: string='';
    function ObjetoService(http, router, _subirArchivoService) {
        this.http = http;
        this.router = router;
        this._subirArchivoService = _subirArchivoService;
        this.notificacionImagenObjetoSubida = new EventEmitter();
        this.cargarStorage();
    }
    //CARGAR STORAGE
    ObjetoService.prototype.cargarStorage = function () {
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
    ObjetoService.prototype.registraItem = function (item) {
        var url = URL_SERVICIOS + 'api/registra-objeto';
        url += '?token=' + this.token;
        return this.http.post(url, item)
            .pipe(map(function (resp) {
            //swal( 'Item '+ item.tipo+' creado', item.descripcion, 'success');
            return resp.item;
        }), catchError(function (err) {
            // swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //ACTUALIZAR ITEM
    ObjetoService.prototype.actualizarItem = function (item, tipo, descripcion) {
        var url = URL_SERVICIOS + 'api/actualiza-objeto/' + item._id;
        url += '?token=' + this.token;
        return this.http.put(url, item)
            .pipe(map(function (resp) {
            //swal( 'Item '+ tipo+' actualizado',descripcion, 'success');
            return resp.user;
        }), catchError(function (err) {
            //swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //TRAE TODOS LOS ITEMS
    ObjetoService.prototype.itemsTodos = function () {
        var url = URL_SERVICIOS + 'api/objeto-todos' + '?token=' + this.token;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            //swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //GUARDAR IMAGEN
    ObjetoService.prototype.cambiarImagen = function (archivo, id) {
        var _this = this;
        //Consulta viene de un Promise
        this._subirArchivoService.subirArchivo(archivo, 'objeto', id, this.token)
            .then(function (resp) {
            // swal('Archivo cargado',archivo.name, 'success');
            //this.imagenObjetoSubida=resp.image;
            _this.notificacionImagenObjetoSubida.emit(resp.image);
        })
            .catch(function (resp) {
            console.log(resp);
        });
    };
    ObjetoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Router,
            SubirArchivoService])
    ], ObjetoService);
    return ObjetoService;
}());
export { ObjetoService };
//# sourceMappingURL=objeto.service.js.map