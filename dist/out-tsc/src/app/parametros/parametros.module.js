import * as tslib_1 from "tslib";
import 'hammerjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DemoMaterialModule } from '../demo-material-module';
import { ParametrosRoutes } from './parametros.routing';
//COMPONENTES
import { Configdash1Component } from './configdash1/configdash1.component';
import { Configdash2Component } from './configdash2/configdash2.component';
import { EditaobjetoComponent } from './editaobjeto/editaobjeto.component';
import { EditapersonaComponent } from './editapersona/editapersona.component';
import { NuevotagComponent } from './nuevotag/nuevotag.component';
//Pipe Module
import { PipesModule } from '.././pipes/pipes.module';
var ParametrosModule = /** @class */ (function () {
    function ParametrosModule() {
    }
    ParametrosModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(ParametrosRoutes),
                FormsModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                DemoMaterialModule,
                PipesModule
            ],
            entryComponents: [],
            declarations: [
                Configdash1Component,
                Configdash2Component,
                EditaobjetoComponent,
                EditapersonaComponent,
                NuevotagComponent
            ]
        })
    ], ParametrosModule);
    return ParametrosModule;
}());
export { ParametrosModule };
//# sourceMappingURL=parametros.module.js.map