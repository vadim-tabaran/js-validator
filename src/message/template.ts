import { InputDomManager } from "../dom-manager/input";
import { TemplateConfig } from "../interfaces/template-config";
import { Validator } from "../validator";
import {ErrorHandler} from "../error";

export class Template {
  private rule: Rule;
  private inputParameters: string[];
  private inputDomManager: InputDomManager;
  private validatorResponse: any;

  constructor(
    templateConfig: TemplateConfig
  ) {
    this.rule = templateConfig.rule;
    this.inputParameters = templateConfig.inputParameters;
    this.inputDomManager = templateConfig.inputDomManager;
    this.validatorResponse = templateConfig.validatorResponse;
  }

  extractMessage() {
    let messageTemplate = this.getMessageTemplate();
    if (typeof messageTemplate !== 'string') {
      return ErrorHandler.throw('featureComing', {
        featureDescription: 'Response from validator should be a template string message'
      });
    }

    let params = this.parseTemplateParams(messageTemplate);
    let message = this.validatorResponse;

    this.virtualVariableSpace.apply(null, [ // todo add shared source for every object and whole class
      params,
      this.inputParameters,
      this.inputDomManager.getInput().attributes
    ]).forEach((value, index) => {
      message = message.replace('%' + params[index] + '%', value);
    });

    return message;
  }

  private parseTemplateParams(params) {
    return params.match(/%.*?%/g).map((value) => value.replace(/^%|%$/g, ''));
  }

  private virtualVariableSpace(templateParams, params, attributes) {
    let result = [];
    for (let i = 0; i < templateParams.length; i++) {
      try {
        result.push(eval(templateParams[i])); // todo create a parser for it. Eval is evil!
      } catch (e) {
        ErrorHandler.throw('invalidExpression', {expression: templateParams[i], details: e});
      }
    }
    return result;
  }

  private getMessageTemplate() { // todo if returns false or async
    if (this.inputDomManager.hasAttribute(Validator.messagePreFix + this.rule.name)) {
      return this.inputDomManager.getAttribute(Validator.messagePreFix + this.rule.name);
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

    return false;
  }
}