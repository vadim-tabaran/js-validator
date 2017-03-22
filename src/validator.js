"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_manager_1 = require("./dom-manager");
var manager_1 = require("./rules/manager");
var async_1 = require("./async/async");
var message_1 = require("./message");
var Validator = (function () {
    function Validator(target, config) {
        if (config === void 0) { config = {}; }
        this.domManager = new dom_manager_1.DomManager(target);
        this.domManager.setElements();
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
        var formElement = this.domManager.getForm();
        if (formElement === null) {
            return;
        }
        formElement.addEventListener("submit", function (event) { return _this.onFormSubmit(event); });
    };
    Validator.prototype.initInputsListeners = function () {
        var _this = this;
        var inputElements = this.domManager.getInputs();
        if (inputElements.length === 0) {
            return;
        }
        for (var i = 0; i < inputElements.length; i++) {
            var htmlInputElement = inputElements[i];
            var validateOnAttributeValue = dom_manager_1.DomManager.getAttributeValue(htmlInputElement, 'validate-on');
            var validateOnArray = validateOnAttributeValue ? validateOnAttributeValue.split('|') : [];
            var validateOnEvents = validateOnArray.length > 0 ? validateOnArray : ['change'];
            for (var i_1 = 0; i_1 < validateOnEvents.length; i_1++) {
                htmlInputElement.addEventListener(validateOnEvents[i_1], function (event) {
                    _this.validateInput(event.target);
                });
            }
        }
    };
    Validator.prototype.validateInput = function (element) {
        var rules = new manager_1.RulesManager(element); //todo Rules manager
        var rulesChain = rules.extractCallbackChain();
        async_1.Async.parallel(rulesChain).subscribe(function (responses) { return new message_1.Message(responses, element); });
    };
    Validator.prototype.onFormSubmit = function (event) {
    };
    Validator.importRules = function () {
    };
    return Validator;
}());
exports.Validator = Validator;
window["Validator"] = Validator;
