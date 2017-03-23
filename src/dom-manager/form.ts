import {ErrorHandler} from "../error";

export class FormDomManager{
  private formElement: HTMLFormElement | null = null;
  private inputs: HTMLInputElement[] = [];
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
      } else if (targetElement instanceof HTMLInputElement) {
        this.inputs.push(targetElement);
        return true;
      } else {
        return new ErrorHandler('invalidSelector', {'selector': this.target});
      }
    }

    if (this.target instanceof HTMLInputElement) {
      this.inputs.push(this.target);
      return true;
    }

    return new ErrorHandler('invalidTarget', {'target': this.target});
  }

  getForm() {
    return this.formElement;
  }

  getInputs() {
    return this.inputs;
  }

  actualizeFormInputs() {
    if (this.formElement === null) {
      return;
    }

    for (let inputName in this.formElement.elements) {
      let currentElement = this.formElement.elements[inputName];
      if (currentElement instanceof HTMLInputElement && this.inputs.indexOf(currentElement) === -1){
        this.inputs.push(<HTMLInputElement>this.formElement.elements[inputName]);
      }
    }
  }
}