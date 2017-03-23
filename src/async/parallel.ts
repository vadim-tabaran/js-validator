import {ValidationRule} from "../rules/rule";

export class Parallel {
  private results: any[] = [];
  private ruleStack = [];
  private endCallback;

  constructor(callbacks:ValidationRule[] | ValidationRule) {
    if (!Array.isArray(callbacks)) {
      callbacks = [callbacks];
    }

    this.ruleStack = this.ruleStack.concat(callbacks);
  }

  appendChain(callbacks:ValidationRule[] | ValidationRule) {
    if (!Array.isArray(callbacks)) {
      callbacks = [callbacks];
    }

    this.ruleStack = this.ruleStack.concat(callbacks);
    return this;
  }

  subscribe(callback) {
    this.endCallback = callback;

    for (let i = 0; i < this.ruleStack.length; i++) {
      this.ruleStack[i].execute((validatorResponse, parameters) => {
        this.appendResponse(validatorResponse, parameters, this.ruleStack[i]);
      });
    }

    return this;
  }

  appendResponse(validatorResponse, parameters, rule) {
    this.results.push({
      validatorResponse: validatorResponse,
      parameters: parameters,
      rule: rule,
    });

    if (this.results.length === this.ruleStack.length) {
      this.endCallback(this.results);
    }
  }


}