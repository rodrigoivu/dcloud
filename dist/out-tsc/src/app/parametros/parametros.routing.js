import { Configdash2Component } from './configdash2/configdash2.component';
import { EditaobjetoComponent } from './editaobjeto/editaobjeto.component';
import { EditapersonaComponent } from './editapersona/editapersona.component';
import { NuevotagComponent } from './nuevotag/nuevotag.component';
import { VerificaTokenGuard } from '../services/service.index';
export var ParametrosRoutes = [
    {
        path: '',
        children: [
            {
                path: 'configdash1/editaobjeto',
                component: EditaobjetoComponent,
                canActivate: [VerificaTokenGuard],
            },
            {
                path: 'configdash1/editapersona',
                component: EditapersonaComponent,
                canActivate: [VerificaTokenGuard],
            },
            {
                path: 'configdash1/nuevotag',
                component: NuevotagComponent,
                canActivate: [VerificaTokenGuard],
            },
            {
                path: 'configdash2',
                component: Configdash2Component,
                canActivate: [VerificaTokenGuard],
            }
        ]
    }
];
//# sourceMappingURL=parametros.routing.js.map