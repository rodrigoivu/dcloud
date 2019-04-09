import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert2';
var ConfiguracionService = /** @class */ (function () {
    function ConfiguracionService(http, router, _subirArchivoService) {
        this.http = http;
        this.router = router;
        this._subirArchivoService = _subirArchivoService;
        this.cargarStorage();
    }
    //CARGAR STORAGE
    ConfiguracionService.prototype.cargarStorage = function () {
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
    ConfiguracionService.prototype.registraItem = function (item) {
        var url = URL_SERVICIOS + 'api/registra-configuracion';
        url += '?token=' + this.token;
        return this.http.post(url, item)
            .pipe(map(function (resp) {
            swal('Configuracion creada', 'Imagen: ' + item.image, 'success');
            return resp.item;
        }), catchError(function (err) {
            swal(err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //ACTUALIZAR ITEM
    ConfiguracionService.prototype.actualizarItem = function (item) {
        var url = URL_SERVICIOS + 'api/actualiza-configuracion/' + item._id;
        url += '?token=' + this.token;
        return this.http.put(url, item)
            .pipe(map(function (resp) {
            // swal( 'Item '+ tag+' actualizado','Asignado a: '+destino, 'success');
            return resp.item;
        }), catchError(function (err) {
            // swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //TRAE EL ULTIMO
    ConfiguracionService.prototype.itemUltimo = function () {
        var url = URL_SERVICIOS + 'api/configuracion-ultimo';
        url += '?token=' + this.token;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            // swal( err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    //CAMBIAR IMAGEN
    ConfiguracionService.prototype.cambiarImagen = function (archivo, id) {
        this._subirArchivoService.subirArchivo(archivo, 'planta', id, this.token)
            .then(function (resp) {
            swal('Archivo cargado', archivo.name, 'success');
        })
            .catch(function (resp) {
            console.log(resp);
        });
    };
    ConfiguracionService.prototype.guardarImagenLogo = function (archivo, id) {
        this._subirArchivoService.subirArchivo(archivo, 'imgLogo', id, this.token)
            .then(function (resp) {
            swal('Imagen de Logo cargado', archivo.name, 'success');
        })
            .catch(function (resp) {
            console.log(resp);
        });
    };
    ConfiguracionService.prototype.guardarImagenCorporativa = function (archivo, id) {
        this._subirArchivoService.subirArchivo(archivo, 'imgCorporativa', id, this.token)
            .then(function (resp) {
            swal('Imagen Corporativa cargada', archivo.name, 'success');
        })
            .catch(function (resp) {
            console.log(resp);
        });
    };
    ConfiguracionService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Router,
            SubirArchivoService])
    ], ConfiguracionService);
    return ConfiguracionService;
}());
export { ConfiguracionService };
//# sourceMappingURL=configuracion.service.js.map