import * as tslib_1 from "tslib";
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ElementocanvasService, ElementocanvasdiService, ConfiguracionService } from '../../services/service.index';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
var Configdash2Component = /** @class */ (function () {
    function Configdash2Component(_elementocanvasService, _elementocanvasdiService, _configuracionService, fb, cd) {
        this._elementocanvasService = _elementocanvasService;
        this._elementocanvasdiService = _elementocanvasdiService;
        this._configuracionService = _configuracionService;
        this.fb = fb;
        this.cd = cd;
        this.cantidadMaxAI = 8;
        this.cantidadMaxDI = 8;
        this.isLoadingResults = true;
        this.isLoadingResultsDi = true;
        this.isRateLimitReached = false;
        this.displayedColumns = ['name', 'tipo', 'unidad', 'valor', 'posx', 'posy', 'min', 'max', 'limite', 'indicaalarma', 'colornormal', 'coloralarma', 'colortitulo', 'colorvalor', 'colorfondo', '_id'];
        this.displayedColumnsDi = ['name', 'tipo', 'unidad', 'valor', 'posx', 'posy', 'condicion', 'colornormal', 'coloralarma', 'colortitulo', '_id'];
        this.selection = new SelectionModel(true, []); //esto es para detectar el item seleccionado
        this.selectionDi = new SelectionModel(true, []);
        this.elementocanvasId = '';
        this.elementocanvasIdDi = '';
        this.objetoImg = '';
        this.actualizando = false; //para que aparezcan las opciones para actualizar
        this.actualizandoDi = false; //para que aparezcan las opciones para actualizar
        this.creado = false; // para que aparezcal las opciones de crear
        this.creadoDi = false; // para que aparezcal las opciones de crear
        this.isConfig = false;
        this.colors = [
            '#F44336',
            '#E91E63',
            '#9C27B0',
            '#673AB7',
            '#3F51B5',
            '#2196F3',
            '#03A9F4',
            '#00BCD4',
            '#39CCCC',
            '#009688',
            '#64DD17',
            '#4CAF50',
            '#8BC34A',
            '#CDDC39',
            '#FFEB3B',
            '#FFC107',
            '#FF9800',
            '#FF5722',
            '#795548',
            '#9E9E9E',
            '#607D8B',
            '#000000',
            '#FFFFFF',
        ];
    }
    Configdash2Component.prototype.ngOnInit = function () {
        this.inicializaFormImagenPlanta();
        this.inicializaFormElementocanvas();
        this.inicializaFormElementocanvasDi();
        this.cargaCongiguracion();
        this.cargarElementocanvasTodos();
        this.cargarElementocanvasDiTodos();
    };
    Configdash2Component.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    Configdash2Component.prototype.applyFilterDi = function (filterValue) {
        this.dataSourceDi.filter = filterValue.trim().toLowerCase();
        if (this.dataSourceDi.paginator) {
            this.dataSourceDi.paginator.firstPage();
        }
    };
    Configdash2Component.prototype.cargaCongiguracion = function () {
        var _this = this;
        this._configuracionService.itemUltimo()
            .subscribe(function (resp) {
            if (resp.item) {
                _this.isConfig = true;
                _this.config = resp.item;
            }
            else {
                _this.crearConfiguracion();
            }
        });
    };
    Configdash2Component.prototype.crearConfiguracion = function () {
        var _this = this;
        var nuevaConfig = {
            image: null
        };
        this._configuracionService.registraItem(nuevaConfig)
            .subscribe(function (resp) {
            _this.isConfig = true;
            _this.config = resp;
        });
    };
    Configdash2Component.prototype.inicializaFormImagenPlanta = function () {
        //FORMULARIO IMAGEN
        this.formImagenPlanta = this.fb.group({
            image: [null, Validators.compose([Validators.required])
            ]
        });
    };
    Configdash2Component.prototype.inicializaFormElementocanvas = function () {
        //FORMULARIO DATOS HERRAMIENTAS Y REPUESTOS
        this.formDatosElementoCanvas = this.fb.group({
            name: new FormControl(null, Validators.required),
            tipo: new FormControl('', Validators.required),
            unidad: new FormControl({ value: null, disabled: false }),
            valor: new FormControl({ value: null, disabled: true }),
            posx: new FormControl({ value: null, disabled: false }),
            posy: new FormControl({ value: null, disabled: false }),
            min: new FormControl({ value: null, disabled: false }),
            max: new FormControl({ value: null, disabled: false }),
            limite: new FormControl({ value: null, disabled: false }),
            indicaalarma: new FormControl({ value: null, disabled: false }),
            colornormal: new FormControl({ value: null, disabled: false }),
            coloralarma: new FormControl({ value: null, disabled: false }),
            colortitulo: new FormControl({ value: null, disabled: false }),
            colorvalor: new FormControl({ value: null, disabled: false }),
            colorfondo: new FormControl({ value: null, disabled: false })
        });
    };
    Configdash2Component.prototype.inicializaFormElementocanvasDi = function () {
        //FORMULARIO DATOS HERRAMIENTAS Y REPUESTOS
        this.formDatosElementoCanvasDi = this.fb.group({
            name: new FormControl(null, Validators.required),
            tipo: new FormControl('', Validators.required),
            unidad: new FormControl({ value: null, disabled: false }),
            valor: new FormControl({ value: null, disabled: true }),
            posx: new FormControl({ value: null, disabled: false }),
            posy: new FormControl({ value: null, disabled: false }),
            condicion: new FormControl({ value: null, disabled: false }),
            colornormal: new FormControl({ value: null, disabled: false }),
            coloralarma: new FormControl({ value: null, disabled: false }),
            colortitulo: new FormControl({ value: null, disabled: false })
        });
    };
    Configdash2Component.prototype.setFormElementocanvas = function (item) {
        this.formDatosElementoCanvas.setValue({
            name: item.name,
            tipo: item.tipo,
            unidad: item.unidad,
            valor: item.valor,
            posx: item.posx,
            posy: item.posy,
            min: item.min,
            max: item.max,
            limite: item.limite,
            indicaalarma: item.indicaalarma,
            colornormal: item.colornormal,
            coloralarma: item.coloralarma,
            colortitulo: item.colortitulo,
            colorvalor: item.colorvalor,
            colorfondo: item.colorfondo
        });
    };
    Configdash2Component.prototype.setFormElementocanvasDi = function (item) {
        this.formDatosElementoCanvasDi.setValue({
            name: item.name,
            tipo: item.tipo,
            unidad: item.unidad,
            valor: item.valor,
            posx: item.posx,
            posy: item.posy,
            condicion: item.condicion,
            colornormal: item.colornormal,
            coloralarma: item.coloralarma,
            colortitulo: item.colortitulo
        });
    };
    //SELECCIONAR IMAGEN PLANTA
    Configdash2Component.prototype.seleccionImage = function (archivo) {
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
        reader.onload = function () {
            _this.formImagenPlanta.patchValue({
                image: reader.result
            });
            _this.imagenTemp = reader.result;
            _this.cd.markForCheck();
        };
    };
    //CARGAR IMAGEN PLANTA
    Configdash2Component.prototype.cambiarImagen = function () {
        if (this.imagenSubir) {
            this._configuracionService.cambiarImagen(this.imagenSubir, this.config._id);
        }
    };
    // Obtine datos para llenar tabla
    Configdash2Component.prototype.cargarElementocanvasTodos = function () {
        var _this = this;
        this.isLoadingResults = true;
        this._elementocanvasService.itemsTodos()
            .subscribe(function (resp) {
            _this.Elementoscanvas = resp.items;
            _this.cantidadAI = resp.total;
            _this.isLoadingResults = false;
            _this.dataSource = new MatTableDataSource(_this.Elementoscanvas);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    // Obtine datos para llenar tabla DI
    Configdash2Component.prototype.cargarElementocanvasDiTodos = function () {
        var _this = this;
        this.isLoadingResultsDi = true;
        this._elementocanvasdiService.itemsTodos()
            .subscribe(function (resp) {
            _this.Elementoscanvasdi = resp.items;
            _this.cantidadDI = resp.total;
            _this.isLoadingResultsDi = false;
            _this.dataSourceDi = new MatTableDataSource(_this.Elementoscanvasdi);
            _this.dataSourceDi.paginator = _this.paginatorDi;
            _this.dataSourceDi.sort = _this.sortDi;
        });
    };
    Configdash2Component.prototype.crearElementocanvas = function () {
        var _this = this;
        if (this.cantidadAI < this.cantidadMaxAI) {
            var ElementocanvasCrear = this.formDatosElementoCanvas.getRawValue(); // obtiene todos hasta los deshabilitados
            //let objetoCrear: Objeto=this.formDatosObjeto.value; // obtiene solo los habilitados
            this._elementocanvasService.registraItem(ElementocanvasCrear)
                .subscribe(function (resp) {
                _this.elementocanvasId = resp._id;
                _this.cargarElementocanvasTodos();
                _this.creado = true;
                _this.actualizando = true;
            });
        }
    };
    Configdash2Component.prototype.crearElementocanvasDi = function () {
        var _this = this;
        if (this.cantidadDI < this.cantidadMaxDI) {
            var ElementocanvasDiCrear = this.formDatosElementoCanvasDi.getRawValue(); // obtiene todos hasta los deshabilitados
            this._elementocanvasdiService.registraItem(ElementocanvasDiCrear)
                .subscribe(function (resp) {
                _this.elementocanvasIdDi = resp._id;
                _this.cargarElementocanvasDiTodos();
                _this.creadoDi = true;
                _this.actualizandoDi = true;
            });
        }
    };
    //CREA NUEVO OBJETO
    Configdash2Component.prototype.onSubmit = function () {
        this.actualizando ?
            this.actualizarElementocanvas() :
            this.crearElementocanvas();
    };
    //CREA NUEVO OBJETO DI
    Configdash2Component.prototype.onSubmitDi = function () {
        this.actualizandoDi ?
            this.actualizarElementocanvasDi() :
            this.crearElementocanvasDi();
    };
    //ACTUALIZA OBJETO DE LA LISTA
    Configdash2Component.prototype.actualizarElementocanvas = function () {
        var _this = this;
        var objetoActualizar = this.formDatosElementoCanvas.value; // obtiene solo los habilitados
        objetoActualizar._id = this.elementocanvasId; //Se agrega el _id
        this._elementocanvasService.actualizarItem(objetoActualizar)
            .subscribe(function (resp) {
            _this.cargarElementocanvasTodos();
            _this.cancelar();
        });
    };
    //ACTUALIZA OBJETO DI DE LA LISTA
    Configdash2Component.prototype.actualizarElementocanvasDi = function () {
        var _this = this;
        var objetoActualizar = this.formDatosElementoCanvasDi.value; // obtiene solo los habilitados
        objetoActualizar._id = this.elementocanvasIdDi; //Se agrega el _id
        this._elementocanvasdiService.actualizarItem(objetoActualizar)
            .subscribe(function (resp) {
            _this.cargarElementocanvasDiTodos();
            _this.cancelarDi();
        });
    };
    Configdash2Component.prototype.cancelarActualizarCrear = function () {
        this.cancelar();
    };
    Configdash2Component.prototype.cancelarActualizarCrearDi = function () {
        this.cancelarDi();
    };
    Configdash2Component.prototype.borrarElementocanvas = function (id) {
    };
    Configdash2Component.prototype.borrarElementocanvasDi = function (id) {
    };
    Configdash2Component.prototype.editarElementocanvas = function (row) {
        var _this = this;
        this.dataSource.data.forEach(function (rowi) { return _this.selection.deselect(rowi); });
        this.selection.select(row);
        this.setFormElementocanvas(row);
        this.actualizando = true;
        this.elementocanvasId = row._id;
    };
    Configdash2Component.prototype.editarElementocanvasDi = function (row) {
        var _this = this;
        this.dataSourceDi.data.forEach(function (rowi) { return _this.selectionDi.deselect(rowi); });
        this.selectionDi.select(row);
        this.setFormElementocanvasDi(row);
        this.actualizandoDi = true;
        this.elementocanvasIdDi = row._id;
    };
    Configdash2Component.prototype.cancelarEditar = function () {
        this.cancelar();
    };
    Configdash2Component.prototype.cancelarEditarDi = function () {
        this.cancelarDi();
    };
    Configdash2Component.prototype.cancelar = function () {
        var _this = this;
        this.formDatosElementoCanvas.reset();
        this.actualizando = false;
        this.creado = false;
        this.elementocanvasId = '';
        this.dataSource.data.forEach(function (rowi) { return _this.selection.deselect(rowi); });
    };
    Configdash2Component.prototype.cancelarDi = function () {
        var _this = this;
        this.formDatosElementoCanvasDi.reset();
        this.actualizandoDi = false;
        this.creadoDi = false;
        this.elementocanvasIdDi = '';
        this.dataSourceDi.data.forEach(function (rowi) { return _this.selectionDi.deselect(rowi); });
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], Configdash2Component.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], Configdash2Component.prototype, "sort", void 0);
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], Configdash2Component.prototype, "paginatorDi", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], Configdash2Component.prototype, "sortDi", void 0);
    Configdash2Component = tslib_1.__decorate([
        Component({
            selector: 'app-configdash2',
            templateUrl: './configdash2.component.html',
            styles: []
        }),
        tslib_1.__metadata("design:paramtypes", [ElementocanvasService,
            ElementocanvasdiService,
            ConfiguracionService,
            FormBuilder,
            ChangeDetectorRef])
    ], Configdash2Component);
    return Configdash2Component;
}());
export { Configdash2Component };
//# sourceMappingURL=configdash2.component.js.map