import {ElementDomManager} from "./element";

export class InputDomManager {
  constructor(private input: HTMLInputElement) {}

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
    return ElementDomManager.hasAttribute(this.input, attrKey);
  }

  getAttribute(attrKey: string) {
    return ElementDomManager.getAttribute(this.input, attrKey);
  }

  getValue() {
    if (this.input instanceof HTMLSelectElement) {
      return this.input.options[this.input.selectedIndex].nodeValue;
    }

    if (['radio', 'checkbox'].indexOf(this.input.getAttribute('type')) !== -1) {
      let checkedInput = <HTMLInputElement | null>document.querySelector('input[name="' + this.input.name + '"]:checked');
      return checkedInput ? checkedInput.value : false;
    }

    return this.input.value;
  }
}