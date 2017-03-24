"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../error");
var FormDomManager = (function () {
    function FormDomManager(target) {
        this.formElement = null;
        this.inputs = [];
        this.target = '';
        this.target = target;
    }
    FormDomManager.prototype.setElements = function () {
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
    FormDomManager.prototype.getForm = function () {
        return this.formElement;
    };
    FormDomManager.prototype.getInputs = function () {
        return this.inputs;
    };
    FormDomManager.prototype.actualizeFormInputs = function () {
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
    return FormDomManager;
}());
exports.FormDomManager = FormDomManager;
