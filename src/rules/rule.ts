export class ValidationRule {
  constructor(
    private rule: Rule,
    private htmlInputElement: HTMLInputElement
  ) {}

  execute(appendResponseCallback) {
    this.rule.validate.call(
      this.htmlInputElement,
      appendResponseCallback
    );
    return this;
  }


}