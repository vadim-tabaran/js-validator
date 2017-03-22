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
      this.ruleStack[i].execute((validatorResponse) => {
        this.appendResponse(validatorResponse);
      });
    }

    return this;
  }

  appendResponse(validatorResponse) {
    this.results.push(new Response(validatorResponse));

    if (this.results.length === this.ruleStack.length) {
      this.endCallback(this.results);
    }
  }


}