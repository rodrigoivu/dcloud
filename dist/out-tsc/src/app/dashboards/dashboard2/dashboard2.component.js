import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef, Inject, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WebsocketService, DigitalinputService, AnaloginputService, CanvasdrawService, EventoentradaService, ElementocanvasService, ElementocanvasdiService, ConfiguracionService, AnalogoutputService, DigitaloutputService, ExcelService, UsuarioService, VariableinternacanvasService, VariableinternaService } from '../../services/service.index';
import { Configuracion } from '../../models/configuracion.model';
import { Analogoutput } from '../../models/analogoutput.model';
import { Digitaloutput } from '../../models/digitaloutput.model';
import { Variableinternacanvas } from '../../models/variableinternacanvas.model';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
//import * as Chartist from 'chartist';
//import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
//para el formato de fecha en español de DatePipe
import localeEsCl from '@angular/common/locales/es-CL';
import localeEsClExtra from '@angular/common/locales/extra/es-CL';
registerLocaleData(localeEsCl, 'es-CL', localeEsClExtra);
import Dygraph from '../../synchronization';
//import Dygraph from 'dygraphs';
//LAS SIGUIENTES TRES IMPORTACIONES SON PARA TRABAJAR CON DATEPICKER
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import * as _moment from 'moment';
// //PARÁMETROS PARA FORMATO DE FECHA
// const moment =  _moment;
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
//const data: any = require('./data.json');
var activo = '#F44336';
// export interface DataHist {
//   date:Date,
//   valor:number
// }
var Dashboard2Component = /** @class */ (function () {
    function Dashboard2Component(
    //breakpointObserver: BreakpointObserver,
    _websocketService, _digitalinputService, _analoginputService, _canvasdrawService, _eventoentradaService, _elementocanvasService, _elementocanvasdiService, _configuracionService, _analogoutputService, _digitaloutputService, _excelService, _usuarioService, _variableinternaService, _variableinternacanvasService, fb, 
    //private renderer: Renderer2,
    dialog) {
        var _this = this;
        this._websocketService = _websocketService;
        this._digitalinputService = _digitalinputService;
        this._analoginputService = _analoginputService;
        this._canvasdrawService = _canvasdrawService;
        this._eventoentradaService = _eventoentradaService;
        this._elementocanvasService = _elementocanvasService;
        this._elementocanvasdiService = _elementocanvasdiService;
        this._configuracionService = _configuracionService;
        this._analogoutputService = _analogoutputService;
        this._digitaloutputService = _digitaloutputService;
        this._excelService = _excelService;
        this._usuarioService = _usuarioService;
        this._variableinternaService = _variableinternaService;
        this._variableinternacanvasService = _variableinternacanvasService;
        this.fb = fb;
        this.dialog = dialog;
        this.puntero = 'fueraElementoCanvas';
        //Flag que indican respuesta de las señales analogas
        this.respuestaDO1 = false;
        this.respuestaAO1 = false;
        this.respuestaAO2 = false;
        this.respuestaAO3 = false;
        this.respuestaVI1 = false;
        this.respuestaVI2 = false;
        this.respuestaVI3 = false;
        //Cambio de color en salidas 
        this.AO1sendColor = [false, false, false, false, false, false, false, false];
        this.AO2sendColor = [false, false, false, false, false, false, false, false];
        this.AO3sendColor = [false, false, false, false, false, false, false, false];
        this.VI1sendColor = [false, false, false, false, false, false, false, false];
        this.VI2sendColor = [false, false, false, false, false, false, false, false];
        this.VI3sendColor = [false, false, false, false, false, false, false, false];
        //DATOS DE CONFIGURACION IMAGEN DE FONDO
        this.config = new Configuracion('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
        this.isConfig = false;
        this.lastTimeSenDBdeAI = new Date();
        this.lastTimeSenDBdeVI = new Date(); //no se ocupa
        this.grafoAI = [];
        this.encuadraGrafico = false;
        this.cargandoGraficoHist = false;
        this.cargandoGraficoEvento = false;
        this.listoParaExportar = false;
        this.listoParaExportarEvento = false;
        this.cantDiasHist = 0;
        this.cantDatosHist = 0;
        this.cantDiasEvento = 0;
        this.cantDatosEvento = 0;
        this.dataAI1 = [[new Date("2008/05/07"), 75],
            [new Date("2008/05/08"), 70],
            [new Date("2008/05/09"), 80]
        ];
        this.dataAI2 = [[new Date("2008/05/07"), 20],
            [new Date("2008/05/08"), 20],
            [new Date("2008/05/09"), 80]
        ];
        this.dataAI3 = [[new Date("2008/05/07"), 55],
            [new Date("2008/05/08"), 65],
            [new Date("2008/05/09"), 15]
        ];
        this.dataAI4 = [[new Date("2008/05/07"), 12],
            [new Date("2008/05/08"), 24],
            [new Date("2008/05/09"), 1]
        ];
        this.dataAI5 = [[new Date("2008/05/07"), 12],
            [new Date("2008/05/08"), 65],
            [new Date("2008/05/09"), 5]
        ];
        this.dataAI6 = [[new Date("2008/05/07"), 5],
            [new Date("2008/05/08"), 10],
            [new Date("2008/05/09"), 35]
        ];
        this.dataAI7 = [[new Date("2008/05/07"), 99],
            [new Date("2008/05/08"), 1],
            [new Date("2008/05/09"), 58]
        ];
        this.dataAI8 = [[new Date("2008/05/07"), 65],
            [new Date("2008/05/08"), 27],
            [new Date("2008/05/09"), 12]
        ];
        this.DataAI = [this.dataAI1, this.dataAI2, this.dataAI3, this.dataAI4, this.dataAI5, this.dataAI6, this.dataAI7, this.dataAI8];
        this.DataAIinstante = [1, 2, 3, 4, 5, 6, 7, 8];
        this.dataVI1 = [];
        this.dataVI2 = [];
        this.dataVI3 = [];
        this.dataVI4 = [];
        this.dataVI5 = [];
        this.dataVI6 = [];
        this.dataVI7 = [];
        this.dataVI8 = [];
        this.dataVI9 = [];
        this.dataVI10 = [];
        this.dataVI11 = [];
        this.dataVI12 = [];
        this.dataVI13 = [];
        this.dataVI14 = [];
        this.dataVI15 = [];
        this.dataVI16 = [];
        this.dataVI17 = [];
        this.dataVI18 = [];
        this.dataVI19 = [];
        this.dataVI20 = [];
        this.dataVI21 = [];
        this.dataVI22 = [];
        this.dataVI23 = [];
        this.dataVI24 = [];
        this.DataVI = [
            this.dataVI1,
            this.dataVI2,
            this.dataVI3,
            this.dataVI4,
            this.dataVI5,
            this.dataVI6,
            this.dataVI7,
            this.dataVI8,
            this.dataVI9,
            this.dataVI10,
            this.dataVI11,
            this.dataVI12,
            this.dataVI13,
            this.dataVI14,
            this.dataVI15,
            this.dataVI16,
            this.dataVI17,
            this.dataVI18,
            this.dataVI19,
            this.dataVI20,
            this.dataVI21,
            this.dataVI22,
            this.dataVI23,
            this.dataVI24
        ];
        this.DataVIinstante = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //SALIDAS DIGITALES Y ANALOGAS DEL FORMULARIO
        this.itemsDO1 = [
            new Digitaloutput('', null, ''),
            new Digitaloutput('', null, ''),
            new Digitaloutput('', null, ''),
            new Digitaloutput('', null, ''),
            new Digitaloutput('', null, ''),
            new Digitaloutput('', null, ''),
            new Digitaloutput('', null, ''),
            new Digitaloutput('', null, '')
        ];
        this.itemsAO1 = [
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
        ];
        this.itemsAO2 = [
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
        ];
        this.itemsAO3 = [
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
            new Analogoutput('', '', null, null, null, ''),
        ];
        this.itemsVI1 = [
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
        ];
        this.itemsVI2 = [
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
        ];
        this.itemsVI3 = [
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
            new Variableinternacanvas('', '', '', null, null, null, null, null, null, '', '', '', '', '', '', false, ''),
        ];
        this.tituloGraficoHstorico = '';
        //Retrasos para postergar el cambio de contorl de salidas digitales y analogas
        //Aviso error en formulario
        this.errRango = false;
        this.errRangoEvento = false;
        //indica que AI se muestran
        this.muestraAI = [true, true, true, true, false, false, false, false];
        this.selMuestraAI = [0, 1, 2, 3];
        this.dataWebsocket = null;
        this.di1 = false;
        this.di2 = false;
        this.di3 = false;
        this.di4 = false;
        this.di5 = false;
        this.di6 = false;
        this.di7 = false;
        this.di8 = false;
        this.displayedColumns = ['timestamp', 'sensor', 'descripcion', 'evento', 'valor'];
        this.dataExcel = [];
        this.dataExcelEvento = [];
        this.diasExcelEvento = [];
        this.nombreArchivoExcel = '';
        this.nombreArchivoExcelEvento = 'Eventos';
        // GRÁFICO DE EVENTOS
        this.graficoEventoOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
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
        this.graficoEventoColors = [
            { backgroundColor: '#F44336' },
            { backgroundColor: '#FF8A80' },
            { backgroundColor: '#E91E63' },
            { backgroundColor: '#FF80AB' },
            { backgroundColor: '#9C27B0' },
            { backgroundColor: '#EA80FC' },
            { backgroundColor: '#673AB7' },
            { backgroundColor: '#B388FF' },
            { backgroundColor: '#4CAF50' },
            { backgroundColor: '#B9F6CA' },
            { backgroundColor: '#8BC34A' },
            { backgroundColor: '#CCFF90' },
            { backgroundColor: '#CDDC39' },
            { backgroundColor: '#F4FF81' },
            { backgroundColor: '#009688' },
            { backgroundColor: '#A7FFEB' },
            { backgroundColor: '#FFEB3B' },
            { backgroundColor: '#FFFF00' },
            { backgroundColor: '#FFD600' },
            { backgroundColor: '#FFC107' },
            { backgroundColor: '#FFD740' },
            { backgroundColor: '#FFAB00' },
            { backgroundColor: '#FF9800' },
            { backgroundColor: '#FFAB40' },
            { backgroundColor: '#FF6D00' },
            { backgroundColor: '#FF5722' },
            { backgroundColor: '#FF6E40' },
            { backgroundColor: '#DD2C00' },
            { backgroundColor: '#3F51B5' },
            { backgroundColor: '#8C9EFF' },
            { backgroundColor: '#536DFE' },
            { backgroundColor: '#304FFE' },
            { backgroundColor: '#2196F3' },
            { backgroundColor: '#82B1FF' },
            { backgroundColor: '#448AFF' },
            { backgroundColor: '#2962FF' },
            { backgroundColor: '#03A9F4' },
            { backgroundColor: '#80D8FF' },
            { backgroundColor: '#00B0FF' },
            { backgroundColor: '#0091EA' },
        ];
        this.graficoEventoType = 'bar';
        this.graficoEventoLegend = true;
        this.graficoEventoLabels = ['', '', '', '', '', '', ''];
        //graficoEventoData: any[] = [];
        // public graficoEventoData: any[] = [
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' },
        //   { data: [0], label: '' }
        // ];
        this.graficoEventoData = [
            {
                data: [],
                label: '',
            }
        ];
        //DETECTA INFORMACION DE AI DESDE SOCKET
        this.suscribirMuestreoAI = this._websocketService.recibeAI().pipe(retry())
            .subscribe(function (data) {
            _this.cargarDatosAIinstanteSocket(data.data);
        });
        //DETECTA INFORMACION DE DI DESDE SOCKET
        this.suscribirMuestreoDI = this._websocketService.recibeDI().pipe(retry())
            .subscribe(function (data) {
            _this.cargarEstadoDISocket(data.data);
        });
        //DETECTA INFORMACION DE DO DESDE SOCKET
        this.suscribirMuestreoDO = this._websocketService.recibeDO().pipe(retry())
            .subscribe(function (data) {
            _this.respuestaDO1 = true;
            _this.iniciaDatosDigitalOutputSocket(data.data);
        });
        //DETECTA INFORMACION DE AO1 DESDE SOCKET
        this.suscribirMuestreoAO1 = this._websocketService.recibeAO1().pipe(retry())
            .subscribe(function (data) {
            _this.respuestaAO1 = true;
            _this.inicializaDatosAnalogOutputUnoSocket(data.data);
        });
        //DETECTA INFORMACION DE AO2 DESDE SOCKET
        this.suscribirMuestreoAO2 = this._websocketService.recibeAO2().pipe(retry())
            .subscribe(function (data) {
            _this.respuestaAO2 = true;
            _this.inicializaDatosAnalogOutputDosSocket(data.data);
        });
        //DETECTA INFORMACION DE AO3 DESDE SOCKET
        this.suscribirMuestreoAO3 = this._websocketService.recibeAO3().pipe(retry())
            .subscribe(function (data) {
            _this.respuestaAO3 = true;
            _this.inicializaDatosAnalogOutputTresSocket(data.data);
        });
        //DETECTA INFORMACION DE VI DESDE SOCKET
        this.suscribirMuestreoVI = this._websocketService.recibeVI().pipe(retry())
            .subscribe(function (data) {
            //console.log(data);
            if (data.data.regleta == 1) {
                _this.respuestaVI1 = true;
                _this.recargaDatosVI1Socket(data.data);
            }
            if (data.data.regleta == 2) {
                _this.respuestaVI2 = true;
                _this.recargaDatosVI2Socket(data.data);
            }
            if (data.data.regleta == 3) {
                _this.respuestaVI3 = true;
                _this.recargaDatosVI3Socket(data.data);
            }
        });
        //MUESTREO DI
        // this.suscribirMuestreoDI = this.observableMuestreoDI().pipe( retry() )
        //   .subscribe ( () =>{
        //       this.cargarEstadoDI();
        // });
        //MUESTREO AI
        // this.suscribirMuestreoAI = this.observableMuestreoAI().pipe( retry() )
        //   .subscribe ( () =>{
        //       this.cargarDatosAIinstante();
        // });
        //MUESTREO DO
        // this.suscribirMuestreoDO = this.observableMuestreoDO().pipe( retry() )
        //   .subscribe ( () =>{
        //       this.iniciaDatosDigitalOutput();
        // });
        //MUESTREO AO
        // this.suscribirMuestreoAO = this.observableMuestreoAO().pipe( retry() )
        //   .subscribe ( () =>{
        //       this.inicializaDatosAlalogOutput();
        // });
        //INICIALIZA DATOS
        //this.inicializaDatosVacios();
        //INICIALIZA FORMULARIOS  
        this.inicializaformOpcionMostrarAI();
        this.inicializaformControlDO1();
        this.inicializaformControlAO1();
        this.inicializaformControlAO2();
        this.inicializaformControlAO3();
        this.inicializaformControlVI1();
        this.inicializaformControlVI2();
        this.inicializaformControlVI3();
        this.inicializaformGraficaHistorico();
        this.inicializaformformGraficaEvento();
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE MUESTRA GRAFICOS
        this.formOpcionMostrarAI.get('muestraAIpos1').valueChanges.subscribe(function (val) {
            _this.setMuestraAI(0, val);
        });
        this.formOpcionMostrarAI.get('muestraAIpos2').valueChanges.subscribe(function (val) {
            _this.setMuestraAI(1, val);
        });
        this.formOpcionMostrarAI.get('muestraAIpos3').valueChanges.subscribe(function (val) {
            _this.setMuestraAI(2, val);
        });
        this.formOpcionMostrarAI.get('muestraAIpos4').valueChanges.subscribe(function (val) {
            _this.setMuestraAI(3, val);
        });
        this.formOpcionMostrarAI.get('sincronizaZoom').valueChanges.subscribe(function (val) {
            val ? _this.sincronizaZoom() : _this.desSincronizaZoom();
        });
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE DO1
        this.formControlDO1.valueChanges.subscribe(function (val) {
            _this.enviaCambioControlDO(1);
            _this.suscribirEnviaDO1 = _this.observableEnvioSalidas().pipe(retry())
                .subscribe(function (numero) { }, function (error) { }, function () {
                if (!_this.respuestaDO1) {
                    _this.iniciaDatosDigitalOutput();
                }
                _this.respuestaDO1 = false;
            });
        });
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE AO1
        this.formControlAO1.valueChanges.throttleTime(100).subscribe(function (val) {
            _this.enviaCambioControlAO(1);
            _this.suscribirEnviaAO1 = _this.observableEnvioSalidas().pipe(retry())
                .subscribe(function (numero) { }, function (error) { }, function () {
                if (!_this.respuestaAO1) {
                    _this.inicializaDatosAnalogOutput();
                }
                _this.respuestaAO1 = false;
            });
        });
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE AO2
        this.formControlAO2.valueChanges.throttleTime(100).subscribe(function (val) {
            _this.enviaCambioControlAO(2);
            _this.suscribirEnviaAO2 = _this.observableEnvioSalidas().pipe(retry())
                .subscribe(function (numero) { }, function (error) { }, function () {
                if (!_this.respuestaAO2) {
                    _this.inicializaDatosAnalogOutput();
                }
                _this.respuestaAO2 = false;
            });
        });
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE AO3
        this.formControlAO3.valueChanges.throttleTime(100).subscribe(function (val) {
            _this.enviaCambioControlAO(3);
            _this.suscribirEnviaAO3 = _this.observableEnvioSalidas().pipe(retry())
                .subscribe(function (numero) { }, function (error) { }, function () {
                if (!_this.respuestaAO3) {
                    _this.inicializaDatosAnalogOutput();
                }
                _this.respuestaAO3 = false;
            });
        });
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE VI1
        this.formControlVI1.valueChanges.throttleTime(100).subscribe(function (val) {
            _this.enviaCambioControlVI(1);
            _this.suscribirEnviaVI1 = _this.observableEnvioSalidas().pipe(retry())
                .subscribe(function (numero) { }, function (error) { }, function () {
                if (!_this.respuestaVI1) {
                    _this.cargarDatosVIinicial();
                    //this.recargaDatosVariableinternaControl(1);
                }
                _this.respuestaVI1 = false;
            });
        });
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE VI2
        this.formControlVI2.valueChanges.throttleTime(100).subscribe(function (val) {
            _this.enviaCambioControlVI(2);
            _this.suscribirEnviaVI2 = _this.observableEnvioSalidas().pipe(retry())
                .subscribe(function (numero) { }, function (error) { }, function () {
                if (!_this.respuestaVI2) {
                    _this.cargarDatosVIinicial();
                    //this.recargaDatosVariableinternaControl(2);
                }
                _this.respuestaVI2 = false;
            });
        });
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE VI3
        this.formControlVI3.valueChanges.throttleTime(100).subscribe(function (val) {
            _this.enviaCambioControlVI(3);
            _this.suscribirEnviaVI3 = _this.observableEnvioSalidas().pipe(retry())
                .subscribe(function (numero) { }, function (error) { }, function () {
                if (!_this.respuestaVI3) {
                    _this.cargarDatosVIinicial();
                    // this.recargaDatosVariableinternaControl(3);
                }
                _this.respuestaVI3 = false;
            });
        });
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE AO1 de cada item
        this.formControlAO1.get('controlAO1').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO1sendColor[0] = true; });
        this.formControlAO1.get('controlAO2').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO1sendColor[1] = true; });
        this.formControlAO1.get('controlAO3').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO1sendColor[2] = true; });
        this.formControlAO1.get('controlAO4').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO1sendColor[3] = true; });
        this.formControlAO1.get('controlAO5').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO1sendColor[4] = true; });
        this.formControlAO1.get('controlAO6').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO1sendColor[5] = true; });
        this.formControlAO1.get('controlAO7').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO1sendColor[6] = true; });
        this.formControlAO1.get('controlAO8').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO1sendColor[7] = true; });
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE AO2 de cada item
        this.formControlAO2.get('controlAO1').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO2sendColor[0] = true; });
        this.formControlAO2.get('controlAO2').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO2sendColor[1] = true; });
        this.formControlAO2.get('controlAO3').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO2sendColor[2] = true; });
        this.formControlAO2.get('controlAO4').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO2sendColor[3] = true; });
        this.formControlAO2.get('controlAO5').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO2sendColor[4] = true; });
        this.formControlAO2.get('controlAO6').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO2sendColor[5] = true; });
        this.formControlAO2.get('controlAO7').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO2sendColor[6] = true; });
        this.formControlAO2.get('controlAO8').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO2sendColor[7] = true; });
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE AO3 de cada item
        this.formControlAO3.get('controlAO1').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO3sendColor[0] = true; });
        this.formControlAO3.get('controlAO2').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO3sendColor[1] = true; });
        this.formControlAO3.get('controlAO3').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO3sendColor[2] = true; });
        this.formControlAO3.get('controlAO4').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO3sendColor[3] = true; });
        this.formControlAO3.get('controlAO5').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO3sendColor[4] = true; });
        this.formControlAO3.get('controlAO6').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO3sendColor[5] = true; });
        this.formControlAO3.get('controlAO7').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO3sendColor[6] = true; });
        this.formControlAO3.get('controlAO8').valueChanges.throttleTime(100).subscribe(function (val) { _this.AO3sendColor[7] = true; });
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE VI1 de cada item
        this.formControlVI1.get('controlVI1').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI1sendColor[0] = true; });
        this.formControlVI1.get('controlVI2').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI1sendColor[1] = true; });
        this.formControlVI1.get('controlVI3').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI1sendColor[2] = true; });
        this.formControlVI1.get('controlVI4').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI1sendColor[3] = true; });
        this.formControlVI1.get('controlVI5').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI1sendColor[4] = true; });
        this.formControlVI1.get('controlVI6').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI1sendColor[5] = true; });
        this.formControlVI1.get('controlVI7').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI1sendColor[6] = true; });
        this.formControlVI1.get('controlVI8').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI1sendColor[7] = true; });
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE VI2 de cada item
        this.formControlVI2.get('controlVI1').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI2sendColor[0] = true; });
        this.formControlVI2.get('controlVI2').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI2sendColor[1] = true; });
        this.formControlVI2.get('controlVI3').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI2sendColor[2] = true; });
        this.formControlVI2.get('controlVI4').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI2sendColor[3] = true; });
        this.formControlVI2.get('controlVI5').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI2sendColor[4] = true; });
        this.formControlVI2.get('controlVI6').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI2sendColor[5] = true; });
        this.formControlVI2.get('controlVI7').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI2sendColor[6] = true; });
        this.formControlVI2.get('controlVI8').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI2sendColor[7] = true; });
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE VI3 de cada item
        this.formControlVI3.get('controlVI1').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI3sendColor[0] = true; });
        this.formControlVI3.get('controlVI2').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI3sendColor[1] = true; });
        this.formControlVI3.get('controlVI3').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI3sendColor[2] = true; });
        this.formControlVI3.get('controlVI4').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI3sendColor[3] = true; });
        this.formControlVI3.get('controlVI5').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI3sendColor[4] = true; });
        this.formControlVI3.get('controlVI6').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI3sendColor[5] = true; });
        this.formControlVI3.get('controlVI7').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI3sendColor[6] = true; });
        this.formControlVI3.get('controlVI8').valueChanges.throttleTime(100).subscribe(function (val) { _this.VI3sendColor[7] = true; });
    }
    Dashboard2Component.prototype.ngAfterViewInit = function () {
        //Inicia el contexto de canvas
        this.inicializaCanvas();
        //CONFIGURACION
        this.cargaConfiguracion();
        //CANVAS PLANTA
        this.iniciaDatosElementoCanvas();
        this.iniciaDatosElementoCanvasDi();
        //VARIABLES INTERNAS
        this.iniciaDatosVariableinternaCanvas();
        //CONTORL DO AO
        this.iniciaDatosDigitalOutput();
        this.inicializaDatosAnalogOutput();
        //Crea los dyGraph inicialmente
        this.setGraficosAIinicial();
        //Carga los datos para el gráfico dyGraph con 400 datos, vuelve a setear los datos de los gráficos y los encuadra 
        this.cargarDatosAI();
        this.cargarDatosVI();
    };
    Dashboard2Component.prototype.ngOnDestroy = function () {
        this.suscribirMuestreoDI.unsubscribe();
        this.suscribirMuestreoAI.unsubscribe();
        this.suscribirMuestreoDO.unsubscribe();
        this.suscribirMuestreoAO1.unsubscribe();
        this.suscribirMuestreoAO2.unsubscribe();
        this.suscribirMuestreoAO3.unsubscribe();
        // this.suscribirEnviaAO1.unsubscribe();
        // this.suscribirEnviaAO2.unsubscribe();
        // this.suscribirEnviaAO3.unsubscribe();
        // this.suscribirEnviaDO1.unsubscribe();
        this.datosAI = [];
        //this.grafoAI=[];
        this.dataAI1 = [];
        this.dataAI2 = [];
        this.dataAI3 = [];
        this.dataAI4 = [];
        this.dataAI5 = [];
        this.dataAI6 = [];
        this.dataAI7 = [];
        this.dataAI8 = [];
        this.DataAI = [];
        this.syncZoom.detach();
    };
    Dashboard2Component.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    Dashboard2Component.prototype.cargaConfiguracion = function () {
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
    Dashboard2Component.prototype.crearConfiguracion = function () {
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
        });
    };
    Dashboard2Component.prototype.observableEnvioSalidas = function () {
        return new Observable(function (observer) {
            var contador = 0;
            var intervalo = setInterval(function () {
                contador += 1;
                observer.next(contador);
                if (contador === 3) {
                    clearInterval(intervalo);
                    observer.complete();
                }
            }, 1000);
        });
    };
    Dashboard2Component.prototype.observableMuestreoDI = function () {
        return new Observable(function (observer) {
            var intervalo = setInterval(function () {
                observer.next();
            }, 757);
        });
    };
    Dashboard2Component.prototype.observableMuestreoAI = function () {
        return new Observable(function (observer) {
            var intervalo = setInterval(function () {
                observer.next();
            }, 955);
        });
    };
    Dashboard2Component.prototype.observableMuestreoDO = function () {
        return new Observable(function (observer) {
            var intervalo = setInterval(function () {
                observer.next();
            }, 5000);
        });
    };
    Dashboard2Component.prototype.observableMuestreoAO = function () {
        return new Observable(function (observer) {
            var intervalo = setInterval(function () {
                observer.next();
            }, 5600);
        });
    };
    Dashboard2Component.prototype.setMuestraAI = function (pos, val) {
        var valAI = parseInt(val);
        for (var i = 0; i < 8; i++) {
            this.muestraAI[i] = false;
        }
        this.selMuestraAI[pos] = valAI;
        for (var i = 0; i < 4; i++) {
            var e = this.selMuestraAI[i];
            this.muestraAI[e] = true;
        }
        this.setGraficosAI();
    };
    Dashboard2Component.prototype.setOpcionesGraficosAI = function (numeroGrafico) {
        var optionsAI;
        var elementoCanvas;
        if (this.datosElementocanvas) {
            elementoCanvas = this.datosElementocanvas[numeroGrafico - 1];
            optionsAI = {
                width: -1,
                height: 165,
                legend: 'follow',
                labels: ['Date', elementoCanvas.unidad],
                ylabel: elementoCanvas.unidad,
                xAxisHeight: 30,
                titleHeight: 22,
                title: elementoCanvas.name,
                animatedZooms: true,
                group: 'grupo1',
                colors: ['#26c6da'],
                labelsDiv: this.myDivLegend.nativeElement,
                drawPoints: true,
                fillGraph: true,
                strokeWidth: 2.5,
                pointSize: 2,
                drawGrid: true,
                gridLineWidth: 1,
                independentTicks: true,
                gridLinePattern: [4, 4],
                gridLineColor: '#e2eaeb',
                highlightCircleSize: 3.5
            };
        }
        else {
            optionsAI = {
                width: -1,
                height: 165,
                legend: 'follow',
                labels: ['Date', ''],
                ylabel: '',
                xAxisHeight: 30,
                titleHeight: 22,
                title: '',
                animatedZooms: true,
                group: 'grupo1',
                colors: ['#26c6da'],
                labelsDiv: this.myDivLegend.nativeElement,
                drawPoints: true,
                fillGraph: true,
                strokeWidth: 2.5,
                pointSize: 2,
                drawGrid: true,
                gridLineWidth: 1,
                independentTicks: true,
                gridLinePattern: [4, 4],
                gridLineColor: '#e2eaeb',
                highlightCircleSize: 3.5
            };
        }
        return optionsAI;
    };
    Dashboard2Component.prototype.setOpcionesGraficoHistorico = function (tipo, idGrafico) {
        var optionsGraph;
        var elementoCanvas;
        var elementoCanvasDi;
        if (tipo == 'ai') {
            elementoCanvas = this.datosElementocanvas[idGrafico];
            this.nombreArchivoExcel = elementoCanvas.name;
            optionsGraph = {
                width: -1,
                height: 300,
                legend: 'always',
                labels: ['Date', elementoCanvas.unidad],
                ylabel: elementoCanvas.unidad,
                xAxisHeight: 30,
                titleHeight: 22,
                title: elementoCanvas.name,
                animatedZooms: true,
                group: 'grupo2',
                colors: ['#26c6da'],
                labelsDiv: this.DivLegendHistorico.nativeElement,
                drawPoints: true,
                fillGraph: true,
                strokeWidth: 2.5,
                pointSize: 2,
                drawGrid: true,
                gridLineWidth: 1,
                independentTicks: true,
                gridLinePattern: [4, 4],
                gridLineColor: '#e2eaeb',
                highlightCircleSize: 3.5
            };
        }
        else {
            elementoCanvasDi = this.datosElementocanvasDi[idGrafico];
            this.nombreArchivoExcel = elementoCanvasDi.name;
            optionsGraph = {
                width: -1,
                height: 300,
                legend: 'always',
                labels: ['Date', 'Estado'],
                xAxisHeight: 30,
                titleHeight: 22,
                title: elementoCanvasDi.name,
                animatedZooms: true,
                group: 'grupo2',
                colors: ['#26c6da'],
                labelsDiv: this.DivLegendHistorico.nativeElement,
                drawPoints: true,
                fillGraph: true,
                strokeWidth: 2.5,
                pointSize: 2,
                drawGrid: true,
                gridLineWidth: 1,
                independentTicks: true,
                gridLinePattern: [4, 4],
                gridLineColor: '#e2eaeb',
                highlightCircleSize: 3.5
            };
        }
        return optionsGraph;
    };
    Dashboard2Component.prototype.getDiv = function (i) {
        switch (i) {
            case 0: {
                return this.myDiv1.nativeElement;
                break;
            }
            case 1: {
                return this.myDiv2.nativeElement;
                break;
            }
            case 2: {
                return this.myDiv3.nativeElement;
                break;
            }
            case 3: {
                return this.myDiv4.nativeElement;
                break;
            }
            default: {
                return this.myDiv1.nativeElement;
                break;
            }
        }
    };
    Dashboard2Component.prototype.setGraficosAI = function () {
        //Para encuadrar el grafico dygraph, es un problema de inicio
        if (!this.encuadraGrafico) {
            this.setGraficosAIinicial();
            this.encuadraGrafico = true;
            return;
        }
        //var g:Dygraph;
        var valAI;
        var numeroGraficoAI;
        for (var i = 0; i < 4; i++) {
            valAI = this.selMuestraAI[i];
            numeroGraficoAI = valAI + 1;
            this.grafoAI[i].updateOptions({ 'file': this.DataAI[valAI] });
            this.grafoAI[i].updateOptions({ 'title': this.datosElementocanvas[valAI].name });
            this.grafoAI[i].updateOptions({ 'ylabel': this.datosElementocanvas[valAI].unidad });
            this.grafoAI[i].updateOptions({ 'labels': ['Date', this.datosElementocanvas[valAI].unidad] });
        }
    };
    Dashboard2Component.prototype.setGraficosAIinicial = function () {
        this.grafoAI = [];
        var g;
        var valAI;
        var numeroGraficoAI;
        for (var i = 0; i < 4; i++) {
            valAI = this.selMuestraAI[i];
            numeroGraficoAI = valAI + 1;
            // en este punto se renderizan los gráficos
            g = new Dygraph(this.getDiv(i), this.DataAI[valAI], this.setOpcionesGraficosAI(numeroGraficoAI));
            this.grafoAI.push(g);
        }
        this.syncZoom = Dygraph.synchronize([this.grafoAI[0], this.grafoAI[1], this.grafoAI[2], this.grafoAI[3]], {
            selection: false,
            zoom: false,
            range: false
        });
    };
    Dashboard2Component.prototype.setGraficoHistorico = function (tipo, idGrafico, data) {
        var g;
        this.dataExcel = data;
        g = new Dygraph(this.DivHistorico.nativeElement, data, this.setOpcionesGraficoHistorico(tipo, idGrafico));
        this.grafoHist = g;
        this.cargandoGraficoHist = false;
    };
    Dashboard2Component.prototype.dibujaPuntoPersonalizado = function () {
    };
    Dashboard2Component.prototype.inicializaDatosVacios = function () {
        // var itemVacioDO:Digitaloutput={
        //   name:'',
        //   valor:null,
        //   header:''
        // }
        // var itemVacioAO:Analogoutput={
        //   name: '',
        //   unidad: '',
        //   valor: null,
        //   min:null,
        //   max:null,
        //   header:''
        // }
        // for (var i = 0; i < 8; ++i) {
        //   this.datosDigitalOuput.push(itemVacioDO);
        //   this.itemsAO1.push(itemVacioAO);
        //   this.itemsAO2.push(itemVacioAO);
        //   this.itemsAO3.push(itemVacioAO);
        // }
    };
    Dashboard2Component.prototype.inicializaCanvas = function () {
        this._canvasdrawService.creaContexto(this.canvas.nativeElement);
    };
    Dashboard2Component.prototype.iniciaDatosElementoCanvas = function () {
        var _this = this;
        this._elementocanvasService.itemsTodos()
            .subscribe(function (resp) {
            _this.datosElementocanvas = resp.items;
            //dibuja inicialmente los datos de AI en el canvas
            _this.cargarDatosAIinstanteInicial();
        });
    };
    Dashboard2Component.prototype.iniciaDatosElementoCanvasDi = function () {
        var _this = this;
        this._elementocanvasdiService.itemsTodos()
            .subscribe(function (resp) {
            _this.datosElementocanvasDi = resp.items;
            //carga los estados de las DI y dibuja en canvas
            _this.cargarEstadoDI();
        });
    };
    Dashboard2Component.prototype.iniciaDatosVariableinternaCanvas = function () {
        var _this = this;
        this._variableinternacanvasService.itemsTodos()
            .subscribe(function (resp) {
            _this.datosVIcanvas = resp.items;
            //carga los valores iniciales de VI , dibuja en canvas y actualiza controles
            _this.cargarDatosVIinicial();
        });
    };
    //Si al cambiar en el control slide no se recibe respuesta despues de 5 segundos, vuelve al valor anterior
    Dashboard2Component.prototype.recargaDatosVariableinternaControl = function (regleta) {
        var _this = this;
        this._variableinternacanvasService.itemsTodos()
            .subscribe(function (resp) {
            _this.datosVIcanvas = resp.items;
            //muestra los controles slide
            switch (regleta) {
                case 1:
                    _this.recargaDatosVI1();
                    break;
                case 2:
                    _this.recargaDatosVI2();
                    break;
                case 3:
                    _this.recargaDatosVI3();
                    break;
                default:
                    // code...
                    break;
            }
        });
    };
    //recargar valores desde valores ya guardados
    Dashboard2Component.prototype.recargaDatosVI1 = function () {
        this.addItemVI1();
        this.setFormControlVI1();
    };
    Dashboard2Component.prototype.recargaDatosVI2 = function () {
        this.addItemVI2();
        this.setFormControlVI2();
    };
    Dashboard2Component.prototype.recargaDatosVI3 = function () {
        this.addItemVI3();
        this.setFormControlVI3();
    };
    //recargar valores al recibir un dato mediante socket
    Dashboard2Component.prototype.recargaDatosVI1Socket = function (data) {
        this.addItemVI1Socket(data);
        this.setFormControlVI1();
    };
    Dashboard2Component.prototype.recargaDatosVI2Socket = function (data) {
        this.addItemVI2Socket(data);
        this.setFormControlVI2();
    };
    Dashboard2Component.prototype.recargaDatosVI3Socket = function (data) {
        this.addItemVI3Socket(data);
        this.setFormControlVI3();
    };
    Dashboard2Component.prototype.iniciaDatosDigitalOutput = function () {
        var _this = this;
        this._digitaloutputService.itemsTodos()
            .subscribe(function (resp) {
            _this.datosDigitalOuput = resp.items;
            _this.addItemDO1();
            _this.setFormControlDO1();
        });
    };
    Dashboard2Component.prototype.iniciaDatosDigitalOutputSocket = function (data) {
        // for (var i = 0; i < 8; ++i) {
        //     this.itemsDO1[i].valor=data[i];
        //   }
        this.setFormControlDO1Socket(data);
    };
    Dashboard2Component.prototype.inicializaDatosAnalogOutput = function () {
        var _this = this;
        this._analogoutputService.itemsTodos()
            .subscribe(function (resp) {
            _this.datosAnalogOutput = resp.items;
            _this.addItemAO1();
            _this.addItemAO2();
            _this.addItemAO3();
            _this.setFormControlAO1();
            _this.setFormControlAO2();
            _this.setFormControlAO3();
        });
    };
    Dashboard2Component.prototype.inicializaDatosAnalogOutputUnoSocket = function (data) {
        this.addItemAO1Socket(data);
        this.setFormControlAO1();
    };
    Dashboard2Component.prototype.inicializaDatosAnalogOutputDosSocket = function (data) {
        this.addItemAO2Socket(data);
        this.setFormControlAO2();
    };
    Dashboard2Component.prototype.inicializaDatosAnalogOutputTresSocket = function (data) {
        this.addItemAO3Socket(data);
        this.setFormControlAO3();
    };
    Dashboard2Component.prototype.canvasDibujaElementoVI = function () {
        var i = 0;
        if (this._canvasdrawService.canvasOk == true) {
            for (var _i = 0, _a = this.datosVIcanvas; _i < _a.length; _i++) {
                var item = _a[_i];
                var nombre = item.name;
                var tipo = item.tipo;
                var posX = item.posx;
                var posY = item.posy;
                var unidad = item.unidad;
                var colornormal = item.colornormal;
                var coloralarma = item.coloralarma;
                var colortitulo = item.colortitulo;
                var colorvalor = item.colorvalor;
                var colorfondo = item.colorfondo;
                var limite = item.limite;
                var indicaalarma = item.indicaalarma;
                var min = item.min;
                var max = item.max;
                var visible = item.visible;
                var propiedad = item.propiedad;
                if (visible && (propiedad == 'lectura' || propiedad == 'ambos')) {
                    if (tipo == 'circular') {
                        this._canvasdrawService.etiquetaCirculo(posX, posY, min, max, this.DataVIinstante[i], limite, indicaalarma, nombre, unidad, colornormal, coloralarma, colortitulo, colorvalor, colorfondo);
                    }
                    if (tipo == 'barra') {
                        this._canvasdrawService.etiquetaRectangulo(posX, posY, min, max, this.DataVIinstante[i], limite, indicaalarma, nombre, unidad, colornormal, coloralarma, colortitulo, colorvalor, colorfondo);
                    }
                }
                i++;
            }
        }
    };
    Dashboard2Component.prototype.canvasDibujaVISocket = function (regleta) {
        var itemsVI;
        var i = 0;
        switch (regleta) {
            case 1:
                itemsVI = this.itemsVI1;
                break;
            case 2:
                itemsVI = this.itemsVI2;
                break;
            case 3:
                itemsVI = this.itemsVI3;
                break;
            default:
                // code...
                break;
        }
        if (this._canvasdrawService.canvasOk == true) {
            for (var _i = 0, itemsVI_1 = itemsVI; _i < itemsVI_1.length; _i++) {
                var item = itemsVI_1[_i];
                var nombre = item.name;
                var tipo = item.tipo;
                var posX = item.posx;
                var posY = item.posy;
                var unidad = item.unidad;
                var colornormal = item.colornormal;
                var coloralarma = item.coloralarma;
                var colortitulo = item.colortitulo;
                var colorvalor = item.colorvalor;
                var colorfondo = item.colorfondo;
                var limite = item.limite;
                var indicaalarma = item.indicaalarma;
                var min = item.min;
                var max = item.max;
                var visible = item.visible;
                var propiedad = item.propiedad;
                var valor = item.valor;
                if (visible && (propiedad == 'lectura' || propiedad == 'ambos')) {
                    if (tipo == 'circular') {
                        this._canvasdrawService.etiquetaCirculo(posX, posY, min, max, valor, limite, indicaalarma, nombre, unidad, colornormal, coloralarma, colortitulo, colorvalor, colorfondo);
                    }
                    if (tipo == 'barra') {
                        this._canvasdrawService.etiquetaRectangulo(posX, posY, min, max, valor, limite, indicaalarma, nombre, unidad, colornormal, coloralarma, colortitulo, colorvalor, colorfondo);
                    }
                }
                i++;
            }
        }
    };
    Dashboard2Component.prototype.canvasDibujaElementoAI = function () {
        // var  ctx:CanvasRenderingContext2D
        var v1 = this.DataAIinstante[0];
        var v2 = this.DataAIinstante[1];
        var v3 = this.DataAIinstante[2];
        var v4 = this.DataAIinstante[3];
        var v5 = this.DataAIinstante[4];
        var v6 = this.DataAIinstante[5];
        var v7 = this.DataAIinstante[6];
        var v8 = this.DataAIinstante[7];
        var val = [v1, v2, v3, v4, v5, v6, v7, v8]; //valores entre 0 y 999
        var i = 0;
        if (this._canvasdrawService.canvasOk == true) {
            for (var _i = 0, _a = this.datosElementocanvas; _i < _a.length; _i++) {
                var item = _a[_i];
                var nombre = item.name;
                var tipo = item.tipo;
                var posX = item.posx;
                var posY = item.posy;
                var unidad = item.unidad;
                var colornormal = item.colornormal;
                var coloralarma = item.coloralarma;
                var colortitulo = item.colortitulo;
                var colorvalor = item.colorvalor;
                var colorfondo = item.colorfondo;
                var limite = item.limite;
                var indicaalarma = item.indicaalarma;
                var min = item.min;
                var max = item.max;
                if (tipo == 'circular') {
                    this._canvasdrawService.etiquetaCirculo(posX, posY, min, max, val[i], limite, indicaalarma, nombre, unidad, colornormal, coloralarma, colortitulo, colorvalor, colorfondo);
                }
                if (tipo == 'barra') {
                    this._canvasdrawService.etiquetaRectangulo(posX, posY, min, max, val[i], limite, indicaalarma, nombre, unidad, colornormal, coloralarma, colortitulo, colorvalor, colorfondo);
                }
                i++;
            }
        }
    };
    Dashboard2Component.prototype.canvasDibujaElementoDI = function () {
        // var  ctx:CanvasRenderingContext2D
        var v1 = this.di1;
        var v2 = this.di2;
        var v3 = this.di3;
        var v4 = this.di4;
        var v5 = this.di5;
        var v6 = this.di6;
        var v7 = this.di7;
        var v8 = this.di8;
        var val = [v1, v2, v3, v4, v5, v6, v7, v8];
        var i = 0;
        if (this._canvasdrawService.canvasOk == true) {
            for (var _i = 0, _a = this.datosElementocanvasDi; _i < _a.length; _i++) {
                var item = _a[_i];
                var nombre = item.name;
                var tipo = item.tipo;
                var posX = item.posx;
                var posY = item.posy;
                var unidad = item.unidad;
                var condicion = item.condicion;
                var colornormal = item.colornormal;
                var coloralarma = item.coloralarma;
                var colortitulo = item.colortitulo;
                if (tipo == 'circular') {
                    this._canvasdrawService.etiquetaCirculoDi(posX, posY, val[i], condicion, nombre, colornormal, coloralarma, colortitulo);
                }
                // if(tipo == 'barra'){
                //   this._canvasdrawService.etiquetaRectangulo(posX,posY, val[i],nombre,'success',unidad);
                // }
                i++;
            }
        }
    };
    Dashboard2Component.prototype.inicializaformOpcionMostrarAI = function () {
        this.formOpcionMostrarAI = this.fb.group({
            muestraAIpos1: new FormControl({ value: String(this.selMuestraAI[0]), disabled: false }),
            muestraAIpos2: new FormControl({ value: String(this.selMuestraAI[1]), disabled: false }),
            muestraAIpos3: new FormControl({ value: String(this.selMuestraAI[2]), disabled: false }),
            muestraAIpos4: new FormControl({ value: String(this.selMuestraAI[3]), disabled: false }),
            sincronizaZoom: new FormControl({ value: null, disabled: false })
        });
    };
    // inicializaformControlDO(){
    //   this.formControlDO = this.fb.group({
    //     controlDO1: new FormControl({value: null, disabled: false}),
    //     controlDO2: new FormControl({value: null, disabled: false}),
    //     controlDO3: new FormControl({value: null, disabled: false}),
    //     controlDO4: new FormControl({value: null, disabled: false}),
    //     controlDO5: new FormControl({value: null, disabled: false}),
    //     controlDO6: new FormControl({value: null, disabled: false}),
    //     controlDO7: new FormControl({value: null, disabled: false}),
    //     controlDO8: new FormControl({value: null, disabled: false})
    //   });
    // }
    // inicializaformControlAO(){
    //   this.formControlAO = this.fb.group({
    //     controlAO1: new FormControl({value: null, disabled: false}),
    //     controlAO2: new FormControl({value: null, disabled: false}),
    //     controlAO3: new FormControl({value: null, disabled: false}),
    //     controlAO4: new FormControl({value: null, disabled: false}),
    //     controlAO5: new FormControl({value: null, disabled: false}),
    //     controlAO6: new FormControl({value: null, disabled: false}),
    //     controlAO7: new FormControl({value: null, disabled: false}),
    //     controlAO8: new FormControl({value: null, disabled: false})
    //   });
    // }
    Dashboard2Component.prototype.inicializaformControlDO1 = function () {
        this.formControlDO1 = this.fb.group({
            controlDO1: new FormControl({ value: null, disabled: false }),
            controlDO2: new FormControl({ value: null, disabled: false }),
            controlDO3: new FormControl({ value: null, disabled: false }),
            controlDO4: new FormControl({ value: null, disabled: false }),
            controlDO5: new FormControl({ value: null, disabled: false }),
            controlDO6: new FormControl({ value: null, disabled: false }),
            controlDO7: new FormControl({ value: null, disabled: false }),
            controlDO8: new FormControl({ value: null, disabled: false })
        });
    };
    Dashboard2Component.prototype.inicializaformControlAO1 = function () {
        this.formControlAO1 = this.fb.group({
            controlAO1: new FormControl({ value: null, disabled: false }),
            controlAO2: new FormControl({ value: null, disabled: false }),
            controlAO3: new FormControl({ value: null, disabled: false }),
            controlAO4: new FormControl({ value: null, disabled: false }),
            controlAO5: new FormControl({ value: null, disabled: false }),
            controlAO6: new FormControl({ value: null, disabled: false }),
            controlAO7: new FormControl({ value: null, disabled: false }),
            controlAO8: new FormControl({ value: null, disabled: false })
        });
    };
    Dashboard2Component.prototype.inicializaformControlAO2 = function () {
        this.formControlAO2 = this.fb.group({
            controlAO1: new FormControl({ value: null, disabled: false }),
            controlAO2: new FormControl({ value: null, disabled: false }),
            controlAO3: new FormControl({ value: null, disabled: false }),
            controlAO4: new FormControl({ value: null, disabled: false }),
            controlAO5: new FormControl({ value: null, disabled: false }),
            controlAO6: new FormControl({ value: null, disabled: false }),
            controlAO7: new FormControl({ value: null, disabled: false }),
            controlAO8: new FormControl({ value: null, disabled: false })
        });
    };
    Dashboard2Component.prototype.inicializaformControlAO3 = function () {
        this.formControlAO3 = this.fb.group({
            controlAO1: new FormControl({ value: null, disabled: false }),
            controlAO2: new FormControl({ value: null, disabled: false }),
            controlAO3: new FormControl({ value: null, disabled: false }),
            controlAO4: new FormControl({ value: null, disabled: false }),
            controlAO5: new FormControl({ value: null, disabled: false }),
            controlAO6: new FormControl({ value: null, disabled: false }),
            controlAO7: new FormControl({ value: null, disabled: false }),
            controlAO8: new FormControl({ value: null, disabled: false })
        });
    };
    Dashboard2Component.prototype.inicializaformControlVI1 = function () {
        this.formControlVI1 = this.fb.group({
            controlVI1: new FormControl({ value: null, disabled: false }),
            controlVI2: new FormControl({ value: null, disabled: false }),
            controlVI3: new FormControl({ value: null, disabled: false }),
            controlVI4: new FormControl({ value: null, disabled: false }),
            controlVI5: new FormControl({ value: null, disabled: false }),
            controlVI6: new FormControl({ value: null, disabled: false }),
            controlVI7: new FormControl({ value: null, disabled: false }),
            controlVI8: new FormControl({ value: null, disabled: false })
        });
    };
    Dashboard2Component.prototype.inicializaformControlVI2 = function () {
        this.formControlVI2 = this.fb.group({
            controlVI1: new FormControl({ value: null, disabled: false }),
            controlVI2: new FormControl({ value: null, disabled: false }),
            controlVI3: new FormControl({ value: null, disabled: false }),
            controlVI4: new FormControl({ value: null, disabled: false }),
            controlVI5: new FormControl({ value: null, disabled: false }),
            controlVI6: new FormControl({ value: null, disabled: false }),
            controlVI7: new FormControl({ value: null, disabled: false }),
            controlVI8: new FormControl({ value: null, disabled: false })
        });
    };
    Dashboard2Component.prototype.inicializaformControlVI3 = function () {
        this.formControlVI3 = this.fb.group({
            controlVI1: new FormControl({ value: null, disabled: false }),
            controlVI2: new FormControl({ value: null, disabled: false }),
            controlVI3: new FormControl({ value: null, disabled: false }),
            controlVI4: new FormControl({ value: null, disabled: false }),
            controlVI5: new FormControl({ value: null, disabled: false }),
            controlVI6: new FormControl({ value: null, disabled: false }),
            controlVI7: new FormControl({ value: null, disabled: false }),
            controlVI8: new FormControl({ value: null, disabled: false })
        });
    };
    Dashboard2Component.prototype.setFormControlDO1 = function () {
        this.formControlDO1.setValue({
            controlDO1: this.itemsDO1[0].valor,
            controlDO2: this.itemsDO1[1].valor,
            controlDO3: this.itemsDO1[2].valor,
            controlDO4: this.itemsDO1[3].valor,
            controlDO5: this.itemsDO1[4].valor,
            controlDO6: this.itemsDO1[5].valor,
            controlDO7: this.itemsDO1[6].valor,
            controlDO8: this.itemsDO1[7].valor
        }, { emitEvent: false }); //evita emitir un valueChange
    };
    Dashboard2Component.prototype.setFormControlDO1Socket = function (data) {
        this.formControlDO1.setValue({
            controlDO1: data[0],
            controlDO2: data[1],
            controlDO3: data[2],
            controlDO4: data[3],
            controlDO5: data[4],
            controlDO6: data[5],
            controlDO7: data[6],
            controlDO8: data[7]
        }, { emitEvent: false }); //evita emitir un valueChange
    };
    Dashboard2Component.prototype.setFormControlAO1 = function () {
        this.formControlAO1.setValue({
            controlAO1: this.valorAO1EscaladoInverso(0),
            controlAO2: this.valorAO1EscaladoInverso(1),
            controlAO3: this.valorAO1EscaladoInverso(2),
            controlAO4: this.valorAO1EscaladoInverso(3),
            controlAO5: this.valorAO1EscaladoInverso(4),
            controlAO6: this.valorAO1EscaladoInverso(5),
            controlAO7: this.valorAO1EscaladoInverso(6),
            controlAO8: this.valorAO1EscaladoInverso(7),
        }, { emitEvent: false });
        this.AO1sendColor = [false, false, false, false, false, false, false, false];
    };
    Dashboard2Component.prototype.setFormControlAO2 = function () {
        this.formControlAO2.setValue({
            controlAO1: this.valorAO2EscaladoInverso(0),
            controlAO2: this.valorAO2EscaladoInverso(1),
            controlAO3: this.valorAO2EscaladoInverso(2),
            controlAO4: this.valorAO2EscaladoInverso(3),
            controlAO5: this.valorAO2EscaladoInverso(4),
            controlAO6: this.valorAO2EscaladoInverso(5),
            controlAO7: this.valorAO2EscaladoInverso(6),
            controlAO8: this.valorAO2EscaladoInverso(7),
        }, { emitEvent: false });
        this.AO2sendColor = [false, false, false, false, false, false, false, false];
    };
    Dashboard2Component.prototype.setFormControlAO3 = function () {
        this.formControlAO3.setValue({
            controlAO1: this.valorAO3EscaladoInverso(0),
            controlAO2: this.valorAO3EscaladoInverso(1),
            controlAO3: this.valorAO3EscaladoInverso(2),
            controlAO4: this.valorAO3EscaladoInverso(3),
            controlAO5: this.valorAO3EscaladoInverso(4),
            controlAO6: this.valorAO3EscaladoInverso(5),
            controlAO7: this.valorAO3EscaladoInverso(6),
            controlAO8: this.valorAO3EscaladoInverso(7),
        }, { emitEvent: false });
        this.AO3sendColor = [false, false, false, false, false, false, false, false];
    };
    Dashboard2Component.prototype.setFormControlVI1 = function () {
        this.formControlVI1.setValue({
            controlVI1: this.valorVI1EscaladoInverso(0),
            controlVI2: this.valorVI1EscaladoInverso(1),
            controlVI3: this.valorVI1EscaladoInverso(2),
            controlVI4: this.valorVI1EscaladoInverso(3),
            controlVI5: this.valorVI1EscaladoInverso(4),
            controlVI6: this.valorVI1EscaladoInverso(5),
            controlVI7: this.valorVI1EscaladoInverso(6),
            controlVI8: this.valorVI1EscaladoInverso(7),
        }, { emitEvent: false });
        this.VI1sendColor = [false, false, false, false, false, false, false, false];
    };
    Dashboard2Component.prototype.setFormControlVI2 = function () {
        this.formControlVI2.setValue({
            controlVI1: this.valorVI2EscaladoInverso(0),
            controlVI2: this.valorVI2EscaladoInverso(1),
            controlVI3: this.valorVI2EscaladoInverso(2),
            controlVI4: this.valorVI2EscaladoInverso(3),
            controlVI5: this.valorVI2EscaladoInverso(4),
            controlVI6: this.valorVI2EscaladoInverso(5),
            controlVI7: this.valorVI2EscaladoInverso(6),
            controlVI8: this.valorVI2EscaladoInverso(7),
        }, { emitEvent: false });
        this.VI2sendColor = [false, false, false, false, false, false, false, false];
    };
    Dashboard2Component.prototype.setFormControlVI3 = function () {
        this.formControlVI3.setValue({
            controlVI1: this.valorVI3EscaladoInverso(0),
            controlVI2: this.valorVI3EscaladoInverso(1),
            controlVI3: this.valorVI3EscaladoInverso(2),
            controlVI4: this.valorVI3EscaladoInverso(3),
            controlVI5: this.valorVI3EscaladoInverso(4),
            controlVI6: this.valorVI3EscaladoInverso(5),
            controlVI7: this.valorVI3EscaladoInverso(6),
            controlVI8: this.valorVI3EscaladoInverso(7),
        }, { emitEvent: false });
        this.VI3sendColor = [false, false, false, false, false, false, false, false];
    };
    // createItemDO(item: Digitaloutput): FormGroup {
    //   return this.fb.group({
    //       name: item.name,
    //       valor: item.valor,
    //       header: item.header
    //     });
    // }
    // createItemAO(item: Analogoutput): FormGroup {
    //   return this.fb.group({
    //       name: item.name,
    //       unidad: item.unidad,
    //       valor: item.valor,
    //       min:item.min,
    //       max:item.max,
    //       header:item.header
    //     });
    // }
    Dashboard2Component.prototype.addItemDO1 = function () {
        var cantDO = this.datosDigitalOuput.length;
        var endFor;
        if (cantDO < 8) {
            endFor = cantDO;
        }
        else {
            endFor = 8;
        }
        if (cantDO > 0) {
            for (var i = 0; i < endFor; ++i) {
                this.itemsDO1[i] = this.datosDigitalOuput[i];
            }
        }
    };
    Dashboard2Component.prototype.addItemAO1 = function () {
        // this.itemsAO1 = this.formControlAO1.get('items') as FormArray;
        var cantAO = this.datosAnalogOutput.length;
        var endFor;
        if (cantAO < 8) {
            endFor = cantAO;
        }
        else {
            endFor = 8;
        }
        if (cantAO > 0) {
            for (var i = 0; i < endFor; ++i) {
                this.itemsAO1[i] = this.datosAnalogOutput[i];
            }
        }
    };
    Dashboard2Component.prototype.addItemAO2 = function () {
        // this.itemsAO2 = this.formControlAO2.get('items') as FormArray;
        var cantAO = this.datosAnalogOutput.length;
        var endFor;
        if (cantAO > 8 && cantAO < 16) {
            endFor = cantAO;
        }
        if (cantAO >= 16) {
            endFor = 16;
        }
        if (cantAO > 8) {
            for (var i = 8; i < endFor; ++i) {
                this.itemsAO2[i - 8] = this.datosAnalogOutput[i];
            }
        }
    };
    Dashboard2Component.prototype.addItemAO3 = function () {
        // this.itemsAO3 = this.formControlAO3.get('items') as FormArray;
        var cantAO = this.datosAnalogOutput.length;
        var endFor;
        if (cantAO > 16 && cantAO < 24) {
            endFor = cantAO;
        }
        if (cantAO >= 24) {
            endFor = 24;
        }
        if (cantAO > 16) {
            for (var i = 16; i < endFor; ++i) {
                this.itemsAO3[i - 16] = this.datosAnalogOutput[i];
            }
        }
    };
    Dashboard2Component.prototype.addItemAO1Socket = function (data) {
        for (var i = 0; i < 8; ++i) {
            this.itemsAO1[i].valor = data[i];
        }
    };
    Dashboard2Component.prototype.addItemAO2Socket = function (data) {
        for (var i = 0; i < 8; ++i) {
            this.itemsAO2[i].valor = data[i];
        }
    };
    Dashboard2Component.prototype.addItemAO3Socket = function (data) {
        for (var i = 0; i < 8; ++i) {
            this.itemsAO3[i].valor = data[i];
        }
    };
    Dashboard2Component.prototype.addItemVI1 = function () {
        var cantVI = this.datosVIcanvas.length;
        var endFor;
        if (cantVI < 8) {
            endFor = cantVI;
        }
        else {
            endFor = 8;
        }
        if (cantVI > 0) {
            for (var i = 0; i < endFor; ++i) {
                this.itemsVI1[i] = this.datosVIcanvas[i];
            }
        }
    };
    Dashboard2Component.prototype.addItemVI2 = function () {
        // this.itemsAO2 = this.formControlAO2.get('items') as FormArray;
        var cantVI = this.datosVIcanvas.length;
        var endFor;
        if (cantVI > 8 && cantVI < 16) {
            endFor = cantVI;
        }
        if (cantVI >= 16) {
            endFor = 16;
        }
        if (cantVI > 8) {
            for (var i = 8; i < endFor; ++i) {
                this.itemsVI2[i - 8] = this.datosVIcanvas[i];
            }
        }
    };
    Dashboard2Component.prototype.addItemVI3 = function () {
        // this.itemsAO3 = this.formControlAO3.get('items') as FormArray;
        var cantVI = this.datosVIcanvas.length;
        var endFor;
        if (cantVI > 16 && cantVI < 24) {
            endFor = cantVI;
        }
        if (cantVI >= 24) {
            endFor = 24;
        }
        if (cantVI > 16) {
            for (var i = 16; i < endFor; ++i) {
                this.itemsVI3[i - 16] = this.datosVIcanvas[i];
            }
        }
    };
    Dashboard2Component.prototype.addItemVI1Socket = function (data) {
        this.itemsVI1[0].valor = data.vi1;
        this.itemsVI1[1].valor = data.vi2;
        this.itemsVI1[2].valor = data.vi3;
        this.itemsVI1[3].valor = data.vi4;
        this.itemsVI1[4].valor = data.vi5;
        this.itemsVI1[5].valor = data.vi6;
        this.itemsVI1[6].valor = data.vi7;
        this.itemsVI1[7].valor = data.vi8;
        this.agregaDatosVI1(data);
        this.canvasDibujaVISocket(1);
    };
    Dashboard2Component.prototype.addItemVI2Socket = function (data) {
        this.itemsVI2[0].valor = data.vi1;
        this.itemsVI2[1].valor = data.vi2;
        this.itemsVI2[2].valor = data.vi3;
        this.itemsVI2[3].valor = data.vi4;
        this.itemsVI2[4].valor = data.vi5;
        this.itemsVI2[5].valor = data.vi6;
        this.itemsVI2[6].valor = data.vi7;
        this.itemsVI2[7].valor = data.vi8;
        this.agregaDatosVI2(data);
        this.canvasDibujaVISocket(2);
    };
    Dashboard2Component.prototype.addItemVI3Socket = function (data) {
        this.itemsVI3[0].valor = data.vi1;
        this.itemsVI3[1].valor = data.vi2;
        this.itemsVI3[2].valor = data.vi3;
        this.itemsVI3[3].valor = data.vi4;
        this.itemsVI3[4].valor = data.vi5;
        this.itemsVI3[5].valor = data.vi6;
        this.itemsVI3[6].valor = data.vi7;
        this.itemsVI3[7].valor = data.vi8;
        this.agregaDatosVI3(data);
        this.canvasDibujaVISocket(3);
    };
    Dashboard2Component.prototype.inicializaformGraficaHistorico = function () {
        this.formGraficaHistorico = this.fb.group({
            entrada: new FormControl({ value: null, disabled: false }, Validators.required),
            desde: new FormControl({ value: null, disabled: false }, Validators.required),
            hasta: new FormControl({ value: null, disabled: false }, Validators.required)
        });
    };
    Dashboard2Component.prototype.inicializaformformGraficaEvento = function () {
        this.formGraficaEvento = this.fb.group({
            entrada: new FormControl({ value: null, disabled: false }),
            desde: new FormControl({ value: null, disabled: false }, Validators.required),
            hasta: new FormControl({ value: null, disabled: false }, Validators.required)
        });
    };
    // setFormOpcionMostrarAI(){
    //   this.formOpcionMostrarAI.setValue({
    //     muestraAIpos1: String(this.selMuestraAI[0]),
    //     muestraAIpos2: String(this.selMuestraAI[1]),
    //     muestraAIpos3: String(this.selMuestraAI[2]),
    //     muestraAIpos4: String(this.selMuestraAI[3])
    //   });
    // }
    Dashboard2Component.prototype.desSincronizaZoom = function () {
        this.syncZoom.detach();
        this.syncZoom = Dygraph.synchronize([this.grafoAI[0], this.grafoAI[1], this.grafoAI[2], this.grafoAI[3]], {
            selection: false,
            zoom: false,
            range: false
        });
    };
    Dashboard2Component.prototype.sincronizaZoom = function () {
        this.syncZoom.detach();
        this.syncZoom = Dygraph.synchronize([this.grafoAI[0], this.grafoAI[1], this.grafoAI[2], this.grafoAI[3]], {
            selection: false,
            zoom: true,
            range: false
        });
    };
    Dashboard2Component.prototype.cargarEstadoDI = function () {
        var _this = this;
        this._digitalinputService.itemUltimo()
            .subscribe(function (resp) {
            _this._usuarioService.estadoConexionServidor = true;
            resp.items.di1 == 1 ? _this.di1 = true : _this.di1 = false;
            resp.items.di2 == 1 ? _this.di2 = true : _this.di2 = false;
            resp.items.di3 == 1 ? _this.di3 = true : _this.di3 = false;
            resp.items.di4 == 1 ? _this.di4 = true : _this.di4 = false;
            resp.items.di5 == 1 ? _this.di5 = true : _this.di5 = false;
            resp.items.di6 == 1 ? _this.di6 = true : _this.di6 = false;
            resp.items.di7 == 1 ? _this.di7 = true : _this.di7 = false;
            resp.items.di8 == 1 ? _this.di8 = true : _this.di8 = false;
            _this.canvasDibujaElementoDI();
        }, function (err) {
            _this._usuarioService.estadoConexionServidor = false;
        });
    };
    Dashboard2Component.prototype.cargarEstadoDISocket = function (data) {
        data.di1 == 1 ? this.di1 = true : this.di1 = false;
        data.di2 == 1 ? this.di2 = true : this.di2 = false;
        data.di3 == 1 ? this.di3 = true : this.di3 = false;
        data.di4 == 1 ? this.di4 = true : this.di4 = false;
        data.di5 == 1 ? this.di5 = true : this.di5 = false;
        data.di6 == 1 ? this.di6 = true : this.di6 = false;
        data.di7 == 1 ? this.di7 = true : this.di7 = false;
        data.di8 == 1 ? this.di8 = true : this.di8 = false;
        this.canvasDibujaElementoDI();
    };
    Dashboard2Component.prototype.cargarDatosAI = function () {
        var _this = this;
        this._analoginputService.itemsRangoTiempoReal()
            .subscribe(function (resp) {
            _this.datosAI = resp.items;
            _this.analizaDataAI();
        });
    };
    Dashboard2Component.prototype.cargarDatosVI = function () {
        var _this = this;
        this._variableinternaService.itemsRangoTiempoReal()
            .subscribe(function (resp) {
            _this.datosVI = resp.items;
            _this.analizaDataVI();
        });
    };
    // cargarDatosAIinstante(){
    //   var aiInstante: Analoginput;
    //   this._analoginputService.itemUno()
    //       .subscribe( (resp: any) =>{
    //         aiInstante=resp.items[0];
    //         this.DataAIinstante=[
    //           aiInstante.ai1,
    //           aiInstante.ai2,
    //           aiInstante.ai3,
    //           aiInstante.ai4,
    //           aiInstante.ai5,
    //           aiInstante.ai6,
    //           aiInstante.ai7,
    //           aiInstante.ai8
    //         ];
    //         var ts=new Date(aiInstante.timestamp)//Transforma en hora local
    //         //actualizar información sólo si hay un nuevo dato en la base de datos
    //         var ahora:Date=new Date();
    //         var tpo1:number=ts.getTime();
    //         var tpo2:number=ahora.getTime();
    //         var diff=(tpo2-tpo1)/1000;
    //         if(diff < 100){
    //           this._usuarioService.estadoConexionPlc=true;
    //         }else{
    //           this._usuarioService.estadoConexionPlc=false;
    //         }
    //          if (this.lastTimeSenDBdeAI.getTime() !== ts.getTime()){
    //            this.canvasDibujaElementoAI();
    //            this.agregaDatosAIalGrafico(aiInstante);
    //         }
    //          this.lastTimeSenDBdeAI = new Date(ts);
    //       });
    // }
    Dashboard2Component.prototype.cargarDatosVIinicial = function () {
        var _this = this;
        var viInicial;
        this._variableinternaService.itemUno()
            .subscribe(function (resp) {
            viInicial = resp.items[0];
            _this.DataVIinstante = [
                viInicial.vi1,
                viInicial.vi2,
                viInicial.vi3,
                viInicial.vi4,
                viInicial.vi5,
                viInicial.vi6,
                viInicial.vi7,
                viInicial.vi8,
                viInicial.vi9,
                viInicial.vi10,
                viInicial.vi11,
                viInicial.vi12,
                viInicial.vi13,
                viInicial.vi14,
                viInicial.vi15,
                viInicial.vi16,
                viInicial.vi17,
                viInicial.vi18,
                viInicial.vi19,
                viInicial.vi20,
                viInicial.vi21,
                viInicial.vi22,
                viInicial.vi23,
                viInicial.vi24
            ];
            var i = 0;
            for (var _i = 0, _a = _this.datosVIcanvas; _i < _a.length; _i++) {
                var item = _a[_i];
                item.valor = _this.DataVIinstante[i];
                i++;
            }
            _this.recargaDatosVI1();
            _this.recargaDatosVI2();
            _this.recargaDatosVI3();
            _this.canvasDibujaElementoVI();
        });
    };
    Dashboard2Component.prototype.cargarDatosAIinstanteSocket = function (data) {
        var aiInstante;
        aiInstante = data;
        // console.log(aiInstante);
        this.DataAIinstante = [
            aiInstante.ai1,
            aiInstante.ai2,
            aiInstante.ai3,
            aiInstante.ai4,
            aiInstante.ai5,
            aiInstante.ai6,
            aiInstante.ai7,
            aiInstante.ai8
        ];
        var ts = new Date(aiInstante.timestamp); //Transforma en hora local
        //actualizar información sólo si hay un nuevo dato en la base de datos
        var ahora = new Date();
        var tpo1 = ts.getTime();
        var tpo2 = ahora.getTime();
        var diff = (tpo2 - tpo1) / 1000;
        if (diff < 100) {
            this._usuarioService.estadoConexionPlc = true;
        }
        else {
            this._usuarioService.estadoConexionPlc = false;
        }
        if (this.lastTimeSenDBdeAI.getTime() !== ts.getTime()) {
            this.canvasDibujaElementoAI();
            this.agregaDatosAIalGrafico(aiInstante);
        }
        this.lastTimeSenDBdeAI = new Date(ts);
    };
    //Dibuja inicialmente los datos en el canvas
    Dashboard2Component.prototype.cargarDatosAIinstanteInicial = function () {
        var _this = this;
        var aiInstante;
        this._analoginputService.itemUno()
            .subscribe(function (resp) {
            aiInstante = resp.items[0];
            _this.DataAIinstante = [
                aiInstante.ai1,
                aiInstante.ai2,
                aiInstante.ai3,
                aiInstante.ai4,
                aiInstante.ai5,
                aiInstante.ai6,
                aiInstante.ai7,
                aiInstante.ai8
            ];
            _this.canvasDibujaElementoAI();
        });
    };
    Dashboard2Component.prototype.agregaDatosAIalGrafico = function (item) {
        //resetea el grafico a la cantidad de datos iniciales
        var datosLen = this.dataAI1.length;
        var maxDatosGraficos = 800;
        if (datosLen > maxDatosGraficos) {
            this.cargarDatosAI();
            return;
        }
        var timeStamp;
        var timeStamp1;
        var keyTimeValueAI1;
        var keyTimeValueAI2;
        var keyTimeValueAI3;
        var keyTimeValueAI4;
        var keyTimeValueAI5;
        var keyTimeValueAI6;
        var keyTimeValueAI7;
        var keyTimeValueAI8;
        var valor;
        timeStamp1 = new Date(item.timestamp);
        timeStamp = new Date(timeStamp1.getFullYear(), timeStamp1.getMonth(), timeStamp1.getDate(), timeStamp1.getHours(), timeStamp1.getMinutes(), timeStamp1.getSeconds());
        // keyTimeValueAI1=[timeStamp, item.ai1];
        // keyTimeValueAI2=[timeStamp, item.ai2];
        // keyTimeValueAI3=[timeStamp, item.ai3];
        // keyTimeValueAI4=[timeStamp, item.ai4];
        // keyTimeValueAI5=[timeStamp, item.ai5];
        // keyTimeValueAI6=[timeStamp, item.ai6];
        // keyTimeValueAI7=[timeStamp, item.ai7];
        // keyTimeValueAI8=[timeStamp, item.ai8];
        valor = this.valorAiEscalado(0, item.ai1);
        keyTimeValueAI1 = [timeStamp, valor];
        valor = this.valorAiEscalado(1, item.ai2);
        keyTimeValueAI2 = [timeStamp, valor];
        valor = this.valorAiEscalado(2, item.ai3);
        keyTimeValueAI3 = [timeStamp, valor];
        valor = this.valorAiEscalado(3, item.ai4);
        keyTimeValueAI4 = [timeStamp, valor];
        valor = this.valorAiEscalado(4, item.ai5);
        keyTimeValueAI5 = [timeStamp, valor];
        valor = this.valorAiEscalado(5, item.ai6);
        keyTimeValueAI6 = [timeStamp, valor];
        valor = this.valorAiEscalado(6, item.ai7);
        keyTimeValueAI7 = [timeStamp, valor];
        valor = this.valorAiEscalado(7, item.ai8);
        keyTimeValueAI8 = [timeStamp, valor];
        this.dataAI1.push(keyTimeValueAI1);
        this.dataAI2.push(keyTimeValueAI2);
        this.dataAI3.push(keyTimeValueAI3);
        this.dataAI4.push(keyTimeValueAI4);
        this.dataAI5.push(keyTimeValueAI5);
        this.dataAI6.push(keyTimeValueAI6);
        this.dataAI7.push(keyTimeValueAI7);
        this.dataAI8.push(keyTimeValueAI8);
        this.DataAI = [this.dataAI1, this.dataAI2, this.dataAI3, this.dataAI4, this.dataAI5, this.dataAI6, this.dataAI7, this.dataAI8];
        this.setGraficosAI();
    };
    Dashboard2Component.prototype.analizaDataAI = function () {
        this.dataAI1 = [];
        this.dataAI2 = [];
        this.dataAI3 = [];
        this.dataAI4 = [];
        this.dataAI5 = [];
        this.dataAI6 = [];
        this.dataAI7 = [];
        this.dataAI8 = [];
        var timeStamp;
        var timeStamp1;
        var keyTimeValueAI1;
        var keyTimeValueAI2;
        var keyTimeValueAI3;
        var keyTimeValueAI4;
        var keyTimeValueAI5;
        var keyTimeValueAI6;
        var keyTimeValueAI7;
        var keyTimeValueAI8;
        var valor;
        for (var _i = 0, _a = this.datosAI.reverse(); _i < _a.length; _i++) {
            var item = _a[_i];
            //timeStamp=new Date(item.timestamp);
            timeStamp1 = new Date(item.timestamp);
            timeStamp = new Date(timeStamp1.getFullYear(), timeStamp1.getMonth(), timeStamp1.getDate(), timeStamp1.getHours(), timeStamp1.getMinutes(), timeStamp1.getSeconds());
            valor = this.valorAiEscalado(0, item.ai1);
            keyTimeValueAI1 = [timeStamp, valor];
            valor = this.valorAiEscalado(1, item.ai2);
            keyTimeValueAI2 = [timeStamp, valor];
            valor = this.valorAiEscalado(2, item.ai3);
            keyTimeValueAI3 = [timeStamp, valor];
            valor = this.valorAiEscalado(3, item.ai4);
            keyTimeValueAI4 = [timeStamp, valor];
            valor = this.valorAiEscalado(4, item.ai5);
            keyTimeValueAI5 = [timeStamp, valor];
            valor = this.valorAiEscalado(5, item.ai6);
            keyTimeValueAI6 = [timeStamp, valor];
            valor = this.valorAiEscalado(6, item.ai7);
            keyTimeValueAI7 = [timeStamp, valor];
            valor = this.valorAiEscalado(7, item.ai8);
            keyTimeValueAI8 = [timeStamp, valor];
            this.dataAI1.push(keyTimeValueAI1);
            this.dataAI2.push(keyTimeValueAI2);
            this.dataAI3.push(keyTimeValueAI3);
            this.dataAI4.push(keyTimeValueAI4);
            this.dataAI5.push(keyTimeValueAI5);
            this.dataAI6.push(keyTimeValueAI6);
            this.dataAI7.push(keyTimeValueAI7);
            this.dataAI8.push(keyTimeValueAI8);
        }
        this.lastTimeSenDBdeAI = new Date(timeStamp); //para comparar el ultimo dato guardado en db 
        this.DataAI = [this.dataAI1, this.dataAI2, this.dataAI3, this.dataAI4, this.dataAI5, this.dataAI6, this.dataAI7, this.dataAI8];
        this.setGraficosAI();
    };
    Dashboard2Component.prototype.analizaDataVI = function () {
        this.dataVI1 = [];
        this.dataVI2 = [];
        this.dataVI3 = [];
        this.dataVI4 = [];
        this.dataVI5 = [];
        this.dataVI6 = [];
        this.dataVI7 = [];
        this.dataVI8 = [];
        this.dataVI9 = [];
        this.dataVI10 = [];
        this.dataVI11 = [];
        this.dataVI12 = [];
        this.dataVI13 = [];
        this.dataVI14 = [];
        this.dataVI15 = [];
        this.dataVI16 = [];
        this.dataVI17 = [];
        this.dataVI18 = [];
        this.dataVI19 = [];
        this.dataVI20 = [];
        this.dataVI21 = [];
        this.dataVI22 = [];
        this.dataVI23 = [];
        this.dataVI24 = [];
        var timeStamp;
        var timeStamp1;
        var keyTimeValueVI1;
        var keyTimeValueVI2;
        var keyTimeValueVI3;
        var keyTimeValueVI4;
        var keyTimeValueVI5;
        var keyTimeValueVI6;
        var keyTimeValueVI7;
        var keyTimeValueVI8;
        var keyTimeValueVI9;
        var keyTimeValueVI10;
        var keyTimeValueVI11;
        var keyTimeValueVI12;
        var keyTimeValueVI13;
        var keyTimeValueVI14;
        var keyTimeValueVI15;
        var keyTimeValueVI16;
        var keyTimeValueVI17;
        var keyTimeValueVI18;
        var keyTimeValueVI19;
        var keyTimeValueVI20;
        var keyTimeValueVI21;
        var keyTimeValueVI22;
        var keyTimeValueVI23;
        var keyTimeValueVI24;
        var valor;
        for (var _i = 0, _a = this.datosVI.reverse(); _i < _a.length; _i++) {
            var item = _a[_i];
            //timeStamp=new Date(item.timestamp);
            timeStamp1 = new Date(item.timestamp);
            timeStamp = new Date(timeStamp1.getFullYear(), timeStamp1.getMonth(), timeStamp1.getDate(), timeStamp1.getHours(), timeStamp1.getMinutes(), timeStamp1.getSeconds());
            if (item.regleta == 1) {
                valor = this.valorVIEscalado(0, item.vi1);
                keyTimeValueVI1 = [timeStamp, valor];
                valor = this.valorVIEscalado(1, item.vi2);
                keyTimeValueVI2 = [timeStamp, valor];
                valor = this.valorVIEscalado(2, item.vi3);
                keyTimeValueVI3 = [timeStamp, valor];
                valor = this.valorVIEscalado(3, item.vi4);
                keyTimeValueVI4 = [timeStamp, valor];
                valor = this.valorVIEscalado(4, item.vi5);
                keyTimeValueVI5 = [timeStamp, valor];
                valor = this.valorVIEscalado(5, item.vi6);
                keyTimeValueVI6 = [timeStamp, valor];
                valor = this.valorVIEscalado(6, item.vi7);
                keyTimeValueVI7 = [timeStamp, valor];
                valor = this.valorVIEscalado(7, item.vi8);
                keyTimeValueVI8 = [timeStamp, valor];
                this.dataVI1.push(keyTimeValueVI1);
                this.dataVI2.push(keyTimeValueVI2);
                this.dataVI3.push(keyTimeValueVI3);
                this.dataVI4.push(keyTimeValueVI4);
                this.dataVI5.push(keyTimeValueVI5);
                this.dataVI6.push(keyTimeValueVI6);
                this.dataVI7.push(keyTimeValueVI7);
                this.dataVI8.push(keyTimeValueVI8);
            }
            if (item.regleta == 2) {
                valor = this.valorVIEscalado(8, item.vi9);
                keyTimeValueVI9 = [timeStamp, valor];
                valor = this.valorVIEscalado(9, item.vi10);
                keyTimeValueVI10 = [timeStamp, valor];
                valor = this.valorVIEscalado(10, item.vi11);
                keyTimeValueVI11 = [timeStamp, valor];
                valor = this.valorVIEscalado(11, item.vi12);
                keyTimeValueVI12 = [timeStamp, valor];
                valor = this.valorVIEscalado(12, item.vi13);
                keyTimeValueVI13 = [timeStamp, valor];
                valor = this.valorVIEscalado(13, item.vi14);
                keyTimeValueVI14 = [timeStamp, valor];
                valor = this.valorVIEscalado(14, item.vi15);
                keyTimeValueVI15 = [timeStamp, valor];
                valor = this.valorVIEscalado(15, item.vi16);
                keyTimeValueVI16 = [timeStamp, valor];
                this.dataVI9.push(keyTimeValueVI9);
                this.dataVI10.push(keyTimeValueVI10);
                this.dataVI11.push(keyTimeValueVI11);
                this.dataVI12.push(keyTimeValueVI12);
                this.dataVI13.push(keyTimeValueVI13);
                this.dataVI14.push(keyTimeValueVI14);
                this.dataVI15.push(keyTimeValueVI15);
                this.dataVI16.push(keyTimeValueVI16);
            }
            if (item.regleta == 3) {
                valor = this.valorVIEscalado(16, item.vi17);
                keyTimeValueVI17 = [timeStamp, valor];
                valor = this.valorVIEscalado(17, item.vi18);
                keyTimeValueVI18 = [timeStamp, valor];
                valor = this.valorVIEscalado(18, item.vi19);
                keyTimeValueVI19 = [timeStamp, valor];
                valor = this.valorVIEscalado(19, item.vi20);
                keyTimeValueVI20 = [timeStamp, valor];
                valor = this.valorVIEscalado(20, item.vi21);
                keyTimeValueVI21 = [timeStamp, valor];
                valor = this.valorVIEscalado(21, item.vi22);
                keyTimeValueVI22 = [timeStamp, valor];
                valor = this.valorVIEscalado(22, item.vi23);
                keyTimeValueVI23 = [timeStamp, valor];
                valor = this.valorVIEscalado(23, item.vi24);
                keyTimeValueVI24 = [timeStamp, valor];
                this.dataVI17.push(keyTimeValueVI17);
                this.dataVI18.push(keyTimeValueVI18);
                this.dataVI19.push(keyTimeValueVI19);
                this.dataVI20.push(keyTimeValueVI20);
                this.dataVI21.push(keyTimeValueVI21);
                this.dataVI22.push(keyTimeValueVI22);
                this.dataVI23.push(keyTimeValueVI23);
                this.dataVI24.push(keyTimeValueVI24);
            }
        }
        this.lastTimeSenDBdeVI = new Date(timeStamp); //para comparar el ultimo dato guardado en db 
        this.DataVI = [this.dataVI1, this.dataVI2, this.dataVI3, this.dataVI4, this.dataVI5, this.dataVI6, this.dataVI7, this.dataVI8,
            this.dataVI9, this.dataVI10, this.dataVI11, this.dataVI12, this.dataVI13, this.dataVI14, this.dataVI15, this.dataVI16,
            this.dataVI17, this.dataVI18, this.dataVI19, this.dataVI20, this.dataVI21, this.dataVI22, this.dataVI23, this.dataVI24
        ];
        //this.setGraficosVI();
    };
    Dashboard2Component.prototype.agregaDatosVI1 = function (item) {
        //resetea el grafico a la cantidad de datos iniciales
        var datosLen = this.dataVI1.length;
        var maxDatosGraficos = 800;
        if (datosLen > maxDatosGraficos) {
            this.cargarDatosVI();
            return;
        }
        var timeStamp;
        var timeStamp1;
        var keyTimeValueVI1;
        var keyTimeValueVI2;
        var keyTimeValueVI3;
        var keyTimeValueVI4;
        var keyTimeValueVI5;
        var keyTimeValueVI6;
        var keyTimeValueVI7;
        var keyTimeValueVI8;
        var valor;
        timeStamp1 = new Date(item.timestamp);
        timeStamp = new Date(timeStamp1.getFullYear(), timeStamp1.getMonth(), timeStamp1.getDate(), timeStamp1.getHours(), timeStamp1.getMinutes(), timeStamp1.getSeconds());
        valor = this.valorVIEscalado(0, item.vi1);
        keyTimeValueVI1 = [timeStamp, valor];
        valor = this.valorVIEscalado(1, item.vi2);
        keyTimeValueVI2 = [timeStamp, valor];
        valor = this.valorVIEscalado(2, item.vi3);
        keyTimeValueVI3 = [timeStamp, valor];
        valor = this.valorVIEscalado(3, item.vi4);
        keyTimeValueVI4 = [timeStamp, valor];
        valor = this.valorVIEscalado(4, item.vi5);
        keyTimeValueVI5 = [timeStamp, valor];
        valor = this.valorVIEscalado(5, item.vi6);
        keyTimeValueVI6 = [timeStamp, valor];
        valor = this.valorVIEscalado(6, item.vi7);
        keyTimeValueVI7 = [timeStamp, valor];
        valor = this.valorVIEscalado(7, item.vi8);
        keyTimeValueVI8 = [timeStamp, valor];
        this.dataVI1.push(keyTimeValueVI1);
        this.dataVI2.push(keyTimeValueVI2);
        this.dataVI3.push(keyTimeValueVI3);
        this.dataVI4.push(keyTimeValueVI4);
        this.dataVI5.push(keyTimeValueVI5);
        this.dataVI6.push(keyTimeValueVI6);
        this.dataVI7.push(keyTimeValueVI7);
        this.dataVI8.push(keyTimeValueVI8);
        this.DataVI = [this.dataVI1, this.dataVI2, this.dataVI3, this.dataVI4, this.dataVI5, this.dataVI6, this.dataVI7, this.dataVI8,
            this.dataVI9, this.dataVI10, this.dataVI11, this.dataVI12, this.dataVI13, this.dataVI14, this.dataVI15, this.dataVI16,
            this.dataVI17, this.dataVI18, this.dataVI19, this.dataVI20, this.dataVI21, this.dataVI22, this.dataVI23, this.dataVI24
        ];
        //this.setGraficosAI();
    };
    Dashboard2Component.prototype.agregaDatosVI2 = function (item) {
        //resetea el grafico a la cantidad de datos iniciales
        var datosLen = this.dataVI9.length;
        var maxDatosGraficos = 800;
        if (datosLen > maxDatosGraficos) {
            this.cargarDatosVI();
            return;
        }
        var timeStamp;
        var timeStamp1;
        var keyTimeValueVI9;
        var keyTimeValueVI10;
        var keyTimeValueVI11;
        var keyTimeValueVI12;
        var keyTimeValueVI13;
        var keyTimeValueVI14;
        var keyTimeValueVI15;
        var keyTimeValueVI16;
        var valor;
        timeStamp1 = new Date(item.timestamp);
        timeStamp = new Date(timeStamp1.getFullYear(), timeStamp1.getMonth(), timeStamp1.getDate(), timeStamp1.getHours(), timeStamp1.getMinutes(), timeStamp1.getSeconds());
        valor = this.valorVIEscalado(8, item.vi9);
        keyTimeValueVI9 = [timeStamp, valor];
        valor = this.valorVIEscalado(9, item.vi10);
        keyTimeValueVI10 = [timeStamp, valor];
        valor = this.valorVIEscalado(10, item.vi11);
        keyTimeValueVI11 = [timeStamp, valor];
        valor = this.valorVIEscalado(11, item.vi12);
        keyTimeValueVI12 = [timeStamp, valor];
        valor = this.valorVIEscalado(12, item.vi13);
        keyTimeValueVI13 = [timeStamp, valor];
        valor = this.valorVIEscalado(13, item.vi14);
        keyTimeValueVI14 = [timeStamp, valor];
        valor = this.valorVIEscalado(14, item.vi15);
        keyTimeValueVI15 = [timeStamp, valor];
        valor = this.valorVIEscalado(15, item.vi16);
        keyTimeValueVI16 = [timeStamp, valor];
        this.dataVI9.push(keyTimeValueVI9);
        this.dataVI10.push(keyTimeValueVI10);
        this.dataVI11.push(keyTimeValueVI11);
        this.dataVI12.push(keyTimeValueVI12);
        this.dataVI13.push(keyTimeValueVI13);
        this.dataVI14.push(keyTimeValueVI14);
        this.dataVI15.push(keyTimeValueVI15);
        this.dataVI16.push(keyTimeValueVI16);
        this.DataVI = [this.dataVI1, this.dataVI2, this.dataVI3, this.dataVI4, this.dataVI5, this.dataVI6, this.dataVI7, this.dataVI8,
            this.dataVI9, this.dataVI10, this.dataVI11, this.dataVI12, this.dataVI13, this.dataVI14, this.dataVI15, this.dataVI16,
            this.dataVI17, this.dataVI18, this.dataVI19, this.dataVI20, this.dataVI21, this.dataVI22, this.dataVI23, this.dataVI24
        ];
        //this.setGraficosAI();
    };
    Dashboard2Component.prototype.agregaDatosVI3 = function (item) {
        //resetea el grafico a la cantidad de datos iniciales
        var datosLen = this.dataVI17.length;
        var maxDatosGraficos = 800;
        if (datosLen > maxDatosGraficos) {
            this.cargarDatosVI();
            return;
        }
        var timeStamp;
        var timeStamp1;
        var keyTimeValueVI17;
        var keyTimeValueVI18;
        var keyTimeValueVI19;
        var keyTimeValueVI20;
        var keyTimeValueVI21;
        var keyTimeValueVI22;
        var keyTimeValueVI23;
        var keyTimeValueVI24;
        var valor;
        timeStamp1 = new Date(item.timestamp);
        timeStamp = new Date(timeStamp1.getFullYear(), timeStamp1.getMonth(), timeStamp1.getDate(), timeStamp1.getHours(), timeStamp1.getMinutes(), timeStamp1.getSeconds());
        valor = this.valorVIEscalado(16, item.vi17);
        keyTimeValueVI17 = [timeStamp, valor];
        valor = this.valorVIEscalado(17, item.vi18);
        keyTimeValueVI18 = [timeStamp, valor];
        valor = this.valorVIEscalado(18, item.vi19);
        keyTimeValueVI19 = [timeStamp, valor];
        valor = this.valorVIEscalado(19, item.vi20);
        keyTimeValueVI20 = [timeStamp, valor];
        valor = this.valorVIEscalado(20, item.vi21);
        keyTimeValueVI21 = [timeStamp, valor];
        valor = this.valorVIEscalado(21, item.vi22);
        keyTimeValueVI22 = [timeStamp, valor];
        valor = this.valorVIEscalado(22, item.vi23);
        keyTimeValueVI23 = [timeStamp, valor];
        valor = this.valorVIEscalado(23, item.vi24);
        keyTimeValueVI24 = [timeStamp, valor];
        this.dataVI17.push(keyTimeValueVI17);
        this.dataVI18.push(keyTimeValueVI18);
        this.dataVI19.push(keyTimeValueVI19);
        this.dataVI20.push(keyTimeValueVI20);
        this.dataVI21.push(keyTimeValueVI21);
        this.dataVI22.push(keyTimeValueVI22);
        this.dataVI23.push(keyTimeValueVI23);
        this.dataVI24.push(keyTimeValueVI24);
        this.DataVI = [this.dataVI1, this.dataVI2, this.dataVI3, this.dataVI4, this.dataVI5, this.dataVI6, this.dataVI7, this.dataVI8,
            this.dataVI9, this.dataVI10, this.dataVI11, this.dataVI12, this.dataVI13, this.dataVI14, this.dataVI15, this.dataVI16,
            this.dataVI17, this.dataVI18, this.dataVI19, this.dataVI20, this.dataVI21, this.dataVI22, this.dataVI23, this.dataVI24
        ];
        //this.setGraficosAI();
    };
    Dashboard2Component.prototype.dataUnirDO = function (regleta) {
        var data;
        if (regleta == 1) {
            var do1 = this.formControlDO1.getRawValue().controlDO1 ? 1 : 0;
            var do2 = this.formControlDO1.getRawValue().controlDO2 ? 1 : 0;
            var do3 = this.formControlDO1.getRawValue().controlDO3 ? 1 : 0;
            var do4 = this.formControlDO1.getRawValue().controlDO4 ? 1 : 0;
            var do5 = this.formControlDO1.getRawValue().controlDO5 ? 1 : 0;
            var do6 = this.formControlDO1.getRawValue().controlDO6 ? 1 : 0;
            var do7 = this.formControlDO1.getRawValue().controlDO7 ? 1 : 0;
            var do8 = this.formControlDO1.getRawValue().controlDO8 ? 1 : 0;
            data = {
                DO: regleta,
                p1: do1,
                p2: do2,
                p3: do3,
                p4: do4,
                p5: do5,
                p6: do6,
                p7: do7,
                p8: do8
            };
        }
        return data;
    };
    Dashboard2Component.prototype.dataUnirAO = function (regleta) {
        var data;
        switch (regleta) {
            case 1:
                data = {
                    AO: regleta,
                    p1: this.valorAO1Escalado(0, this.formControlAO1.getRawValue().controlAO1) || 0,
                    p2: this.valorAO1Escalado(1, this.formControlAO1.getRawValue().controlAO2) || 0,
                    p3: this.valorAO1Escalado(2, this.formControlAO1.getRawValue().controlAO3) || 0,
                    p4: this.valorAO1Escalado(3, this.formControlAO1.getRawValue().controlAO4) || 0,
                    p5: this.valorAO1Escalado(4, this.formControlAO1.getRawValue().controlAO5) || 0,
                    p6: this.valorAO1Escalado(5, this.formControlAO1.getRawValue().controlAO6) || 0,
                    p7: this.valorAO1Escalado(6, this.formControlAO1.getRawValue().controlAO7) || 0,
                    p8: this.valorAO1Escalado(7, this.formControlAO1.getRawValue().controlAO8) || 0
                };
                break;
            case 2:
                data = {
                    AO: regleta,
                    p1: this.valorAO2Escalado(0, this.formControlAO2.getRawValue().controlAO1) || 0,
                    p2: this.valorAO2Escalado(1, this.formControlAO2.getRawValue().controlAO2) || 0,
                    p3: this.valorAO2Escalado(2, this.formControlAO2.getRawValue().controlAO3) || 0,
                    p4: this.valorAO2Escalado(3, this.formControlAO2.getRawValue().controlAO4) || 0,
                    p5: this.valorAO2Escalado(4, this.formControlAO2.getRawValue().controlAO5) || 0,
                    p6: this.valorAO2Escalado(5, this.formControlAO2.getRawValue().controlAO6) || 0,
                    p7: this.valorAO2Escalado(6, this.formControlAO2.getRawValue().controlAO7) || 0,
                    p8: this.valorAO2Escalado(7, this.formControlAO2.getRawValue().controlAO8) || 0
                };
                break;
            case 3:
                data = {
                    AO: regleta,
                    p1: this.valorAO3Escalado(0, this.formControlAO3.getRawValue().controlAO1) || 0,
                    p2: this.valorAO3Escalado(1, this.formControlAO3.getRawValue().controlAO2) || 0,
                    p3: this.valorAO3Escalado(2, this.formControlAO3.getRawValue().controlAO3) || 0,
                    p4: this.valorAO3Escalado(3, this.formControlAO3.getRawValue().controlAO4) || 0,
                    p5: this.valorAO3Escalado(4, this.formControlAO3.getRawValue().controlAO5) || 0,
                    p6: this.valorAO3Escalado(5, this.formControlAO3.getRawValue().controlAO6) || 0,
                    p7: this.valorAO3Escalado(6, this.formControlAO3.getRawValue().controlAO7) || 0,
                    p8: this.valorAO3Escalado(7, this.formControlAO3.getRawValue().controlAO8) || 0
                };
                break;
            default:
                data = {
                    AO: regleta,
                    p1: 0,
                    p2: 0,
                    p3: 0,
                    p4: 0,
                    p5: 0,
                    p6: 0,
                    p7: 0,
                    p8: 0
                };
                break;
        }
        return data;
    };
    Dashboard2Component.prototype.dataUnirVI = function (regleta) {
        var data;
        switch (regleta) {
            case 1:
                data = {
                    VI: regleta,
                    p1: this.valorVI1Escalado(0, this.formControlVI1.getRawValue().controlVI1) || 0,
                    p2: this.valorVI1Escalado(1, this.formControlVI1.getRawValue().controlVI2) || 0,
                    p3: this.valorVI1Escalado(2, this.formControlVI1.getRawValue().controlVI3) || 0,
                    p4: this.valorVI1Escalado(3, this.formControlVI1.getRawValue().controlVI4) || 0,
                    p5: this.valorVI1Escalado(4, this.formControlVI1.getRawValue().controlVI5) || 0,
                    p6: this.valorVI1Escalado(5, this.formControlVI1.getRawValue().controlVI6) || 0,
                    p7: this.valorVI1Escalado(6, this.formControlVI1.getRawValue().controlVI7) || 0,
                    p8: this.valorVI1Escalado(7, this.formControlVI1.getRawValue().controlVI8) || 0
                };
                break;
            case 2:
                data = {
                    VI: regleta,
                    p1: this.valorVI2Escalado(0, this.formControlVI2.getRawValue().controlVI1) || 0,
                    p2: this.valorVI2Escalado(1, this.formControlVI2.getRawValue().controlVI2) || 0,
                    p3: this.valorVI2Escalado(2, this.formControlVI2.getRawValue().controlVI3) || 0,
                    p4: this.valorVI2Escalado(3, this.formControlVI2.getRawValue().controlVI4) || 0,
                    p5: this.valorVI2Escalado(4, this.formControlVI2.getRawValue().controlVI5) || 0,
                    p6: this.valorVI2Escalado(5, this.formControlVI2.getRawValue().controlVI6) || 0,
                    p7: this.valorVI2Escalado(6, this.formControlVI2.getRawValue().controlVI7) || 0,
                    p8: this.valorVI2Escalado(7, this.formControlVI2.getRawValue().controlVI8) || 0
                };
                break;
            case 3:
                data = {
                    VI: regleta,
                    p1: this.valorVI3Escalado(0, this.formControlVI3.getRawValue().controlVI1) || 0,
                    p2: this.valorVI3Escalado(1, this.formControlVI3.getRawValue().controlVI2) || 0,
                    p3: this.valorVI3Escalado(2, this.formControlVI3.getRawValue().controlVI3) || 0,
                    p4: this.valorVI3Escalado(3, this.formControlVI3.getRawValue().controlVI4) || 0,
                    p5: this.valorVI3Escalado(4, this.formControlVI3.getRawValue().controlVI5) || 0,
                    p6: this.valorVI3Escalado(5, this.formControlVI3.getRawValue().controlVI6) || 0,
                    p7: this.valorVI3Escalado(6, this.formControlVI3.getRawValue().controlVI7) || 0,
                    p8: this.valorVI3Escalado(7, this.formControlVI3.getRawValue().controlVI8) || 0
                };
                break;
            default:
                data = {
                    VI: regleta,
                    p1: 0,
                    p2: 0,
                    p3: 0,
                    p4: 0,
                    p5: 0,
                    p6: 0,
                    p7: 0,
                    p8: 0
                };
                break;
        }
        return data;
    };
    Dashboard2Component.prototype.enviaCambioControlDO = function (regleta) {
        var data;
        var dataS;
        data = this.dataUnirDO(regleta);
        dataS = JSON.stringify(data);
        this._websocketService.sendMessage(dataS);
    };
    Dashboard2Component.prototype.enviaCambioControlAO = function (regleta) {
        var data;
        var dataS;
        data = this.dataUnirAO(regleta);
        dataS = JSON.stringify(data);
        this._websocketService.sendMessage(dataS);
    };
    Dashboard2Component.prototype.enviaCambioControlVI = function (regleta) {
        var data;
        var dataS;
        data = this.dataUnirVI(regleta);
        dataS = JSON.stringify(data);
        this._websocketService.sendMessage(dataS);
    };
    //ESCALADO DE AO
    //de min-max a 0-999
    Dashboard2Component.prototype.valorAO1Escalado = function (item, dato) {
        var min;
        var max;
        var m;
        var c;
        if (this.itemsAO1[item].min) {
            min = this.itemsAO1[item].min;
        }
        else {
            min = 0;
        }
        if (this.itemsAO1[item].max) {
            max = this.itemsAO1[item].max;
        }
        else {
            max = 100;
        }
        var valor = 0;
        //Calculo valor
        if (max > min) {
            m = 999 / (max - min);
            c = 999 - m * max;
            valor = Math.round(m * dato + c);
        }
        return valor;
    };
    Dashboard2Component.prototype.valorAO2Escalado = function (item, dato) {
        var min;
        var max;
        var m;
        var c;
        if (this.itemsAO2[item].min) {
            min = this.itemsAO2[item].min;
        }
        else {
            min = 0;
        }
        if (this.itemsAO2[item].max) {
            max = this.itemsAO2[item].max;
        }
        else {
            max = 100;
        }
        var valor = 0;
        //Calculo valor
        if (max > min) {
            m = 999 / (max - min);
            c = 999 - m * max;
            valor = Math.round(m * dato + c);
        }
        return valor;
    };
    Dashboard2Component.prototype.valorAO3Escalado = function (item, dato) {
        var elemento;
        var min;
        var max;
        var m;
        var c;
        if (this.itemsAO3[item].min) {
            min = this.itemsAO3[item].min;
        }
        else {
            min = 0;
        }
        if (this.itemsAO3[item].max) {
            max = this.itemsAO3[item].max;
        }
        else {
            max = 100;
        }
        var valor = 0;
        //Calculo valor
        if (max > min) {
            m = 999 / (max - min);
            c = 999 - m * max;
            valor = Math.round(m * dato + c);
        }
        return valor;
    };
    //de 0-999 a min-max
    Dashboard2Component.prototype.valorAO1EscaladoInverso = function (item) {
        var min;
        var max;
        var m;
        var c;
        var dato = this.itemsAO1[item].valor;
        if (this.itemsAO1[item].min) {
            min = this.itemsAO1[item].min;
        }
        else {
            min = 0;
        }
        if (this.itemsAO1[item].max) {
            max = this.itemsAO1[item].max;
        }
        else {
            max = 100;
        }
        var valor = 0;
        //Calculo valor
        if (max > min) {
            m = (max - min) / 999;
            c = max - m * 999;
            valor = Math.round(m * dato + c);
        }
        return valor;
    };
    Dashboard2Component.prototype.valorAO2EscaladoInverso = function (item) {
        var min;
        var max;
        var m;
        var c;
        var dato = this.itemsAO2[item].valor;
        if (this.itemsAO2[item].min) {
            min = this.itemsAO2[item].min;
        }
        else {
            min = 0;
        }
        if (this.itemsAO2[item].max) {
            max = this.itemsAO2[item].max;
        }
        else {
            max = 100;
        }
        var valor = 0;
        //Calculo valor
        if (max > min) {
            m = (max - min) / 999;
            c = max - m * 999;
            valor = Math.round(m * dato + c);
        }
        return valor;
    };
    Dashboard2Component.prototype.valorAO3EscaladoInverso = function (item) {
        var elemento;
        var min;
        var max;
        var m;
        var c;
        var dato = this.itemsAO3[item].valor;
        if (this.itemsAO3[item].min) {
            min = this.itemsAO3[item].min;
        }
        else {
            min = 0;
        }
        if (this.itemsAO3[item].max) {
            max = this.itemsAO3[item].max;
        }
        else {
            max = 100;
        }
        var valor = 0;
        //Calculo valor
        if (max > min) {
            m = (max - min) / 999;
            c = max - m * 999;
            valor = Math.round(m * dato + c);
        }
        return valor;
    };
    //ESCALADO DE VI
    //de min-max a 0-999
    Dashboard2Component.prototype.valorVI1Escalado = function (item, dato) {
        var min;
        var max;
        var m;
        var c;
        if (this.itemsVI1[item].min) {
            min = this.itemsVI1[item].min;
        }
        else {
            min = 0;
        }
        if (this.itemsVI1[item].max) {
            max = this.itemsVI1[item].max;
        }
        else {
            max = 100;
        }
        var valor = 0;
        //Calculo valor
        if (max > min) {
            m = 999 / (max - min);
            c = 999 - m * max;
            valor = Math.round(m * dato + c);
        }
        return valor;
    };
    Dashboard2Component.prototype.valorVI2Escalado = function (item, dato) {
        var min;
        var max;
        var m;
        var c;
        if (this.itemsVI2[item].min) {
            min = this.itemsVI2[item].min;
        }
        else {
            min = 0;
        }
        if (this.itemsVI2[item].max) {
            max = this.itemsVI2[item].max;
        }
        else {
            max = 100;
        }
        var valor = 0;
        //Calculo valor
        if (max > min) {
            m = 999 / (max - min);
            c = 999 - m * max;
            valor = Math.round(m * dato + c);
        }
        return valor;
    };
    Dashboard2Component.prototype.valorVI3Escalado = function (item, dato) {
        var elemento;
        var min;
        var max;
        var m;
        var c;
        if (this.itemsVI3[item].min) {
            min = this.itemsVI3[item].min;
        }
        else {
            min = 0;
        }
        if (this.itemsVI3[item].max) {
            max = this.itemsVI3[item].max;
        }
        else {
            max = 100;
        }
        var valor = 0;
        //Calculo valor
        if (max > min) {
            m = 999 / (max - min);
            c = 999 - m * max;
            valor = Math.round(m * dato + c);
        }
        return valor;
    };
    //de 0-999 a min-max
    Dashboard2Component.prototype.valorVI1EscaladoInverso = function (item) {
        var min;
        var max;
        var m;
        var c;
        var dato = this.itemsVI1[item].valor;
        if (this.itemsVI1[item].min) {
            min = this.itemsVI1[item].min;
        }
        else {
            min = 0;
        }
        if (this.itemsVI1[item].max) {
            max = this.itemsVI1[item].max;
        }
        else {
            max = 100;
        }
        var valor = 0;
        //Calculo valor
        if (max > min) {
            m = (max - min) / 999;
            c = max - m * 999;
            valor = Math.round(m * dato + c);
        }
        return valor;
    };
    Dashboard2Component.prototype.valorVI2EscaladoInverso = function (item) {
        var min;
        var max;
        var m;
        var c;
        var dato = this.itemsVI2[item].valor;
        if (this.itemsVI2[item].min) {
            min = this.itemsVI2[item].min;
        }
        else {
            min = 0;
        }
        if (this.itemsVI2[item].max) {
            max = this.itemsVI2[item].max;
        }
        else {
            max = 100;
        }
        var valor = 0;
        //Calculo valor
        if (max > min) {
            m = (max - min) / 999;
            c = max - m * 999;
            valor = Math.round(m * dato + c);
        }
        return valor;
    };
    Dashboard2Component.prototype.valorVI3EscaladoInverso = function (item) {
        var elemento;
        var min;
        var max;
        var m;
        var c;
        var dato = this.itemsVI3[item].valor;
        if (this.itemsVI3[item].min) {
            min = this.itemsVI3[item].min;
        }
        else {
            min = 0;
        }
        if (this.itemsVI3[item].max) {
            max = this.itemsVI3[item].max;
        }
        else {
            max = 100;
        }
        var valor = 0;
        //Calculo valor
        if (max > min) {
            m = (max - min) / 999;
            c = max - m * 999;
            valor = Math.round(m * dato + c);
        }
        return valor;
    };
    Dashboard2Component.prototype.diferenciaDias = function (desde, hasta) {
        return Math.round(1 + (hasta.getTime() - desde.getTime()) / (1000 * 60 * 60 * 24));
    };
    Dashboard2Component.prototype.onSubmitGraficar = function () {
        var _this = this;
        var entrada = this.formGraficaHistorico.getRawValue().entrada;
        var desde = new Date(this.formGraficaHistorico.getRawValue().desde);
        var hasta = new Date(this.formGraficaHistorico.getRawValue().hasta);
        this.errRango = false;
        if (desde.getTime() <= hasta.getTime()) {
            this.cargandoGraficoHist = true;
            this.cantDiasHist = this.diferenciaDias(desde, hasta);
            if (entrada.includes('di')) {
                this._digitalinputService.itemsRangoFechas(desde, hasta)
                    .subscribe(function (resp) {
                    _this.analizaDataDIHistorico(entrada, resp.items);
                    _this.listoParaExportar = true;
                });
            }
            if (entrada.includes('ai')) {
                this._analoginputService.itemsRangoFechas(desde, hasta)
                    .subscribe(function (resp) {
                    _this.analizaDataAIHistorico(entrada, resp.items);
                    _this.listoParaExportar = true;
                });
            }
            if (entrada.includes('vi')) {
                this._variableinternaService.itemsRangoFechas(desde, hasta)
                    .subscribe(function (resp) {
                    _this.analizaDataVIHistorico(entrada, resp.items);
                    _this.listoParaExportar = true;
                });
            }
        }
        else {
            this.errRango = true;
            this.cantDiasHist = 0;
            this.cantDatosHist = 0;
        }
    };
    Dashboard2Component.prototype.onSubmitGraficarEvento = function () {
        var _this = this;
        var entrada = this.formGraficaEvento.getRawValue().entrada;
        var desde = new Date(this.formGraficaEvento.getRawValue().desde);
        var hasta = new Date(this.formGraficaEvento.getRawValue().hasta);
        this.errRangoEvento = false;
        if (desde.getTime() <= hasta.getTime()) {
            this.cargandoGraficoEvento = true;
            this.cantDiasEvento = this.diferenciaDias(desde, hasta);
            this._eventoentradaService.itemsRangoFechas(desde, hasta)
                .subscribe(function (resp) {
                _this.analizadataEvento(entrada, resp.items, desde);
                _this.listoParaExportarEvento = true;
            });
        }
        else {
            this.errRangoEvento = true;
            this.cantDiasEvento = 0;
            this.cantDatosEvento = 0;
        }
    };
    Dashboard2Component.prototype.valorAiEscalado = function (item, dato) {
        var elemento;
        var min;
        var max;
        var m;
        var c;
        var cantelementos = this.datosElementocanvas.length;
        if (item < cantelementos) {
            elemento = this.datosElementocanvas[item];
            min = elemento.min;
            max = elemento.max;
            var valor = 0;
            //Calculo valor
            if (max > min) {
                m = 999 / (max - min);
                c = 999 - m * max;
                valor = parseFloat(Number((dato - c) / m).toFixed(2));
            }
        }
        else {
            valor = 0;
        }
        return valor;
    };
    Dashboard2Component.prototype.valorVIEscalado = function (item, dato) {
        var elemento;
        var min;
        var max;
        var m;
        var c;
        var cantelementos = this.datosVIcanvas.length;
        if (item < cantelementos) {
            elemento = this.datosVIcanvas[item];
            min = elemento.min;
            max = elemento.max;
            var valor = 0;
            //Calculo valor
            if (max > min) {
                m = 999 / (max - min);
                c = 999 - m * max;
                valor = parseFloat(Number((dato - c) / m).toFixed(2));
            }
        }
        else {
            valor = 0;
        }
        return valor;
    };
    Dashboard2Component.prototype.analizaDataAIHistorico = function (ai, datosAIhistorico) {
        var dataAIGrafico = [];
        var timeStamp;
        var timeStamp1;
        var keyTimeValue;
        var idGrafico;
        if (datosAIhistorico.length) {
            this.cantDatosHist = datosAIhistorico.length;
            for (var _i = 0, datosAIhistorico_1 = datosAIhistorico; _i < datosAIhistorico_1.length; _i++) {
                var item = datosAIhistorico_1[_i];
                //para que no salgan los ms
                timeStamp1 = new Date(item.timestamp);
                timeStamp = new Date(timeStamp1.getFullYear(), timeStamp1.getMonth(), timeStamp1.getDate(), timeStamp1.getHours(), timeStamp1.getMinutes(), timeStamp1.getSeconds());
                switch (ai) {
                    case "ai0":
                        idGrafico = 0;
                        var valor = this.valorAiEscalado(idGrafico, item.ai1);
                        keyTimeValue = [timeStamp, valor];
                        // this.tituloGraficoHstorico=' de Analog Input 1';
                        break;
                    case "ai1":
                        idGrafico = 1;
                        var valor = this.valorAiEscalado(idGrafico, item.ai2);
                        keyTimeValue = [timeStamp, valor];
                        // this.tituloGraficoHstorico=' de Analog Input 2';
                        break;
                    case "ai2":
                        idGrafico = 2;
                        var valor = this.valorAiEscalado(idGrafico, item.ai3);
                        keyTimeValue = [timeStamp, valor];
                        // this.tituloGraficoHstorico=' de Analog Input 3';
                        break;
                    case "ai3":
                        idGrafico = 3;
                        var valor = this.valorAiEscalado(idGrafico, item.ai4);
                        keyTimeValue = [timeStamp, valor];
                        // this.tituloGraficoHstorico=' de Analog Input 4';
                        break;
                    case "ai4":
                        idGrafico = 4;
                        var valor = this.valorAiEscalado(idGrafico, item.ai5);
                        keyTimeValue = [timeStamp, valor];
                        // this.tituloGraficoHstorico=' de Analog Input 5';
                        break;
                    case "ai5":
                        idGrafico = 5;
                        var valor = this.valorAiEscalado(idGrafico, item.ai6);
                        keyTimeValue = [timeStamp, valor];
                        // this.tituloGraficoHstorico=' de Analog Input 6';
                        break;
                    case "ai6":
                        idGrafico = 6;
                        var valor = this.valorAiEscalado(idGrafico, item.ai7);
                        keyTimeValue = [timeStamp, valor];
                        // this.tituloGraficoHstorico=' de Analog Input 7';
                        break;
                    case "ai7":
                        idGrafico = 7;
                        var valor = this.valorAiEscalado(idGrafico, item.ai8);
                        keyTimeValue = [timeStamp, valor];
                        // this.tituloGraficoHstorico=' de Analog Input 8';
                        break;
                }
                dataAIGrafico.push(keyTimeValue);
            }
        }
        else {
            var hoy = new Date();
            var _hoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), hoy.getHours(), hoy.getMinutes(), hoy.getSeconds());
            //console.log(ai.slice(2));
            idGrafico = parseInt(ai.slice(2));
            dataAIGrafico = [[_hoy, 0]];
            this.cantDatosHist = 0;
        }
        this.setGraficoHistorico('ai', idGrafico, dataAIGrafico);
    };
    Dashboard2Component.prototype.analizaDataVIHistorico = function (vi, datosVIhistorico) {
        var dataVIGrafico = [];
        var timeStamp;
        var timeStamp1;
        var keyTimeValue;
        var idGrafico;
        if (datosVIhistorico.length) {
            this.cantDatosHist = datosVIhistorico.length;
            for (var _i = 0, datosVIhistorico_1 = datosVIhistorico; _i < datosVIhistorico_1.length; _i++) {
                var item = datosVIhistorico_1[_i];
                //para que no salgan los ms
                timeStamp1 = new Date(item.timestamp);
                timeStamp = new Date(timeStamp1.getFullYear(), timeStamp1.getMonth(), timeStamp1.getDate(), timeStamp1.getHours(), timeStamp1.getMinutes(), timeStamp1.getSeconds());
                switch (vi) {
                    case "vi0":
                        idGrafico = 0;
                        var valor = this.valorVIEscalado(idGrafico, item.vi1);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi1":
                        idGrafico = 1;
                        var valor = this.valorVIEscalado(idGrafico, item.vi2);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi2":
                        idGrafico = 2;
                        var valor = this.valorVIEscalado(idGrafico, item.vi3);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi3":
                        idGrafico = 3;
                        var valor = this.valorVIEscalado(idGrafico, item.vi4);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi4":
                        idGrafico = 4;
                        var valor = this.valorVIEscalado(idGrafico, item.vi5);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi5":
                        idGrafico = 5;
                        var valor = this.valorVIEscalado(idGrafico, item.vi6);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi6":
                        idGrafico = 6;
                        var valor = this.valorVIEscalado(idGrafico, item.vi7);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi7":
                        idGrafico = 7;
                        var valor = this.valorVIEscalado(idGrafico, item.vi8);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi8":
                        idGrafico = 8;
                        var valor = this.valorVIEscalado(idGrafico, item.vi9);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi9":
                        idGrafico = 9;
                        var valor = this.valorVIEscalado(idGrafico, item.vi10);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi10":
                        idGrafico = 10;
                        var valor = this.valorVIEscalado(idGrafico, item.vi11);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi11":
                        idGrafico = 11;
                        var valor = this.valorVIEscalado(idGrafico, item.vi12);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi12":
                        idGrafico = 12;
                        var valor = this.valorVIEscalado(idGrafico, item.vi13);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi13":
                        idGrafico = 13;
                        var valor = this.valorVIEscalado(idGrafico, item.vi14);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi14":
                        idGrafico = 14;
                        var valor = this.valorVIEscalado(idGrafico, item.vi15);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi15":
                        idGrafico = 15;
                        var valor = this.valorVIEscalado(idGrafico, item.vi16);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi16":
                        idGrafico = 16;
                        var valor = this.valorVIEscalado(idGrafico, item.vi17);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi17":
                        idGrafico = 17;
                        var valor = this.valorVIEscalado(idGrafico, item.vi18);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi18":
                        idGrafico = 18;
                        var valor = this.valorVIEscalado(idGrafico, item.vi19);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi19":
                        idGrafico = 19;
                        var valor = this.valorVIEscalado(idGrafico, item.vi20);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi20":
                        idGrafico = 20;
                        var valor = this.valorVIEscalado(idGrafico, item.vi21);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi21":
                        idGrafico = 21;
                        var valor = this.valorVIEscalado(idGrafico, item.vi22);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi22":
                        idGrafico = 22;
                        var valor = this.valorVIEscalado(idGrafico, item.vi23);
                        keyTimeValue = [timeStamp, valor];
                        break;
                    case "vi23":
                        idGrafico = 23;
                        var valor = this.valorVIEscalado(idGrafico, item.vi24);
                        keyTimeValue = [timeStamp, valor];
                        break;
                }
                dataVIGrafico.push(keyTimeValue);
            }
        }
        else {
            var hoy = new Date();
            var _hoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), hoy.getHours(), hoy.getMinutes(), hoy.getSeconds());
            //console.log(ai.slice(2));
            idGrafico = parseInt(vi.slice(2));
            dataVIGrafico = [[_hoy, 0]];
            this.cantDatosHist = 0;
        }
        this.setGraficoHistorico('vi', idGrafico, dataVIGrafico);
    };
    Dashboard2Component.prototype.analizaDataDIHistorico = function (di, datosDIhistorico) {
        var dataDIGrafico = [];
        var timeStamp;
        var timeStamp1;
        var keyTimeValue;
        var idGrafico;
        if (datosDIhistorico.length) {
            this.cantDatosHist = datosDIhistorico.length;
            for (var _i = 0, datosDIhistorico_1 = datosDIhistorico; _i < datosDIhistorico_1.length; _i++) {
                var item = datosDIhistorico_1[_i];
                //para que no salgan los ms
                timeStamp1 = new Date(item.timestamp);
                timeStamp = new Date(timeStamp1.getFullYear(), timeStamp1.getMonth(), timeStamp1.getDate(), timeStamp1.getHours(), timeStamp1.getMinutes(), timeStamp1.getSeconds());
                switch (di) {
                    case "di0":
                        idGrafico = 0;
                        keyTimeValue = [timeStamp, item.di1];
                        // this.tituloGraficoHstorico=' de DI 1';
                        break;
                    case "di1":
                        idGrafico = 1;
                        keyTimeValue = [timeStamp, item.di2];
                        // this.tituloGraficoHstorico=' de DI 2';
                        break;
                    case "di2":
                        idGrafico = 2;
                        keyTimeValue = [timeStamp, item.di3];
                        // this.tituloGraficoHstorico=' de DI 3';
                        break;
                    case "di3":
                        idGrafico = 3;
                        keyTimeValue = [timeStamp, item.di4];
                        // this.tituloGraficoHstorico=' de DI 4';
                        break;
                    case "di4":
                        idGrafico = 4;
                        keyTimeValue = [timeStamp, item.di5];
                        // this.tituloGraficoHstorico=' de DI 5';
                        break;
                    case "di5":
                        idGrafico = 5;
                        keyTimeValue = [timeStamp, item.di6];
                        // this.tituloGraficoHstorico=' de DI 6';
                        break;
                    case "di6":
                        idGrafico = 6;
                        keyTimeValue = [timeStamp, item.di7];
                        // this.tituloGraficoHstorico=' de DI 7';
                        break;
                    case "di7":
                        idGrafico = 7;
                        keyTimeValue = [timeStamp, item.di8];
                        // this.tituloGraficoHstorico=' de DI 8';
                        break;
                }
                dataDIGrafico.push(keyTimeValue);
            }
        }
        else {
            var hoy = new Date();
            var _hoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), hoy.getHours(), hoy.getMinutes(), hoy.getSeconds());
            //console.log(di.slice(2));
            idGrafico = parseInt(di.slice(2));
            dataDIGrafico = [[_hoy, 0]];
            this.cantDatosHist = 0;
        }
        this.setGraficoHistorico('di', idGrafico, dataDIGrafico);
    };
    Dashboard2Component.prototype.analizadataEvento = function (entrada, datosEvento, desde) {
        var _this = this;
        var cantDatosDI1 = 0;
        var cantDatosDI2 = 0;
        var cantDatosDI3 = 0;
        var cantDatosDI4 = 0;
        var cantDatosDI5 = 0;
        var cantDatosDI6 = 0;
        var cantDatosDI7 = 0;
        var cantDatosDI8 = 0;
        var cantDatosAI1 = 0;
        var cantDatosAI2 = 0;
        var cantDatosAI3 = 0;
        var cantDatosAI4 = 0;
        var cantDatosAI5 = 0;
        var cantDatosAI6 = 0;
        var cantDatosAI7 = 0;
        var cantDatosAI8 = 0;
        var cantDatosVItodos = [0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ];
        var DatosDI1 = [];
        var DatosDI2 = [];
        var DatosDI3 = [];
        var DatosDI4 = [];
        var DatosDI5 = [];
        var DatosDI6 = [];
        var DatosDI7 = [];
        var DatosDI8 = [];
        var DatosAI1 = [];
        var DatosAI2 = [];
        var DatosAI3 = [];
        var DatosAI4 = [];
        var DatosAI5 = [];
        var DatosAI6 = [];
        var DatosAI7 = [];
        var DatosAI8 = [];
        var DatosVItodos = [[], [], [], [], [], [], [], [],
            [], [], [], [], [], [], [], [],
            [], [], [], [], [], [], [], []
        ];
        var labelDias = [];
        var dias = this.cantDiasEvento;
        var ndia = new Date(desde);
        var dia = ndia.getDate();
        var mes = ndia.getMonth() + 1;
        var edia;
        var diaDato;
        var mesDato;
        this.graficoEventoLabels = [];
        if (datosEvento.length) {
            for (var i = 0; i < dias; ++i) { //RRECORE TODOS LOS DIAS CONSULTADOS
                //console.log(i);
                //RESETEAR CONTADORES
                cantDatosDI1 = 0;
                cantDatosDI2 = 0;
                cantDatosDI3 = 0;
                cantDatosDI4 = 0;
                cantDatosDI5 = 0;
                cantDatosDI6 = 0;
                cantDatosDI7 = 0;
                cantDatosDI8 = 0;
                cantDatosAI1 = 0;
                cantDatosAI2 = 0;
                cantDatosAI3 = 0;
                cantDatosAI4 = 0;
                cantDatosAI5 = 0;
                cantDatosAI6 = 0;
                cantDatosAI7 = 0;
                cantDatosAI8 = 0;
                for (var f = 0; f < 24; ++f) {
                    cantDatosVItodos[f] = 0;
                }
                if (i != 0) {
                    ndia = new Date(ndia.setHours(24));
                }
                dia = ndia.getDate();
                mes = ndia.getMonth() + 1;
                var labelD = dia + '/' + mes;
                labelDias.push(dia + '/' + mes);
                //this.graficoEventoLabels.push(labelD);
                for (var _i = 0, datosEvento_1 = datosEvento; _i < datosEvento_1.length; _i++) { //RECORRE TODOS LOS DATOS CONSULTADOS
                    var item = datosEvento_1[_i];
                    edia = new Date(item.timestamp);
                    diaDato = edia.getDate();
                    mesDato = edia.getMonth() + 1;
                    if (dia == diaDato && mes == mesDato) { //SI EL DIA DEL DATO CORRESPONDE AL DIA CONSULTADO CONTAR
                        switch (item.sensor) {
                            case "DI 1":
                                cantDatosDI1++;
                                break;
                            case "DI 2":
                                cantDatosDI2++;
                                break;
                            case "DI 3":
                                cantDatosDI3++;
                                break;
                            case "DI 4":
                                cantDatosDI4++;
                                break;
                            case "DI 5":
                                cantDatosDI5++;
                                break;
                            case "DI 6":
                                cantDatosDI6++;
                                break;
                            case "DI 7":
                                cantDatosDI7++;
                                break;
                            case "DI 8":
                                cantDatosDI8++;
                                break;
                            case "AI 1":
                                cantDatosAI1++;
                                break;
                            case "AI 2":
                                cantDatosAI2++;
                                break;
                            case "AI 3":
                                cantDatosAI3++;
                                break;
                            case "AI 4":
                                cantDatosAI4++;
                                break;
                            case "AI 5":
                                cantDatosAI5++;
                                break;
                            case "AI 6":
                                cantDatosAI6++;
                                break;
                            case "AI 7":
                                cantDatosAI7++;
                                break;
                            case "AI 8":
                                cantDatosAI8++;
                                break;
                            case "VI 1":
                                cantDatosVItodos[0]++;
                                break;
                            case "VI 2":
                                cantDatosVItodos[1]++;
                                break;
                            case "VI 3":
                                cantDatosVItodos[2]++;
                                break;
                            case "VI 4":
                                cantDatosVItodos[3]++;
                                break;
                            case "VI 5":
                                cantDatosVItodos[4]++;
                                break;
                            case "VI 6":
                                cantDatosVItodos[5]++;
                                break;
                            case "VI 7":
                                cantDatosVItodos[6]++;
                                break;
                            case "VI 8":
                                cantDatosVItodos[7]++;
                                break;
                            case "VI 9":
                                cantDatosVItodos[8]++;
                                break;
                            case "VI 10":
                                cantDatosVItodos[9]++;
                                break;
                            case "VI 11":
                                cantDatosVItodos[10]++;
                                break;
                            case "VI 12":
                                cantDatosVItodos[11]++;
                                break;
                            case "VI 13":
                                cantDatosVItodos[12]++;
                                break;
                            case "VI 14":
                                cantDatosVItodos[13]++;
                                break;
                            case "VI 15":
                                cantDatosVItodos[14]++;
                                break;
                            case "VI 16":
                                cantDatosVItodos[15]++;
                                break;
                            case "VI 17":
                                cantDatosVItodos[16]++;
                                break;
                            case "VI 18":
                                cantDatosVItodos[17]++;
                                break;
                            case "VI 19":
                                cantDatosVItodos[18]++;
                                break;
                            case "VI 20":
                                cantDatosVItodos[19]++;
                                break;
                            case "VI 21":
                                cantDatosVItodos[20]++;
                                break;
                            case "VI 22":
                                cantDatosVItodos[21]++;
                                break;
                            case "VI 23":
                                cantDatosVItodos[22]++;
                                break;
                            case "VI 24":
                                cantDatosVItodos[23]++;
                                break;
                        }
                    }
                }
                DatosDI1.push(cantDatosDI1);
                DatosDI2.push(cantDatosDI2);
                DatosDI3.push(cantDatosDI3);
                DatosDI4.push(cantDatosDI4);
                DatosDI5.push(cantDatosDI5);
                DatosDI6.push(cantDatosDI6);
                DatosDI7.push(cantDatosDI7);
                DatosDI8.push(cantDatosDI8);
                DatosAI1.push(cantDatosAI1);
                DatosAI2.push(cantDatosAI2);
                DatosAI3.push(cantDatosAI3);
                DatosAI4.push(cantDatosAI4);
                DatosAI5.push(cantDatosAI5);
                DatosAI6.push(cantDatosAI6);
                DatosAI7.push(cantDatosAI7);
                DatosAI8.push(cantDatosAI8);
                for (var g = 0; g < 24; ++g) {
                    DatosVItodos[g].push(cantDatosVItodos[g]);
                }
            }
            this.graficoEventoLabels = labelDias;
            this.diasExcelEvento = labelDias;
            var data_2 = [
                { data: DatosDI1, label: 'DI 1' },
                { data: DatosDI2, label: 'DI 2' },
                { data: DatosDI3, label: 'DI 3' },
                { data: DatosDI4, label: 'DI 4' },
                { data: DatosDI5, label: 'DI 5' },
                { data: DatosDI6, label: 'DI 6' },
                { data: DatosDI7, label: 'DI 7' },
                { data: DatosDI8, label: 'DI 8' },
                { data: DatosAI1, label: 'AI 1' },
                { data: DatosAI2, label: 'AI 2' },
                { data: DatosAI3, label: 'AI 3' },
                { data: DatosAI4, label: 'AI 4' },
                { data: DatosAI5, label: 'AI 5' },
                { data: DatosAI6, label: 'AI 6' },
                { data: DatosAI7, label: 'AI 7' },
                { data: DatosAI8, label: 'AI 8' }
            ];
            //COLOCAR NOMBRE DE VARIABLES
            var e = 0;
            for (var _a = 0, _b = this.datosElementocanvasDi; _a < _b.length; _a++) {
                var item = _b[_a];
                data_2[e].label = item.name;
                e++;
            }
            for (var _c = 0, _d = this.datosElementocanvas; _c < _d.length; _c++) {
                var item = _d[_c];
                data_2[e].label = item.name;
                e++;
            }
            var i = 0;
            for (var _e = 0, _f = this.datosVIcanvas; _e < _f.length; _e++) {
                var item = _f[_e];
                if (item.visible) {
                    data_2.push({ data: DatosVItodos[i], label: item.name });
                }
                i++;
            }
            var r = 0;
            for (var _g = 0, data_1 = data_2; _g < data_1.length; _g++) {
                var item = data_1[_g];
                if (r == 0) {
                    this.graficoEventoData[0] = item;
                }
                else {
                    this.graficoEventoData.push(item);
                }
                r = 1;
            }
            setTimeout(function () {
                _this.dataExcelEvento = data_2;
                _this.chart.getChartBuilder(_this.chart.ctx);
            }, 100);
            this.cantDatosEvento = datosEvento.length;
            this.cargandoGraficoEvento = false;
        }
        else {
            this.cantDatosEvento = 0;
            this.cargandoGraficoEvento = false;
        }
    };
    Dashboard2Component.prototype.listarEventosEntrada = function () {
        var _this = this;
        this._eventoentradaService.itemsRangoUltimos()
            .subscribe(function (resp) {
            _this.dataSource = new MatTableDataSource(resp.items);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    //SOLUCIONA PROBLEMA DE DYGRAPH AL CAMBIAR PANTALLA DESPARCE EL ANCHO
    Dashboard2Component.prototype.detectaTabs = function (event) {
        switch (event) {
            case 0:
                break;
            case 1:
                //Repara el ancho del los graficos
                for (var i = 0; i < 4; i++) {
                    this.grafoAI[i].updateOptions({ animatedZooms: false });
                    this.grafoAI[i].updateOptions({ showRangeSelector: true });
                    this.grafoAI[i].updateOptions({ showRangeSelector: false });
                    this.grafoAI[i].updateOptions({ animatedZooms: true });
                }
                if (this.grafoHist) {
                    this.grafoHist.updateOptions({ animatedZooms: false });
                    this.grafoHist.updateOptions({ showRangeSelector: true });
                    this.grafoHist.updateOptions({ showRangeSelector: false });
                    this.grafoHist.updateOptions({ animatedZooms: true });
                }
                break;
            case 2:
                this.listarEventosEntrada();
                break;
        }
    };
    //GRAFICO BARRAS EVENTOS
    // events
    Dashboard2Component.prototype.chartClicked = function (e) {
        // console.log(e);
    };
    Dashboard2Component.prototype.chartHovered = function (e) {
        // console.log(e);
    };
    //INTERACCION CON CANVAS
    Dashboard2Component.prototype.clickCanvas = function (e) {
        var posX = 0;
        var posY = 0;
        var clientWidth = 0;
        var clientHeight = 0;
        posX = e.clientX;
        posY = e.clientY;
        clientWidth = e.target.clientWidth;
        clientHeight = e.target.clientHeight;
        var elementoSelecionado;
        elementoSelecionado = this.dentroDeArea(clientWidth, clientHeight, posX, posY);
        if (elementoSelecionado.dentro) {
            this.puntero = 'dentroElementoCanvas';
            this.openDialog(elementoSelecionado.id, elementoSelecionado.nombre, elementoSelecionado.yLabel, elementoSelecionado.tipovariable);
        }
        else {
            this.puntero = 'fueraElementoCanvas';
        }
    };
    Dashboard2Component.prototype.overCanvas = function (e) {
        var posX = 0;
        var posY = 0;
        var clientWidth = 0;
        var clientHeight = 0;
        posX = e.clientX;
        posY = e.clientY;
        clientWidth = e.target.clientWidth;
        clientHeight = e.target.clientHeight;
        var elementoSelecionado = false;
        elementoSelecionado = this.dentroDeArea(clientWidth, clientHeight, posX, posY).dentro;
        if (elementoSelecionado) {
            this.puntero = 'dentroElementoCanvas';
        }
        else {
            this.puntero = 'fueraElementoCanvas';
        }
    };
    Dashboard2Component.prototype.dentroDeArea = function (clientW, clientH, posX, posY) {
        var elementoSelecionado;
        var rect = this._canvasdrawService.canvasPlanta.getBoundingClientRect();
        var posXp = posX - rect.left;
        var posYp = posY - rect.top;
        var xc = posXp * 1200 / clientW; //1200 configurado en html
        var yc = posYp * 675 / clientH; //675 configurado en html
        var radioElemento = 50;
        var anchoElemento = 40;
        var altoElemento = 120;
        elementoSelecionado = {
            dentro: false,
            nombre: '',
            id: 0,
            yLabel: '',
            tipovariable: ''
        };
        //BUSCA EN LAS AI  
        if (this.datosElementocanvas) {
            var i = 0;
            for (var _i = 0, _a = this.datosElementocanvas; _i < _a.length; _i++) {
                var item = _a[_i];
                var tipo = item.tipo;
                var pX = item.posx;
                var pY = item.posy;
                if (tipo == 'circular') {
                    if (xc <= pX + radioElemento && xc >= pX - radioElemento && yc <= pY + radioElemento && yc >= pY - radioElemento) {
                        elementoSelecionado = {
                            dentro: true,
                            nombre: item.name,
                            id: i,
                            yLabel: item.unidad,
                            tipovariable: 'AI'
                        };
                    }
                }
                if (tipo == 'barra') {
                    if (xc <= pX + anchoElemento && xc >= pX && yc >= pY - altoElemento && yc <= pY) {
                        elementoSelecionado = {
                            dentro: true,
                            nombre: item.name,
                            id: i,
                            yLabel: item.unidad,
                            tipovariable: 'AI'
                        };
                    }
                }
                i++;
            }
        }
        //BUSCA EN LAS VI
        if (this.datosVIcanvas) {
            var i = 0;
            for (var _b = 0, _c = this.datosVIcanvas; _b < _c.length; _b++) {
                var item = _c[_b];
                var tipo = item.tipo;
                var pX = item.posx;
                var pY = item.posy;
                if (tipo == 'circular') {
                    if (xc <= pX + radioElemento && xc >= pX - radioElemento && yc <= pY + radioElemento && yc >= pY - radioElemento) {
                        elementoSelecionado = {
                            dentro: true,
                            nombre: item.name,
                            id: i,
                            yLabel: item.unidad,
                            tipovariable: 'VI'
                        };
                    }
                }
                if (tipo == 'barra') {
                    if (xc <= pX + anchoElemento && xc >= pX && yc >= pY - altoElemento && yc <= pY) {
                        elementoSelecionado = {
                            dentro: true,
                            nombre: item.name,
                            id: i,
                            yLabel: item.unidad,
                            tipovariable: 'VI'
                        };
                    }
                }
                i++;
            }
        }
        return elementoSelecionado;
    };
    //EXPORAR A EXCEL
    Dashboard2Component.prototype.exportHistoricoAsXLSX = function () {
        var hoy = new Date();
        var fechaHoy = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
        var datos = [];
        var usuario = ['Usuario', this._configuracionService.usuario.name];
        var fecha = ['Fecha', fechaHoy];
        var hora = ['Hora', hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()];
        var encabezado = ['Dia', 'Hora', this.nombreArchivoExcel];
        for (var _i = 0, _a = this.dataExcel; _i < _a.length; _i++) {
            var dato = _a[_i];
            var diaHora = new Date(dato[0]);
            var ano = diaHora.getFullYear();
            var mes = diaHora.getMonth() + 1;
            var dia = diaHora.getDate();
            var hr = diaHora.getHours;
            var fecha_1 = dia + '/' + mes + '/' + ano;
            var hora_1 = diaHora.getHours() + ':' + diaHora.getMinutes() + ':' + diaHora.getSeconds();
            datos.push([fecha_1, hora_1, dato[1]]);
        }
        datos.unshift(encabezado);
        datos.unshift(usuario);
        datos.unshift(hora);
        datos.unshift(fecha);
        this._excelService.exportAsExcelFile(datos, this.nombreArchivoExcel);
    };
    Dashboard2Component.prototype.exportEventoAsXLSX = function () {
        var hoy = new Date();
        var fechaHoy = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
        var datos = [];
        var usuario = ['Usuario', this._configuracionService.usuario.name];
        var fecha = ['Fecha', fechaHoy];
        var hora = ['Hora', hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()];
        var encabezado = [];
        encabezado.push('Dia');
        for (var _i = 0, _a = this.dataExcelEvento; _i < _a.length; _i++) {
            var item = _a[_i];
            encabezado.push(item.label);
        }
        var cantDias = this.diasExcelEvento.length;
        var datosNetos = [];
        for (var i = 0; i < cantDias; i++) {
            datosNetos = [];
            datosNetos.push(this.diasExcelEvento[i]);
            for (var _b = 0, _c = this.dataExcelEvento; _b < _c.length; _b++) {
                var item = _c[_b];
                datosNetos.push(item.data[i]);
            }
            datos.push(datosNetos);
        }
        datos.unshift(encabezado);
        datos.unshift(usuario);
        datos.unshift(hora);
        datos.unshift(fecha);
        this._excelService.exportAsExcelFile(datos, this.nombreArchivoExcelEvento);
    };
    //ABRIR MODAL GRAFICO EN CANVAS
    Dashboard2Component.prototype.openDialog = function (id, nombre, ylabel, tipovariable) {
        //this.DataAI
        if (tipovariable == 'AI') {
            var dialogRef = this.dialog.open(ModalgraficoComponent, {
                width: '500px',
                data: { dataGrafico: this.DataAI[id], nombreGrafico: nombre, yLabel: ylabel }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                // console.log('The dialog was closed');
                //this.animal = result;
            });
        }
        if (tipovariable == 'VI') {
            var dialogRef = this.dialog.open(ModalgraficoComponent, {
                width: '500px',
                data: { dataGrafico: this.DataVI[id], nombreGrafico: nombre, yLabel: ylabel }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                // console.log('The dialog was closed');
                //this.animal = result;
            });
        }
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], Dashboard2Component.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], Dashboard2Component.prototype, "sort", void 0);
    tslib_1.__decorate([
        ViewChild('myDivLegend'),
        tslib_1.__metadata("design:type", ElementRef)
    ], Dashboard2Component.prototype, "myDivLegend", void 0);
    tslib_1.__decorate([
        ViewChild('myDiv1'),
        tslib_1.__metadata("design:type", ElementRef)
    ], Dashboard2Component.prototype, "myDiv1", void 0);
    tslib_1.__decorate([
        ViewChild('myDiv2'),
        tslib_1.__metadata("design:type", ElementRef)
    ], Dashboard2Component.prototype, "myDiv2", void 0);
    tslib_1.__decorate([
        ViewChild('myDiv3'),
        tslib_1.__metadata("design:type", ElementRef)
    ], Dashboard2Component.prototype, "myDiv3", void 0);
    tslib_1.__decorate([
        ViewChild('myDiv4'),
        tslib_1.__metadata("design:type", ElementRef)
    ], Dashboard2Component.prototype, "myDiv4", void 0);
    tslib_1.__decorate([
        ViewChild('myDiv5'),
        tslib_1.__metadata("design:type", ElementRef)
    ], Dashboard2Component.prototype, "myDiv5", void 0);
    tslib_1.__decorate([
        ViewChild('myDiv6'),
        tslib_1.__metadata("design:type", ElementRef)
    ], Dashboard2Component.prototype, "myDiv6", void 0);
    tslib_1.__decorate([
        ViewChild('myDiv7'),
        tslib_1.__metadata("design:type", ElementRef)
    ], Dashboard2Component.prototype, "myDiv7", void 0);
    tslib_1.__decorate([
        ViewChild('myDiv8'),
        tslib_1.__metadata("design:type", ElementRef)
    ], Dashboard2Component.prototype, "myDiv8", void 0);
    tslib_1.__decorate([
        ViewChild('DivLegendHistorico'),
        tslib_1.__metadata("design:type", ElementRef)
    ], Dashboard2Component.prototype, "DivLegendHistorico", void 0);
    tslib_1.__decorate([
        ViewChild('DivHistorico'),
        tslib_1.__metadata("design:type", ElementRef)
    ], Dashboard2Component.prototype, "DivHistorico", void 0);
    tslib_1.__decorate([
        ViewChild('canvas'),
        tslib_1.__metadata("design:type", ElementRef)
    ], Dashboard2Component.prototype, "canvas", void 0);
    tslib_1.__decorate([
        ViewChild(BaseChartDirective),
        tslib_1.__metadata("design:type", BaseChartDirective)
    ], Dashboard2Component.prototype, "chart", void 0);
    Dashboard2Component = tslib_1.__decorate([
        Component({
            selector: 'app-dashboard2',
            templateUrl: './dashboard2.component.html',
            styleUrls: ['./dashboard2.component.scss'],
            providers: [
                //Para DatePipe
                { provide: LOCALE_ID, useValue: 'es-CL' },
                { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
                { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
                { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
            ],
        }),
        tslib_1.__metadata("design:paramtypes", [WebsocketService,
            DigitalinputService,
            AnaloginputService,
            CanvasdrawService,
            EventoentradaService,
            ElementocanvasService,
            ElementocanvasdiService,
            ConfiguracionService,
            AnalogoutputService,
            DigitaloutputService,
            ExcelService,
            UsuarioService,
            VariableinternaService,
            VariableinternacanvasService,
            FormBuilder,
            MatDialog])
    ], Dashboard2Component);
    return Dashboard2Component;
}());
export { Dashboard2Component };
// MODAL GRAFICO
var ModalgraficoComponent = /** @class */ (function () {
    function ModalgraficoComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    //INICIAR
    ModalgraficoComponent.prototype.ngAfterViewInit = function () {
        this.setGraficoDY(this.data.dataGrafico);
        //para que no tenga el problema del ancho
        this.graficoDY.updateOptions({ animatedZooms: false });
        this.graficoDY.updateOptions({ showRangeSelector: true });
        this.graficoDY.updateOptions({ showRangeSelector: false });
        this.graficoDY.updateOptions({ animatedZooms: true });
    };
    //CERRAR DIALOGO
    ModalgraficoComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    //SETEAR OPCIONES GRAFICO
    ModalgraficoComponent.prototype.setOpcionesGrafico = function (titulo, infoGrafico) {
        var optionsGraph;
        optionsGraph = {
            width: -1,
            height: 250,
            legend: 'always',
            labels: ['Date', this.data.yLabel],
            xAxisHeight: 30,
            titleHeight: 22,
            title: this.data.nombreGrafico,
            ylabel: this.data.yLabel,
            animatedZooms: true,
            group: 'grupo2',
            colors: ['#26c6da'],
            // labelsDiv:this.legendaDiv.nativeElement,
            drawPoints: true,
            fillGraph: true,
            strokeWidth: 2.5,
            pointSize: 2,
            drawGrid: true,
            gridLineWidth: 1,
            independentTicks: true,
            gridLinePattern: [4, 4],
            gridLineColor: '#e2eaeb',
            highlightCircleSize: 3.5
        };
        return optionsGraph;
    };
    //CREAR GRÁFICO
    ModalgraficoComponent.prototype.setGraficoDY = function (data) {
        var g;
        g = new Dygraph(this.graficoDiv.nativeElement, data, this.setOpcionesGrafico('Histórico', 'Entrada'));
        this.graficoDY = g;
    };
    tslib_1.__decorate([
        ViewChild('graficoDiv'),
        tslib_1.__metadata("design:type", ElementRef)
    ], ModalgraficoComponent.prototype, "graficoDiv", void 0);
    ModalgraficoComponent = tslib_1.__decorate([
        Component({
            selector: 'app-modalgrafico',
            templateUrl: './modalgrafico.component.html',
            styleUrls: ['./dashboard2.component.scss']
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], ModalgraficoComponent);
    return ModalgraficoComponent;
}());
export { ModalgraficoComponent };
//# sourceMappingURL=dashboard2.component.js.map