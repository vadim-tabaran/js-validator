import { rules } from './default-rules';
import { ValidationRule } from "./rule";
import { InputDomManager } from "../dom-manager/input";

export class RulesManager {
  static rules = rules;

  constructor(
    private inputDomManager: InputDomManager
  ) { }

  static appendRules(customRules) {
    for (let i = 0; i < customRules.length; i++) {
      RulesManager.rules.filter((rule) => rule.name != customRules[i].name);
    }
  }

  extractCallbackChain() {
    let callbackChain = [];
    for (let i = 0; i < RulesManager.rules.length; i++) {
      let attributeName = RulesManager.rules[i].name;
      if (this.inputDomManager.hasAttribute(attributeName)) {
        callbackChain.push(
          new ValidationRule(RulesManager.rules[i], this.inputDomManager)
        );
      }
    }

    return callbackChain;
  }

  get(key: string) {}
}