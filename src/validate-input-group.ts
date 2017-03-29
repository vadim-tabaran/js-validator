import { ValidateInput } from "./validate-input";
import { ElementDomManager } from "./dom-manager/element";
import { Validator } from "./validator";
import { Message } from "./message/message";
import { RulesManager } from "./rules/manager";

export class ValidateInputGroup {
  private inputs: ValidateInput[] = [];
  private message: Message;
  private ruleManager: RulesManager;

  constructor(inputs: HTMLInputElement[], ruleManager) { // todo group by attribute ( customization )
    for(let i = 0; i < inputs.length; i++) {
      this.inputs.push(new ValidateInput(inputs[i], this, ruleManager)); // todo group without names
    }

    this.message = new Message(this);
    this.ruleManager = ruleManager;
  }

  each(callback) {
    for (let i = 0; i < this.inputs.length; i++) {
      callback(this.inputs[i]);
    }
  }

  length() {
    return this.inputs.length;
  }

  showMessages(messages) {
    this.message.show(messages);
  }

  getContainer() {
    if (this.inputs.length === 1) {
      return this.inputs[0].getInputDomManager().getInput();
    }
    let currentNode:any = this.inputs[0].getInputDomManager().getInput();// todo get current input of current group
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
}