"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var element_1 = require("./element");
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
        return element_1.ElementDomManager.hasAttribute(this.input, attrKey);
    };
    InputDomManager.prototype.getAttribute = function (attrKey) {
        return element_1.ElementDomManager.getAttribute(this.input, attrKey);
    };
    InputDomManager.prototype.getValue = function () {
        if (this.input instanceof HTMLSelectElement) {
            return this.input.options[this.input.selectedIndex].nodeValue;
        }
        if (['radio', 'checkbox'].indexOf(this.input.getAttribute('type')) !== -1) {
            var checkedInput = document.querySelector('input[name="' + this.input.name + '"]:checked');
            return checkedInput ? checkedInput.value : false;
        }
        return this.input.value;
    };
    return InputDomManager;
}());
exports.InputDomManager = InputDomManager;
