import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService, AdminGuard, LoginGuard, VerificaTokenGuard, SubirArchivoService, ObjetoService, NuevotagService, PersonaService, TagobjetoService, WebsocketService, AnaloginputService, DigitalinputService, CanvasdrawService, EventoentradaService, ElementocanvasService, ElementocanvasdiService, AnalogoutputService, DigitaloutputService, VariableinternaService, VariableinternacanvasService, ConfiguracionService, PushNotificationService, EventotagobjetoService, EventotagpersonaService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
var ServiceModule = /** @class */ (function () {
    function ServiceModule() {
    }
    ServiceModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                HttpClientModule,
            ],
            providers: [
                UsuarioService,
                AdminGuard,
                LoginGuard,
                VerificaTokenGuard,
                SubirArchivoService,
                ObjetoService,
                NuevotagService,
                PersonaService,
                TagobjetoService,
                WebsocketService,
                AnaloginputService,
                DigitalinputService,
                CanvasdrawService,
                EventoentradaService,
                ElementocanvasService,
                ElementocanvasdiService,
                AnalogoutputService,
                DigitaloutputService,
                VariableinternaService,
                VariableinternacanvasService,
                ConfiguracionService,
                PushNotificationService,
                EventotagobjetoService,
                EventotagpersonaService
            ],
            declarations: []
        })
    ], ServiceModule);
    return ServiceModule;
}());
export { ServiceModule };
//# sourceMappingURL=service.module.js.map