"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template_1 = require("./template");
var Message = (function () {
    function Message(inputDomManager) {
        this.inputDomManager = inputDomManager;
    }
    Message.prototype.show = function (responses) {
        var messages = [];
        for (var i = 0; i < responses.length; i++) {
            messages.push(this.get(responses[i]));
        }
    };
    Message.prototype.get = function (response) {
        if (response === true) {
            return false;
        }
        if (typeof response === 'string') {
            var template = new template_1.Template(response, this.prepareTemplateParameters());
            return template.extractMessage();
        }
        if (response === false) {
            return 'response - false';
        }
    };
    Message.prototype.prepareTemplateParameters = function () {
        return {
            attr: this.inputDomManager.getInput().attributes,
            params: []
        };
    };
    return Message;
}());
exports.Message = Message;
