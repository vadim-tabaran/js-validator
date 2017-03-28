import { FormDomManager } from "./dom-manager/form";
import { ValidateInputGroup } from "./validate-input-group";

export class Validator {
  static preFix = 'v-';
  static ruleSeparator = '|';
  static messagePostFix = '-message';
  static customValidateResponseMethodName = 'validate';
  static groupAttributeName = 'group';

  private formDomManager: FormDomManager;

  constructor(target: Element | string, config = {}) { // todo config import
    this.formDomManager = new FormDomManager(target);
    this.formDomManager.setElements();
    this.initValidator();
    console.log('log');
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

    let groups = {};

    for (let i = 0; i < inputElements.length; i++) {
      if (!groups.hasOwnProperty(inputElements[i].name)) {
        groups[inputElements[i].name] = [];
      }

      groups[inputElements[i].name].push(inputElements[i]) ;
    }

    for (let groupName in groups) {
      new ValidateInputGroup(groups[groupName]);
    }
  }

  private onFormSubmit(event: Event) { // todo On Form Submit

  }

  static importRules() { // todo importRules

  }
}

window["Validator"] = Validator;