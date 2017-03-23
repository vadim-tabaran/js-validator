"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parallel = (function () {
    function Parallel(callbacks) {
        this.results = [];
        this.ruleStack = [];
        if (!Array.isArray(callbacks)) {
            callbacks = [callbacks];
        }
        this.ruleStack = this.ruleStack.concat(callbacks);
    }
    Parallel.prototype.appendChain = function (callbacks) {
        if (!Array.isArray(callbacks)) {
            callbacks = [callbacks];
        }
        this.ruleStack = this.ruleStack.concat(callbacks);
        return this;
    };
    Parallel.prototype.subscribe = function (callback) {
        var _this = this;
        this.endCallback = callback;
        var _loop_1 = function (i) {
            this_1.ruleStack[i].execute(function (validatorResponse, parameters) {
                _this.appendResponse(validatorResponse, parameters, _this.ruleStack[i]);
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.ruleStack.length; i++) {
            _loop_1(i);
        }
        return this;
    };
    Parallel.prototype.appendResponse = function (validatorResponse, parameters, rule) {
        this.results.push({
            validatorResponse: validatorResponse,
            parameters: parameters,
            rule: rule,
        });
        if (this.results.length === this.ruleStack.length) {
            this.endCallback(this.results);
        }
    };
    return Parallel;
}());
exports.Parallel = Parallel;
