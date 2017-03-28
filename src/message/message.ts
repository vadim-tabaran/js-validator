import { Template } from "./template";
import { InputDomManager } from "../dom-manager/input";
import { DefaultValidatorView } from "../default-validate-message";

export class Message {
  private validatorView: MessagesView;

  constructor(
    private inputDomManager: InputDomManager
  ) {
    this.validatorView = new DefaultValidatorView(this.inputDomManager); // todo add customization for validation message view
  }

  show(validatorResponses) {
    this.validatorView.destroy();
    let messagesList = this.getMessageList(validatorResponses);
    this.validatorView.show(messagesList);
  }

  private getMessageList(validatorResponses) {
    let messages = [];
    for(let i = 0; i < validatorResponses.length; i++) {
      let currMessage = this.getMessage(validatorResponses[i]);
      if (typeof currMessage === 'string') {
        messages.push(currMessage);
      }
    }
    return messages;
  }

  private getMessage(response) {
    if (response.validatorResponse === true) {
      return false;
    }
    let template = new Template(response);
    return template.extractMessage();
  }
}