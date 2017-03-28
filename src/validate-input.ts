import { RulesManager } from "./rules/manager";
import { Async } from "./async/async";
import { Message } from "./message/message";
import { InputDomManager } from "./dom-manager/input";
import { Validator } from "./validator";
import { ValidateInputGroup } from "./validate-input-group";
import { ErrorHandler } from "./error";
import { ElementDomManager } from "./dom-manager/element";

export class ValidateInput {
  private inputDomManager: InputDomManager;
  private message: Message;
  private group: ValidateInputGroup;

  constructor(input: HTMLInputElement, group: ValidateInputGroup) {
    this.inputDomManager = new InputDomManager(input);
    this.message = new Message(this.inputDomManager);
    this.group = group;

    this.initListeners();
  }

  private extractCallbackChain() { // todo feature - add array name handling item[name] | item[]
    let callbackChain = [];
    let input = this.inputDomManager.getInput();

    if (this.group.length() === 1) {
      callbackChain = this.extractRulesFromAttributes(input);
    } else {
      let groupContainer = this.getGroupContainer();
      if (groupContainer === false) {
        ErrorHandler.throw('invalidGroupContainer', { group: this.inputDomManager.getInput().name });
        return [];
      }
      callbackChain = this.extractRulesFromAttributes(groupContainer);
    }
    return callbackChain;
  }

  private getGroupContainer() {
    let currentNode:any = this.inputDomManager.getInput();
    let groupName = currentNode.name;

    while (ElementDomManager.hasParentNode(currentNode)) {
      currentNode = ElementDomManager.getParentNode(currentNode);
      if (this.isGroupContainer(currentNode, groupName)) {
        return currentNode;
      }
    }
    return false;
  }

  private isGroupContainer(node: Element, groupName: string) {
    return ElementDomManager.hasAttribute(node, Validator.groupAttributeName) &&
      ElementDomManager.getAttribute(node, Validator.groupAttributeName) === groupName;
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

  private extractRulesFromAttributes(element: HTMLElement | false) {
    if (element === false) {
      ErrorHandler.throw('invalidGroupContainer', { group: this.inputDomManager.getInput().name });
      return [];
    }

    let callbackChain = [];
    for (let i = 0; i < RulesManager.rules.length; i++) {
      let attributeName = RulesManager.rules[i].name;

      if (ElementDomManager.hasAttribute(element, attributeName)) {
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