import { Validator } from "../validator";
export class InputDomManager {
  private input: HTMLInputElement;

  constructor(input: HTMLInputElement) {
    this.input = input;
  }

  getInput() {
    return this.input;
  }

  getValidateOnEvents() {
    let validateOnAttributeValue = this.getAttribute('validate-on');
    return validateOnAttributeValue ? validateOnAttributeValue.split('|') : ['change'];
  }

  registerListener(event: string, onEventCallback) {
    this.input.addEventListener(event, onEventCallback);
  }

  hasAttribute(attrKey: string) {
    return this.input.hasAttribute(Validator.preFix + attrKey);
  }

  getAttribute(attrKey: string) {
    if (!this.hasAttribute(attrKey)) {
      return false;
    }
    return this.input.getAttribute(Validator.preFix + attrKey);
  }
}