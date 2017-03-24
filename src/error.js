"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorHandler = (function () {
    function ErrorHandler(key, params) {
        this.key = key;
        this.params = params;
        this.errorMessages = {
            invalidSelector: "Can't find HTMLFormElement or HTMLInputElement on %selector% selector",
            invalidTarget: "Can't find HTMLFormElement or HTMLInputElement on %target% target",
            featureComing: "Feature '%featureDescription%' is coming but it is have no that functionality!",
            invalidExpression: "Can't execute expression '%expression%'. Details: %details%",
            invalidErrorKey: "Invalid error key '%errorKey%'"
        };
        console.error(this.getMessage());
    }
    ErrorHandler.throw = function (key, params) {
        if (key === void 0) { key = ''; }
        if (params === void 0) { params = {}; }
        new ErrorHandler(key, params);
    };
    ErrorHandler.prototype.getMessage = function () {
        if (!(this.key in this.errorMessages)) {
            ErrorHandler.throw("invalidErrorKey");
            return '';
        }
        var currentMessage = this.errorMessages[this.key];
        for (var paramKey in this.params) {
            currentMessage = currentMessage.replace('%' + paramKey + '%', this.params[paramKey]);
        }
        return currentMessage;
    };
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
