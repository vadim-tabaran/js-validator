import { TemplateConfig } from "../interfaces/template-config";
import { Validator } from "../validator";
import { ErrorHandler } from "../error";
import {ValidateInputGroup} from "../validate-input-group";

export class Template {
  private rule: Rule;
  private inputParameters: string[];
  private group: ValidateInputGroup;
  private validatorResponse: any;

  constructor(templateConfig: TemplateConfig) {
    this.rule = templateConfig.rule;
    this.inputParameters = templateConfig.inputParameters;
    this.group = templateConfig.group;
    this.validatorResponse = templateConfig.validatorResponse;
  }

  extractMessage() {
    let messageTemplate = this.getMessageTemplate();

    if (['string', 'boolean'].indexOf(typeof messageTemplate) === -1) {
      return ErrorHandler.throw('featureComing', {
        featureDescription: 'Response from validator should be a template string or boolean message'
      });
    }

    if (messageTemplate !== true) {
      let params = this.parseTemplateParams(messageTemplate);
      this.virtualVariableSpace.apply(null, [ // todo add shared source for every object and whole class
        params,
        this.inputParameters,
        this.prepareAttributes()
      ]).forEach((value, index) => {
        messageTemplate = messageTemplate.replace('%' + params[index] + '%', value);
      });
    }
    return messageTemplate;
  }

  private prepareAttributes() {
    let attributes = this.group.getContainer().attributes;
    let attributesAssoc = {};
    for (let i = 0; i < attributes.length; i++) {
      attributesAssoc[attributes[i].name] = attributes[i].value;
    }
    return attributesAssoc;
  }

  private parseTemplateParams(params) {
    if (typeof params !== 'string') {
      return [];
    }
    let paramsArray = params.match(/%.*?%/g) || [];
    return paramsArray.map((value) => value.replace(/^%|%$/g, ''));
  }

  private virtualVariableSpace(templateParams, params, attributes) {
    let result = [];
    for (let i = 0; i < templateParams.length; i++) {
      try {
        result.push(eval(templateParams[i])); // todo create a parser for it. Eval is evil!
      } catch (message) {
        ErrorHandler.throw('invalidExpression', {expression: templateParams[i], details: message});
      }
    }
    return result;
  }

  private getMessageTemplate() { // todo if returns false or async
    if (this.group.hasAttribute(this.rule.name + Validator.messagePostFix)) {
      return this.group.getAttribute(this.rule.name + Validator.messagePostFix);
    }

    if (this.validatorResponse instanceof Function) {
      return this.validatorResponse();
    }

    if (
      this.validatorResponse instanceof Object &&
      this.validatorResponse.hasOwnProperty(Validator.customValidateResponseMethodName) &&
      this.validatorResponse[Validator.customValidateResponseMethodName] instanceof Function
    ) {
      return this.validatorResponse[Validator.customValidateResponseMethodName];
    }

    if (typeof this.validatorResponse === 'string') {
      return this.validatorResponse;
    }

    if (this.validatorResponse === false) {
      return this.rule.message;
    }

    return true;
  }
}