"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template_1 = require("./template");
var default_validate_message_1 = require("../default-validate-message");
var Message = (function () {
    function Message(inputDomManager) {
        this.inputDomManager = inputDomManager;
        this.validatorView = new default_validate_message_1.DefaultValidatorView(this.inputDomManager); // todo add customization for validation message view
    }
    Message.prototype.show = function (validatorResponses) {
        this.validatorView.destroy();
        var messagesList = this.getMessageList(validatorResponses);
        this.validatorView.show(messagesList);
    };
    Message.prototype.getMessageList = function (validatorResponses) {
        var messages = [];
        for (var i = 0; i < validatorResponses.length; i++) {
            messages.push(this.getMessage(validatorResponses[i]));
        }
        return messages;
    };
    Message.prototype.getMessage = function (response) {
        var template = new template_1.Template(response);
        return template.extractMessage();
    };
    return Message;
}());
exports.Message = Message;
