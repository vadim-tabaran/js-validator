"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var manager_1 = require("./rules/manager");
var async_1 = require("./async/async");
var message_1 = require("./message/message");
var input_1 = require("./dom-manager/input");
var ValidateInput = (function () {
    function ValidateInput(input) {
        this.inputDomManager = new input_1.InputDomManager(input);
        this.rules = new manager_1.RulesManager(this.inputDomManager); //todo Rules manager
        this.message = new message_1.Message(this.inputDomManager);
        this.initListeners();
    }
    ValidateInput.prototype.initListeners = function () {
        var _this = this;
        var validateOnEvents = this.inputDomManager.getValidateOnEvents();
        for (var i = 0; i < validateOnEvents.length; i++) {
            this.inputDomManager.registerListener(validateOnEvents[i], function () { return _this.registerChain(); });
        }
    };
    ValidateInput.prototype.registerChain = function () {
        var _this = this;
        async_1.Async.parallel(this.rules.extractCallbackChain()).subscribe(function (responses) {
            _this.message.show(responses);
        });
    };
    return ValidateInput;
}());
exports.ValidateInput = ValidateInput;
