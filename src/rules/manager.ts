import { rules } from './default-rules';

export class RulesManager {
  static rules = rules;
  private mergedRules: Rule[] = [];

  constructor(config) {
    config.rules = config.rules || [];
    this.mergedRules = RulesManager.mergeRules(config.rules);
    console.log(this.mergedRules);
  }

  getRules() {
    return this.mergedRules;
  }

  static appendRules(customRules) {
    RulesManager.rules = RulesManager.mergeRules(customRules);
  }

  static mergeRules(customRules) {
    let rules = RulesManager.rules;
    for (let i = 0; i < customRules.length; i++) {
      rules = rules
        .filter((rule) => rule.name != customRules[i].name)
        .concat(customRules[i]);
    }
    return rules;
  }
}