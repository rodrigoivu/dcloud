import * as tslib_1 from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert2';
var PersonaService = /** @class */ (function () {
    function PersonaService(http, router, _subirArchivoService) {
        this.http = http;
        this.router = router;
        this._subirArchivoService = _subirArchivoService;
        this.notificacionImagenPersonaSubida = new EventEmitter();
        this.cargarStorage();
    }
    //CARGAR STORAGE
    PersonaService.prototype.cargarStorage = function () {
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
    PersonaService.prototype.registraItem = function (item) {
        var url = URL_SERVICIOS + 'api/registra-persona';
        url += '?token=' + this.token;
        return this.http.post(url, item)
            .pipe(map(function (resp) {
            swal('Persona creada', 'Nombre: ' + item.nombre, 'success');
            return resp.item;
        }), catchError(function (err) {
            swal(err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //ACTUALIZAR ITEM
    PersonaService.prototype.actualizarItem = function (item) {
        var url = URL_SERVICIOS + 'api/actualiza-persona/' + item._id;
        url += '?token=' + this.token;
        return this.http.put(url, item)
            .pipe(map(function (resp) {
            swal('Persona actualizada', 'Nombre: ' + item.nombre, 'success');
            return resp.user;
        }), catchError(function (err) {
            swal(err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //TRAE TODOS LOS ITEMS
    PersonaService.prototype.itemsTodos = function () {
        var url = URL_SERVICIOS + 'api/persona-todos' + '?token=' + this.token;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            swal(err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //GUARDAR IMAGEN
    PersonaService.prototype.cambiarImagen = function (archivo, id) {
        var _this = this;
        //Consulta viene de un Promise
        this._subirArchivoService.subirArchivo(archivo, 'persona', id, this.token)
            .then(function (resp) {
            swal('Archivo cargado', archivo.name, 'success');
            _this.notificacionImagenPersonaSubida.emit(resp.image);
        })
            .catch(function (resp) {
            console.log(resp);
        });
    };
    PersonaService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Router,
            SubirArchivoService])
    ], PersonaService);
    return PersonaService;
}());
export { PersonaService };
//# sourceMappingURL=persona.service.js.map