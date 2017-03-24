"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template_1 = require("./template");
var Message = (function () {
    function Message(inputDomManager) {
        this.inputDomManager = inputDomManager;
    }
    Message.prototype.show = function (validatorResponses) {
        var messages = [];
        for (var i = 0; i < validatorResponses.length; i++) {
            messages.push(this.get(validatorResponses[i]));
        }
    };
    Message.prototype.get = function (response) {
        var template = new template_1.Template(response);
        return template.extractMessage();
    };
    return Message;
}());
exports.Message = Message;
