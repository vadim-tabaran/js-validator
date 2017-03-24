import { InputDomManager } from "../dom-manager/input";
import { Validator } from "../validator";

export class ValidateRule {
  constructor(
    private rule: Rule,
    private inputDomManager: InputDomManager
  ) {}

  execute(appendResponseCallback) {
    let inputParameters = this.extractParameters();
    let validatorParameters = [
      (validatorResponse) => {
        appendResponseCallback(validatorResponse, inputParameters);
      }
    ].concat(inputParameters);

    this.rule.validate.apply(
      this.inputDomManager.getInput(),
      validatorParameters
    );

    return this;
  }

  private extractParameters(): any[] {
    let attributeValue = this.inputDomManager.getAttribute(this.rule.name);
    if (attributeValue === false) {
      return [];
    }
    return attributeValue.split(
      this.inputDomManager.getAttribute('rule-separator') || Validator.ruleSeparator
    );
  }
}