import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var anchoCanvas = 1200;
var altoCanvas = 675;
var CanvasdrawService = /** @class */ (function () {
    function CanvasdrawService() {
        this.canvasOk = false;
    }
    // INICIALIZAR CON ESTA FUNCIÓN
    CanvasdrawService.prototype.creaContexto = function (canvas) {
        this.canvasPlanta = canvas;
        if (this.canvasPlanta.getContext) {
            this.canvasOk = true;
            this.contextoPlanta = this.canvasPlanta.getContext('2d');
            var s = getComputedStyle(this.canvasPlanta);
            var w = s.width;
            var h = s.height;
            this.W = +w.split("px")[0];
            this.H = +h.split("px")[0];
            this.canvasPlanta.width = this.W;
            this.canvasPlanta.height = this.H;
        }
    };
    CanvasdrawService.prototype.etiquetaCirculoDi = function (xx, yy, valor, condicion, title, colornormal, coloralarma, colortitulo) {
        var factor = this.W / anchoCanvas;
        var x = xx * this.W / anchoCanvas;
        var y = yy * this.H / altoCanvas;
        var fontSet;
        if (this.W < 300) {
            fontSet = "normal 9px Helvetica, Arial, sans-serif";
        }
        if (this.W > 299 && this.W < 500) {
            fontSet = "normal 10px Helvetica, Arial, sans-serif";
        }
        if (this.W > 499 && this.W < 700) {
            fontSet = "normal 12px Helvetica, Arial, sans-serif";
        }
        if (this.W > 699) {
            fontSet = "normal 18px Helvetica, Arial, sans-serif";
        }
        var ctx;
        ctx = this.contextoPlanta;
        var radio = 10;
        var margen = 3;
        var espesormarco = 3;
        var anchoTitle = ctx.measureText(String(title)).width;
        var altoTitle = ctx.measureText('M').width; //estimacion rapida de la altura del string
        var anchoClean = anchoTitle;
        if (anchoClean >= 100) {
            anchoClean = 100;
        }
        ctx.lineWidth = espesormarco;
        //LIMPIAR
        ctx.clearRect(x - (radio + margen + espesormarco) * factor, y - (radio + margen + espesormarco) * factor - altoTitle, anchoClean, (2 * (radio + margen + espesormarco)) * factor + altoTitle);
        // PRUEBA AREA DE BORRADO
        // ctx.lineWidth = 2;
        // ctx.beginPath();    
        // ctx.strokeStyle ='rgba(57,204,204,0.2)';
        // ctx.rect(
        //   x-(radio+margen+espesormarco)*factor,
        //   y-(radio+margen+espesormarco)*factor-altoTitle,
        //   anchoClean,
        //   2*(radio+margen+espesormarco)*factor+altoTitle
        // );
        // ctx.stroke();
        //CIRCULO ALREDEDOR
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(221,221,221)';
        ctx.arc(x, y, (radio + margen) * factor, this.rad(270), this.percentToRad(100), false);
        ctx.stroke();
        //CIRCULO FONDO TRANSPARENTE
        if (!valor && condicion == 'NO' || valor && condicion == 'NC') {
            ctx.beginPath();
            ctx.fillStyle = hex2rgb(colornormal, 0.8);
            ctx.arc(x, y, radio * factor, 0, 2 * Math.PI, false);
            ctx.fill();
        }
        else {
            ctx.beginPath();
            ctx.fillStyle = hex2rgb(coloralarma, 0.8);
            ctx.arc(x, y, radio * factor, 0, 2 * Math.PI, false);
            ctx.fill();
        }
        //TITULO
        ctx.fillStyle = colortitulo;
        ctx.fillText(title, x - (radio + margen + espesormarco) * factor, y - (radio + margen + espesormarco) * factor, 100);
    };
    CanvasdrawService.prototype.etiquetaCirculo = function (xx, yy, min, max, percentReal, limite, indicaalarma, title, unidad, colornormal, coloralarma, colortitulo, colorvalor, colorfondo) {
        //percent es de 0 a 999 y vine del plc
        var m;
        var c;
        var valor = '0';
        var percent = percentReal / 10;
        //Calculo valor
        if (max > min) {
            m = 999 / (max - min);
            c = 999 - m * max;
            valor = Number((percentReal - c) / m).toFixed(2);
        }
        //Posicion en canvas
        var factor = this.W / anchoCanvas;
        var x = xx * this.W / anchoCanvas;
        var y = yy * this.H / altoCanvas;
        var fontSet;
        if (this.W < 300) {
            fontSet = "normal 9px Helvetica, Arial, sans-serif";
        }
        if (this.W > 299 && this.W < 500) {
            fontSet = "normal 12px Helvetica, Arial, sans-serif";
        }
        if (this.W > 499 && this.W < 700) {
            fontSet = "normal 18px Helvetica, Arial, sans-serif";
        }
        if (this.W > 699) {
            fontSet = "normal 21px Helvetica, Arial, sans-serif";
        }
        var ctx;
        ctx = this.contextoPlanta;
        var radio = 50;
        var margen = 6;
        var espesormarco = 7;
        var anchoUnidad = ctx.measureText(String(unidad)).width;
        var anchoValor = ctx.measureText(String(percent)).width;
        var anchoTitle = ctx.measureText(String(title)).width;
        var altoTitle = ctx.measureText('M').width; //estimacion rapida de la altura del string
        var anchoClean = anchoTitle;
        if (anchoClean >= 100) {
            anchoClean = 100;
        }
        //LIMPIAR
        ctx.clearRect(x - (radio + margen + espesormarco) * factor, y - (radio + margen + espesormarco) * factor - altoTitle, (2 * (radio + margen + espesormarco)) * factor, (2 * (radio + margen + espesormarco)) * factor + altoTitle);
        ctx.lineWidth = espesormarco;
        // PRUEBA AREA DE BORRADO
        // ctx.lineWidth = 2;
        // ctx.beginPath();    
        // ctx.strokeStyle ='rgba(57,204,204,0.2)';
        // ctx.rect(
        //   x-(radio+margen+espesormarco)*factor,
        //   y-(radio+margen+espesormarco)*factor-altoTitle,
        //   (2*(radio+margen+espesormarco))*factor,
        //   (2*(radio+margen+espesormarco))*factor+altoTitle
        // );
        // ctx.stroke();
        //CIRCULO GRIS
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(221,221,221,0.4)';
        ctx.arc(x, y, (radio + margen) * factor, this.rad(270), this.percentToRad(100), false);
        ctx.stroke();
        //CIRCULO DATO
        if ((percent <= limite) && (indicaalarma == 'sobre') || (percent > limite) && (indicaalarma == 'bajo')) {
            ctx.beginPath();
            ctx.strokeStyle = hex2rgb(colornormal, 0.5);
            ctx.arc(x, y, (radio + margen) * factor, this.rad(270), this.percentToRad(percent), false);
            ctx.stroke();
        }
        else {
            ctx.beginPath();
            ctx.strokeStyle = hex2rgb(coloralarma, 0.6);
            ctx.arc(x, y, (radio + margen) * factor, this.rad(270), this.percentToRad(percent), false);
            ctx.stroke();
        }
        //CIRCULO FONDO TRANSPARENTE
        ctx.beginPath();
        ctx.fillStyle = hex2rgb(colorfondo, 0.5);
        ctx.arc(x, y, radio * factor, 0, 2 * Math.PI, false);
        ctx.fill();
        //DATO TEXTO
        //ctx.font = "normal 17px Helvetica, Arial, sans-serif";
        ctx.font = fontSet;
        ctx.fillStyle = hex2rgb(colorvalor, 1);
        ctx.fillText(valor + ' ' + unidad, x - Math.floor((anchoValor + anchoUnidad + 1) / 2), y + Math.floor(altoTitle / 2), 100);
        //TITULO
        ctx.fillStyle = colortitulo;
        ctx.fillText(title, x - Math.floor(anchoTitle / 2), y - (radio + margen + espesormarco) * factor, 100);
    };
    CanvasdrawService.prototype.rad = function (deg) {
        return (Math.PI / 180) * deg;
    };
    CanvasdrawService.prototype.percentToRad = function (percent) {
        return this.rad(270) + this.rad((360 * percent) / 100);
    };
    CanvasdrawService.prototype.etiquetaRectangulo = function (xx, yy, min, max, percentReal, limite, indicaalarma, title, unidad, colornormal, coloralarma, colortitulo, colorvalor, colorfondo) {
        //OJO  CON 1200 800 VIENE DE: <canvas #canvas   width="1200" height="800" id="plano" ></canvas>
        //percent es de 0 a 999 y vine del plc
        var m;
        var c;
        var valor = '0';
        var percent = percentReal / 10;
        //Calculo valor
        if (max > min) {
            m = 999 / (max - min); //en vez de 100 se trabaja con 999 por el rango que viene percent
            c = 999 - m * max;
            valor = Number((percentReal - c) / m).toFixed(1);
        }
        var factor = this.W / anchoCanvas;
        var x = xx * this.W / anchoCanvas;
        var y = yy * this.H / altoCanvas;
        var fontSet;
        var lenUnidad = String(unidad).length;
        var lenValor = String(percent).length;
        if (this.W < 300) {
            fontSet = "normal 9px Helvetica, Arial, sans-serif";
        }
        if (this.W > 299 && this.W < 500) {
            fontSet = "normal 12px Helvetica, Arial, sans-serif";
        }
        if (this.W > 499 && this.W < 700) {
            fontSet = "normal 18px Helvetica, Arial, sans-serif";
        }
        if (this.W > 699) {
            fontSet = "normal 21px Helvetica, Arial, sans-serif";
        }
        var ctx;
        ctx = this.contextoPlanta;
        var alto = 120;
        var ancho = 40;
        var margen = 6;
        var anchoflecha = 10;
        var altoflecha = 10;
        var barraDato = alto * percent / 100;
        var espesormarco = 3;
        var anchoUnidad = ctx.measureText(String(unidad)).width;
        var anchoValor = ctx.measureText(String(percent)).width;
        var anchoTitle = ctx.measureText(String(title)).width;
        var altoTitle = ctx.measureText('M').width; //estimacion rapida de la altura del string
        //LIMPIAR
        var xClear = x - (margen + espesormarco) * factor;
        var yClear = y + (margen + espesormarco + altoflecha) * factor;
        var anchoClear = (2 * espesormarco + 5 * margen + ancho + anchoflecha) * factor + (anchoValor + anchoUnidad);
        var altoClear = -(2 * espesormarco + 3 * margen + alto + altoflecha) * factor - altoTitle;
        ctx.clearRect(xClear, yClear, anchoClear, altoClear);
        ctx.lineWidth = espesormarco;
        // PRUEBA AREA DE BORRADO
        // ctx.beginPath();    
        // ctx.strokeStyle ='rgba(57,204,204,0.2)';
        // ctx.rect(xClear,yClear,anchoClear,altoClear);
        // ctx.stroke();
        //BORDE GRIS
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(221,221,221)';
        ctx.rect(x - margen * factor, y + margen * factor, (ancho + 2 * margen) * factor, -(alto + 2 * margen) * factor);
        ctx.stroke();
        //FONDO TRANSPARENTE
        ctx.beginPath();
        ctx.fillStyle = hex2rgb(colorfondo, 0.5);
        ctx.fillRect(x, y, ancho * factor, -alto * factor);
        //BARRA DATO
        ctx.beginPath();
        if ((percent <= limite) && (indicaalarma == 'sobre') || (percent > limite) && (indicaalarma == 'bajo')) {
            ctx.fillStyle = hex2rgb(colornormal, 0.8);
        }
        else {
            ctx.fillStyle = hex2rgb(coloralarma, 0.8);
        }
        ctx.fillRect(x, y, ancho * factor, -barraDato * factor);
        //TEXTO TITULO Y DATO
        ctx.font = fontSet;
        ctx.fillStyle = colortitulo;
        ctx.fillText(title, x - (margen + (espesormarco - 1)) * factor, y - (alto + 2 * margen) * factor, 100);
        ctx.fillStyle = colorvalor;
        ctx.fillText(valor + ' ' + unidad, x + (3 * margen + ancho + anchoflecha) * factor, y - (barraDato - Math.floor(altoTitle / 2)) * factor, 100);
        //FLECHA FILL
        ctx.beginPath();
        ctx.moveTo(x + (2 * margen + ancho) * factor, y - barraDato * factor);
        ctx.lineTo(x + (2 * margen + ancho + anchoflecha) * factor, y - (barraDato - altoflecha) * factor);
        ctx.lineTo(x + (2 * margen + ancho + anchoflecha) * factor, y - (barraDato + altoflecha) * factor);
        ctx.lineTo(x + (2 * margen + ancho) * factor, y - barraDato * factor);
        ctx.closePath();
        ctx.fillStyle = 'rgb(255,87,34)';
        ctx.fill();
        //FELCHA BORDE
        ctx.beginPath();
        ctx.moveTo(x + (2 * margen + ancho) * factor, y - barraDato * factor);
        ctx.lineTo(x + (2 * margen + ancho + anchoflecha) * factor, y - (barraDato - altoflecha) * factor);
        ctx.lineTo(x + (2 * margen + ancho + anchoflecha) * factor, y - (barraDato + altoflecha) * factor);
        ctx.lineTo(x + (2 * margen + ancho) * factor, y - barraDato * factor);
        ctx.strokeStyle = 'rgb(255,255,255)';
        ctx.lineWidth = 1;
        ctx.stroke();
    };
    CanvasdrawService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], CanvasdrawService);
    return CanvasdrawService;
}());
export { CanvasdrawService };
function hex2rgb(hex, opacity) {
    hex = (hex + '').trim();
    var rgb = null, match = hex.match(/^#?(([0-9a-zA-Z]{3}){1,3})$/);
    if (!match) {
        return null;
    }
    rgb = {};
    hex = match[1];
    // check if 6 letters are provided
    if (hex.length == 6) {
        rgb.r = parseInt(hex.substring(0, 2), 16);
        rgb.g = parseInt(hex.substring(2, 4), 16);
        rgb.b = parseInt(hex.substring(4, 6), 16);
    }
    else if (hex.length == 3) {
        rgb.r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16);
        rgb.g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
        rgb.b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
    }
    // rgb.css = 'rgb' + (opacity ? 'a' : '') + '(';
    // rgb.css += rgb.r + ',' + rgb.g + ',' + rgb.b;
    // rgb.css += (opacity ? ',' + opacity : '') + ')';
    var rgba = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')';
    return rgba;
}
//# sourceMappingURL=canvasdraw.service.js.map