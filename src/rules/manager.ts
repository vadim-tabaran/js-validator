import { rules } from './default-rules';

export class RulesManager {
  static rules = rules;

  static appendRules(customRules) {
    for (let i = 0; i < customRules.length; i++) {
      RulesManager.rules.filter((rule) => rule.name != customRules[i].name);
    }
  }
}