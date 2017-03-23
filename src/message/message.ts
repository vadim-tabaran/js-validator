import {Template} from "./template";
import {InputDomManager} from "../dom-manager/input";

export class Message{
  constructor(
    private inputDomManager: InputDomManager
  ) {}

  show(responses) {
    let messages = [];
    for(let i = 0; i < responses.length; i++) {
      messages.push(this.get(responses[i]));
    }
  }

  private get(response) {
    if (response === true) {
      return false;
    }

    if (typeof response === 'string') {
      let template = new Template(response, this.prepareTemplateParameters());
      return template.extractMessage();
    }

    if (response === false) { //todo if false
      return 'response - false';
    }
  }

  private prepareTemplateParameters() {
    return {
      attr: this.inputDomManager.getInput().attributes,
      params: []
    };
  }
}