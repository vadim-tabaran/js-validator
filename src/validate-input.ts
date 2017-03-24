import { RulesManager } from "./rules/manager";
import { Async } from "./async/async";
import { Message } from "./message/message";
import { InputDomManager } from "./dom-manager/input";
import { Validator } from "./validator";

export class ValidateInput {
  private inputDomManager: InputDomManager;
  private message: Message;

  constructor(input: HTMLInputElement) {
    this.inputDomManager = new InputDomManager(input);
    this.message = new Message(this.inputDomManager);

    this.initListeners();
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

  private registerChain() {
    Async.parallel(this.extractCallbackChain()).subscribe(
      (responses: any[]) => {
        this.message.show(responses);
      }
    );
  }

  private extractCallbackChain() {
    let callbackChain = [];

    for (let i = 0; i < RulesManager.rules.length; i++) {
      let attributeName = RulesManager.rules[i].name;
      if (this.inputDomManager.hasAttribute(attributeName)) {
        callbackChain.push(this.prepareRuleCallback(RulesManager.rules[i]));
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
            rule: rule
          });
        }
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