import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef, Inject, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { WebsocketService, DigitalinputService, AnaloginputService, CanvasdrawService, EventoentradaService, ElementocanvasService, ElementocanvasdiService, ConfiguracionService } from '../../services/service.index';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
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
var ELEMENT_DATA_1 = [
    { timestamp: '2019-01-02T12:21:12.837Z', sensor: 'Temperatura', descripcion: 'Tº motor 1', evento: ' sobrepasa umbral', valor: '215.15' },
];
var Dashboard2Component = /** @class */ (function () {
    function Dashboard2Component(breakpointObserver, _websocketService, _digitalinputService, _analoginputService, _canvasdrawService, _eventoentradaService, _elementocanvasService, _elementocanvasdiService, _configuracionService, fb, 
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
        this.fb = fb;
        this.dialog = dialog;
        this.puntero = 'fueraElementoCanvas';
        this.isConfig = false;
        this.lastTimeSenDBdeAI = new Date();
        this.grafoAI = [];
        this.encuadraGrafico = false;
        this.cargandoGraficoHist = false;
        this.cargandoGraficoEvento = false;
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
        this.tituloGraficoHstorico = '';
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
        // GRÁFICO DE EVENTOS
        this.graficoEventoOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            barThickness: 10
        };
        this.graficoEventoColors = [
            { backgroundColor: '#E57373' },
            { backgroundColor: '#F06292' },
            { backgroundColor: '#BA68C8' },
            { backgroundColor: '#9575CD' },
            { backgroundColor: '#7986CB' },
            { backgroundColor: '#64B5F6' },
            { backgroundColor: '#4FC3F7' },
            { backgroundColor: '#4DD0E1' },
            { backgroundColor: '#4DB6AC' },
            { backgroundColor: '#81C784' },
            { backgroundColor: '#AED581' },
            { backgroundColor: '#DCE775' },
            { backgroundColor: '#FFF176' },
            { backgroundColor: '#FFD54F' },
            { backgroundColor: '#FFB74D' },
            { backgroundColor: '#FF8A65' },
        ];
        this.graficoEventoType = 'bar';
        this.graficoEventoLegend = true;
        this.graficoEventoLabels = [];
        this.graficoEventoData = [];
        //MUESTREO DI
        this.suscribirMuestreoDI = this.observableMuestreoDI().pipe(retry())
            .subscribe(function () {
            _this.cargarEstadoDI();
        });
        //MUESTREO AI
        this.suscribirMuestreoAI = this.observableMuestreoAI().pipe(retry())
            .subscribe(function () {
            _this.cargarDatosAIinstante();
        });
        //INICIALIZA FORMULARIOS  
        this.inicializaformOpcionMostrarAI();
        this.inicializaformControlDO();
        this.inicializaformControlAO();
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
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE DO
        this.formControlDO.valueChanges.subscribe(function (val) {
            _this.enviaCambioControlDO();
        });
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO DE AO
        this.formControlAO.valueChanges.subscribe(function (val) {
            _this.enviaCambioControlAO();
        });
    }
    Dashboard2Component.prototype.ngAfterViewInit = function () {
        this.cargaCongiguracion();
        this.iniciaDatosElementoCanvas();
        this.iniciaDatosElementoCanvasDi();
        //Crea los dyGraph inicialmente
        this.setGraficosAIinicial();
        //this.sync1 = Dygraph.synchronize([this.g1, this.g2]);
        //carga los estados de las DI
        this.cargarEstadoDI();
        //Carga los datos para el gráfico dyGraph con 400 datos, vuelve a setear los datos de los gráficos y los encuadra 
        this.cargarDatosAI();
        //Inicia el contexto de canvas
        this.inicializaCanvas();
        //dibuja inicialmente los datos de AI en el canvas
        this.cargarDatosAIinstanteInicial();
        //Inicia Gráfico Histórico
        //this.setGraficoHistorico();
    };
    Dashboard2Component.prototype.ngOnDestroy = function () {
        this.suscribirMuestreoDI.unsubscribe();
        this.suscribirMuestreoAI.unsubscribe();
        this.datosAI = [];
        this.grafoAI = [];
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
    Dashboard2Component.prototype.cargaCongiguracion = function () {
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
            image: null
        };
        this._configuracionService.registraItem(nuevaConfig)
            .subscribe(function (resp) {
            _this.isConfig = true;
            _this.config = resp;
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
        g = new Dygraph(this.DivHistorico.nativeElement, data, this.setOpcionesGraficoHistorico(tipo, idGrafico));
        this.grafoHist = g;
        this.cargandoGraficoHist = false;
    };
    Dashboard2Component.prototype.dibujaPuntoPersonalizado = function () {
    };
    Dashboard2Component.prototype.inicializaCanvas = function () {
        this._canvasdrawService.creaContexto(this.canvas.nativeElement);
    };
    Dashboard2Component.prototype.iniciaDatosElementoCanvas = function () {
        var _this = this;
        this._elementocanvasService.itemsTodos()
            .subscribe(function (resp) {
            _this.datosElementocanvas = resp.items;
        });
    };
    Dashboard2Component.prototype.iniciaDatosElementoCanvasDi = function () {
        var _this = this;
        this._elementocanvasdiService.itemsTodos()
            .subscribe(function (resp) {
            _this.datosElementocanvasDi = resp.items;
        });
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
        var val = [v1, v2, v3, v4, v5, v6, v7, v8];
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
    Dashboard2Component.prototype.inicializaformControlDO = function () {
        this.formControlDO = this.fb.group({
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
    Dashboard2Component.prototype.inicializaformControlAO = function () {
        this.formControlAO = this.fb.group({
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
    Dashboard2Component.prototype.inicializaformGraficaHistorico = function () {
        this.formGraficaHistorico = this.fb.group({
            entrada: new FormControl({ value: null, disabled: false }, Validators.required),
            desde: new FormControl({ value: null, disabled: false }, Validators.required),
            hasta: new FormControl({ value: null, disabled: false }, Validators.required)
        });
    };
    Dashboard2Component.prototype.inicializaformformGraficaEvento = function () {
        this.formGraficaEvento = this.fb.group({
            entrada: new FormControl({ value: null, disabled: false }, Validators.required),
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
            resp.items.di1 == 1 ? _this.di1 = true : _this.di1 = false;
            resp.items.di2 == 1 ? _this.di2 = true : _this.di2 = false;
            resp.items.di3 == 1 ? _this.di3 = true : _this.di3 = false;
            resp.items.di4 == 1 ? _this.di4 = true : _this.di4 = false;
            resp.items.di5 == 1 ? _this.di5 = true : _this.di5 = false;
            resp.items.di6 == 1 ? _this.di6 = true : _this.di6 = false;
            resp.items.di7 == 1 ? _this.di7 = true : _this.di7 = false;
            resp.items.di8 == 1 ? _this.di8 = true : _this.di8 = false;
            _this.canvasDibujaElementoDI();
        });
    };
    Dashboard2Component.prototype.cargarDatosAI = function () {
        var _this = this;
        this._analoginputService.itemsRangoTiempoReal()
            .subscribe(function (resp) {
            _this.datosAI = resp.items;
            _this.analizaDataAI();
        });
    };
    Dashboard2Component.prototype.cargarDatosAIinstante = function () {
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
            var ts = new Date(aiInstante.timestamp); //Transforma en hora local
            //actualizar información sólo si hay un nuevo dato en la base de datos
            if (_this.lastTimeSenDBdeAI.getTime() !== ts.getTime()) {
                _this.canvasDibujaElementoAI();
                _this.agregaDatosAIalGrafico(aiInstante);
            }
            _this.lastTimeSenDBdeAI = new Date(ts);
        });
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
    // enviarDatos(){
    //   this._websocketService.sendMessage('hola....');
    // }
    Dashboard2Component.prototype.dataUnirDO = function () {
        var data;
        var do1 = this.formControlDO.getRawValue().controlDO1 ? 1 : 0;
        var do2 = this.formControlDO.getRawValue().controlDO2 ? 1 : 0;
        var do3 = this.formControlDO.getRawValue().controlDO3 ? 1 : 0;
        var do4 = this.formControlDO.getRawValue().controlDO4 ? 1 : 0;
        var do5 = this.formControlDO.getRawValue().controlDO5 ? 1 : 0;
        var do6 = this.formControlDO.getRawValue().controlDO6 ? 1 : 0;
        var do7 = this.formControlDO.getRawValue().controlDO7 ? 1 : 0;
        var do8 = this.formControlDO.getRawValue().controlDO8 ? 1 : 0;
        data = {
            DO: 8,
            p1: do1,
            p2: do2,
            p3: do3,
            p4: do4,
            p5: do5,
            p6: do6,
            p7: do7,
            p8: do8
        };
        return data;
    };
    Dashboard2Component.prototype.dataUnirAO = function () {
        var data;
        data = {
            AO: 8,
            p1: this.formControlAO.getRawValue().controlAO1 || 0,
            p2: this.formControlAO.getRawValue().controlAO2 || 0,
            p3: this.formControlAO.getRawValue().controlAO3 || 0,
            p4: this.formControlAO.getRawValue().controlAO4 || 0,
            p5: this.formControlAO.getRawValue().controlAO5 || 0,
            p6: this.formControlAO.getRawValue().controlAO6 || 0,
            p7: this.formControlAO.getRawValue().controlAO7 || 0,
            p8: this.formControlAO.getRawValue().controlAO8 || 0
        };
        return data;
    };
    Dashboard2Component.prototype.enviaCambioControlDO = function () {
        var data;
        var dataS;
        data = this.dataUnirDO();
        dataS = JSON.stringify(data);
        this._websocketService.sendMessage(dataS);
    };
    Dashboard2Component.prototype.enviaCambioControlAO = function () {
        var data;
        var dataS;
        data = this.dataUnirAO();
        dataS = JSON.stringify(data);
        this._websocketService.sendMessage(dataS);
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
                });
            }
            if (entrada.includes('ai')) {
                this._analoginputService.itemsRangoFechas(desde, hasta)
                    .subscribe(function (resp) {
                    _this.analizaDataAIHistorico(entrada, resp.items);
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
            console.log(ai.slice(2));
            idGrafico = parseInt(ai.slice(2));
            dataAIGrafico = [[_hoy, 0]];
            this.cantDatosHist = 0;
        }
        this.setGraficoHistorico('ai', idGrafico, dataAIGrafico);
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
            console.log(di.slice(2));
            idGrafico = parseInt(di.slice(2));
            dataDIGrafico = [[_hoy, 0]];
            this.cantDatosHist = 0;
        }
        this.setGraficoHistorico('di', idGrafico, dataDIGrafico);
    };
    Dashboard2Component.prototype.analizadataEvento = function (entrada, datosEvento, desde) {
        if (datosEvento.length) {
            this.graficarEventos(desde);
            this.cantDatosEvento = datosEvento.length;
        }
        else {
            this.cantDatosEvento = 0;
            this.cargandoGraficoEvento = false;
        }
    };
    Dashboard2Component.prototype.creaLabelsDias = function (desde) {
        var dias = this.cantDiasEvento;
        var labelDias = [];
        var ndia = new Date(desde.getFullYear(), desde.getMonth(), desde.getDate());
        labelDias.push(desde.getDate());
        for (var i = 1; i < dias; ++i) {
            ndia = new Date(ndia.setHours(24));
            labelDias.push(ndia);
        }
        console.log(labelDias);
    };
    Dashboard2Component.prototype.graficarEventos = function (desde) {
        this.creaLabelsDias(desde);
        this.graficoEventoLabels = [
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            '2018'
        ];
        this.graficoEventoData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Iphone 8' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Iphone X' }
        ];
        this.cargandoGraficoEvento = false;
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
            this.openDialog(elementoSelecionado.id, elementoSelecionado.nombre, elementoSelecionado.yLabel);
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
            yLabel: ''
        };
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
                            yLabel: item.unidad
                        };
                    }
                }
                if (tipo == 'barra') {
                    if (xc <= pX + anchoElemento && xc >= pX && yc >= pY - altoElemento && yc <= pY) {
                        elementoSelecionado = {
                            dentro: true,
                            nombre: item.name,
                            id: i,
                            yLabel: item.unidad
                        };
                    }
                }
                i++;
            }
        }
        return elementoSelecionado;
    };
    //ABRIR MODAL GRAFICO EN CANVAS
    Dashboard2Component.prototype.openDialog = function (id, nombre, ylabel) {
        //this.DataAI
        var dialogRef = this.dialog.open(ModalgraficoComponent, {
            width: '500px',
            data: { dataGrafico: this.DataAI[id], nombreGrafico: nombre, yLabel: ylabel }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            // console.log('The dialog was closed');
            //this.animal = result;
        });
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
        tslib_1.__metadata("design:paramtypes", [BreakpointObserver,
            WebsocketService,
            DigitalinputService,
            AnaloginputService,
            CanvasdrawService,
            EventoentradaService,
            ElementocanvasService,
            ElementocanvasdiService,
            ConfiguracionService,
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