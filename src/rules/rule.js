"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationRule = (function () {
    function ValidationRule(rule, htmlInputElement) {
        this.rule = rule;
        this.htmlInputElement = htmlInputElement;
    }
    ValidationRule.prototype.execute = function (appendResponseCallback) {
        this.rule.validate.call(this.htmlInputElement, appendResponseCallback);
        return this;
    };
    return ValidationRule;
}());
exports.ValidationRule = ValidationRule;
