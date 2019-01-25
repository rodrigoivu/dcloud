import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ObjetoService, TagobjetoService, PersonaService, NuevotagService } from '../../services/service.index';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
var NuevotagComponent = /** @class */ (function () {
    function NuevotagComponent(_objetoservice, _tagobjetoService, _personaService, _nuevotagService, fb) {
        this._objetoservice = _objetoservice;
        this._tagobjetoService = _tagobjetoService;
        this._personaService = _personaService;
        this._nuevotagService = _nuevotagService;
        this.fb = fb;
        this.isLoadingResults = true;
        this.isRateLimitReached = false;
        this.displayedColumns = ['tag', 'destino', '_id'];
        this.selection = new SelectionModel(true, []); //esto es para detectar el item seleccionado
        this.nuevotagId = null;
        this.actualizandoPersona = false; //para que aparezcan las opciones para actualizar
        this.actualizandoTagobjeto = false;
        this.creadoPersona = false; // para que aparezcal las opciones de crear
        this.creadoTagobjeto = false;
        this.editapersona = false; //para ver el formulario de persona o de Tag Objeto
        this.inicialSeleccionado = true;
        this.personaId = null;
        this.tagObjetoId = null;
    }
    NuevotagComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.inicializaformDatosPersona();
        this.inicializaformDatosTagobjeto();
        this.cargarNuevotagTodos();
        this.cargarObjetosTodos();
        //OBTENER LOS CAMBIOS DESDE EL FORMULARIO
        this.formDatosTagobjeto.get('filtroObjSelect').valueChanges.subscribe(function (val) {
            _this.setListaObjetos();
        });
    };
    NuevotagComponent.prototype.inicializaformDatosPersona = function () {
        //FORMULARIO DATOS PERSONA
        this.formDatosPersona = this.fb.group({
            rut: new FormControl(null, Validators.required),
            nombre: new FormControl(null, Validators.required),
            tag: new FormControl(null, Validators.required),
            empresa: new FormControl({ value: null, disabled: true }),
            cargo: new FormControl({ value: null, disabled: true }),
            area: new FormControl({ value: null, disabled: true }),
            imagen: new FormControl({ value: null, disabled: true }),
            autorizado: new FormControl({ value: null, disabled: true }),
            fechaincorporacion: new FormControl({ value: null, disabled: true }),
            tipolicenciaconducir: new FormControl({ value: null, disabled: true }),
            mutualidad: new FormControl({ value: null, disabled: true }),
            fechaexamenocupacional: new FormControl({ value: null, disabled: true }),
            fechaexamenalturafisica: new FormControl({ value: null, disabled: true }),
            fechaexamenalturageo: new FormControl({ value: null, disabled: true }),
            fechafincontrato: new FormControl({ value: null, disabled: true }),
            archivoexamen1: new FormControl({ value: null, disabled: true }),
            archivoexamen2: new FormControl({ value: null, disabled: true }),
            archivoexamen3: new FormControl({ value: null, disabled: true }),
            archivocontrato: new FormControl({ value: null, disabled: true }),
            responsablearchivoexamen1: new FormControl({ value: null, disabled: true }),
            responsablearchivoexamen2: new FormControl({ value: null, disabled: true }),
            responsablearchivoexamen3: new FormControl({ value: null, disabled: true }),
            responsablearchivocontrato: new FormControl({ value: null, disabled: true })
        });
    };
    NuevotagComponent.prototype.inicializaformDatosTagobjeto = function () {
        //FORMULARIO DATOS TAGOBJETO
        this.formDatosTagobjeto = this.fb.group({
            tag: new FormControl(null, Validators.required),
            objeto: new FormControl(null, Validators.required),
            filtroObjSelect: new FormControl('Herramienta', Validators.required),
            listaObjeto: this.fb.array([]),
            nserie: new FormControl(null, Validators.required),
            nparte: new FormControl(null, Validators.required)
        });
    };
    NuevotagComponent.prototype.setformDatosPersona = function (tag) {
        this.formDatosPersona.setValue({
            rut: '',
            nombre: '',
            tag: tag,
            empresa: '',
            cargo: '',
            area: '',
            imagen: '',
            autorizado: '',
            fechaincorporacion: '',
            tipolicenciaconducir: '',
            mutualidad: '',
            fechaexamenocupacional: '',
            fechaexamenalturafisica: '',
            fechaexamenalturageo: '',
            fechafincontrato: '',
            archivoexamen1: '',
            archivoexamen2: '',
            archivoexamen3: '',
            archivocontrato: '',
            responsablearchivoexamen1: '',
            responsablearchivoexamen2: '',
            responsablearchivoexamen3: '',
            responsablearchivocontrato: ''
        });
    };
    NuevotagComponent.prototype.setformDatosTagobjeto = function (tag) {
        this.formDatosTagobjeto.get('tag').setValue(tag);
    };
    NuevotagComponent.prototype.cargarNuevotagTodos = function () {
        var _this = this;
        this.isLoadingResults = true;
        this._nuevotagService.itemsTodos()
            .subscribe(function (resp) {
            _this.nuevotags = resp.items;
            _this.isLoadingResults = false;
            _this.dataSource = new MatTableDataSource(_this.nuevotags);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    NuevotagComponent.prototype.cargarObjetosTodos = function () {
        var _this = this;
        this._objetoservice.itemsTodos()
            .subscribe(function (resp) {
            _this.objetos = resp.items;
            _this.setListaObjetos();
            // this.formDatosTagobjeto.get('objeto').setValue(0);
        });
    };
    Object.defineProperty(NuevotagComponent.prototype, "formDatosTagobjetoObjeto", {
        get: function () { return this.formDatosTagobjeto.get('listaObjeto'); },
        enumerable: true,
        configurable: true
    });
    NuevotagComponent.prototype.setListaObjetos = function () {
        var filtro = this.formDatosTagobjeto.controls['filtroObjSelect'].value;
        var items = this.formDatosTagobjeto.get('listaObjeto');
        items.controls = [];
        var itemObj;
        var i = 0;
        for (var _i = 0, _a = this.objetos; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.tipo == filtro) {
                itemObj = {
                    tipo: obj.tipo,
                    descripcion: obj.descripcion,
                    item: i,
                    _id: obj._id
                };
                items.push(this.fb.group(itemObj));
                i++;
            }
        }
    };
    //CREA NUEVO PERSONA
    NuevotagComponent.prototype.onSubmitPersona = function () {
        this.actualizandoPersona ?
            this.actualizarPersona() :
            this.crearPersona();
    };
    NuevotagComponent.prototype.crearPersona = function () {
        var _this = this;
        var personaCrear = this.formDatosPersona.getRawValue(); // obtiene todos hasta los deshabilitados
        //let objetoCrear: Objeto=this.formDatosObjeto.value; // obtiene solo los habilitados
        this._personaService.registraItem(personaCrear)
            .subscribe(function (resp) {
            _this.personaId = resp._id;
            _this.creadoPersona = true;
            _this.actualizandoPersona = true;
            _this.borrarNuevotag(_this.nuevotagId, false);
        });
    };
    //ACTUALIZA PERSONA
    NuevotagComponent.prototype.actualizarPersona = function () {
        if (this.personaId) {
            var personaActualizar = this.formDatosPersona.value; // obtiene solo los habilitados
            personaActualizar._id = this.personaId; //Se agrega el _id
            this._personaService.actualizarItem(personaActualizar)
                .subscribe();
        }
    };
    //CREA NUEVO TAGOBJETO
    NuevotagComponent.prototype.onSubmitTagobjeto = function () {
        this.actualizandoTagobjeto ?
            this.actualizarTagobjeto() :
            this.crearTagobjeto();
    };
    NuevotagComponent.prototype.crearTagobjeto = function () {
        var _this = this;
        this.formDatosTagobjeto.controls['tag'].enable();
        this.formDatosTagobjeto.controls['filtroObjSelect'].disable();
        this.formDatosTagobjeto.controls['listaObjeto'].disable();
        var tagobjetoCrear = this.formDatosTagobjeto.value;
        this._tagobjetoService.registraItem(tagobjetoCrear)
            .subscribe(function (resp) {
            _this.tagObjetoId = resp._id;
            _this.creadoTagobjeto = true;
            _this.actualizandoTagobjeto = true;
            _this.formDatosTagobjeto.controls['tag'].disable();
            _this.formDatosTagobjeto.controls['filtroObjSelect'].enable();
            _this.formDatosTagobjeto.controls['listaObjeto'].enable();
            _this.borrarNuevotag(_this.nuevotagId, false);
        });
    };
    //ACTUALIZA TAGOBJETO
    NuevotagComponent.prototype.actualizarTagobjeto = function () {
        var _this = this;
        if (this.tagObjetoId) {
            this.formDatosTagobjeto.controls['filtroObjSelect'].disable();
            this.formDatosTagobjeto.controls['listaObjeto'].disable();
            var tagobjetoActualizar = this.formDatosTagobjeto.value; // obtiene solo los habilitados
            tagobjetoActualizar._id = this.tagObjetoId; //Se agrega el _id
            this._tagobjetoService.actualizarItem(tagobjetoActualizar, this.formDatosTagobjeto.getRawValue().tag)
                .subscribe(function (resp) {
                _this.formDatosTagobjeto.controls['filtroObjSelect'].enable();
                _this.formDatosTagobjeto.controls['listaObjeto'].enable();
            });
        }
    };
    NuevotagComponent.prototype.cancelarActualizarCrearPersona = function () {
        this.cancelar();
    };
    NuevotagComponent.prototype.cancelarActualizarCrearTagobjeto = function () {
        this.cancelar();
    };
    NuevotagComponent.prototype.borrarNuevotag = function (id, verMsj) {
        var _this = this;
        this._nuevotagService.borraItem(id, verMsj)
            .subscribe(function (resp) {
            _this.cargarNuevotagTodos();
        });
    };
    NuevotagComponent.prototype.editarObjeto = function (row) {
        if (row.destino != 'Inicial') {
            this.cancelar();
            this.inicialSeleccionado = false; //da acceso a mostrar los formularios
            this.selection.select(row);
            this.nuevotagId = row._id;
            if (row.destino == 'Persona') { //Muestra formulario de persona
                this.editapersona = true;
                this.setformDatosPersona(row.tag);
                this.formDatosPersona.controls['tag'].disable();
            }
            else { // muestra formulario de Tagobjeto
                this.editapersona = false;
                this.setformDatosTagobjeto(row.tag);
                this.formDatosTagobjeto.controls['tag'].disable();
            }
        }
        else {
            this.inicialSeleccionado = true;
            swal('Aviso', 'Seleccione un destino válido', 'warning');
        }
    };
    NuevotagComponent.prototype.cancelarEditar = function () {
        this.cancelar();
    };
    NuevotagComponent.prototype.cancelar = function () {
        var _this = this;
        this.formDatosPersona.reset();
        this.resetFormDatosTagobjeto();
        this.inicialSeleccionado = true;
        this.dataSource.data.forEach(function (rowi) { return _this.selection.deselect(rowi); });
        this.tagObjetoId = null;
        this.personaId = null;
        this.creadoPersona = false;
        this.actualizandoPersona = false;
        this.creadoTagobjeto = false;
        this.actualizandoTagobjeto = false;
        this.nuevotagId = null;
    };
    NuevotagComponent.prototype.resetFormDatosTagobjeto = function () {
        this.formDatosTagobjeto.get('tag').reset();
        this.formDatosTagobjeto.get('objeto').reset();
        this.formDatosTagobjeto.get('nserie').reset();
        this.formDatosTagobjeto.get('nparte').reset();
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], NuevotagComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], NuevotagComponent.prototype, "sort", void 0);
    NuevotagComponent = tslib_1.__decorate([
        Component({
            selector: 'app-nuevotag',
            templateUrl: './nuevotag.component.html',
            styleUrls: ['./nuevotag.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ObjetoService,
            TagobjetoService,
            PersonaService,
            NuevotagService,
            FormBuilder])
    ], NuevotagComponent);
    return NuevotagComponent;
}());
export { NuevotagComponent };
//# sourceMappingURL=nuevotag.component.js.map