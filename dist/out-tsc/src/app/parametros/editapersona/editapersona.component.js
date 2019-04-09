import * as tslib_1 from "tslib";
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { PersonaService } from '../../services/service.index';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
var EditapersonaComponent = /** @class */ (function () {
    function EditapersonaComponent(fb, cd, _personaService) {
        var _this = this;
        this.fb = fb;
        this.cd = cd;
        this._personaService = _personaService;
        this.isLoadingResults = true;
        this.isRateLimitReached = false;
        this.displayedColumns = ['_id', 'imagen', 'rut', 'nombre', 'tag', 'empresa', 'cargo', 'area', 'autorizado', 'fechaincorporacion', 'tipolicenciaconducir', 'mutualidad', 'fechaexamenocupacional', 'fechaexamenalturafisica', 'fechaexamenalturageo', 'fechafincontrato'];
        this.selection = new SelectionModel(true, []); //esto es para detectar el item seleccionado
        this.personaId = '';
        this.personaImg = '';
        this.actualizando = false; //para que aparezcan las opciones para actualizar
        this.creado = false; // para que aparezcal las opciones de crear
        // Al cambiar imagen del objeto recien creado retorna el nombre de la imagen guardada
        this._personaService.notificacionImagenPersonaSubida
            .subscribe(function (resp) {
            _this.cargarPersonaTodos();
            _this.cancelar();
        });
    }
    EditapersonaComponent.prototype.ngOnInit = function () {
        this.inicializaFormPersona();
        this.cargarPersonaTodos();
    };
    EditapersonaComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    EditapersonaComponent.prototype.inicializaFormPersona = function () {
        //FORMULARIO DATOS PERSONAS
        this.formDatosPersona = this.fb.group({
            rut: new FormControl(null, Validators.required),
            nombre: new FormControl(null, Validators.required),
            tag: new FormControl(null, Validators.required),
            empresa: new FormControl({ value: null, disabled: false }),
            cargo: new FormControl({ value: null, disabled: false }),
            area: new FormControl({ value: null, disabled: false }),
            autorizado: new FormControl({ value: null, disabled: false }),
            fechaincorporacion: new FormControl({ value: null, disabled: false }),
            tipolicenciaconducir: new FormControl({ value: null, disabled: false }),
            mutualidad: new FormControl({ value: null, disabled: false }),
            fechaexamenocupacional: new FormControl({ value: null, disabled: false }),
            fechaexamenalturafisica: new FormControl({ value: null, disabled: false }),
            fechaexamenalturageo: new FormControl({ value: null, disabled: false }),
            fechafincontrato: new FormControl({ value: null, disabled: false }),
            responsablearchivoexamen1: new FormControl({ value: null, disabled: false }),
            responsablearchivoexamen2: new FormControl({ value: null, disabled: false }),
            responsablearchivoexamen3: new FormControl({ value: null, disabled: false }),
            responsablearchivocontrato: new FormControl({ value: null, disabled: false })
        });
        this.formDatosPersona.controls['tag'].disable();
        //FORMULARIO IMAGEN PERSONAS
        this.formImagenPersona = this.fb.group({
            file: [null, Validators.compose([Validators.required])]
        });
        //FORMULARIO ARCHIVO EXAMEN1 PERSONAS
        this.formExamen1Persona = this.fb.group({
            file: [null, Validators.compose([Validators.required])]
        });
        //FORMULARIO ARCHIVO EXAMEN2 PERSONAS
        this.formExamen2Persona = this.fb.group({
            file: [null, Validators.compose([Validators.required])]
        });
        //FORMULARIO ARCHIVO EXAMEN3 PERSONAS
        this.formExamen3Persona = this.fb.group({
            file: [null, Validators.compose([Validators.required])]
        });
        //FORMULARIO ARCHIVO CONTRATO PERSONAS
        this.formContratoPersona = this.fb.group({
            file: [null, Validators.compose([Validators.required])]
        });
    };
    EditapersonaComponent.prototype.setFormPersona = function (persona) {
        this.formDatosPersona.setValue({
            rut: persona.rut,
            nombre: persona.nombre,
            tag: persona.tag,
            empresa: persona.empresa,
            cargo: persona.cargo,
            area: persona.area,
            autorizado: persona.autorizado,
            fechaincorporacion: persona.fechaincorporacion,
            tipolicenciaconducir: persona.tipolicenciaconducir,
            mutualidad: persona.mutualidad,
            fechaexamenocupacional: persona.fechaexamenocupacional,
            fechaexamenalturafisica: persona.fechaexamenalturafisica,
            fechaexamenalturageo: persona.fechaexamenalturageo,
            fechafincontrato: persona.fechafincontrato,
            responsablearchivoexamen1: persona.responsablearchivoexamen1,
            responsablearchivoexamen2: persona.responsablearchivoexamen2,
            responsablearchivoexamen3: persona.responsablearchivoexamen3,
            responsablearchivocontrato: persona.responsablearchivocontrato,
        });
    };
    // Obtine datos para llenar tabla
    EditapersonaComponent.prototype.cargarPersonaTodos = function () {
        var _this = this;
        this.isLoadingResults = true;
        this._personaService.itemsTodos()
            .subscribe(function (resp) {
            _this.personas = resp.items;
            _this.isLoadingResults = false;
            _this.dataSource = new MatTableDataSource(_this.personas);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    //CREA NUEVA PERSONA
    EditapersonaComponent.prototype.onSubmit = function () {
        this.actualizarPersona();
        // this.actualizando? 
        // this.actualizarPersona():
        // this.crearPersona();
    };
    // crearPersona (  ){  // datos modificados en el formulario
    //  let personaCrear: Persona=this.formDatosPersona.getRawValue(); // obtiene todos hasta los deshabilitados
    //  this._personaService.registraItem ( personaCrear )
    //      .subscribe( (resp: any) =>{
    //         this.personaId=resp._id;
    //         this.cargarPersonaTodos();
    //         this.creado=true;
    //         this.actualizando = true;
    //       });
    // }
    //ACTUALIZA PERSONA DE LA LISTA
    EditapersonaComponent.prototype.actualizarPersona = function () {
        var _this = this;
        var personaActualizar = this.formDatosPersona.value; // obtiene solo los habilitados
        personaActualizar._id = this.personaId; //Se agrega el _id
        console.log(personaActualizar);
        this._personaService.actualizarItem(personaActualizar)
            .subscribe(function (resp) {
            _this.cargarPersonaTodos();
            _this.cancelar();
        });
    };
    EditapersonaComponent.prototype.cancelarActualizarCrear = function () {
        this.cancelar();
    };
    EditapersonaComponent.prototype.seleccionImage = function (archivo) {
        var _this = this;
        if (!archivo) {
            this.imagenSubir = null;
            return;
        }
        if (archivo.type.indexOf('image') < 0) {
            swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
            this.imagenSubir = null;
            return;
        }
        this.imagenSubir = archivo;
        var reader = new FileReader();
        var urlImagenTemp = reader.readAsDataURL(archivo);
        // reader.onloadend =() => this.imagenTemp = reader.result;
        reader.onload = function () {
            _this.formImagenPersona.patchValue({
                file: reader.result
            });
            _this.imagenTemp = reader.result;
            _this.cd.markForCheck();
        };
    };
    //SUBE IMAGEN DE OBJETO
    EditapersonaComponent.prototype.cambiarImagen = function () {
        if (this.imagenSubir && this.personaId) {
            this._personaService.cambiarImagen(this.imagenSubir, this.personaId);
        }
    };
    EditapersonaComponent.prototype.editarPersona = function (row) {
        var _this = this;
        this.dataSource.data.forEach(function (rowi) { return _this.selection.deselect(rowi); });
        this.selection.select(row);
        this.setFormPersona(row);
        console.log(row);
        this.actualizando = true;
        this.personaImg = row.imagen;
        this.personaId = row._id;
    };
    EditapersonaComponent.prototype.borrarPersona = function () {
    };
    EditapersonaComponent.prototype.cancelarEditar = function () {
        this.cancelar();
    };
    EditapersonaComponent.prototype.cancelar = function () {
        var _this = this;
        this.formDatosPersona.reset();
        this.formImagenPersona.reset();
        this.actualizando = false;
        this.creado = false;
        this.personaImg = '';
        this.personaId = '';
        //this.formDatosPersona.controls['tag'].enable();
        this.imagenSubir = null;
        this.imagenTemp = '';
        this.dataSource.data.forEach(function (rowi) { return _this.selection.deselect(rowi); });
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], EditapersonaComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        ViewChild(MatSort),
        tslib_1.__metadata("design:type", MatSort)
    ], EditapersonaComponent.prototype, "sort", void 0);
    EditapersonaComponent = tslib_1.__decorate([
        Component({
            selector: 'app-editapersona',
            templateUrl: './editapersona.component.html',
            styleUrls: ['./editapersona.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            ChangeDetectorRef,
            PersonaService])
    ], EditapersonaComponent);
    return EditapersonaComponent;
}());
export { EditapersonaComponent };
//# sourceMappingURL=editapersona.component.js.map