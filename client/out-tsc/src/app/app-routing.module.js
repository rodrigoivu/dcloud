import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { LoginGuard } from './services/service.index';
var routes = [
    {
        path: '',
        component: FullComponent,
        canActivate: [LoginGuard],
        children: [
            {
                path: '',
                redirectTo: '/dashboards/dashboard2',
                pathMatch: 'full'
            },
            {
                path: 'dashboards',
                loadChildren: './dashboards/dashboards.module#DashboardsModule'
            },
            {
                path: 'apps',
                loadChildren: './apps/apps.module#AppsModule'
            },
            {
                path: 'parametros',
                loadChildren: './parametros/parametros.module#ParametrosModule'
            },
            {
                path: 'settings',
                loadChildren: './settings/settings.module#SettingsModule'
            }
        ]
    },
    {
        path: '',
        component: AppBlankComponent,
        children: [
            {
                path: 'authentication',
                loadChildren: './authentication/authentication.module#AuthenticationModule'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'authentication/404'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map