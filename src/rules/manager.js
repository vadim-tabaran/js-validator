"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_rules_1 = require("./default-rules");
var RulesManager = (function () {
    function RulesManager() {
    }
    RulesManager.appendRules = function (customRules) {
        var _loop_1 = function (i) {
            RulesManager.rules.filter(function (rule) { return rule.name != customRules[i].name; });
        };
        for (var i = 0; i < customRules.length; i++) {
            _loop_1(i);
        }
    };
    return RulesManager;
}());
RulesManager.rules = default_rules_1.rules;
exports.RulesManager = RulesManager;
