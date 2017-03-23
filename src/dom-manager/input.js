"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
var InputDomManager = (function () {
    function InputDomManager(input) {
        this.input = input;
    }
    InputDomManager.prototype.getInput = function () {
        return this.input;
    };
    InputDomManager.prototype.getValidateOnEvents = function () {
        var validateOnAttributeValue = this.getAttribute('validate-on');
        return validateOnAttributeValue ? validateOnAttributeValue.split('|') : ['change'];
    };
    InputDomManager.prototype.registerListener = function (event, onEventCallback) {
        this.input.addEventListener(event, onEventCallback);
    };
    InputDomManager.prototype.hasAttribute = function (attrKey) {
        return this.input.hasAttribute(validator_1.Validator.preFix + attrKey);
    };
    InputDomManager.prototype.getAttribute = function (attrKey) {
        if (!this.hasAttribute(attrKey)) {
            return false;
        }
        return this.input.getAttribute(validator_1.Validator.preFix + attrKey);
    };
    return InputDomManager;
}());
exports.InputDomManager = InputDomManager;
