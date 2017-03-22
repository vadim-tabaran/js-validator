"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_rules_1 = require("./default-rules");
var rule_1 = require("./rule");
var RulesManager = (function () {
    function RulesManager(htmlInputElement) {
        this.htmlInputElement = htmlInputElement;
    }
    RulesManager.appendRules = function (customRules) {
        for (var ruleName in customRules) {
            RulesManager.rules[ruleName] = customRules[ruleName];
        }
    };
    RulesManager.prototype.extractCallbackChain = function () {
        var callbackChain = [];
        var ruleKeys = Object.keys(RulesManager.rules);
        for (var i = 0; i < ruleKeys.length; i++) {
            var attributeName = 'validation-' + ruleKeys[i];
            if (this.htmlInputElement.hasAttribute(attributeName)) {
                callbackChain.push(new rule_1.ValidationRule(RulesManager.rules[ruleKeys[i]], this.htmlInputElement));
            }
        }
        return callbackChain;
    };
    RulesManager.prototype.get = function (key) { };
    return RulesManager;
}());
RulesManager.rules = default_rules_1.rules;
exports.RulesManager = RulesManager;
