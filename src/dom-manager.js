"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("./error");
var DomManager = (function () {
    function DomManager(target) {
        this.formElement = null;
        this.inputs = [];
        this.target = '';
        this.target = target;
    }
    DomManager.prototype.setElements = function () {
        if (typeof this.target === 'string') {
            var targetElement = document.querySelector(this.target);
            if (targetElement instanceof HTMLFormElement) {
                this.formElement = targetElement;
                this.actualizeFormInputs();
                return true;
            }
            else if (targetElement instanceof HTMLInputElement) {
                this.inputs.push(targetElement);
                return true;
            }
            else {
                return new error_1.ErrorHandler('invalidSelector', { 'selector': this.target });
            }
        }
        if (this.target instanceof HTMLInputElement) {
            this.inputs.push(this.target);
            return true;
        }
        return new error_1.ErrorHandler('invalidTarget', { 'target': this.target });
    };
    DomManager.prototype.getForm = function () {
        return this.formElement;
    };
    DomManager.prototype.getInputs = function () {
        return this.inputs;
    };
    DomManager.prototype.actualizeFormInputs = function () {
        if (this.formElement === null) {
            return;
        }
        for (var inputName in this.formElement.elements) {
            var currentElement = this.formElement.elements[inputName];
            if (currentElement instanceof HTMLInputElement && this.inputs.indexOf(currentElement) === -1) {
                this.inputs.push(this.formElement.elements[inputName]);
            }
        }
    };
    DomManager.getAttributeValue = function (element, attributeKey) {
        return element.getAttribute(attributeKey);
    };
    return DomManager;
}());
exports.DomManager = DomManager;
