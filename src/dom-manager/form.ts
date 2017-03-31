import { ErrorHandler } from "../error";
import { HTMLValidateInput } from "../types";



export class FormDomManager{
  private formElement: HTMLFormElement | null = null;
  private inputs: HTMLValidateInput[] = [];
  private target: Element | string = '';

  constructor(target: Element | string){
    this.target = target;
  }

  setElements() {
    if (typeof this.target === 'string') {
      let targetElement = document.querySelector(this.target);
      if (targetElement instanceof HTMLFormElement) {
        this.formElement = targetElement;
        this.actualizeFormInputs();
        return true;
      } else if (FormDomManager.isInput(targetElement)) {
        this.inputs.push(<HTMLValidateInput>targetElement);
        return true;
      } else {
        return new ErrorHandler('invalidSelector', {'selector': this.target});
      }
    }

    if (FormDomManager.isInput(this.target)) {
      this.inputs.push(<HTMLValidateInput>this.target);
      return true;
    }

    return new ErrorHandler('invalidTarget', {'target': this.target});
  }

  getForm() {
    return this.formElement;
  }

  getInputs(): HTMLValidateInput[] {
    return this.inputs;
  }

  actualizeFormInputs() {
    if (this.formElement === null) {
      return;
    }

    for (let inputName in this.formElement.elements) {
      let currentElement = <HTMLValidateInput>this.formElement.elements[inputName];
      if (FormDomManager.isInput(currentElement) && this.inputs.indexOf(currentElement) === -1){
        this.inputs.push(<HTMLValidateInput>this.formElement.elements[inputName]);
      }
    }
  }

  static isInput(element) {
    return  element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement ||
            element instanceof HTMLSelectElement;
  }
}