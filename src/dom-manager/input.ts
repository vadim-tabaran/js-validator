import { ElementDomManager } from "./element";
import { HTMLValidateInput } from "../types";
import {Validator} from "../validator";

export class InputDomManager {
  constructor(private input: HTMLValidateInput ) {}

  getInput() {
    return this.input;
  }

  getValidateOnEvents() {
    let validateOnAttributeValue = this.getAttribute(Validator.validateOnAttribute);
    return validateOnAttributeValue ? validateOnAttributeValue.split('|') : ['change'];
  }

  registerListener(event: string, onEventCallback) {
    this.input.addEventListener(event, onEventCallback);
  }

  hasAttribute(attrKey: string) {
    return ElementDomManager.hasAttribute(this.input, attrKey);
  }

  getAttribute(attrKey: string) {
    return ElementDomManager.getAttribute(this.input, attrKey);
  }

  getValue() {
    if (this.input instanceof HTMLSelectElement) {
      return this.input.options[this.input.selectedIndex].nodeValue;
    }

    if (this.input instanceof HTMLInputElement && ['radio', 'checkbox'].indexOf(this.input.getAttribute('type')) !== -1) {
      return this.input.checked === true ? this.input.value : false;
    }

    return this.input.value;
  }
}