import { RulesManager } from "./rules/manager";
import { Async } from "./async/async";
import { InputDomManager } from "./dom-manager/input";
import { Validator } from "./validator";
import { ValidateInputGroup } from "./validate-input-group";
import { ErrorHandler } from "./error";
import { ElementDomManager } from "./dom-manager/element";
import { HTMLValidateInput } from "./types";

export class ValidateInput {
  private inputDomManager: InputDomManager;
  private group: ValidateInputGroup;
  private ruleManager: RulesManager;

  constructor(
    input: HTMLValidateInput,
    group: ValidateInputGroup,
    ruleManager: RulesManager
  ) {
    this.inputDomManager = new InputDomManager(input);
    this.group = group;
    this.ruleManager = ruleManager;

    this.initListeners();
  }

  getInputDomManager() {
    return this.inputDomManager;
  }

  registerChain(appendResponseCallback: any = false) {
    Async.parallel(this.extractCallbackChain()).subscribe(
      (responses: any[]) => {
        if (appendResponseCallback !== false) {
          let invalidRuleResponses = responses.filter((response) => response.validatorResponse === false);
          appendResponseCallback(invalidRuleResponses.length > 0);
        }
        this.group.showMessages(responses);
      }
    );
  }

  private extractCallbackChain() { // todo feature - add array name handling item[name] | item[]
    let groupContainer = this.group.getContainer();
    if (groupContainer === false) {
      ErrorHandler.throw('invalidGroupContainer', { group: this.inputDomManager.getInput().name });
      return [];
    }
    return this.extractRulesFromAttributes(groupContainer);
  }

  private initListeners() {
    let validateOnEvents = this.inputDomManager.getValidateOnEvents();

    for(let i = 0; i < validateOnEvents.length; i++) {
      this.inputDomManager.registerListener(
        validateOnEvents[i],
        () => this.registerChain()
      );
    }
  }

  private extractRulesFromAttributes(element: HTMLElement | false) {
    if (element === false) {
      ErrorHandler.throw('invalidGroupContainer', { group: this.inputDomManager.getInput().name });
      return [];
    }

    let callbackChain = [];
    let rules = this.ruleManager.getRules();
    for (let i = 0; i < rules.length; i++) {
      let attributeName = rules[i].name;

      if (ElementDomManager.hasAttribute(element, attributeName)) {
        callbackChain.push(this.prepareRuleCallback(rules[i]));
      }
    }
    return callbackChain;
  }

  private prepareRuleCallback(rule) {
    return (appendResponseCallback) => {
      let inputParameters = this.extractParameters(rule);
      let validatorParameters = [
        (validatorResponse) => {
          appendResponseCallback({
            validatorResponse: validatorResponse,
            inputParameters: inputParameters,
            inputDomManager: this.inputDomManager,
            group: this.group,
            rule: rule
          });
        },
        this.inputDomManager.getValue()
      ].concat(inputParameters);

      rule.validate.apply(
        this.inputDomManager.getInput(),
        validatorParameters
      );
    };
  }

  private extractParameters(rule): any[] {
    let attributeValue = this.inputDomManager.getAttribute(rule.name);
    if (attributeValue === false) {
      return [];
    }
    return attributeValue.split(
      this.inputDomManager.getAttribute('rule-separator') || Validator.ruleSeparator
    );
  }
}