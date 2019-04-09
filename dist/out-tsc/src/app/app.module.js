import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
//Pipe Module
import { PipesModule } from './pipes/pipes.module';
//SERVICIOS
import { ServiceModule } from './services/service.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                FullComponent,
                AppHeaderComponent,
                SpinnerComponent,
                AppBlankComponent,
                AppSidebarComponent
            ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                DemoMaterialModule,
                FormsModule,
                FlexLayoutModule,
                HttpClientModule,
                PerfectScrollbarModule,
                SharedModule,
                AppRoutingModule,
                ServiceModule,
                PipesModule,
                ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
            ],
            providers: [],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map