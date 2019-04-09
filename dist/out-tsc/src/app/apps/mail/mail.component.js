import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MailService } from './mail.service';
var DialogDataExampleDialogComponent = /** @class */ (function () {
    function DialogDataExampleDialogComponent(data) {
        this.data = data;
    }
    DialogDataExampleDialogComponent = tslib_1.__decorate([
        Component({
            selector: 'app-dialog-data-example-dialog',
            template: "\n    <h3 class=\"m-t-0\">Compose Email</h3>\n    <form class=\"basic-form\">\n        <div fxLayout=\"row\" fxLayoutWrap=\"wrap\">\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n              <mat-form-field>\n                <input matInput placeholder=\"To\" type=\"email\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n              <mat-form-field>\n                <input matInput placeholder=\"Subject\" type=\"text\">\n              </mat-form-field>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n            <quill-editor [style]=\"{height: '200px'}\"></quill-editor>\n            </div>\n            <!-- column -->\n            <div fxFlex.gt-sm=\"100\" fxFlex=\"100\" class=\"m-t-20\">\n              <button mat-raised-button color=\"primary\">Send</button> <button mat-raised-button color=\"accent\">Save as a Draft</button>\n            </div>\n        </div>\n    </form>\n  "
        }),
        tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], DialogDataExampleDialogComponent);
    return DialogDataExampleDialogComponent;
}());
export { DialogDataExampleDialogComponent };
var MailComponent = /** @class */ (function () {
    function MailComponent(mailService, dialog) {
        this.mailService = mailService;
        this.dialog = dialog;
        this.mediaMatcher = matchMedia("(max-width: 960px)");
        this.config = {};
        this.displayMode = 'default';
        this.messageOpen = false;
        this.sidePanelOpened = true;
    }
    MailComponent.prototype.ngOnInit = function () {
        this.getMessages();
    };
    MailComponent.prototype.isOver = function () {
        return this.mediaMatcher.matches;
    };
    MailComponent.prototype.getMessages = function () {
        var _this = this;
        this.mailService.getMessages().then(function (messages) {
            _this.messages = messages;
            _this.selectedMessage = _this.messages[1];
        });
    };
    MailComponent.prototype.onSelect = function (message) {
        this.selectedMessage = message;
    };
    // Compose button
    MailComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(DialogDataExampleDialogComponent, {});
        dialogRef.afterClosed().subscribe(function (result) {
            console.log("Dialog result: " + result);
        });
    };
    MailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-mail',
            templateUrl: './mail.component.html',
            styleUrls: ['./mail.component.scss'],
            providers: [MailService]
        }),
        tslib_1.__metadata("design:paramtypes", [MailService, MatDialog])
    ], MailComponent);
    return MailComponent;
}());
export { MailComponent };
//# sourceMappingURL=mail.component.js.map