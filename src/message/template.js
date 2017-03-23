"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Template = (function () {
    function Template(message, parameters) {
        this.message = message;
        this.parameters = parameters;
    }
    Template.prototype.extractMessage = function () {
        var params = this.parseParams();
        return 'This is extracted message';
    };
    Template.prototype.parseParams = function () {
        var unpreparedParameters = this.message.match(/%.*?%/g);
        return [];
    };
    return Template;
}());
exports.Template = Template;
