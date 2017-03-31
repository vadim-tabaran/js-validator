import { ValidateInput } from "./validate-input";
import { ElementDomManager } from "./dom-manager/element";
import { Validator } from "./validator";
import { Message } from "./message/message";
import { RulesManager } from "./rules/manager";
import { Async } from "./async/async";
import { HTMLValidateInput } from "./types";

export class ValidateInputGroup {
  private inputs: ValidateInput[] = [];
  private message: Message;
  private ruleManager: RulesManager;

  constructor(inputs: HTMLValidateInput[], ruleManager) { // todo group by attribute ( customization )
    for(let i = 0; i < inputs.length; i++) {
      this.inputs.push(new ValidateInput(inputs[i], this, ruleManager)); // todo group without names
    }

    this.message = new Message(this);
    this.ruleManager = ruleManager;
  }

  length() {
    return this.inputs.length;
  }

  showMessages(messages) {
    this.message.show(messages);
  }

  validate(appendResponseCallback) {
    let callbacksStack = [];

    let activeInput = this.getActiveInput();

    callbacksStack.push((next) => activeInput.registerChain(next));

    Async.parallel(callbacksStack).subscribe((responses) => {
      let inputInvalidResponses = responses.filter((inputValidResponse) => inputValidResponse === false);

      appendResponseCallback(inputInvalidResponses.length > 0);
    });
  }

  getContainer() {
    if (this.inputs.length === 1) {
      return this.inputs[0].getInputDomManager().getInput();
    }
    let currentNode:any = this.inputs[0].getInputDomManager().getInput();// todo get current input of current group
    let groupName = currentNode.name;

    while (ElementDomManager.hasParentNode(currentNode)) {
      currentNode = ElementDomManager.getParentNode(currentNode);
      if (ValidateInputGroup.isGroupContainer(currentNode, groupName)) {
        return currentNode;
      }
    }
    return false;
  }

  hasAttribute(attributeName: string) {
    return ElementDomManager.hasAttribute(this.getContainer(), attributeName);
  }

  getAttribute(attributeName: string) {
    return ElementDomManager.getAttribute(this.getContainer(), attributeName);
  }

  static isGroupContainer(node: Element, groupName: string) {
    return ElementDomManager.hasAttribute(node, Validator.groupAttributeName) &&
      ElementDomManager.getAttribute(node, Validator.groupAttributeName) === groupName;
  }

  private getActiveInput() {
    if (this.inputs.length === 1) {
      return this.inputs[0];
    }

    for (let i = 0; i < this.inputs.length; i++) {
      let currentInput = this.inputs[i].getInputDomManager().getInput();
      if (currentInput instanceof HTMLInputElement && currentInput.checked) {
        return this.inputs[i];
      }
    }

    return this.inputs[0];
  }
}