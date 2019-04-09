import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatCardModule, MatInputModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationRoutes } from './authentication.routing';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordComponent } from './password/password.component';
var AuthenticationModule = /** @class */ (function () {
    function AuthenticationModule() {
    }
    AuthenticationModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(AuthenticationRoutes),
                MatIconModule,
                MatCardModule,
                MatInputModule,
                MatCheckboxModule,
                MatButtonModule,
                FlexLayoutModule,
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                ErrorComponent,
                ForgotComponent,
                LockscreenComponent,
                LoginComponent,
                RegisterComponent,
                PasswordComponent
            ]
        })
    ], AuthenticationModule);
    return AuthenticationModule;
}());
export { AuthenticationModule };
//# sourceMappingURL=authentication.module.js.map