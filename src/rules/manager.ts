import { rules } from './default-rules';
import {ValidationRule} from "./rule";

export class RulesManager {
  static rules = rules;

  constructor(
    private htmlInputElement: HTMLInputElement
  ) { }

  static appendRules(customRules) {
    for (let ruleName in customRules) {
      RulesManager.rules[ruleName] = customRules[ruleName];
    }
  }

  extractCallbackChain() {
    let callbackChain = [];
    let ruleKeys = Object.keys(RulesManager.rules);
    for (let i = 0; i < ruleKeys.length; i++) {
      let attributeName = 'validation-' + ruleKeys[i];
      if (this.htmlInputElement.hasAttribute(attributeName)) {
        callbackChain.push(
          new ValidationRule(RulesManager.rules[ruleKeys[i]], this.htmlInputElement)
        );
      }
    }
    return callbackChain;
  }

  get(key: string) {}
}