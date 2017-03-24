"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
var ValidateRule = (function () {
    function ValidateRule(rule, inputDomManager) {
        this.rule = rule;
        this.inputDomManager = inputDomManager;
    }
    ValidateRule.prototype.execute = function (appendResponseCallback) {
        var inputParameters = this.extractParameters();
        var validatorParameters = [
            function (validatorResponse) {
                appendResponseCallback(validatorResponse, inputParameters);
            }
        ].concat(inputParameters);
        this.rule.validate.apply(this.inputDomManager.getInput(), validatorParameters);
        return this;
    };
    ValidateRule.prototype.extractParameters = function () {
        var attributeValue = this.inputDomManager.getAttribute(this.rule.name);
        if (attributeValue === false) {
            return [];
        }
        return attributeValue.split(this.inputDomManager.getAttribute('rule-separator') || validator_1.Validator.ruleSeparator);
    };
    return ValidateRule;
}());
exports.ValidateRule = ValidateRule;
