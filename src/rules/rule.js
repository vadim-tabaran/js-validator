"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
var ValidationRule = (function () {
    function ValidationRule(rule, inputDomManager) {
        this.rule = rule;
        this.inputDomManager = inputDomManager;
    }
    ValidationRule.prototype.execute = function (appendResponseCallback) {
        var inputParameters = this.extractParameters();
        var validatorParameters = [
            function (validatorResponse) {
                appendResponseCallback(validatorResponse, inputParameters);
            }
        ].concat(inputParameters);
        this.rule.validate.apply(this.inputDomManager.getInput(), validatorParameters);
        return this;
    };
    ValidationRule.prototype.extractParameters = function () {
        var attributeValue = this.inputDomManager.getAttribute(this.rule.name);
        if (attributeValue === false) {
            return [];
        }
        return attributeValue.split(this.inputDomManager.getAttribute('rule-separator') || validator_1.Validator.rulesSeparator);
    };
    return ValidationRule;
}());
exports.ValidationRule = ValidationRule;
