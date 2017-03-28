import { Template } from "./template";
import { DefaultValidatorView } from "../default-validate-message";
import { ValidateInputGroup } from "../validate-input-group";

export class Message {
  private validatorView: MessagesView;

  constructor(private groupContainer: ValidateInputGroup) {
    this.validatorView = new DefaultValidatorView(this.groupContainer); // todo add customization for validation message view
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