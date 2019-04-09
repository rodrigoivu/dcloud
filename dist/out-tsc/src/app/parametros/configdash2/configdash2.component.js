import * as tslib_1 from "tslib";
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ElementocanvasService, ElementocanvasdiService, AnalogoutputService, DigitaloutputService, ConfiguracionService, VariableinternacanvasService } from '../../services/service.index';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
var Configdash2Component = /** @class */ (function () {
    function Configdash2Component(_elementocanvasService, _elementocanvasdiService, _analogoutputService, _configuracionService, _digitaloutputService, _variableinternacanvasService, fb, cd) {
        this._elementocanvasService = _elementocanvasService;
        this._elementocanvasdiService = _elementocanvasdiService;
        this._analogoutputService = _analogoutputService;
        this._configuracionService = _configuracionService;
        this._digitaloutputService = _digitaloutputService;
        this._variableinternacanvasService = _variableinternacanvasService;
        this.fb = fb;
        this.cd = cd;
        this.cantidadMaxAI = 8;
        this.cantidadMaxDI = 8;
        this.cantidadMaxAO = 8;
        this.cantidadMaxDO = 8;
        this.cantidadMaxVI = 8;
        this.isLoadingResults = true;
        this.isLoadingResultsDi = true;
        this.isLoadingResultsDO = true;
        this.isLoadingResultsAO = true;
        this.isLoadingResultsVI = true;
        this.isRateLimitReached = false;
        this.displayedColumns = ['name', 'tipo', 'unidad', 'valor', 'posx', 'posy', 'min', 'max', 'limite', 'indicaalarma', 'colornormal', 'coloralarma', 'colortitulo', 'colorvalor', 'colorfondo', '_id'];
        this.displayedColumnsDi = ['name', 'tipo', 'unidad', 'valor', 'posx', 'posy', 'condicion', 'colornormal', 'coloralarma', 'colortitulo', '_id'];
        this.displayedColumnsAO = ['name', 'unidad', 'valor', 'min', 'max', 'header', '_id'];
        this.displayedColumnsDO = ['name', 'valor', 'header', '_id'];
        this.displayedColumnsVI = ['name', 'tipo', 'unidad', 'valor', 'posx', 'posy', 'min', 'max', 'limite', 'indicaalarma', 'colornormal', 'coloralarma', 'colortitulo', 'colorvalor', 'colorfondo', 'visible', 'propiedad', '_id'];
        this.selection = new SelectionModel(true, []); //esto es para detectar el item seleccionado
        this.selectionDi = new SelectionModel(true, []);
        this.selectionAO = new SelectionModel(true, []);
        this.selectionDO = new SelectionModel(true, []);
        this.selectionVI = new SelectionModel(true, []);
        this.elementocanvasId = '';
        this.elementocanvasIdDi = '';
        this.configIdAO = '';
        this.configIdDO = '';
        this.configIdVI = '';
        this.objetoImg = '';
        this.actualizando = false; //para que aparezcan las opciones para actualizar
        this.actualizandoDi = false; //para que aparezcan las opciones para actualizar
        this.actualizandoAO = false;
        this.actualizandoDO = false;
        this.actualizandoVI = false;
        this.creado = false; // para que aparezcal las opciones de crear
        this.creadoDi = false; // para que aparezcal las opciones de crear
        this.creadoAO = false;
        this.creadoDO = false;
        this.creadoVI = false;
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
        this.inicializaFormConfigSalidasAnalogas();
        this.inicializaFormConfigSalidasDigitales();
        this.inicializaFormConfigControlGeneral();
        this.inicializaFormConfigVariablesInternas();
        this.cargaConfiguracion();
        this.cargarElementocanvasTodos();
        this.cargarElementocanvasDiTodos();
        this.cargarAnalogoutputTodos();
        this.cargarDigitaloutputTodos();
        this.cargarVariableinternacanvasTodos();
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
    Configdash2Component.prototype.applyFilterAO = function (filterValue) {
        this.dataSourceAO.filter = filterValue.trim().toLowerCase();
        if (this.dataSourceAO.paginator) {
            this.dataSourceAO.paginator.firstPage();
        }
    };
    Configdash2Component.prototype.applyFilterDO = function (filterValue) {
        this.dataSourceDO.filter = filterValue.trim().toLowerCase();
        if (this.dataSourceDO.paginator) {
            this.dataSourceDO.paginator.firstPage();
        }
    };
    Configdash2Component.prototype.applyFilterVI = function (filterValue) {
        this.dataSourceVI.filter = filterValue.trim().toLowerCase();
        if (this.dataSourceVI.paginator) {
            this.dataSourceVI.paginator.firstPage();
        }
    };
    Configdash2Component.prototype.cargaConfiguracion = function () {
        var _this = this;
        this._configuracionService.itemUltimo()
            .subscribe(function (resp) {
            if (resp.item) {
                _this.isConfig = true;
                _this.config = resp.item;
                //console.log(this.config);
                _this.setFormConfigControlGeneral(_this.config);
            }
            else {
                _this.crearConfiguracion();
            }
        });
    };
    Configdash2Component.prototype.crearConfiguracion = function () {
        var _this = this;
        var nuevaConfig = {
            image: null,
            imagelogo: null,
            imagecorporativa: null,
            titulodash1: null,
            titulodash2: null,
            titulocontrol: null,
            tituloplanta: null,
            titulosalidas: null,
            tituloDO1: null,
            tituloAO1: null,
            tituloAO2: null,
            tituloAO3: null,
            tituloVI1: null,
            tituloVI2: null,
            tituloVI3: null,
            subtitulosalidas: null,
            subtituloDO1: null,
            subtituloAO1: null,
            subtituloAO2: null,
            subtituloAO3: null,
            subtituloVI1: null,
            subtituloVI2: null,
            subtituloVI3: null
        };
        this._configuracionService.registraItem(nuevaConfig)
            .subscribe(function (resp) {
            _this.isConfig = true;
            _this.config = resp;
            _this.setFormConfigControlGeneral(_this.config);
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
    Configdash2Component.prototype.inicializaFormConfigVariablesInternas = function () {
        this.formConfigVariablesInternas = this.fb.group({
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
            colorfondo: new FormControl({ value: null, disabled: false }),
            visible: new FormControl({ value: null, disabled: false }),
            propiedad: new FormControl({ value: null, disabled: false }) //lectura escritura ambas
        });
    };
    Configdash2Component.prototype.inicializaFormElementocanvasDi = function () {
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
    Configdash2Component.prototype.inicializaFormConfigSalidasAnalogas = function () {
        this.formConfigSalidasAnalogas = this.fb.group({
            name: new FormControl(null, Validators.required),
            unidad: new FormControl({ value: null, disabled: false }),
            valor: new FormControl({ value: null, disabled: true }),
            min: new FormControl({ value: null, disabled: false }),
            max: new FormControl({ value: null, disabled: false }),
            header: new FormControl({ value: null, disabled: false })
        });
    };
    Configdash2Component.prototype.inicializaFormConfigSalidasDigitales = function () {
        this.formConfigSalidasDigitales = this.fb.group({
            name: new FormControl(null, Validators.required),
            valor: new FormControl({ value: null, disabled: true }),
            header: new FormControl({ value: null, disabled: false })
        });
    };
    Configdash2Component.prototype.inicializaFormConfigControlGeneral = function () {
        this.formConfigControlGeneral = this.fb.group({
            titulocontrol: new FormControl({ value: null, disabled: false }),
            tituloplanta: new FormControl({ value: null, disabled: false }),
            titulosalidas: new FormControl({ value: null, disabled: false }),
            tituloDO1: new FormControl({ value: null, disabled: false }),
            tituloAO1: new FormControl({ value: null, disabled: false }),
            tituloAO2: new FormControl({ value: null, disabled: false }),
            tituloAO3: new FormControl({ value: null, disabled: false }),
            tituloVI1: new FormControl({ value: null, disabled: false }),
            tituloVI2: new FormControl({ value: null, disabled: false }),
            tituloVI3: new FormControl({ value: null, disabled: false }),
            subtitulosalidas: new FormControl({ value: null, disabled: false }),
            subtituloDO1: new FormControl({ value: null, disabled: false }),
            subtituloAO1: new FormControl({ value: null, disabled: false }),
            subtituloAO2: new FormControl({ value: null, disabled: false }),
            subtituloAO3: new FormControl({ value: null, disabled: false }),
            subtituloVI1: new FormControl({ value: null, disabled: false }),
            subtituloVI2: new FormControl({ value: null, disabled: false }),
            subtituloVI3: new FormControl({ value: null, disabled: false })
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
    Configdash2Component.prototype.setFormConfigSalidasAnalogas = function (item) {
        this.formConfigSalidasAnalogas.setValue({
            name: item.name,
            unidad: item.unidad,
            valor: item.valor,
            min: item.min,
            max: item.max,
            header: item.header
        });
    };
    Configdash2Component.prototype.setFormConfigSalidasDigitales = function (item) {
        this.formConfigSalidasDigitales.setValue({
            name: item.name,
            valor: item.valor,
            header: item.header
        });
    };
    Configdash2Component.prototype.setFormConfigVariablesInternas = function (item) {
        this.formConfigVariablesInternas.setValue({
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
            colorfondo: item.colorfondo,
            visible: item.visible,
            propiedad: item.propiedad
        });
    };
    Configdash2Component.prototype.setFormConfigControlGeneral = function (item) {
        this.formConfigControlGeneral.setValue({
            titulocontrol: item.titulocontrol,
            tituloplanta: item.tituloplanta,
            titulosalidas: item.titulosalidas,
            tituloDO1: item.tituloDO1,
            tituloAO1: item.tituloAO1,
            tituloAO2: item.tituloAO2,
            tituloAO3: item.tituloAO3,
            tituloVI1: item.tituloVI1,
            tituloVI2: item.tituloVI2,
            tituloVI3: item.tituloVI3,
            subtitulosalidas: item.subtitulosalidas,
            subtituloDO1: item.subtituloDO1,
            subtituloAO1: item.subtituloAO1,
            subtituloAO2: item.subtituloAO2,
            subtituloAO3: item.subtituloAO3,
            subtituloVI1: item.subtituloVI1,
            subtituloVI2: item.subtituloVI2,
            subtituloVI3: item.subtituloVI3
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
    // Obtine datos para llenar tabla AO
    Configdash2Component.prototype.cargarAnalogoutputTodos = function () {
        var _this = this;
        this.isLoadingResultsAO = true;
        this._analogoutputService.itemsTodos()
            .subscribe(function (resp) {
            _this.Analogoutput = resp.items;
            _this.cantidadAO = resp.total;
            _this.isLoadingResultsAO = false;
            _this.dataSourceAO = new MatTableDataSource(_this.Analogoutput);
            _this.dataSourceAO.paginator = _this.paginatorAO;
            _this.dataSourceAO.sort = _this.sortAO;
        });
    };
    // Obtine datos para llenar tabla DO
    Configdash2Component.prototype.cargarDigitaloutputTodos = function () {
        var _this = this;
        this.isLoadingResultsDO = true;
        this._digitaloutputService.itemsTodos()
            .subscribe(function (resp) {
            _this.Digitaloutput = resp.items;
            _this.cantidadDO = resp.total;
            _this.isLoadingResultsDO = false;
            _this.dataSourceDO = new MatTableDataSource(_this.Digitaloutput);
            _this.dataSourceDO.paginator = _this.paginatorDO;
            _this.dataSourceDO.sort = _this.sortDO;
        });
    };
    // Obtine datos para llenar tabla VI
    Configdash2Component.prototype.cargarVariableinternacanvasTodos = function () {
        var _this = this;
        this.isLoadingResultsVI = true;
        this._variableinternacanvasService.itemsTodos()
            .subscribe(function (resp) {
            _this.Variableinternacanvas = resp.items;
            _this.cantidadVI = resp.total;
            _this.isLoadingResultsVI = false;
            _this.dataSourceVI = new MatTableDataSource(_this.Variableinternacanvas);
            _this.dataSourceVI.paginator = _this.paginatorVI;
            _this.dataSourceVI.sort = _this.sortVI;
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
    Configdash2Component.prototype.crearAnalogoutput = function () {
        var _this = this;
        if (this.cantidadAO < this.cantidadMaxAO) {
            var AnalogoutputCrear = this.formConfigSalidasAnalogas.getRawValue(); // obtiene todos hasta los deshabilitados
            this._analogoutputService.registraItem(AnalogoutputCrear)
                .subscribe(function (resp) {
                _this.configIdAO = resp._id;
                _this.cargarAnalogoutputTodos();
                _this.creadoAO = true;
                _this.actualizandoAO = true;
            });
        }
    };
    Configdash2Component.prototype.crearDigitaloutput = function () {
        var _this = this;
        if (this.cantidadDO < this.cantidadMaxDO) {
            var DigitaloutputCrear = this.formConfigSalidasDigitales.getRawValue(); // obtiene todos hasta los deshabilitados
            this._digitaloutputService.registraItem(DigitaloutputCrear)
                .subscribe(function (resp) {
                _this.configIdDO = resp._id;
                _this.cargarDigitaloutputTodos();
                _this.creadoDO = true;
                _this.actualizandoDO = true;
            });
        }
    };
    Configdash2Component.prototype.crearVariableinternacanvas = function () {
        var _this = this;
        if (this.cantidadVI < this.cantidadMaxVI) {
            var VriableinternacanvasCrear = this.formConfigVariablesInternas.getRawValue(); // obtiene todos hasta los deshabilitados
            //let objetoCrear: Objeto=this.formDatosObjeto.value; // obtiene solo los habilitados
            this._variableinternacanvasService.registraItem(VriableinternacanvasCrear)
                .subscribe(function (resp) {
                _this.configIdVI = resp._id;
                _this.cargarVariableinternacanvasTodos();
                _this.creadoVI = true;
                _this.actualizandoVI = true;
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
    //CREA NUEVO OBJETO AO
    Configdash2Component.prototype.onSubmitAO = function () {
        this.actualizandoAO ?
            this.actualizarAnalogoutput() :
            this.crearAnalogoutput();
    };
    //CREA NUEVO OBJETO DO
    Configdash2Component.prototype.onSubmitDO = function () {
        this.actualizandoDO ?
            this.actualizarDigitaloutput() :
            this.crearDigitaloutput();
    };
    //CREA NUEVO OBJETO VI
    Configdash2Component.prototype.onSubmitVI = function () {
        this.actualizandoVI ?
            this.actualizarVariableinternacanvas() :
            this.crearVariableinternacanvas();
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
    //ACTUALIZA OBJETO AO DE LA LISTA
    Configdash2Component.prototype.actualizarAnalogoutput = function () {
        var _this = this;
        var objetoActualizar = this.formConfigSalidasAnalogas.value; // obtiene solo los habilitados
        objetoActualizar._id = this.configIdAO; //Se agrega el _id
        this._analogoutputService.actualizarItem(objetoActualizar)
            .subscribe(function (resp) {
            _this.cargarAnalogoutputTodos();
            _this.cancelarAO();
        });
    };
    //ACTUALIZA OBJETO DO DE LA LISTA
    Configdash2Component.prototype.actualizarDigitaloutput = function () {
        var _this = this;
        var objetoActualizar = this.formConfigSalidasDigitales.value; // obtiene solo los habilitados
        objetoActualizar._id = this.configIdDO; //Se agrega el _id
        this._digitaloutputService.actualizarItem(objetoActualizar)
            .subscribe(function (resp) {
            _this.cargarDigitaloutputTodos();
            _this.cancelarDO();
        });
    };
    //ACTUALIZA OBJETO VI DE LA LISTA
    Configdash2Component.prototype.actualizarVariableinternacanvas = function () {
        var _this = this;
        var objetoActualizar = this.formConfigVariablesInternas.value; // obtiene solo los habilitados
        objetoActualizar._id = this.configIdVI; //Se agrega el _id
        this._variableinternacanvasService.actualizarItem(objetoActualizar)
            .subscribe(function (resp) {
            _this.cargarVariableinternacanvasTodos();
            _this.cancelarVI();
        });
    };
    //ACTUALIZA OBJETO config DE LA LISTA
    Configdash2Component.prototype.actualizarConfiguracion = function () {
        var objetoActualizar = this.formConfigControlGeneral.value; // obtiene solo los habilitados
        objetoActualizar._id = this.config._id; //Se agrega el _id
        this._configuracionService.actualizarItem(objetoActualizar)
            .subscribe(function (resp) {
        });
    };
    Configdash2Component.prototype.cancelarActualizarCrear = function () {
        this.cancelar();
    };
    Configdash2Component.prototype.cancelarActualizarCrearDi = function () {
        this.cancelarDi();
    };
    Configdash2Component.prototype.cancelarActualizarCrearAO = function () {
        this.cancelarAO();
    };
    Configdash2Component.prototype.cancelarActualizarCrearDO = function () {
        this.cancelarDO();
    };
    Configdash2Component.prototype.cancelarActualizarCrearVI = function () {
        this.cancelarVI();
    };
    Configdash2Component.prototype.borrarElementocanvas = function (id) {
    };
    Configdash2Component.prototype.borrarElementocanvasDi = function (id) {
    };
    Configdash2Component.prototype.borrarAnalogoutput = function (id) {
    };
    Configdash2Component.prototype.borrarDigitaloutput = function (id) {
    };
    Configdash2Component.prototype.borrarVariableinputcanvas = function (id) {
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
    Configdash2Component.prototype.editarAnalogoutput = function (row) {
        var _this = this;
        this.dataSourceAO.data.forEach(function (rowi) { return _this.selectionAO.deselect(rowi); });
        this.selectionAO.select(row);
        this.setFormConfigSalidasAnalogas(row);
        this.actualizandoAO = true;
        this.configIdAO = row._id;
    };
    Configdash2Component.prototype.editarDigitaloutput = function (row) {
        var _this = this;
        this.dataSourceDO.data.forEach(function (rowi) { return _this.selectionDO.deselect(rowi); });
        this.selectionDO.select(row);
        this.setFormConfigSalidasDigitales(row);
        this.actualizandoDO = true;
        this.configIdDO = row._id;
    };
    Configdash2Component.prototype.editarVariableinternacanvas = function (row) {
        var _this = this;
        this.dataSourceVI.data.forEach(function (rowi) { return _this.selectionVI.deselect(rowi); });
        this.selectionVI.select(row);
        this.setFormConfigVariablesInternas(row);
        this.actualizandoVI = true;
        this.configIdVI = row._id;
    };
    Configdash2Component.prototype.cancelarEditar = function () {
        this.cancelar();
    };
    Configdash2Component.prototype.cancelarEditarDi = function () {
        this.cancelarDi();
    };
    Configdash2Component.prototype.cancelarEditarAO = function () {
        this.cancelarAO();
    };
    Configdash2Component.prototype.cancelarEditarDO = function () {
        this.cancelarDO();
    };
    Configdash2Component.prototype.cancelarEditarVI = function () {
        this.cancelarVI();
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
    Configdash2Component.prototype.cancelarAO = function () {
        var _this = this;
        this.formConfigSalidasAnalogas.reset();
        this.actualizandoAO = false;
        this.creadoAO = false;
        this.configIdAO = '';
        this.dataSourceAO.data.forEach(function (rowi) { return _this.selectionAO.deselect(rowi); });
    };
    Configdash2Component.prototype.cancelarDO = function () {
        var _this = this;
        this.formConfigSalidasDigitales.reset();
        this.actualizandoDO = false;
        this.creadoDO = false;
        this.configIdDO = '';
        this.dataSourceDO.data.forEach(function (rowi) { return _this.selectionDO.deselect(rowi); });
    };
    Configdash2Component.prototype.cancelarVI = function () {
        var _this = this;
        this.formConfigVariablesInternas.reset();
        this.actualizandoVI = false;
        this.creadoVI = false;
        this.configIdVI = '';
        this.dataSourceVI.data.forEach(function (rowi) { return _this.selectionVI.deselect(rowi); });
    };
    tslib_1.__decorate([
        ViewChild('paginator'),
        tslib_1.__metadata("design:type", MatPaginator)
    ], Configdash2Component.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], Configdash2Component.prototype, "sort", void 0);
    tslib_1.__decorate([
        ViewChild('paginatorDi'),
        tslib_1.__metadata("design:type", MatPaginator)
    ], Configdash2Component.prototype, "paginatorDi", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], Configdash2Component.prototype, "sortDi", void 0);
    tslib_1.__decorate([
        ViewChild('paginatorAO'),
        tslib_1.__metadata("design:type", MatPaginator)
    ], Configdash2Component.prototype, "paginatorAO", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], Configdash2Component.prototype, "sortAO", void 0);
    tslib_1.__decorate([
        ViewChild('paginatorDO'),
        tslib_1.__metadata("design:type", MatPaginator)
    ], Configdash2Component.prototype, "paginatorDO", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], Configdash2Component.prototype, "sortDO", void 0);
    tslib_1.__decorate([
        ViewChild('paginatorVI'),
        tslib_1.__metadata("design:type", MatPaginator)
    ], Configdash2Component.prototype, "paginatorVI", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], Configdash2Component.prototype, "sortVI", void 0);
    Configdash2Component = tslib_1.__decorate([
        Component({
            selector: 'app-configdash2',
            templateUrl: './configdash2.component.html',
            styles: []
        }),
        tslib_1.__metadata("design:paramtypes", [ElementocanvasService,
            ElementocanvasdiService,
            AnalogoutputService,
            ConfiguracionService,
            DigitaloutputService,
            VariableinternacanvasService,
            FormBuilder,
            ChangeDetectorRef])
    ], Configdash2Component);
    return Configdash2Component;
}());
export { Configdash2Component };
//# sourceMappingURL=configdash2.component.js.map