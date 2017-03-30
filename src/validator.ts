import { FormDomManager } from "./dom-manager/form";
import { ValidateInputGroup } from "./validate-input-group";
import { RulesManager } from "./rules/manager";
import {Async} from "./async/async";

export class Validator {
  static preFix = 'v-';
  static ruleSeparator = '|';
  static messagePostFix = '-message';
  static customValidateResponseMethodName = 'validate';
  static groupAttributeName = 'group';
  static onSubmit;

  private formDomManager: FormDomManager;
  private inputGroups: ValidateInputGroup[] = [];
  private rules: RulesManager;
  private config: any;

  constructor(target: Element | string, config = {}) { // todo config import
    this.formDomManager = new FormDomManager(target);
    this.rules = new RulesManager(config);
    this.formDomManager.setElements();
    this.initValidator();
    this.config = config;
  }

  validate() {

  }

  static importRules(rules: Rule[]) {
    RulesManager.appendRules(rules);
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
      this.inputGroups.push(new ValidateInputGroup(groups[groupName], this.rules));
    }
  }

  private onFormSubmit(event: Event) {
    let callbacksChain = [];

    for (let i = 0; i < this.inputGroups.length; i++) {
      callbacksChain.push((appendResponseCallback) => {
        this.inputGroups[i].validate(appendResponseCallback);
      });
    }

    Async.parallel(callbacksChain).subscribe((groupResponses: boolean[]) => {
      let invalidGroups = groupResponses.filter((value) => value === false);

      this.handleOnSubmit(event, invalidGroups.length === 0)
    });
  }

  private handleOnSubmit(event: Event, isValid: boolean) {
    if (typeof this.config.onSubmit === "function") {
      return this.config.onSubmit.call(event.target, event, isValid);
    }

    if (typeof Validator.onSubmit === "function") {
      return Validator.onSubmit.call(event.target, event, isValid);
    }

    if (!isValid) {
      event.preventDefault();
    }
  }
}

window["Validator"] = Validator;