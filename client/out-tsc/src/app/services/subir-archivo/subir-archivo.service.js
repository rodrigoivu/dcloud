import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
var SubirArchivoService = /** @class */ (function () {
    function SubirArchivoService() {
    }
    SubirArchivoService.prototype.subirArchivo = function (archivo, tipo, id, token) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append('image', archivo, archivo.name); //'image' es para esta parte en el back: var file_path = req.files.image.path;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) { // 4 : indica que ya se ejecutó
                    if (xhr.status === 200) { // 200: indica Status desde el servidor
                        resolve(JSON.parse(xhr.response)); //Aqui viene la respuesta de la consulta a la Api
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            var url;
            switch (tipo) {
                case 'usuario': {
                    url = URL_SERVICIOS + 'api/upload-image-user/' + id + '?token=' + token;
                    break;
                }
                case 'objeto': {
                    url = URL_SERVICIOS + 'api/upload-image-objeto/' + id + '?token=' + token;
                    break;
                }
                case 'persona': {
                    url = URL_SERVICIOS + 'api/upload-image-persona/' + id + '?token=' + token;
                    break;
                }
                case 'planta': {
                    url = URL_SERVICIOS + 'api/upload-image-configuracion/' + id + '?token=' + token;
                    break;
                }
                default: {
                    //url = URL_SERVICIOS + 'api/upload-image-user/' + id + '?token=' + token;  
                    break;
                }
            }
            xhr.open('PUT', url, true);
            xhr.send(formData);
        });
    };
    SubirArchivoService.prototype.adjuntarArchivo = function (archivo, tipo, id, token, profesionalProfesion) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append('archivo', archivo, archivo.name);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        //console.log('Imagen subida');
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            var url = URL_SERVICIOS + 'api/upload-pdf-paciente/' + id + '/' + tipo + '/' + profesionalProfesion + '?token=' + token;
            xhr.open('PUT', url, true);
            xhr.send(formData);
        });
    };
    SubirArchivoService.prototype.adjuntarArchivoXls = function (archivo, id, token, usuario) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append('archivo', archivo, archivo.name);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            var url = URL_SERVICIOS + 'api/upload-xls-pesquisa/' + id + '/' + usuario + '?token=' + token;
            xhr.open('PUT', url, true);
            xhr.send(formData);
        });
    };
    SubirArchivoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SubirArchivoService);
    return SubirArchivoService;
}());
export { SubirArchivoService };
//# sourceMappingURL=subir-archivo.service.js.map