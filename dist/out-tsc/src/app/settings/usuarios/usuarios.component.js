import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UsuarioService } from '../../services/service.index';
var UsuariosComponent = /** @class */ (function () {
    function UsuariosComponent(_usuarioService) {
        this._usuarioService = _usuarioService;
        this.usuarios = [];
        // private image: string;
        // private name: string;
        // private email: string;
        // private role: string;
        this.isLoadingResults = true;
        this.isRateLimitReached = false;
        this.displayedColumns = ['image', 'name', 'email', 'role', '_id'];
        this.selection = new SelectionModel(true, []); //esto es para detectar el item seleccionado
    }
    UsuariosComponent.prototype.ngOnInit = function () {
        this.cargarUsuariosTodos();
        this.idUsuarioLogeado = this._usuarioService.usuario._id;
    };
    UsuariosComponent.prototype.ngAfterViewInit = function () { };
    UsuariosComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    UsuariosComponent.prototype.cargarUsuariosTodos = function () {
        var _this = this;
        this.isLoadingResults = true;
        this._usuarioService.usuariosTodos()
            .subscribe(function (resp) {
            _this.usuarios = resp.users;
            _this.isLoadingResults = false;
            _this.dataSource = new MatTableDataSource(_this.usuarios);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    UsuariosComponent.prototype.borrarUsuario = function (id) {
    };
    UsuariosComponent.prototype.guardarUsuario = function (row) {
        this._usuarioService.actualizarUsuario(row)
            .subscribe();
    };
    UsuariosComponent.prototype.cancelarUsuario = function () {
        this.cargarUsuariosTodos();
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], UsuariosComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], UsuariosComponent.prototype, "sort", void 0);
    UsuariosComponent = tslib_1.__decorate([
        Component({
            selector: 'app-usuarios',
            templateUrl: './usuarios.component.html',
            styleUrls: ['./usuarios.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [UsuarioService])
    ], UsuariosComponent);
    return UsuariosComponent;
}());
export { UsuariosComponent };
//# sourceMappingURL=usuarios.component.js.map