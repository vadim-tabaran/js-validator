"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_input_1 = require("./validate-input");
var ValidateInputGroup = (function () {
    function ValidateInputGroup(inputs) {
        this.inputs = [];
        for (var i = 0; i < inputs.length; i++) {
            this.inputs.push(new validate_input_1.ValidateInput(inputs[i], this)); // todo group without names
        }
    }
    ValidateInputGroup.prototype.each = function (callback) {
        for (var i = 0; i < this.inputs.length; i++) {
            callback(this.inputs[i]);
        }
    };
    ValidateInputGroup.prototype.length = function () {
        return this.inputs.length;
    };
    return ValidateInputGroup;
}());
exports.ValidateInputGroup = ValidateInputGroup;
