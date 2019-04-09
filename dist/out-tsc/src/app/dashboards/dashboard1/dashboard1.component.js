import * as tslib_1 from "tslib";
import { Component, Inject, ViewChild, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { MatTable } from '@angular/material';
//import * as Chartist from 'chartist';
//import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
//import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
//import { BaseChartDirective }   from 'ng2-charts/ng2-charts';
import { ExcelService, ObjetoService, PersonaService, EventotagobjetoService, EventotagpersonaService, WebsocketService, UsuarioService } from '../../services/service.index';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
//para el formato de fecha en español de DatePipe
import localeEsCl from '@angular/common/locales/es-CL';
import localeEsClExtra from '@angular/common/locales/extra/es-CL';
registerLocaleData(localeEsCl, 'es-CL', localeEsClExtra);
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
//import {default as _rollupMoment} from 'moment';
//const moment = _rollupMoment || _moment;
var moment = _moment;
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export var MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
var data = require('./data.json');
/** Constants used to fill up our data base. */
var COLORS = [
    'maroon',
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'purple',
    'fuchsia',
    'lime',
    'teal',
    'aqua',
    'blue',
    'navy',
    'black',
    'gray'
];
var NAMES = [
    'Mario',
    'Daniela',
    'Amelia',
    'Sebastian',
    'Patricio',
    'Mizuki',
    'Emily',
    'Theodore',
    'Isla',
    'Oliver',
    'Isabella',
    'Jasper',
    'Cora',
    'Levi',
    'Violet',
    'Arthur',
    'Mia',
    'Thomas',
    'Elizabeth'
];
var Dashboard1Component = /** @class */ (function () {
    function Dashboard1Component(adapter, dialog, _objetoService, _personaService, _eventotagobjetoService, _eventotagpersonaService, fb, _websocketService, _usuarioService) {
        var _this = this;
        this.adapter = adapter;
        this.dialog = dialog;
        this._objetoService = _objetoService;
        this._personaService = _personaService;
        this._eventotagobjetoService = _eventotagobjetoService;
        this._eventotagpersonaService = _eventotagpersonaService;
        this.fb = fb;
        this._websocketService = _websocketService;
        this._usuarioService = _usuarioService;
        this.displayedColumns = ['imagen', 'nombre', 'cargo', 'fecha', 'hora', 'numeroparte', 'descripcion', 'marca', 'fechaR', 'horaR'];
        this.displayedColumnsHerramientas = ['imagen', 'descripcion', 'info', 'disciplina', 'categoria', 'grupo', 'stockmin', 'stock'];
        this.displayedColumnsRepuestos = ['imagen', 'descripcion', 'info', 'disciplina', 'categoria', 'grupo', 'stockmin', 'stock'];
        this.displayedColumnsPersonas = ['imagen', 'nombre', 'rut', 'empresa', 'cargo', 'area', 'autorizado', 'fechaincorporacion', 'fechafincontrato', 'tipolicenciaconducir', 'mutualidad', 'fechaexamenocupacional', 'fechaexamenalturafisica', 'fechaexamenalturageo'];
        this.displayedColumnsEventosHist = ['imagenPersona', 'nombre', 'cargo', 'empresa', 'timestampPersona', 'imagenObjeto', 'tipo', 'numeroparte', 'descripcion', 'timestampObjeto', 'direccion'];
        this.displayedColumnsEventosPers = ['imagenPersona', 'nombre', 'cargo', 'empresa', 'timestampPersona', 'direccion'];
        this.isLoadingHerramientas = true;
        this.isLoadingRepuestos = true;
        this.isLoadingPersonas = true;
        this.cargandoGraficoMovimientosTag = false;
        this.listoParaExportarMovimientosTag = false;
        this.errMovimientosTag = false;
        this.cantDiasMovimientosTag = 0;
        this.cantDatosMovimientosTag = 0;
        // tablaEventosObjetosCargadaInicial:boolean=false;
        // tablaEventosPersonasCargadaInicial:boolean=false;
        //GRAFICO
        // bar chart
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            aspectRatio: 2,
            barThickness: 10,
            pan: {
                enabled: true,
                mode: "x",
                speed: 10,
                threshold: 10
            },
            zoom: {
                enabled: true,
                drag: false,
                mode: "x",
                limits: {
                    max: 10,
                    min: 0.5
                }
            }
        };
        this.barChartColors = [
            { backgroundColor: '#1976d2' },
            { backgroundColor: '#26dad2' }
        ];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartLabels = [
            '',
            '',
            '',
            '',
            '',
            '',
            ''
        ];
        this.barChartData = [
            { data: [], label: 'Ingresos' },
            { data: [], label: 'Egresos' }
        ];
        //Recibe mensaje de entradas PLC por SOCKET IO
        this._websocketService.recibeTag().subscribe(function (data) {
            _this.cargarObjetos();
            _this.table.renderRows(); //no se ha comprobado si funciona
            setTimeout(function () {
                _this.cargarEventoTagObjeto();
            }, 300);
        });
        // //MUESTREO STOCK OBJETOS
        // this.suscribirMuestreoStockObjetos = this.observableMuestreoStockObjetos().pipe( retry() )
        //   .subscribe ( () =>{
        //        this.cargarObjetos();
        // });
        // //MUESTREO STOCK EVENTOS
        // this.suscribirMuestreoStockEventos = this.observableMuestreoStockEventos().pipe( retry() )
        //   .subscribe ( () =>{
        //       this.cargarEventoTagObjeto();
        // });  
        this.inicializaformMovimientosTag();
    }
    // events
    Dashboard1Component.prototype.chartClicked = function (e) {
        // console.log(e);
    };
    Dashboard1Component.prototype.chartHovered = function (e) {
        // console.log(e);
    };
    Dashboard1Component.prototype.openDialog = function (categoria, nombre, codigo, imagen) {
        this.categoria = categoria;
        this.nombre = nombre;
        this.codigo = codigo;
        this.imagen = imagen;
        var dialogRef = this.dialog.open(DialogDashboard, {
            width: '1000px',
            data: { categoria: this.categoria, nombre: this.nombre, codigo: this.codigo, imagen: this.imagen }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            // console.log('The dialog was closed');
            // this.nombre = result;
        });
    };
    Dashboard1Component.prototype.ngAfterViewInit = function () {
        //TABLA
        var _this = this;
        this.cargarObjetos();
        this.cargarPersonas();
        this.cargarEventoTagObjeto();
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO
        this.formMovimientosTag.get('categoria').valueChanges.subscribe(function (val) {
            _this.setListaItems();
        });
    };
    Dashboard1Component.prototype.ngOnDestroy = function () {
        // this.suscribirMuestreoStockObjetos.unsubscribe();
        // this.suscribirMuestreoStockEventos.unsubscribe();
    };
    // observableMuestreoStockObjetos(): Observable<any>{
    //   return new Observable( observer =>{
    //     let intervalo = setInterval(() =>{
    //         observer.next();
    //     }, 2800);
    //   });
    // }
    // observableMuestreoStockPersonal(): Observable<any>{
    //   return new Observable( observer =>{
    //     let intervalo = setInterval(() =>{
    //         observer.next();
    //     }, 3200);
    //   });
    // }
    // observableMuestreoStockEventos(): Observable<any>{
    //   return new Observable( observer =>{
    //     let intervalo = setInterval(() =>{
    //         observer.next();
    //     }, 3600);
    //   });
    // }
    Dashboard1Component.prototype.inicializaformMovimientosTag = function () {
        this.formMovimientosTag = this.fb.group({
            desde: new FormControl({ value: null, disabled: false }, Validators.required),
            hasta: new FormControl({ value: null, disabled: false }, Validators.required),
            categoria: new FormControl(null, Validators.required),
            item: new FormControl(null, Validators.required),
            listaItems: this.fb.array([]),
        });
    };
    Object.defineProperty(Dashboard1Component.prototype, "formDatosListaItems", {
        get: function () { return this.formMovimientosTag.get('listaItems'); },
        enumerable: true,
        configurable: true
    });
    Dashboard1Component.prototype.setListaItems = function () {
        var filtro = this.formMovimientosTag.controls['categoria'].value;
        var items = this.formMovimientosTag.get('listaItems');
        items.controls = [];
        var itemObj;
        var i = 0;
        switch (filtro) {
            case "Herramientas":
                for (var _i = 0, _a = this.herramientasTodo; _i < _a.length; _i++) {
                    var obj = _a[_i];
                    itemObj = {
                        tipo: obj.tipo,
                        descripcion: obj.descripcion,
                        item: i,
                        _id: obj._id
                    };
                    items.push(this.fb.group(itemObj));
                    i++;
                }
                break;
            case "Repuestos":
                for (var _b = 0, _c = this.repuestosTodo; _b < _c.length; _b++) {
                    var obj = _c[_b];
                    itemObj = {
                        tipo: obj.tipo,
                        descripcion: obj.descripcion,
                        item: i,
                        _id: obj._id
                    };
                    items.push(this.fb.group(itemObj));
                    i++;
                }
                break;
            case "Personal":
                for (var _d = 0, _e = this.personasTodo; _d < _e.length; _d++) {
                    var obj = _e[_d];
                    itemObj = {
                        tipo: 'Personal',
                        descripcion: obj.nombre,
                        item: i,
                        _id: obj._id
                    };
                    items.push(this.fb.group(itemObj));
                    i++;
                }
                break;
            default:
                // code...
                break;
        }
    };
    Dashboard1Component.prototype.diferenciaDias = function (desde, hasta) {
        return Math.round(1 + (hasta.getTime() - desde.getTime()) / (1000 * 60 * 60 * 24));
    };
    Dashboard1Component.prototype.onSubmitGraficaMovimientosTag = function () {
        var _this = this;
        var filtro = this.formMovimientosTag.controls['categoria'].value;
        var desde = new Date(this.formMovimientosTag.getRawValue().desde);
        var hasta = new Date(this.formMovimientosTag.getRawValue().hasta);
        this.errMovimientosTag = false;
        if (desde.getTime() <= hasta.getTime()) {
            this.cargandoGraficoMovimientosTag = true;
            //CALCULA DIAS
            this.cantDiasMovimientosTag = this.diferenciaDias(desde, hasta);
            switch (filtro) {
                case "Herramientas":
                    this._eventotagobjetoService.itemsRangoFechas(desde, hasta)
                        .subscribe(function (resp) {
                        _this.analizaDataMovimientosTagObjetos(resp.items, 'Herramienta');
                        _this.listoParaExportarMovimientosTag = true;
                    });
                    break;
                case "Repuestos":
                    this._eventotagobjetoService.itemsRangoFechas(desde, hasta)
                        .subscribe(function (resp) {
                        _this.analizaDataMovimientosTagObjetos(resp.items, 'Repuesto');
                        _this.listoParaExportarMovimientosTag = true;
                    });
                    break;
                case "Personal":
                    this._eventotagpersonaService.itemsRangoFechas(desde, hasta)
                        .subscribe(function (resp) {
                        _this.analizaDataMovimientosTagPersonas(resp.items);
                        _this.listoParaExportarMovimientosTag = true;
                    });
                    break;
                default:
                    // code...
                    break;
            }
        }
        else {
            this.errMovimientosTag = true;
            this.cantDiasMovimientosTag = 0;
            this.cantDatosMovimientosTag = 0;
        }
    };
    Dashboard1Component.prototype.analizaDataMovimientosTagObjetos = function (datosTag, filtro) {
        var _this = this;
        var cantDatosIngresos = 0;
        var cantDatosEgresos = 0;
        var DatosIngresos = [];
        var DatosEgresos = [];
        var labelDias = [];
        var desde = new Date(this.formMovimientosTag.getRawValue().desde);
        var item_id = this.formMovimientosTag.controls['item'].value; //_id del objeto
        // let informacion:string=this.formMovimientosTag.controls['informacion'].value;
        var dias = this.cantDiasMovimientosTag;
        var ndia = new Date(desde);
        var dia = ndia.getDate();
        var mes = ndia.getMonth() + 1;
        var edia;
        var diaDato;
        var mesDato;
        this.barChartLabels = [];
        if (datosTag.length) {
            for (var i = 0; i < dias; ++i) {
                cantDatosIngresos = 0;
                cantDatosEgresos = 0;
                if (i != 0) {
                    ndia = new Date(ndia.setHours(24));
                }
                dia = ndia.getDate();
                mes = ndia.getMonth() + 1;
                var labelD = dia + '/' + mes;
                labelDias.push(dia + '/' + mes);
                for (var _i = 0, datosTag_1 = datosTag; _i < datosTag_1.length; _i++) { //RECORRE TODOS LOS DATOS CONSULTADOS
                    var item = datosTag_1[_i];
                    edia = new Date(item.timestamp);
                    diaDato = edia.getDate();
                    mesDato = edia.getMonth() + 1;
                    if (dia == diaDato && mes == mesDato) { //SI EL DIA DEL DATO CORRESPONDE AL DIA CONSULTADO CONTAR
                        if (item.objeto.tipo == filtro && item.objeto._id == item_id) {
                            if (item.direccion == '1') {
                                console.log('ingreso' + item_id);
                                cantDatosIngresos++;
                            }
                            if (item.direccion == '0') {
                                cantDatosEgresos++;
                                console.log('egreso' + item_id);
                            }
                        }
                    }
                }
                DatosIngresos.push(cantDatosIngresos);
                DatosEgresos.push(cantDatosEgresos);
            }
            this.barChartLabels = labelDias;
            var data_1;
            // if(informacion == 'ingresos'){
            //    data = [
            //       { data: DatosIngresos, label: 'Ingresos' }
            //     ];
            //     var sumaing=0
            //     for (var i = 0; i < DatosIngresos.length; i++) {
            //       sumaing=sumaing+DatosIngresos[i]
            //     }
            //     this.cantDatosMovimientosTag=sumaing;
            // }
            // if(informacion == 'egresos'){
            //    data = [
            //       { data: DatosEgresos, label: 'Egresos' }
            //     ];
            //     var sumaeg=0
            //     for (var i = 0; i < DatosEgresos.length; i++) {
            //       sumaeg=sumaeg+DatosEgresos[i]
            //     }
            //     this.cantDatosMovimientosTag=sumaeg;
            // }
            // if(informacion == 'ambos'){
            data_1 = [
                { data: DatosEgresos, label: 'Egresos' },
                { data: DatosIngresos, label: 'Ingresos' }
            ];
            var sumaeg = 0;
            for (var i = 0; i < DatosEgresos.length; i++) {
                sumaeg = sumaeg + DatosEgresos[i];
            }
            var sumaing = 0;
            for (var i = 0; i < DatosIngresos.length; i++) {
                sumaing = sumaing + DatosIngresos[i];
            }
            this.cantDatosMovimientosTag = sumaeg + sumaing;
            // }
            setTimeout(function () {
                _this.barChartData = data_1;
            }, 100);
            this.cargandoGraficoMovimientosTag = false;
        }
        else {
            this.cantDatosMovimientosTag = 0;
            this.cargandoGraficoMovimientosTag = false;
        }
    };
    Dashboard1Component.prototype.analizaDataMovimientosTagPersonas = function (datosTag) {
        var _this = this;
        var cantDatosIngresos = 0;
        var cantDatosEgresos = 0;
        var DatosIngresos = [];
        var DatosEgresos = [];
        var labelDias = [];
        var desde = new Date(this.formMovimientosTag.getRawValue().desde);
        var item_id = this.formMovimientosTag.controls['item'].value; //_id del objeto
        // let informacion:string=this.formMovimientosTag.controls['informacion'].value;
        var dias = this.cantDiasMovimientosTag;
        var ndia = new Date(desde);
        var dia = ndia.getDate();
        var mes = ndia.getMonth() + 1;
        var edia;
        var diaDato;
        var mesDato;
        this.barChartLabels = [];
        if (datosTag.length) {
            for (var i = 0; i < dias; ++i) {
                cantDatosIngresos = 0;
                cantDatosEgresos = 0;
                if (i != 0) {
                    ndia = new Date(ndia.setHours(24));
                }
                dia = ndia.getDate();
                mes = ndia.getMonth() + 1;
                var labelD = dia + '/' + mes;
                labelDias.push(dia + '/' + mes);
                for (var _i = 0, datosTag_2 = datosTag; _i < datosTag_2.length; _i++) { //RECORRE TODOS LOS DATOS CONSULTADOS
                    var item = datosTag_2[_i];
                    edia = new Date(item.timestamp);
                    diaDato = edia.getDate();
                    mesDato = edia.getMonth() + 1;
                    if (dia == diaDato && mes == mesDato) { //SI EL DIA DEL DATO CORRESPONDE AL DIA CONSULTADO CONTAR
                        if (item.persona._id == item_id) {
                            if (item.direccion == '1') {
                                cantDatosIngresos++;
                                console.log('ingreso' + item_id);
                            }
                            if (item.direccion == '0') {
                                cantDatosEgresos++;
                                console.log('egreso' + item_id);
                            }
                        }
                    }
                }
                DatosIngresos.push(cantDatosIngresos);
                DatosEgresos.push(cantDatosEgresos);
            }
            this.barChartLabels = labelDias;
            var data_2;
            // if(informacion == 'ingresos'){
            //    data = [
            //       { data: DatosIngresos, label: 'Ingresos' }
            //     ];
            //     var sumaing=0
            //     for (var i = 0; i < DatosIngresos.length; i++) {
            //       sumaing=sumaing+DatosIngresos[i]
            //     }
            //     this.cantDatosMovimientosTag=sumaing;
            // }
            // if(informacion == 'egresos'){
            //    data = [
            //       { data: DatosEgresos, label: 'Egresos' }
            //     ];
            //     var sumaeg=0
            //     for (var i = 0; i < DatosEgresos.length; i++) {
            //       sumaeg=sumaeg+DatosEgresos[i]
            //     }
            //     this.cantDatosMovimientosTag=sumaeg;
            // }
            // if(informacion == 'ambos'){
            data_2 = [
                { data: DatosEgresos, label: 'Egresos' },
                { data: DatosIngresos, label: 'Ingresos' }
            ];
            var sumaeg = 0;
            for (var i = 0; i < DatosEgresos.length; i++) {
                sumaeg = sumaeg + DatosEgresos[i];
            }
            var sumaing = 0;
            for (var i = 0; i < DatosIngresos.length; i++) {
                sumaing = sumaing + DatosIngresos[i];
            }
            this.cantDatosMovimientosTag = sumaeg + sumaing;
            // }
            console.log(data_2);
            setTimeout(function () {
                _this.barChartData = data_2;
            }, 100);
            this.cargandoGraficoMovimientosTag = false;
        }
        else {
            this.cantDatosMovimientosTag = 0;
            this.cargandoGraficoMovimientosTag = false;
        }
    };
    Dashboard1Component.prototype.exportMovimientosTagAsXLSX = function () {
    };
    Dashboard1Component.prototype.applyFilterHerramienta = function (filterValue) {
        this.dataSourceHerramientas.filter = filterValue.trim().toLowerCase();
        if (this.dataSourceHerramientas.paginator) {
            this.dataSourceHerramientas.paginator.firstPage();
        }
    };
    Dashboard1Component.prototype.applyFilterRepuesto = function (filterValue) {
        this.dataSourceRepuestos.filter = filterValue.trim().toLowerCase();
        if (this.dataSourceRepuestos.paginator) {
            this.dataSourceRepuestos.paginator.firstPage();
        }
    };
    Dashboard1Component.prototype.applyFilterPersona = function (filterValue) {
        this.dataSourcePersonas.filter = filterValue.trim().toLowerCase();
        if (this.dataSourcePersonas.paginator) {
            this.dataSourcePersonas.paginator.firstPage();
        }
    };
    Dashboard1Component.prototype.applyFilterEventoTagHist = function (filterValue) {
        this.dataSourceEventosHist.filter = filterValue.trim().toLowerCase();
        if (this.dataSourceEventosHist.paginator) {
            this.dataSourceEventosHist.paginator.firstPage();
        }
    };
    Dashboard1Component.prototype.applyFilterEventoTagPers = function (filterValue) {
        this.dataSourceEventosPers.filter = filterValue.trim().toLowerCase();
        if (this.dataSourceEventosPers.paginator) {
            this.dataSourceEventosPers.paginator.firstPage();
        }
    };
    Dashboard1Component.prototype.cargarObjetos = function () {
        var _this = this;
        this.isLoadingHerramientas = true;
        this.isLoadingRepuestos = true;
        this._objetoService.itemsTodos()
            .subscribe(function (resp) {
            _this._usuarioService.estadoConexionServidor = true;
            _this.agrupaTipos(resp.items);
        }, function (err) {
            _this._usuarioService.estadoConexionServidor = false;
        });
    };
    Dashboard1Component.prototype.agrupaTipos = function (items) {
        this.herramientasTodo = [];
        this.repuestosTodo = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item.tipo == 'Herramienta') {
                this.herramientasTodo.push(item);
            }
            if (item.tipo == 'Repuesto') {
                this.repuestosTodo.push(item);
            }
        }
        this.dataSourceHerramientas = new MatTableDataSource(this.herramientasTodo);
        this.dataSourceRepuestos = new MatTableDataSource(this.repuestosTodo);
        this.dataSourceHerramientas.paginator = this.paginatorHerramienta;
        this.dataSourceHerramientas.sort = this.sortHerramienta;
        this.dataSourceRepuestos.paginator = this.paginatorRepuesto;
        this.dataSourceRepuestos.sort = this.sortRepuesto;
        this.isLoadingHerramientas = false;
        this.isLoadingRepuestos = false;
    };
    // cargarObjetos(){
    //   this.isLoadingHerramientas = true;
    //   this.isLoadingRepuestos = true;
    //   this._objetoService.itemsTodos()
    //    .subscribe((resp:any)=>{
    //         this.agrupaTipos(resp.items);         
    //   });
    // }
    // agrupaTipos(items: Objeto[]){
    //   //this.herramientasTodo=[];
    //   this.dataSourceHerramientas.data=[];
    //   this.dataSourceRepuestos.data=[]
    //   //this.repuestosTodo=[];
    //   for (let item of items) {
    //     if(item.tipo=='Herramienta'){
    //       //this.herramientasTodo.push(item);
    //       this.dataSourceHerramientas.data.push(item);
    //     }
    //     if(item.tipo=='Repuesto'){
    //       //this.repuestosTodo.push(item);
    //       this.dataSourceRepuestos.data.push(item);
    //     }
    //   }
    //   this.dataSourceHerramientas._updateChangeSubscription();
    //   this.dataSourceRepuestos._updateChangeSubscription();
    //   //this.dataSourceHerramientas.paginator = this.paginatorHerramienta;
    //   //this.dataSourceHerramientas.sort = this.sortHerramienta;
    //   //this.dataSourceRepuestos.paginator = this.paginatorRepuesto;
    //   //this.dataSourceRepuestos.sort = this.sortRepuesto;
    //   this.isLoadingHerramientas = false;
    //   this.isLoadingRepuestos = false;
    // }
    Dashboard1Component.prototype.cargarPersonas = function () {
        var _this = this;
        this.isLoadingPersonas = true;
        this._personaService.itemsTodos()
            .subscribe(function (resp) {
            _this.personasTodo = resp.items;
            _this.dataSourcePersonas = new MatTableDataSource(_this.personasTodo);
            _this.dataSourcePersonas.paginator = _this.paginatorPersona;
            _this.dataSourcePersonas.sort = _this.sortPersona;
            _this.isLoadingPersonas = false;
        });
    };
    Dashboard1Component.prototype.cargarEventoTagObjeto = function () {
        var _this = this;
        this._eventotagobjetoService.itemsRangoUltimos()
            .subscribe(function (resp) {
            _this.eventotagobjetoTodo = resp.items;
            _this.cargarEventoTagPersona();
        });
    };
    Dashboard1Component.prototype.cargarEventoTagPersona = function () {
        var _this = this;
        this._eventotagpersonaService.itemsRangoUltimos()
            .subscribe(function (resp) {
            _this.eventotagpersonaTodo = resp.items;
            _this.analizaDatosEventosPersona();
            _this.analizaDatosEventosTag();
        });
    };
    Dashboard1Component.prototype.analizaDatosEventosPersona = function () {
        var imagenPersona = '';
        var nombre = '';
        var cargo = '';
        var empresa = '';
        var timestampPersona;
        var direccion = '';
        var EventosTagPers = [];
        for (var _i = 0, _a = this.eventotagpersonaTodo; _i < _a.length; _i++) {
            var itemPersona = _a[_i];
            var t2 = new Date(itemPersona.timestamp); //Transforma en hora local
            imagenPersona = itemPersona.persona.imagen;
            nombre = itemPersona.persona.nombre;
            cargo = itemPersona.persona.cargo;
            empresa = itemPersona.persona.empresa;
            timestampPersona = t2;
            if (itemPersona.direccion == '1') {
                direccion = 'ingresa';
            }
            else {
                direccion = 'egresa';
            }
            EventosTagPers.push(createNewEventoTagPers(imagenPersona, nombre, cargo, empresa, timestampPersona, direccion));
        }
        this.dataSourceEventosPers = new MatTableDataSource(EventosTagPers);
        this.dataSourceEventosPers.paginator = this.paginatorEventoTagPers;
        this.dataSourceEventosPers.sort = this.sortEventoTagPers;
    };
    Dashboard1Component.prototype.analizaDatosEventosTag = function () {
        var deltaTiempo = 10; // rango de tiempo entre una persona y un objeto
        var imagenPersona = '';
        var nombre = '';
        var cargo = '';
        var empresa = '';
        var timestampPersona;
        var imagenObjeto = '';
        var tipo = '';
        var numeroparte = '';
        var descripcion = '';
        var timestampObjeto;
        var direccion = '';
        var arrayIdObjeto = [];
        var arrayIdPersona = [];
        var EventosTagHist = [];
        var i = 0;
        var e = 0;
        var objSinPersona = true;
        for (var _i = 0, _a = this.eventotagobjetoTodo; _i < _a.length; _i++) {
            var itemObjeto = _a[_i];
            var t1 = new Date(itemObjeto.timestamp); //Transforma en hora local
            var tpo1 = t1.getTime();
            e = 0;
            objSinPersona = true;
            for (var _b = 0, _c = this.eventotagpersonaTodo; _b < _c.length; _b++) {
                var itemPersona = _c[_b];
                e++;
                var t2 = new Date(itemPersona.timestamp); //Transforma en hora local
                var tpo2 = t2.getTime();
                var diff = Math.abs((tpo2 - tpo1) / 1000);
                if (diff < deltaTiempo) {
                    objSinPersona = false;
                    imagenPersona = itemPersona.persona.imagen;
                    nombre = itemPersona.persona.nombre;
                    cargo = itemPersona.persona.cargo;
                    empresa = itemPersona.persona.empresa;
                    timestampPersona = t2;
                    imagenObjeto = itemObjeto.objeto.imagen;
                    tipo = itemObjeto.objeto.tipo;
                    numeroparte = itemObjeto.nparte;
                    descripcion = itemObjeto.objeto.descripcion;
                    timestampObjeto = t1;
                    if (itemObjeto.direccion == '1') {
                        direccion = 'ingresa';
                    }
                    else {
                        direccion = 'egresa';
                    }
                    EventosTagHist.push(createNewEventoTagHist(imagenPersona, nombre, cargo, empresa, timestampPersona, imagenObjeto, tipo, numeroparte, descripcion, timestampObjeto, direccion));
                }
            }
            if (objSinPersona) {
                imagenPersona = '';
                nombre = '';
                cargo = '';
                empresa = '';
                timestampPersona = t1;
                imagenObjeto = itemObjeto.objeto.imagen;
                tipo = itemObjeto.objeto.tipo;
                numeroparte = itemObjeto.nparte;
                descripcion = itemObjeto.objeto.descripcion;
                timestampObjeto = t1;
                if (itemObjeto.direccion == '1') {
                    direccion = 'ingresa';
                }
                else {
                    direccion = 'egresa';
                }
                EventosTagHist.push(createNewEventoTagHist(imagenPersona, nombre, cargo, empresa, timestampPersona, imagenObjeto, tipo, numeroparte, descripcion, timestampObjeto, direccion));
            }
        }
        this.dataSourceEventosHist = new MatTableDataSource(EventosTagHist);
        this.dataSourceEventosHist.paginator = this.paginatorEventoTagHist;
        this.dataSourceEventosHist.sort = this.sortEventoTagHist;
    };
    tslib_1.__decorate([
        ViewChild(MatTable),
        tslib_1.__metadata("design:type", MatTable)
    ], Dashboard1Component.prototype, "table", void 0);
    tslib_1.__decorate([
        ViewChild('paginatorHerramienta'),
        tslib_1.__metadata("design:type", MatPaginator)
    ], Dashboard1Component.prototype, "paginatorHerramienta", void 0);
    tslib_1.__decorate([
        ViewChild('sortHerramienta'),
        tslib_1.__metadata("design:type", MatSort)
    ], Dashboard1Component.prototype, "sortHerramienta", void 0);
    tslib_1.__decorate([
        ViewChild('paginatorRepuesto'),
        tslib_1.__metadata("design:type", MatPaginator)
    ], Dashboard1Component.prototype, "paginatorRepuesto", void 0);
    tslib_1.__decorate([
        ViewChild('sortRepuesto'),
        tslib_1.__metadata("design:type", MatSort)
    ], Dashboard1Component.prototype, "sortRepuesto", void 0);
    tslib_1.__decorate([
        ViewChild('paginatorPersona'),
        tslib_1.__metadata("design:type", MatPaginator)
    ], Dashboard1Component.prototype, "paginatorPersona", void 0);
    tslib_1.__decorate([
        ViewChild('sortPersona'),
        tslib_1.__metadata("design:type", MatSort)
    ], Dashboard1Component.prototype, "sortPersona", void 0);
    tslib_1.__decorate([
        ViewChild('paginatorEventoTagHist'),
        tslib_1.__metadata("design:type", MatPaginator)
    ], Dashboard1Component.prototype, "paginatorEventoTagHist", void 0);
    tslib_1.__decorate([
        ViewChild('sortEventoTagHist'),
        tslib_1.__metadata("design:type", MatSort)
    ], Dashboard1Component.prototype, "sortEventoTagHist", void 0);
    tslib_1.__decorate([
        ViewChild('paginatorEventoTagPers'),
        tslib_1.__metadata("design:type", MatPaginator)
    ], Dashboard1Component.prototype, "paginatorEventoTagPers", void 0);
    tslib_1.__decorate([
        ViewChild('sortEventoTagPers'),
        tslib_1.__metadata("design:type", MatSort)
    ], Dashboard1Component.prototype, "sortEventoTagPers", void 0);
    Dashboard1Component = tslib_1.__decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard1.component.html',
            styleUrls: ['./dashboard1.component.scss'],
            providers: [
                // The locale would typically be provided on the root module of your application. We do it at
                // the component level here, due to limitations of our example generation script.
                //Para DatePipe
                { provide: LOCALE_ID, useValue: 'es-CL' },
                { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
                // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
                // `MatMomentDateModule` in your applications root module. We provide it at the component level
                // here, due to limitations of our example generation script.
                { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
                // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
                { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
            ],
        }),
        tslib_1.__metadata("design:paramtypes", [DateAdapter,
            MatDialog,
            ObjetoService,
            PersonaService,
            EventotagobjetoService,
            EventotagpersonaService,
            FormBuilder,
            WebsocketService,
            UsuarioService])
    ], Dashboard1Component);
    return Dashboard1Component;
}());
export { Dashboard1Component };
var DialogDashboard = /** @class */ (function () {
    function DialogDashboard(excelService, adapter, dialogRef, 
    //breakpointObserver: BreakpointObserver,
    data) {
        //TABLA
        // breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
        //   this.displayedColumns = result.matches ? 
        //       ['nombre', 'cargo', 'fecha', 'hora', 'numeroparte','descripcion','marca','fechaR','horaR'] : 
        //       ['nombre', 'cargo', 'fecha', 'hora', 'numeroparte','descripcion','marca','fechaR','horaR']; 
        // });
        this.excelService = excelService;
        this.adapter = adapter;
        this.dialogRef = dialogRef;
        this.data = data;
        //date = new FormControl(moment());
        this.dataExcel = [{
                eid: 'e101',
                ename: 'ravi',
                esal: 1000
            }, {
                eid: 'e102',
                ename: 'ram',
                esal: 2000
            }, {
                eid: 'e103',
                ename: 'rajesh',
                esal: 3000
            }];
        // bar chart
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            aspectRatio: 2,
            barThickness: 10,
            pan: {
                enabled: true,
                mode: "x",
                speed: 10,
                threshold: 10
            },
            zoom: {
                enabled: true,
                drag: false,
                mode: "x",
                limits: {
                    max: 10,
                    min: 0.5
                }
            }
        };
        this.barChartLabels = [
            'Lu',
            'Ma',
            'Mi',
            'Ju',
            'Vi',
            'Sa',
            'Do'
        ];
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.barChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Stock' },
        ];
        this.barChartColors = [
            { backgroundColor: '#1976d2' },
        ];
        //TABLA
        this.displayedColumns = ['nombre', 'cargo', 'fecha', 'hora', 'numeroparte', 'descripcion', 'marca', 'fechaR', 'horaR'];
        //TABLA TOTALES
        this.displayedColumnsTOTALES = ['numeroparte', 'descripcion', 'marca', 'fecha', 'minimo', 'ingresos', 'egresos', 'stock', 'alarma'];
        // Create 100 users
        var users = [];
        for (var i = 1; i <= 100; i++) {
            users.push(createNewUser(i));
        }
        // Create 100 users
        var totales = [];
        for (var i = 1; i <= 100; i++) {
            totales.push(createNewTotal(this.data.codigo, this.data.nombre, 'NN'));
        }
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(users);
        // Assign the data to the data source for the table to render
        this.dataSourceTOTALES = new MatTableDataSource(totales);
    }
    //EXPORAR A EXCEL
    DialogDashboard.prototype.exportAsXLSX = function () {
        this.excelService.exportAsExcelFile(this.dataExcel, 'sample');
    };
    DialogDashboard.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    // events
    DialogDashboard.prototype.chartClicked = function (e) {
        // console.log(e);
    };
    DialogDashboard.prototype.chartHovered = function (e) {
        // console.log(e);
    };
    DialogDashboard.prototype.ngAfterViewInit = function () {
        //TABLA
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //TABLA
        this.dataSourceTOTALES.paginator = this.paginator;
        this.dataSourceTOTALES.sort = this.sort;
    };
    DialogDashboard.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], DialogDashboard.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], DialogDashboard.prototype, "sort", void 0);
    DialogDashboard = tslib_1.__decorate([
        Component({
            selector: 'app-dialog-dash1',
            templateUrl: './dialog-dash1.html',
            styleUrls: ['./dialog-dash1.css'],
            providers: [
                // The locale would typically be provided on the root module of your application. We do it at
                // the component level here, due to limitations of our example generation script.
                { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
                // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
                // `MatMomentDateModule` in your applications root module. We provide it at the component level
                // here, due to limitations of our example generation script.
                { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
                // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
                { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
            ]
        }),
        tslib_1.__param(3, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [ExcelService,
            DateAdapter,
            MatDialogRef, Object])
    ], DialogDashboard);
    return DialogDashboard;
}());
export { DialogDashboard };
/** Builds and returns a new User. */
function createNewUser(id) {
    var name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
        ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
        '.';
    return {
        nombre: name,
        cargo: 'personal planta',
        empresa: 'Desimat',
        fecha: '5-11-2018',
        hora: '10:00',
        numeroparte: 'xcxcxc',
        descripcion: 'Herramienta',
        marca: 'NN',
        fechaR: '5-11-2018',
        horaR: '10:00'
    };
}
function createNewTotal(numeroparte, descripcion, marca) {
    return {
        numeroparte: numeroparte,
        descripcion: descripcion,
        marca: marca,
        fecha: '10/10/2018',
        minimo: '20',
        ingresos: '5',
        egresos: '5',
        stock: '5',
        alarma: 'no'
    };
}
function createNewEventoTagPers(imagenPersona, nombre, cargo, empresa, timestampPersona, direccion) {
    return {
        imagenPersona: imagenPersona,
        nombre: nombre,
        cargo: cargo,
        empresa: empresa,
        timestampPersona: timestampPersona,
        direccion: direccion
    };
}
function createNewEventoTagHist(imagenPersona, nombre, cargo, empresa, timestampPersona, imagenObjeto, tipo, numeroparte, descripcion, timestampObjeto, direccion) {
    return {
        imagenPersona: imagenPersona,
        nombre: nombre,
        cargo: cargo,
        empresa: empresa,
        timestampPersona: timestampPersona,
        imagenObjeto: imagenObjeto,
        tipo: tipo,
        numeroparte: numeroparte,
        descripcion: descripcion,
        timestampObjeto: timestampObjeto,
        direccion: direccion
    };
}
//# sourceMappingURL=dashboard1.component.js.map