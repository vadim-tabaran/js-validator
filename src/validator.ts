import { DomManager } from "./dom-manager";
import { RulesManager } from "./rules/manager";
import { Async } from "./async/async";
import { Message } from "./message";

export class Validator {
  private domManager: DomManager;

  constructor(target: Element | string, config = {}) { // todo config import
    this.domManager = new DomManager(target);
    this.domManager.setElements();
    this.initValidator();
  }

  validate() {

  }

  private initValidator() {
    this.initFormListener();
    this.initInputsListeners();
  }

  private initFormListener() {
    let formElement = this.domManager.getForm();
    if (formElement === null) {
      return;
    }

    formElement.addEventListener("submit", (event) => this.onFormSubmit(event));
  }

  private initInputsListeners() {
    let inputElements = this.domManager.getInputs();
    if (inputElements.length === 0) {
      return;
    }

    for (let i = 0; i < inputElements.length; i++) {
      let htmlInputElement = inputElements[i];
      let validateOnAttributeValue = DomManager.getAttributeValue(htmlInputElement, 'validate-on');
      let validateOnArray = validateOnAttributeValue ? validateOnAttributeValue.split('|') : [];
      let validateOnEvents = validateOnArray.length > 0 ? validateOnArray : ['change'];

      for(let i = 0; i < validateOnEvents.length; i++) {
        htmlInputElement.addEventListener(
          validateOnEvents[i],
          (event) => {
            this.validateInput(<HTMLInputElement>event.target)
          }
        );
      }
    }
  }

  private validateInput(element: HTMLInputElement) {
    let rules = new RulesManager(element); //todo Rules manager
    let rulesChain = rules.extractCallbackChain();

    Async.parallel(rulesChain).subscribe(
      (responses: any[]) => new Message(responses, element)
    );
  }



  private onFormSubmit(event: Event) { // todo On Form Submit

  }

  static importRules() { // todo importRules

  }
}

window["Validator"] = Validator;