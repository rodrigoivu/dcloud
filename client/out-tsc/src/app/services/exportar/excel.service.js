import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
var EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
var EXCEL_EXTENSION = '.xlsx';
var ExcelService = /** @class */ (function () {
    function ExcelService() {
    }
    ExcelService.prototype.exportAsExcelFile = function (json, excelFileName) {
        var worksheet = XLSX.utils.json_to_sheet(json);
        var workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        var excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    };
    ExcelService.prototype.saveAsExcelFile = function (buffer, fileName) {
        var data = new Blob([buffer], { type: EXCEL_TYPE });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    };
    ExcelService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ExcelService);
    return ExcelService;
}());
export { ExcelService };
//# sourceMappingURL=excel.service.js.map