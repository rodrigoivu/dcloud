import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordComponent } from './password/password.component';
export var AuthenticationRoutes = [
    {
        path: '',
        children: [
            {
                path: '404',
                component: ErrorComponent
            },
            {
                path: 'forgot',
                component: ForgotComponent
            },
            {
                path: 'lockscreen',
                component: LockscreenComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'password/:id',
                component: PasswordComponent
            }
        ]
    }
];
//# sourceMappingURL=authentication.routing.js.map