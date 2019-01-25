import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var MENUITEMS = [
    {
        state: '',
        name: 'Control',
        type: 'saperator',
        icon: 'av_timer'
    },
    {
        state: 'dashboards',
        name: 'Dashboards',
        type: 'sub',
        icon: 'av_timer',
        children: [
            { state: 'dashboard2', name: 'Control Industrial', type: 'link' },
            { state: 'dashboard1', name: 'Control de Inventario', type: 'link' }
        ]
    },
    {
        state: 'apps',
        name: 'Apps',
        type: 'sub',
        icon: 'apps',
        children: [
            { state: 'calendar', name: 'Calendar', type: 'link' },
            { state: 'chat', name: 'Chat', type: 'link' },
            { state: 'taskboard', name: 'Taskboard', type: 'link' }
        ]
    },
    {
        state: '',
        name: 'Configuraciones',
        type: 'saperator',
        icon: 'av_timer'
    },
    {
        state: 'parametros',
        name: 'Dashboards',
        type: 'sub',
        icon: 'settings',
        children: [
            { state: 'configdash2',
                name: 'Control Industrial',
                type: 'link'
            },
            { state: 'configdash1',
                name: 'Inventario',
                type: 'subchild',
                subchildren: [
                    {
                        state: 'editaobjeto',
                        name: 'Editar objetos',
                        type: 'link'
                    },
                    {
                        state: 'editapersona',
                        name: 'Editar personas',
                        type: 'link'
                    },
                    {
                        state: 'nuevotag',
                        name: 'Tags nuevos',
                        type: 'link'
                    }
                ]
            }
        ]
    },
    {
        state: 'settings',
        name: 'General',
        type: 'sub',
        icon: 'settings',
        children: [
            { state: 'usuarios', name: 'Usuarios', type: 'link' },
            { state: 'plataforma', name: 'Plataforma', type: 'link' },
            { state: 'perfil', name: 'Perfil', type: 'link' }
        ]
    }
];
var MenuItems = /** @class */ (function () {
    function MenuItems() {
    }
    MenuItems.prototype.getMenuitem = function () {
        return MENUITEMS;
    };
    MenuItems = tslib_1.__decorate([
        Injectable()
    ], MenuItems);
    return MenuItems;
}());
export { MenuItems };
//# sourceMappingURL=menu-items.js.map