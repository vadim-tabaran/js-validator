"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_input_1 = require("./validate-input");
var form_1 = require("./dom-manager/form");
var Validator = (function () {
    function Validator(target, config) {
        if (config === void 0) { config = {}; }
        this.formDomManager = new form_1.FormDomManager(target);
        this.formDomManager.setElements();
        this.initValidator();
    }
    Validator.prototype.validate = function () {
    };
    Validator.prototype.initValidator = function () {
        this.initFormListener();
        this.initInputsListeners();
    };
    Validator.prototype.initFormListener = function () {
        var _this = this;
        var formElement = this.formDomManager.getForm();
        if (formElement === null) {
            return;
        }
        formElement.addEventListener("submit", function (event) { return _this.onFormSubmit(event); });
    };
    Validator.prototype.initInputsListeners = function () {
        var inputElements = this.formDomManager.getInputs();
        if (inputElements.length === 0) {
            return;
        }
        for (var i = 0; i < inputElements.length; i++) {
            new validate_input_1.ValidateInput(inputElements[i]);
        }
    };
    Validator.prototype.onFormSubmit = function (event) {
    };
    Validator.importRules = function () {
    };
    return Validator;
}());
Validator.preFix = 'v-';
Validator.ruleSeparator = '|';
Validator.messagePreFix = '-message';
Validator.customValidateResponseMethodName = 'validate';
exports.Validator = Validator;
window["Validator"] = Validator;
