import { ValidateInput } from "./validate-input";
import { FormDomManager } from "./dom-manager/form";

export class Validator {
  static preFix = 'v-';
  static ruleSeparator = '|';
  static messagePreFix = '-message';
  static customValidateResponseMethodName = 'validate';

  private formDomManager: FormDomManager;

  constructor(target: Element | string, config = {}) { // todo config import
    this.formDomManager = new FormDomManager(target);
    this.formDomManager.setElements();
    this.initValidator();
  }

  validate() {

  }

  private initValidator() {
    this.initFormListener();
    this.initInputsListeners();
  }

  private initFormListener() {
    let formElement = this.formDomManager.getForm();
    if (formElement === null) {
      return;
    }

    formElement.addEventListener("submit", (event) => this.onFormSubmit(event));
  }

  private initInputsListeners() {
    let inputElements = this.formDomManager.getInputs();
    if (inputElements.length === 0) {
      return;
    }

    for (let i = 0; i < inputElements.length; i++) {
      new ValidateInput(inputElements[i]);
    }
  }

  private onFormSubmit(event: Event) { // todo On Form Submit

  }

  static importRules() { // todo importRules

  }
}

window["Validator"] = Validator;