import * as tslib_1 from "tslib";
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ObjetoService } from '../../services/service.index';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
var EditaobjetoComponent = /** @class */ (function () {
    function EditaobjetoComponent(_objetoservice, fb, cd) {
        var _this = this;
        this._objetoservice = _objetoservice;
        this.fb = fb;
        this.cd = cd;
        this.isLoadingResults = true;
        this.isRateLimitReached = false;
        this.displayedColumns = ['imagen', 'tipo', 'descripcion', 'info', 'disciplina', 'categoria', 'grupo', 'stockmin', 'stock', '_id'];
        this.selection = new SelectionModel(true, []); //esto es para detectar el item seleccionado
        this.objetoId = '';
        this.objetoImg = '';
        this.actualizando = false; //para que aparezcan las opciones para actualizar
        this.creado = false; // para que aparezcal las opciones de crear
        // Al cambiar imagen del objeto recien creado retorna el nombre de la imagen guardada
        this._objetoservice.notificacionImagenObjetoSubida
            .subscribe(function (resp) {
            _this.cargarObjetosTodos();
            _this.cancelar();
        });
    }
    EditaobjetoComponent.prototype.ngOnInit = function () {
        this.inicializaFormObjeto();
        this.cargarObjetosTodos();
    };
    EditaobjetoComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    EditaobjetoComponent.prototype.inicializaFormObjeto = function () {
        //FORMULARIO DATOS HERRAMIENTAS Y REPUESTOS
        this.formDatosObjeto = this.fb.group({
            tipo: new FormControl(null, Validators.required),
            descripcion: new FormControl('', Validators.required),
            info: new FormControl({ value: null, disabled: false }),
            disciplina: new FormControl({ value: null, disabled: false }),
            categoria: new FormControl({ value: null, disabled: false }),
            grupo: new FormControl({ value: null, disabled: false }),
            stockmin: new FormControl({ value: null, disabled: false }),
            stock: new FormControl({ value: null, disabled: true }),
            imagen: new FormControl({ value: null, disabled: true }),
        });
        //FORMULARIO IMAGEN HERRAMIENTAS Y REPUESTOS
        this.formImagenObjeto = this.fb.group({
            file: [null, Validators.compose([Validators.required])]
        });
    };
    EditaobjetoComponent.prototype.setFormObjeto = function (objeto) {
        this.formDatosObjeto.setValue({
            tipo: objeto.tipo,
            descripcion: objeto.descripcion,
            info: objeto.info,
            disciplina: objeto.disciplina,
            categoria: objeto.categoria,
            grupo: objeto.grupo,
            stockmin: objeto.stockmin,
            stock: objeto.stock,
            imagen: objeto.imagen
        });
    };
    // Obtine datos para llenar tabla
    EditaobjetoComponent.prototype.cargarObjetosTodos = function () {
        var _this = this;
        this.isLoadingResults = true;
        this._objetoservice.itemsTodos()
            .subscribe(function (resp) {
            _this.objetos = resp.items;
            _this.isLoadingResults = false;
            _this.dataSource = new MatTableDataSource(_this.objetos);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    EditaobjetoComponent.prototype.seleccionImage = function (archivo) {
        var _this = this;
        if (!archivo) {
            this.imagenSubir = null;
            return;
        }
        if (archivo.type.indexOf('image') < 0) {
            swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
            this.imagenSubir = null;
            return;
        }
        this.imagenSubir = archivo;
        var reader = new FileReader();
        var urlImagenTemp = reader.readAsDataURL(archivo);
        // reader.onloadend =() => this.imagenTemp = reader.result;
        reader.onload = function () {
            _this.formImagenObjeto.patchValue({
                file: reader.result
            });
            _this.imagenTemp = reader.result;
            _this.cd.markForCheck();
        };
    };
    EditaobjetoComponent.prototype.crearObjeto = function () {
        var _this = this;
        var objetoCrear = this.formDatosObjeto.getRawValue(); // obtiene todos hasta los deshabilitados
        if (!objetoCrear.stock || objetoCrear.stock == '') {
            objetoCrear.stock = '0';
        }
        if (!objetoCrear.stockmin || objetoCrear.stockmin == '') {
            objetoCrear.stockmin = '0';
        }
        //let objetoCrear: Objeto=this.formDatosObjeto.value; // obtiene solo los habilitados
        this._objetoservice.registraItem(objetoCrear)
            .subscribe(function (resp) {
            _this.objetoId = resp._id;
            _this.cargarObjetosTodos();
            _this.creado = true;
            _this.actualizando = true;
            _this.formDatosObjeto.controls['tipo'].disable();
            _this.formDatosObjeto.controls['descripcion'].disable();
        });
    };
    //CREA NUEVO OBJETO
    EditaobjetoComponent.prototype.onSubmit = function () {
        this.actualizando ?
            this.actualizarObjeto() :
            this.crearObjeto();
    };
    //ACTUALIZA OBJETO DE LA LISTA
    EditaobjetoComponent.prototype.actualizarObjeto = function () {
        var _this = this;
        var objetoActualizar = this.formDatosObjeto.value; // obtiene solo los habilitados
        if (!objetoActualizar.stock || objetoActualizar.stock == '') {
            objetoActualizar.stock = '0';
        }
        if (!objetoActualizar.stockmin || objetoActualizar.stockmin == '') {
            objetoActualizar.stockmin = '0';
        }
        objetoActualizar._id = this.objetoId; //Se agrega el _id
        this._objetoservice.actualizarItem(objetoActualizar, this.formDatosObjeto.getRawValue().tipo, this.formDatosObjeto.getRawValue().descripcion)
            .subscribe(function (resp) {
            _this.cargarObjetosTodos();
            _this.cancelar();
        });
    };
    EditaobjetoComponent.prototype.cancelarActualizarCrear = function () {
        this.cancelar();
    };
    //SUBE IMAGEN DE OBJETO
    EditaobjetoComponent.prototype.cambiarImagen = function () {
        if (this.imagenSubir && this.objetoId) {
            this._objetoservice.cambiarImagen(this.imagenSubir, this.objetoId);
        }
    };
    EditaobjetoComponent.prototype.borrarObjeto = function (id) {
    };
    EditaobjetoComponent.prototype.editarObjeto = function (row) {
        var _this = this;
        this.dataSource.data.forEach(function (rowi) { return _this.selection.deselect(rowi); });
        this.selection.select(row);
        this.setFormObjeto(row);
        this.actualizando = true;
        this.formDatosObjeto.controls['tipo'].disable();
        this.formDatosObjeto.controls['descripcion'].disable();
        this.objetoImg = row.imagen;
        this.objetoId = row._id;
    };
    EditaobjetoComponent.prototype.cancelarEditar = function () {
        this.cancelar();
    };
    EditaobjetoComponent.prototype.cancelar = function () {
        var _this = this;
        this.formDatosObjeto.reset();
        this.formImagenObjeto.reset();
        this.actualizando = false;
        this.creado = false;
        this.objetoImg = '';
        this.objetoId = '';
        this.formDatosObjeto.controls['tipo'].enable();
        this.formDatosObjeto.controls['descripcion'].enable();
        this.imagenSubir = null;
        this.imagenTemp = '';
        this.dataSource.data.forEach(function (rowi) { return _this.selection.deselect(rowi); });
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], EditaobjetoComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], EditaobjetoComponent.prototype, "sort", void 0);
    EditaobjetoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-editaobjeto',
            templateUrl: './editaobjeto.component.html',
            styleUrls: ['./editaobjeto.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ObjetoService,
            FormBuilder,
            ChangeDetectorRef])
    ], EditaobjetoComponent);
    return EditaobjetoComponent;
}());
export { EditaobjetoComponent };
//# sourceMappingURL=editaobjeto.component.js.map