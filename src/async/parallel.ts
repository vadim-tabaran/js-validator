import { ValidateRule } from "../rules/validate-rule";

export class Parallel {
  private results: any[] = [];
  private ruleStack = [];
  private endCallback;

  constructor(callbacks:ValidateRule[] | ValidateRule) {
    if (!Array.isArray(callbacks)) {
      callbacks = [callbacks];
    }

    this.ruleStack = this.ruleStack.concat(callbacks);
  }

  subscribe(callback) {
    this.endCallback = callback;
    let rulesLength = this.ruleStack.length;

    if (rulesLength === 0) {
      this.endCallback(this.results);
    } else {
      for (let i = 0; i < this.ruleStack.length; i++) {
        this.ruleStack[i]((validatorResponse) => {
          this.appendResponse(validatorResponse);
        });
      }
    }
    return this;
  }

  appendResponse(validatorResponse) {
    this.results.push(validatorResponse);

    if (this.results.length === this.ruleStack.length) {
      this.endCallback(this.results);
    }
  }


}