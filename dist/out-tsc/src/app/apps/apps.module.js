import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { AppsRoutes } from './apps.routing';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { MailComponent, DialogDataExampleDialogComponent } from './mail/mail.component';
import { ChatComponent } from './chat/chat.component';
import { CalendarDialogComponent } from './fullcalendar/fullcalendar.component';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
var AppsModule = /** @class */ (function () {
    function AppsModule() {
    }
    AppsModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(AppsRoutes),
                DemoMaterialModule,
                CalendarModule.forRoot({
                    provide: DateAdapter,
                    useFactory: adapterFactory
                }),
                FlexLayoutModule,
                QuillModule,
                DragulaModule,
                PerfectScrollbarModule
            ],
            declarations: [
                FullcalendarComponent,
                MailComponent,
                DialogDataExampleDialogComponent,
                ChatComponent,
                CalendarDialogComponent,
                TaskboardComponent
            ],
            entryComponents: [CalendarDialogComponent, DialogDataExampleDialogComponent]
        })
    ], AppsModule);
    return AppsModule;
}());
export { AppsModule };
//# sourceMappingURL=apps.module.js.map