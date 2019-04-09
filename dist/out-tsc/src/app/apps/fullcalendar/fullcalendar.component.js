import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
var CalendarDialogComponent = /** @class */ (function () {
    function CalendarDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    CalendarDialogComponent = tslib_1.__decorate([
        Component({
            selector: 'app-calendar-dialog',
            template: "\n  <h4 class=\"m-t-0\">Event action occurred</h4>\n  <div>\n    Action:\n    <pre>{{ data?.action }}</pre>\n  </div><br/>\n  <div>\n    Event:\n    <pre>{{ data?.event | json }}</pre>\n  </div><br/>\n  <button mat-raised-button color=\"primary\"  (click)=\"dialogRef.close()\">Close dialog</button>"
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], CalendarDialogComponent);
    return CalendarDialogComponent;
}());
export { CalendarDialogComponent };
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs/Subject';
var colors = {
    red: {
        primary: '#fc4b6c',
        secondary: '#f9e7eb'
    },
    blue: {
        primary: '#1e88e5',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#ffb22b',
        secondary: '#FDF1BA'
    }
};
var FullcalendarComponent = /** @class */ (function () {
    function FullcalendarComponent(dialog, doc) {
        var _this = this;
        this.dialog = dialog;
        this.config = {
            disableClose: false,
            width: '',
            height: '',
            position: {
                top: '',
                bottom: '',
                left: '',
                right: ''
            },
            data: {
                action: '',
                event: []
            }
        };
        this.numTemplateOpens = 0;
        this.view = 'month';
        this.viewDate = new Date();
        this.actions = [
            {
                label: '<i class="ti-pencil act"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    _this.handleEvent('Edited', event);
                }
            },
            {
                label: '<i class="ti-close act"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    _this.events = _this.events.filter(function (iEvent) { return iEvent !== event; });
                    _this.handleEvent('Deleted', event);
                }
            }
        ];
        this.refresh = new Subject();
        this.events = [
            {
                start: subDays(startOfDay(new Date()), 1),
                end: addDays(new Date(), 1),
                title: 'A 3 day event',
                color: colors.red,
                actions: this.actions
            },
            {
                start: startOfDay(new Date()),
                title: 'An event with no end date',
                color: colors.yellow,
                actions: this.actions
            },
            {
                start: subDays(endOfMonth(new Date()), 3),
                end: addDays(endOfMonth(new Date()), 3),
                title: 'A long event that spans 2 months',
                color: colors.blue
            },
            {
                start: addHours(startOfDay(new Date()), 2),
                end: new Date(),
                title: 'A draggable and resizable event',
                color: colors.yellow,
                actions: this.actions,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                },
                draggable: true
            }
        ];
        this.activeDayIsOpen = true;
    }
    FullcalendarComponent.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    };
    FullcalendarComponent.prototype.eventTimesChanged = function (_a) {
        var event = _a.event, newStart = _a.newStart, newEnd = _a.newEnd;
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    };
    FullcalendarComponent.prototype.handleEvent = function (action, event) {
        var _this = this;
        this.config.data = { event: event, action: action };
        this.dialogRef = this.dialog.open(CalendarDialogComponent, this.config);
        this.dialogRef.afterClosed().subscribe(function (result) {
            _this.lastCloseResult = result;
            _this.dialogRef = null;
        });
    };
    FullcalendarComponent.prototype.addEvent = function () {
        this.events.push({
            title: 'New event',
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            }
        });
        this.refresh.next();
    };
    FullcalendarComponent = tslib_1.__decorate([
        Component({
            selector: 'app-fullcalendar',
            changeDetection: ChangeDetectionStrategy.OnPush,
            templateUrl: './fullcalendar.component.html',
            styleUrls: ['./fullcalendar.component.scss']
        }),
        tslib_1.__param(1, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [MatDialog, Object])
    ], FullcalendarComponent);
    return FullcalendarComponent;
}());
export { FullcalendarComponent };
//# sourceMappingURL=fullcalendar.component.js.map