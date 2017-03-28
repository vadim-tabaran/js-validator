"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
var error_1 = require("../error");
var Template = (function () {
    function Template(templateConfig) {
        this.rule = templateConfig.rule;
        this.inputParameters = templateConfig.inputParameters;
        this.inputDomManager = templateConfig.inputDomManager;
        this.validatorResponse = templateConfig.validatorResponse;
    }
    Template.prototype.extractMessage = function () {
        var messageTemplate = this.getMessageTemplate();
        if (typeof messageTemplate !== 'string') {
            return error_1.ErrorHandler.throw('featureComing', {
                featureDescription: 'Response from validator should be a template string message'
            });
        }
        var params = this.parseTemplateParams(messageTemplate);
        var message = this.validatorResponse;
        this.virtualVariableSpace.apply(null, [
            params,
            this.inputParameters,
            this.inputDomManager.getInput().attributes
        ]).forEach(function (value, index) {
            message = message.replace('%' + params[index] + '%', value);
        });
        return message;
    };
    Template.prototype.parseTemplateParams = function (params) {
        return params.match(/%.*?%/g).map(function (value) { return value.replace(/^%|%$/g, ''); });
    };
    Template.prototype.virtualVariableSpace = function (templateParams, params, attributes) {
        var result = [];
        for (var i = 0; i < templateParams.length; i++) {
            try {
                result.push(eval(templateParams[i])); // todo create a parser for it. Eval is evil!
            }
            catch (e) {
                error_1.ErrorHandler.throw('invalidExpression', { expression: templateParams[i], details: e });
            }
        }
        return result;
    };
    Template.prototype.getMessageTemplate = function () {
        if (this.inputDomManager.hasAttribute(validator_1.Validator.messagePreFix + this.rule.name)) {
            return this.inputDomManager.getAttribute(validator_1.Validator.messagePreFix + this.rule.name);
        }
        if (this.validatorResponse instanceof Function) {
            return this.validatorResponse();
        }
        if (this.validatorResponse instanceof Object &&
            this.validatorResponse.hasOwnProperty(validator_1.Validator.customValidateResponseMethodName) &&
            this.validatorResponse[validator_1.Validator.customValidateResponseMethodName] instanceof Function) {
            return this.validatorResponse[validator_1.Validator.customValidateResponseMethodName];
        }
        if (typeof this.validatorResponse === 'string') {
            return this.validatorResponse;
        }
        if (this.validatorResponse === false) {
            return this.rule.message;
        }
        return false;
    };
    return Template;
}());
exports.Template = Template;
