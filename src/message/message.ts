import { Template } from "./template";
import { InputDomManager } from "../dom-manager/input";

export class Message{
  constructor(
    private inputDomManager: InputDomManager
  ) {}

  show(validatorResponses) {
    let messages = [];
    for(let i = 0; i < validatorResponses.length; i++) {
      messages.push(this.get(validatorResponses[i]));
    }
  }

  private get(response) {
    let template = new Template(response);
    return template.extractMessage();
  }
}