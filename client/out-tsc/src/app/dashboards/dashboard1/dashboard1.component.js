import * as tslib_1 from "tslib";
import { Component, Inject, ViewChild } from '@angular/core';
//import * as Chartist from 'chartist';
//import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ExcelService } from '../../services/service.index';
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
    function Dashboard1Component(adapter, dialog, breakpointObserver) {
        var _this = this;
        this.adapter = adapter;
        this.dialog = dialog;
        this.displayedColumns = ['imagen', 'nombre', 'cargo', 'fecha', 'hora', 'numeroparte', 'descripcion', 'marca', 'fechaR', 'horaR'];
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
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(function (result) {
            _this.displayedColumns = result.matches ?
                ['imagen', 'nombre', 'cargo', 'fecha', 'hora', 'numeroparte', 'descripcion', 'marca', 'fechaR', 'horaR'] :
                ['imagen', 'nombre', 'cargo', 'fecha', 'hora', 'numeroparte', 'descripcion', 'marca', 'fechaR', 'horaR'];
        });
        // Create 100 users
        var herramientas = [];
        for (var i = 1; i <= 5; i++) {
            herramientas.push(createNewHerramientasData(i));
        }
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(herramientas);
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
    // // Barchart
    // barChart1: Chart = {
    //   type: 'Bar',
    //   data: data['Bar'],
    //   options: {
    //     seriesBarDistance: 15,
    //     high: 12,
    //     axisX: {
    //       showGrid: false,
    //       offset: 20
    //     },
    //     axisY: {
    //       showGrid: true,
    //       offset: 40
    //     }
    //   },
    //   responsiveOptions: [
    //     [
    //       'screen and (min-width: 640px)',
    //       {
    //         axisX: {
    //           labelInterpolationFnc: function(
    //             value: number,
    //             index: number
    //           ): string {
    //             return index % 1 === 0 ? `${value}` : null;
    //           }
    //         }
    //       }
    //     ]
    //   ]
    // };
    // This is for the donute chart
    // donuteChart1: Chart = {
    //   type: 'Pie',
    //   data: data['Pie'],
    //   options: {
    //     donut: true,
    //     showLabel: false,
    //     donutWidth: 30
    //   }
    //   // events: {
    //   //   draw(data: any): boolean {
    //   //     return data;
    //   //   }
    //   // }
    // };
    // This is for the line chart
    // Line chart
    // lineChart1: Chart = {
    //   type: 'Line',
    //   data: data['LineWithArea'],
    //   options: {
    //     low: 0,
    //     high: 35000,
    //     showArea: true,
    //     fullWidth: true
    //   }
    // };
    // Timeline
    // mytimelines: any[] = [
    //   {
    //     from: 'Nirav joshi',
    //     time: '(5 minute ago)',
    //     image: 'assets/images/users/1.jpg',
    //     attachment: 'assets/images/big/img2.jpg',
    //     content:
    //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.'
    //   },
    //   {
    //     from: 'Sunil joshi',
    //     time: '(3 minute ago)',
    //     image: 'assets/images/users/2.jpg',
    //     content:
    //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
    //     buttons: 'primary'
    //   },
    //   {
    //     from: 'Vishal Bhatt',
    //     time: '(1 minute ago)',
    //     image: 'assets/images/users/3.jpg',
    //     attachment: 'assets/images/big/img1.jpg',
    //     content:
    //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.'
    //   },
    //   {
    //     from: 'Dhiren Adesara',
    //     time: '(1 minute ago)',
    //     image: 'assets/images/users/4.jpg',
    //     content:
    //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
    //     buttons: 'warn'
    //   }
    // ];
    Dashboard1Component.prototype.ngAfterViewInit = function () {
        //TABLA
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // Sparkline chart
        // const sparklineLogin = function() {
        //   // spark count
        //   (<any>$('.spark-count')).sparkline(
        //     [4, 5, 0, 10, 9, 12, 4, 9, 4, 5, 3, 10, 9, 12, 10, 9, 12, 4, 9],
        //     {
        //       type: 'bar',
        //       width: '100%',
        //       height: '70',
        //       barWidth: '2',
        //       resize: true,
        //       barSpacing: '6',
        //       barColor: 'rgba(255, 255, 255, 0.3)'
        //     }
        //   );
        // };
        // let sparkResize;
        // (<any>$(window)).resize(function(e) {
        //   clearTimeout(sparkResize);
        //   sparkResize = setTimeout(sparklineLogin, 500);
        // });
        // sparklineLogin();
    };
    Dashboard1Component.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], Dashboard1Component.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], Dashboard1Component.prototype, "sort", void 0);
    Dashboard1Component = tslib_1.__decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard1.component.html',
            styleUrls: ['./dashboard1.component.scss'],
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
            ],
        }),
        tslib_1.__metadata("design:paramtypes", [DateAdapter,
            MatDialog,
            BreakpointObserver])
    ], Dashboard1Component);
    return Dashboard1Component;
}());
export { Dashboard1Component };
var DialogDashboard = /** @class */ (function () {
    function DialogDashboard(excelService, adapter, dialogRef, breakpointObserver, data) {
        var _this = this;
        this.excelService = excelService;
        this.adapter = adapter;
        this.dialogRef = dialogRef;
        this.data = data;
        this.date = new FormControl(moment());
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
        //TABLA
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(function (result) {
            _this.displayedColumns = result.matches ?
                ['nombre', 'cargo', 'fecha', 'hora', 'numeroparte', 'descripcion', 'marca', 'fechaR', 'horaR'] :
                ['nombre', 'cargo', 'fecha', 'hora', 'numeroparte', 'descripcion', 'marca', 'fechaR', 'horaR'];
        });
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
        tslib_1.__param(4, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [ExcelService,
            DateAdapter,
            MatDialogRef,
            BreakpointObserver, Object])
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
/** Builds and returns a new User. */
function createNewHerramientasData(id) {
    var name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
        ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
        '.';
    return {
        imagen: 'assets/images/herramientas/h' + id + '.png',
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
//# sourceMappingURL=dashboard1.component.js.map