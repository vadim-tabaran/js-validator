"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = (function () {
    function Message(responses, element) {
        this.responses = responses;
        this.element = element;
        this.showMessage();
    }
    Message.prototype.showMessage = function () {
        var messages = [];
        for (var i = 0; i < this.responses.length; i++) {
            messages.push(this.getMessage(this.responses[i]));
        }
    };
    Message.prototype.getMessage = function (response) {
        return '';
    };
    return Message;
}());
exports.Message = Message;
