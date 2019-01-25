import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { VerificaTokenGuard } from '../services/service.index';
export var DashboardsRoutes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard1',
                component: Dashboard1Component,
                canActivate: [VerificaTokenGuard],
            },
            {
                path: 'dashboard2',
                component: Dashboard2Component,
                canActivate: [VerificaTokenGuard],
            }
        ]
    }
];
//# sourceMappingURL=dashboards.routing.js.map