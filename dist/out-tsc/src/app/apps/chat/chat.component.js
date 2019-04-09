import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var ChatComponent = /** @class */ (function () {
    function ChatComponent() {
        this.sidePanelOpened = true;
        this.messages = [{
                from: 'Nirav Joshi',
                photo: 'assets/images/users/1.jpg',
                subject: 'Hey, how are you?',
            }, {
                from: 'Sunil Joshi',
                photo: 'assets/images/users/2.jpg',
                subject: 'Lorem ipsum done dkaghdka',
            }, {
                from: 'Vishal bhatt',
                photo: 'assets/images/users/3.jpg',
                subject: 'Thanks mate',
            }, {
                from: 'Genelia Desouza',
                photo: 'assets/images/users/4.jpg',
                subject: 'This is my shot',
            }, {
                from: 'Linda muke',
                photo: 'assets/images/users/5.jpg',
                subject: 'You have to do it with your self',
            }, {
                from: 'Vaibhav Zala',
                photo: 'assets/images/users/6.jpg',
                subject: 'No mate this is not',
            }, {
                from: 'Kalu valand',
                photo: 'assets/images/users/1.jpg',
                subject: 'Arti thai gai ne?',
            }];
        this.selectedMessage = this.messages[1];
    }
    ChatComponent.prototype.isOver = function () {
        return window.matchMedia("(max-width: 960px)").matches;
    };
    ChatComponent.prototype.onSelect = function (message) {
        this.selectedMessage = message;
    };
    ChatComponent = tslib_1.__decorate([
        Component({
            selector: 'app-chat',
            templateUrl: './chat.component.html',
            styleUrls: ['./chat.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ChatComponent);
    return ChatComponent;
}());
export { ChatComponent };
//# sourceMappingURL=chat.component.js.map