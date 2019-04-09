import * as tslib_1 from "tslib";
import 'hammerjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { DemoMaterialModule } from '../demo-material-module';
import { SettingsRoutes } from './settings.routing';
//COMPONENTES
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PlataformaComponent } from './plataforma/plataforma.component';
import { PerfilComponent } from './perfil/perfil.component';
//Pipe Module
import { PipesModule } from '.././pipes/pipes.module';
var SettingsModule = /** @class */ (function () {
    function SettingsModule() {
    }
    SettingsModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(SettingsRoutes),
                FormsModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                FileUploadModule,
                DemoMaterialModule,
                PipesModule
            ],
            entryComponents: [],
            declarations: [
                UsuariosComponent,
                PlataformaComponent,
                PerfilComponent
            ]
        })
    ], SettingsModule);
    return SettingsModule;
}());
export { SettingsModule };
//# sourceMappingURL=settings.module.js.map