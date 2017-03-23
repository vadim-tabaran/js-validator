"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_rules_1 = require("./default-rules");
var rule_1 = require("./rule");
var RulesManager = (function () {
    function RulesManager(inputDomManager) {
        this.inputDomManager = inputDomManager;
    }
    RulesManager.appendRules = function (customRules) {
        var _loop_1 = function (i) {
            RulesManager.rules.filter(function (rule) { return rule.name != customRules[i].name; });
        };
        for (var i = 0; i < customRules.length; i++) {
            _loop_1(i);
        }
    };
    RulesManager.prototype.extractCallbackChain = function () {
        var callbackChain = [];
        for (var i = 0; i < RulesManager.rules.length; i++) {
            var attributeName = RulesManager.rules[i].name;
            if (this.inputDomManager.hasAttribute(attributeName)) {
                callbackChain.push(new rule_1.ValidationRule(RulesManager.rules[i], this.inputDomManager));
            }
        }
        return callbackChain;
    };
    RulesManager.prototype.get = function (key) { };
    return RulesManager;
}());
RulesManager.rules = default_rules_1.rules;
exports.RulesManager = RulesManager;
