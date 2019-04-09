import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
// import data from './assets/titulos.json';
// const titulo1 = (<any>data).titulo1;
// const titulo2 = (<any>data).titulo2;
// console.log(titulo1); // output 'testing'
// console.log(titulo2); // output 'testing'
//declare var require: any;
//const data: any = require('../../../assets/titulos.json');
//var nombredash1 = data['Titulos']['titulo1'];
//var nombredash2 = data['Titulos']['titulo2'];
//console.log(nombredash1);
//console.log(nombredash2);
var nombredash1 = 'Inventario';
var nombredash2 = 'Control Industrial';
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
            { state: 'dashboard2', name: nombredash2, type: 'link' },
            { state: 'dashboard1', name: nombredash1, type: 'link' }
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
                name: nombredash2,
                type: 'link'
            },
            { state: 'configdash1',
                name: nombredash1,
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