"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var form_1 = require("./dom-manager/form");
var validate_input_group_1 = require("./validate-input-group");
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
        var groups = {};
        for (var i = 0; i < inputElements.length; i++) {
            if (!groups.hasOwnProperty(inputElements[i].name)) {
                groups[inputElements[i].name] = [];
            }
            groups[inputElements[i].name].push(inputElements[i]);
        }
        for (var groupName in groups) {
            new validate_input_group_1.ValidateInputGroup(groups[groupName]);
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
Validator.messagePostFix = '-message';
Validator.customValidateResponseMethodName = 'validate';
Validator.groupAttributeName = 'group';
exports.Validator = Validator;
window["Validator"] = Validator;
