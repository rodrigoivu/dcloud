import { UsuariosComponent } from './usuarios/usuarios.component';
import { PlataformaComponent } from './plataforma/plataforma.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminGuard, VerificaTokenGuard } from '../services/service.index';
export var SettingsRoutes = [
    {
        path: '',
        children: [
            {
                path: 'usuarios',
                canActivate: [AdminGuard, VerificaTokenGuard],
                component: UsuariosComponent
            },
            {
                path: 'plataforma',
                component: PlataformaComponent,
                canActivate: [VerificaTokenGuard],
            },
            {
                path: 'perfil',
                component: PerfilComponent,
                canActivate: [VerificaTokenGuard],
            }
        ]
    }
];
//# sourceMappingURL=settings.routing.js.map