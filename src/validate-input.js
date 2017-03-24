"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var manager_1 = require("./rules/manager");
var async_1 = require("./async/async");
var message_1 = require("./message/message");
var input_1 = require("./dom-manager/input");
var validator_1 = require("./validator");
var ValidateInput = (function () {
    function ValidateInput(input) {
        this.inputDomManager = new input_1.InputDomManager(input);
        this.message = new message_1.Message(this.inputDomManager);
        this.initListeners();
    }
    ValidateInput.prototype.initListeners = function () {
        var _this = this;
        var validateOnEvents = this.inputDomManager.getValidateOnEvents();
        for (var i = 0; i < validateOnEvents.length; i++) {
            this.inputDomManager.registerListener(validateOnEvents[i], function () { return _this.registerChain(); });
        }
    };
    ValidateInput.prototype.registerChain = function () {
        var _this = this;
        async_1.Async.parallel(this.extractCallbackChain()).subscribe(function (responses) {
            _this.message.show(responses);
        });
    };
    ValidateInput.prototype.extractCallbackChain = function () {
        var callbackChain = [];
        for (var i = 0; i < manager_1.RulesManager.rules.length; i++) {
            var attributeName = manager_1.RulesManager.rules[i].name;
            if (this.inputDomManager.hasAttribute(attributeName)) {
                callbackChain.push(this.prepareRuleCallback(manager_1.RulesManager.rules[i]));
            }
        }
        return callbackChain;
    };
    ValidateInput.prototype.prepareRuleCallback = function (rule) {
        var _this = this;
        return function (appendResponseCallback) {
            var inputParameters = _this.extractParameters(rule);
            var validatorParameters = [
                function (validatorResponse) {
                    appendResponseCallback({
                        validatorResponse: validatorResponse,
                        inputParameters: inputParameters,
                        inputDomManager: _this.inputDomManager,
                        rule: rule
                    });
                }
            ].concat(inputParameters);
            rule.validate.apply(_this.inputDomManager.getInput(), validatorParameters);
        };
    };
    ValidateInput.prototype.extractParameters = function (rule) {
        var attributeValue = this.inputDomManager.getAttribute(rule.name);
        if (attributeValue === false) {
            return [];
        }
        return attributeValue.split(this.inputDomManager.getAttribute('rule-separator') || validator_1.Validator.ruleSeparator);
    };
    return ValidateInput;
}());
exports.ValidateInput = ValidateInput;
