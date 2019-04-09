import * as tslib_1 from "tslib";
import 'hammerjs';
import 'chartjs-plugin-zoom';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardsRoutes } from './dashboards.routing';
//import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { NgDygraphsModule } from 'ng-dygraphs';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { DialogDashboard } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { ModalgraficoComponent } from './dashboard2/dashboard2.component';
//Pipe Module
import { PipesModule } from '.././pipes/pipes.module';
var DashboardsModule = /** @class */ (function () {
    function DashboardsModule() {
    }
    DashboardsModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                DemoMaterialModule,
                FormsModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                //ChartistModule,
                ChartsModule,
                MatDialogModule,
                RouterModule.forChild(DashboardsRoutes),
                PipesModule,
                NgDygraphsModule
            ],
            providers: [],
            entryComponents: [
                DialogDashboard,
                ModalgraficoComponent
            ],
            declarations: [
                Dashboard1Component,
                Dashboard2Component,
                DialogDashboard,
                ModalgraficoComponent
            ]
        })
    ], DashboardsModule);
    return DashboardsModule;
}());
export { DashboardsModule };
//# sourceMappingURL=dashboards.module.js.map