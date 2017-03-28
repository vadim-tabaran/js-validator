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
        if (['string', 'boolean'].indexOf(typeof messageTemplate) === -1) {
            return error_1.ErrorHandler.throw('featureComing', {
                featureDescription: 'Response from validator should be a template string or boolean message'
            });
        }
        if (messageTemplate !== true) {
            var params_1 = this.parseTemplateParams(messageTemplate);
            this.virtualVariableSpace.apply(null, [
                params_1,
                this.inputParameters,
                this.prepareAttributes()
            ]).forEach(function (value, index) {
                messageTemplate = messageTemplate.replace('%' + params_1[index] + '%', value);
            });
        }
        return messageTemplate;
    };
    Template.prototype.prepareAttributes = function () {
        var attributes = this.inputDomManager.getInput().attributes;
        var attributesAssoc = {};
        for (var i = 0; i < attributes.length; i++) {
            attributesAssoc[attributes[i].name] = attributes[i].value;
        }
        return attributesAssoc;
    };
    Template.prototype.parseTemplateParams = function (params) {
        if (typeof params !== 'string') {
            return [];
        }
        var paramsArray = params.match(/%.*?%/g) || [];
        return paramsArray.map(function (value) { return value.replace(/^%|%$/g, ''); });
    };
    Template.prototype.virtualVariableSpace = function (templateParams, params, attributes) {
        var result = [];
        for (var i = 0; i < templateParams.length; i++) {
            try {
                result.push(eval(templateParams[i])); // todo create a parser for it. Eval is evil!
            }
            catch (message) {
                error_1.ErrorHandler.throw('invalidExpression', { expression: templateParams[i], details: message });
            }
        }
        return result;
    };
    Template.prototype.getMessageTemplate = function () {
        if (this.inputDomManager.hasAttribute(this.rule.name + validator_1.Validator.messagePostFix)) {
            return this.inputDomManager.getAttribute(this.rule.name + validator_1.Validator.messagePostFix);
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
        return true;
    };
    return Template;
}());
exports.Template = Template;
