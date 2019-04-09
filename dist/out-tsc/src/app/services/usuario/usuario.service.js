import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert2';
var UsuarioService = /** @class */ (function () {
    function UsuarioService(http, router, _subirArchivoService) {
        this.http = http;
        this.router = router;
        this._subirArchivoService = _subirArchivoService;
        this.estadoConexionServidor = false;
        this.estadoConexionPlc = false;
        this.cargarStorage();
    }
    UsuarioService.prototype.renuevaToken = function () {
        var _this = this;
        var url = URL_SERVICIOS + 'api/renuevaToken/' + '?token=' + this.token;
        return this.http.get(url)
            .pipe(map(function (resp) {
            _this.token = resp.token;
            localStorage.setItem('token', _this.token);
            //console.log('Token renovado');
            return true;
        }), catchError(function (err) {
            _this.router.navigate(['/authentication/login']);
            swal('No se pudo renovar token', 'No fue posible renovar token', 'error');
            return throwError(err);
        }));
    };
    UsuarioService.prototype.estaLogueado = function () {
        return (this.token.length > 5) ? true : false;
    };
    //CARGAR STORAGE
    UsuarioService.prototype.cargarStorage = function () {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
        }
        else {
            this.token = '';
            this.usuario = null;
        }
    };
    //GUARDAR STORAGE
    UsuarioService.prototype.guardarStorage = function (id, token, usuario) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.usuario = usuario;
        this.token = token;
    };
    //INICIO
    UsuarioService.prototype.noAutorizado = function () {
        swal('No Autorizado', 'No tiene atribuciones para ingresar a esta sección', 'error');
        this.router.navigate(['/']);
    };
    //LOGOUT
    UsuarioService.prototype.logout = function () {
        this.usuario = null;
        this.token = '';
        localStorage.removeItem('id');
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        this.router.navigate(['/authentication/login']);
    };
    //SERVICIO LOGIN
    UsuarioService.prototype.login = function (usuario, recordar, gethash) {
        var _this = this;
        if (recordar === void 0) { recordar = false; }
        if (gethash === void 0) { gethash = null; }
        if (recordar) {
            localStorage.setItem('email', usuario.email);
        }
        else {
            localStorage.removeItem('email');
        }
        if (gethash != null) {
            usuario.gethash = gethash; // de esta forma agregamos otro item a la variable usuario de tipo User
        }
        var url = URL_SERVICIOS + 'api/login';
        return this.http.post(url, usuario) //el segundo parámetro (usuario) es el que se envia como body(raw o x-www-form-urlencoded)
            .pipe(map(function (resp) {
            _this.guardarStorage(resp.id, resp.token, resp.user);
            return true; //se puede retornar cualquier cosa si no se pone no llega nada como respuesta a la funcion que lo llama
        }), catchError(function (err) {
            swal({
                type: 'error',
                title: 'Error en el login',
                text: err.error.message
            });
            return throwError(err);
        }));
    };
    //SERVICIO CREAR USUARIO
    UsuarioService.prototype.registraUsuario = function (usuario) {
        var url = URL_SERVICIOS + 'api/registra-usuario';
        return this.http.post(url, usuario)
            .pipe(map(function (resp) {
            swal('Usuario creado', usuario.email, 'success');
            return resp.user;
        }), catchError(function (err) {
            swal(err.error.message, err.error.error.message, 'error');
            return throwError(err);
        }));
    };
    //BUSCAR USUARIO POR EMAIL
    UsuarioService.prototype.buscaPorMail = function (email) {
        var url = URL_SERVICIOS + 'api/busca-por-mail/' + email;
        return this.http.get(url)
            .pipe(map(function (resp) {
            //swal( 'Email enviado a:', resp.user.name, 'success');
            return resp; //se puede retornar cualquier cosa si no se pone no llega nada como respuesta a la funcion que lo llama
        }), catchError(function (err) {
            swal('Usuario no se encuentra en nuestros registros', err.error.message, 'error');
            return throwError(err);
        }));
    };
    //BUSCAR USUARIO POR ID
    UsuarioService.prototype.buscaPorId = function (id) {
        var _this = this;
        var url = URL_SERVICIOS + 'api/busca-por-id/' + id;
        return this.http.get(url)
            .pipe(map(function (resp) {
            return resp; //se puede retornar cualquier cosa si no se pone no llega nada como respuesta a la funcion que lo llama
        }), catchError(function (err) {
            _this.router.navigate(['/authentication/404']);
            return throwError(err);
        }));
    };
    UsuarioService.prototype.sendMail = function (usuario) {
        var url = URL_SERVICIOS + 'api/sendmail';
        var datos = {
            id: usuario._id,
            nombre: usuario.name,
            email: usuario.email
        };
        return this.http.post(url, datos)
            .pipe(map(function (resp) {
            swal('Email enviado a:', resp.email, 'success');
            return resp.user;
        }), catchError(function (err) {
            swal(err.error.message, err.error.error.message, 'error');
            return throwError(err);
        }));
    };
    UsuarioService.prototype.actualizarUsuarioPassword = function (usuario) {
        var url = URL_SERVICIOS + 'api/update-user-password/' + usuario._id;
        return this.http.put(url, usuario)
            .pipe(map(function (resp) {
            swal('Contraseña cambiada correctamete', usuario.name, 'success');
            return resp.user;
        }), catchError(function (err) {
            swal(err.error.message, err.error.error.message, 'error');
            return throwError(err);
        }));
    };
    UsuarioService.prototype.usuariosPaginados = function (desde, items, orden) {
        if (desde === void 0) { desde = 0; }
        if (items === void 0) { items = 10; }
        if (orden === void 0) { orden = 1; }
        var url = URL_SERVICIOS + 'api/usuarios-paginados' + '?token=' + this.token + '&desde=' + desde + '&items=' + items + '&orden=' + orden;
        return this.http.get(url);
    };
    UsuarioService.prototype.usuariosTodos = function () {
        var url = URL_SERVICIOS + 'api/usuarios-todos' + '?token=' + this.token;
        return this.http.get(url)
            .pipe(catchError(function (err) {
            swal(err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    UsuarioService.prototype.actualizarUsuario = function (usuario) {
        var _this = this;
        var url = URL_SERVICIOS + 'api/update-user/' + usuario._id;
        url += '?token=' + this.token;
        return this.http.put(url, usuario)
            .pipe(map(function (resp) {
            if (usuario._id === _this.usuario._id) { // esta función se llama desde el perfil donde es el mismo usuario y se guarda en el storage. Y se llama de la lista de usuarios en mantenimiento, donde el mismo usuario no deberia entrar
                var usuarioDB = resp.user;
                _this.guardarStorage(usuarioDB._id, resp.token, usuarioDB);
            }
            swal('Usuario actualizado', usuario.name, 'success');
            return resp.user;
        }), catchError(function (err) {
            swal(err.statusText, err.error.message, 'error');
            return throwError(err);
        }));
    };
    UsuarioService.prototype.cambiarImagen = function (archivo, id) {
        var _this = this;
        this._subirArchivoService.subirArchivo(archivo, 'usuario', id, this.token)
            .then(function (resp) {
            _this.usuario.image = resp.image;
            swal('Archivo cargado', _this.usuario.name, 'success');
            _this.guardarStorage(id, _this.token, _this.usuario);
        })
            .catch(function (resp) {
            console.log(resp);
        });
    };
    UsuarioService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Router,
            SubirArchivoService])
    ], UsuarioService);
    return UsuarioService;
}());
export { UsuarioService };
//# sourceMappingURL=usuario.service.js.map